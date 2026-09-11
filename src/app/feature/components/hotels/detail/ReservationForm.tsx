"use client";

import { useMemo } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { differenceInCalendarDays, format } from "date-fns";
import {
  Loader2,
  Users,
  BedDouble,
  UserRoundCog,
  ReceiptText,
  Minus,
  Plus,
  CalendarDays,
  Check,
  MessageSquareText,
  IdCard,
  MapPin,
  Briefcase,
} from "lucide-react";

export interface RoomOption {
  id: string;
  type: string;
  price: number;
  basePrice?: number | null;
  capacity: number;
  bedConfig?: string | null;
  quantity: number;
}

export interface CurrentActor {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "OWNER" | "USER" | "GUEST";
  subRole?: "MANAGER" | "FRONT_DESK" | "HOUSEKEEPING" | null;
}

export interface ReservationPayload {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  roomsCount: number;
  bookedFor: "SELF" | "GUEST";
  guest?: {
    name: string;
    email?: string;
    phone: string;
    idType: "NID" | "PASSPORT" | "BIRTH_CERTIFICATE" | "DRIVING_LICENSE";
    idNumber: string;
    address: string;
    purposeOfVisit: "BUSINESS" | "LEISURE" | "MEDICAL" | "OFFICIAL" | "OTHER";
  };
  specialRequests?: string;
}

interface ReservationFormProps {
  hotelId: string;
  hotelName: string;
  rooms: RoomOption[];
  actor: CurrentActor;
  isSubmitting?: boolean;
  onSubmit: (payload: ReservationPayload) => void | Promise<void>;
  initialValues?: {
    checkIn?: string;
    checkOut?: string;
    adults?: number;
    children?: number;
    roomsCount?: number;
  };
}

const ID_TYPES = [
  { value: "NID", label: "National ID (NID)" },
  { value: "PASSPORT", label: "Passport" },
  { value: "BIRTH_CERTIFICATE", label: "Birth Certificate" },
  { value: "DRIVING_LICENSE", label: "Driving License" },
] as const;

const PURPOSES = [
  { value: "BUSINESS", label: "Business" },
  { value: "LEISURE", label: "Leisure" },
  { value: "MEDICAL", label: "Medical" },
  { value: "OFFICIAL", label: "Official" },
  { value: "OTHER", label: "Other" },
] as const;

const schema = z
  .object({
    roomId: z.string().min(1, "Please select a room"),
    checkIn: z.string().min(1, "Check-in date is required"),
    checkOut: z.string().min(1, "Check-out date is required"),
    adults: z.coerce
      .number()
      .int()
      .min(1, "At least 1 adult is required")
      .max(10),
    children: z.coerce.number().int().min(0).max(10),
    roomsCount: z.coerce
      .number()
      .int()
      .min(1, "At least 1 room is required")
      .max(10),
    bookedFor: z.enum(["SELF", "GUEST"]),
    guestName: z.string().optional(),
    guestEmail: z.string().optional(),
    guestPhone: z.string().optional(),
    guestIdType: z
      .enum(["NID", "PASSPORT", "BIRTH_CERTIFICATE", "DRIVING_LICENSE"])
      .optional(),
    guestIdNumber: z.string().optional(),
    guestAddress: z.string().optional(),
    guestPurpose: z
      .enum(["BUSINESS", "LEISURE", "MEDICAL", "OFFICIAL", "OTHER"])
      .optional(),
    specialRequests: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.checkIn && data.checkOut) {
      const nights = differenceInCalendarDays(
        new Date(data.checkOut),
        new Date(data.checkIn),
      );
      if (nights <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["checkOut"],
          message: "Check-out must be after check-in",
        });
      }
    }
    if (data.bookedFor === "GUEST") {
      if (!data.guestName || data.guestName.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestName"],
          message: "Guest name is required",
        });
      }
      if (!data.guestPhone || data.guestPhone.trim().length < 6) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestPhone"],
          message: "Guest phone number is required",
        });
      }
      if (
        data.guestEmail &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.guestEmail)
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestEmail"],
          message: "Enter a valid email address",
        });
      }
      if (!data.guestIdType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestIdType"],
          message: "ID type is required",
        });
      }
      if (!data.guestIdNumber || data.guestIdNumber.trim().length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestIdNumber"],
          message: "ID number is required",
        });
      }
      if (!data.guestAddress || data.guestAddress.trim().length < 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestAddress"],
          message: "Address is required",
        });
      }
      if (!data.guestPurpose) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["guestPurpose"],
          message: "Purpose of visit is required",
        });
      }
    }
  });

type FormInput = z.input<typeof schema>;
type FormOutput = z.output<typeof schema>;

const inputCls =
  "w-full rounded-md border border-line bg-cream px-3 py-2.5 text-sm text-ink placeholder:text-caption transition-shadow focus:outline-none focus:ring-2 focus:ring-gold-400 disabled:opacity-50";
const labelCls =
  "mb-1.5 block text-[13px] font-medium tracking-wide text-ink-soft";
const errorCls = "mt-1.5 text-xs text-danger";

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (next: number) => void;
}) {
  return (
    <div>
      <span className={labelCls}>{label}</span>
      <div className="flex items-center justify-between rounded-md border border-line bg-cream px-2 py-1.5">
        <button
          type="button"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold-400 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-8 text-center text-sm font-medium text-ink tabular-nums">
          {value}
        </span>
        <button
          type="button"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-gold-400 hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function ReservationForm({
  hotelId,
  hotelName,
  rooms,
  actor,
  isSubmitting = false,
  onSubmit,
  initialValues,
}: ReservationFormProps) {
  // Enabled for everyone by default
  const canBookForGuest = true;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormInput, undefined, FormOutput>({
    resolver: zodResolver(schema),
    defaultValues: {
      roomId: rooms[0]?.id ?? "",
      checkIn: initialValues?.checkIn ?? "",
      checkOut: initialValues?.checkOut ?? "",
      adults: initialValues?.adults ?? 1,
      children: initialValues?.children ?? 0,
      roomsCount: initialValues?.roomsCount ?? 1,
      bookedFor: "SELF",
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      guestIdType: undefined,
      guestIdNumber: "",
      guestAddress: "",
      guestPurpose: undefined,
      specialRequests: "",
    },
  });

  const bookedFor = useWatch({ control, name: "bookedFor" });
  const roomId = useWatch({ control, name: "roomId" });
  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });
  const adultsRaw = useWatch({ control, name: "adults" });
  const childrenRaw = useWatch({ control, name: "children" });
  const roomsCountRaw = useWatch({ control, name: "roomsCount" });
  const guestName = useWatch({ control, name: "guestName" });
  const guestPhone = useWatch({ control, name: "guestPhone" });
  const guestEmail = useWatch({ control, name: "guestEmail" });
  const guestIdType = useWatch({ control, name: "guestIdType" });
  const guestIdNumber = useWatch({ control, name: "guestIdNumber" });
  const guestAddress = useWatch({ control, name: "guestAddress" });
  const guestPurpose = useWatch({ control, name: "guestPurpose" });
  const specialRequests = useWatch({ control, name: "specialRequests" });

  const adults = Number(adultsRaw) || 1;
  const childrenCount = Number(childrenRaw) || 0;
  const roomsCount = Number(roomsCountRaw) || 1;

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === roomId),
    [rooms, roomId],
  );

  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const n = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    return n > 0 ? n : 0;
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    if (!selectedRoom || nights === 0) return 0;
    return selectedRoom.price * nights * roomsCount;
  }, [selectedRoom, nights, roomsCount]);

  const todayStr = format(new Date(), "yyyy-MM-dd");

  const submitHandler = (values: FormOutput) => {
    const payload: ReservationPayload = {
      hotelId,
      roomId: values.roomId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      adults: values.adults,
      children: values.children,
      roomsCount: values.roomsCount,
      bookedFor: values.bookedFor,
      specialRequests: values.specialRequests?.trim() || undefined,
      ...(values.bookedFor === "GUEST"
        ? {
            guest: {
              name: values.guestName!.trim(),
              email: values.guestEmail?.trim() || undefined,
              phone: values.guestPhone!.trim(),
              idType: values.guestIdType!,
              idNumber: values.guestIdNumber!.trim(),
              address: values.guestAddress!.trim(),
              purposeOfVisit: values.guestPurpose!,
            },
          }
        : {}),
    };
    return onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="mx-auto w-full max-w-5xl"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start lg:gap-8">
        <div className="card-lux rounded-2xl bg-cream p-6 sm:p-8">
          <div className="mb-7">
            <p className="text-xs tracking-wide text-caption">{hotelName}</p>
            <h2 className="font-serif text-2xl text-ink">New Reservation</h2>
            <div className="divider-gold mt-3" />
          </div>

          {canBookForGuest && (
            <div className="mb-7">
              <span className={labelCls}>Booking for</span>
              <Controller
                control={control}
                name="bookedFor"
                render={({ field }) => (
                  <div className="inline-flex rounded-full border border-line bg-sand p-1">
                    <button
                      type="button"
                      onClick={() => field.onChange("SELF")}
                      className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                        field.value === "SELF"
                          ? "bg-forest text-cream"
                          : "text-ink-soft"
                      }`}
                    >
                      My own account
                    </button>
                    <button
                      type="button"
                      onClick={() => field.onChange("GUEST")}
                      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm transition-colors ${
                        field.value === "GUEST"
                          ? "bg-forest text-cream"
                          : "text-ink-soft"
                      }`}
                    >
                      <UserRoundCog className="h-3.5 w-3.5" />
                      On behalf of a guest
                    </button>
                  </div>
                )}
              />
            </div>
          )}

          {bookedFor === "GUEST" && (
            <div className="mb-7 rounded-xl border border-line bg-sand/60 p-4">
              <p className="mb-3 text-sm font-medium text-ink-soft">
                Guest details
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Full name *</label>
                  <input
                    className={inputCls}
                    placeholder="Guest's full name"
                    {...register("guestName")}
                  />
                  {errors.guestName && (
                    <p className={errorCls}>{errors.guestName.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelCls}>Phone number *</label>
                  <input
                    className={inputCls}
                    placeholder="01XXXXXXXXX"
                    {...register("guestPhone")}
                  />
                  {errors.guestPhone && (
                    <p className={errorCls}>{errors.guestPhone.message}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Email (optional)</label>
                  <input
                    className={inputCls}
                    placeholder="guest@example.com"
                    {...register("guestEmail")}
                  />
                  {errors.guestEmail && (
                    <p className={errorCls}>{errors.guestEmail.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 border-t border-line pt-4">
                <p className="mb-3 flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                  <IdCard className="h-4 w-4 text-gold-800" />
                  Identity (required for registration)
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>ID type *</label>
                    <select
                      className={inputCls}
                      {...register("guestIdType")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select ID type
                      </option>
                      {ID_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>
                          {t.label}
                        </option>
                      ))}
                    </select>
                    {errors.guestIdType && (
                      <p className={errorCls}>{errors.guestIdType.message}</p>
                    )}
                  </div>
                  <div>
                    <label className={labelCls}>ID number *</label>
                    <input
                      className={inputCls}
                      placeholder="e.g. NID / Passport number"
                      {...register("guestIdNumber")}
                    />
                    {errors.guestIdNumber && (
                      <p className={errorCls}>{errors.guestIdNumber.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>
                      <MapPin className="mr-1 inline h-3.5 w-3.5 text-gold-800" />
                      Present address *
                    </label>
                    <input
                      className={inputCls}
                      placeholder="House, road, area, city"
                      {...register("guestAddress")}
                    />
                    {errors.guestAddress && (
                      <p className={errorCls}>{errors.guestAddress.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>
                      <Briefcase className="mr-1 inline h-3.5 w-3.5 text-gold-800" />
                      Purpose of visit *
                    </label>
                    <select
                      className={inputCls}
                      {...register("guestPurpose")}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select purpose
                      </option>
                      {PURPOSES.map((p) => (
                        <option key={p.value} value={p.value}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                    {errors.guestPurpose && (
                      <p className={errorCls}>{errors.guestPurpose.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mb-7">
            <label className={labelCls}>
              <BedDouble className="mr-1 inline h-4 w-4 text-gold-800" />
              Room type
            </label>
            {rooms.length === 0 ? (
              <p className="rounded-md border border-line bg-sand/50 px-3 py-3 text-sm text-caption">
                No rooms are available for these dates.
              </p>
            ) : (
              <Controller
                control={control}
                name="roomId"
                render={({ field }) => (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {rooms.map((room) => {
                      const isSelected = field.value === room.id;
                      const hasDiscount =
                        room.basePrice && room.basePrice > room.price;
                      return (
                        <button
                          type="button"
                          key={room.id}
                          onClick={() => field.onChange(room.id)}
                          aria-pressed={isSelected}
                          className={`relative flex flex-col gap-2 rounded-xl border px-4 py-3.5 text-left transition-all ${
                            isSelected
                              ? "border-gold-400 bg-forest-100/60 ring-1 ring-gold-400"
                              : "border-line bg-cream hover:border-gold-400/60"
                          }`}
                        >
                          {isSelected && (
                            <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-forest text-cream">
                              <Check className="h-3 w-3" />
                            </span>
                          )}
                          <span className="pr-6 font-serif text-base text-ink">
                            {room.type}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-caption">
                            <Users className="h-3.5 w-3.5" />
                            Sleeps {room.capacity}
                            {room.bedConfig ? ` · ${room.bedConfig}` : ""}
                          </span>
                          <span className="mt-1 flex items-baseline gap-1.5">
                            {hasDiscount && (
                              <span className="text-xs text-caption line-through">
                                ৳{room.basePrice!.toLocaleString("en-US")}
                              </span>
                            )}
                            <span className="font-serif text-lg text-ink">
                              ৳{room.price.toLocaleString("en-US")}
                            </span>
                            <span className="text-xs text-caption">
                              / night
                            </span>
                          </span>
                          {room.quantity <= 3 && (
                            <span className="text-xs text-danger">
                              Only {room.quantity} left
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            )}
            {errors.roomId && (
              <p className={errorCls}>{errors.roomId.message}</p>
            )}
          </div>

          <div className="mb-7">
            <span className={labelCls}>
              <CalendarDays className="mr-1 inline h-4 w-4 text-gold-800" />
              Dates
            </span>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs text-caption">
                  Check-in
                </label>
                <input
                  type="date"
                  min={todayStr}
                  className={inputCls}
                  {...register("checkIn")}
                />
                {errors.checkIn && (
                  <p className={errorCls}>{errors.checkIn.message}</p>
                )}
              </div>
              <div>
                <label className="mb-1 block text-xs text-caption">
                  Check-out
                </label>
                <input
                  type="date"
                  min={checkIn || todayStr}
                  className={inputCls}
                  {...register("checkOut")}
                />
                {errors.checkOut && (
                  <p className={errorCls}>{errors.checkOut.message}</p>
                )}
              </div>
            </div>
            {nights > 0 && (
              <p className="mt-2 text-xs text-caption">
                {nights} {nights === 1 ? "night" : "nights"} stay
              </p>
            )}
          </div>

          <div className="mb-7 grid gap-4 sm:grid-cols-3">
            <Stepper
              label="Adults"
              value={adults}
              min={1}
              max={10}
              onChange={(next) =>
                setValue("adults", next, { shouldValidate: true })
              }
            />
            <Stepper
              label="Children"
              value={childrenCount}
              min={0}
              max={10}
              onChange={(next) =>
                setValue("children", next, { shouldValidate: true })
              }
            />
            <Stepper
              label="Rooms"
              value={roomsCount}
              min={1}
              max={selectedRoom?.quantity ?? 10}
              onChange={(next) =>
                setValue("roomsCount", next, { shouldValidate: true })
              }
            />
          </div>
          {errors.adults && <p className={errorCls}>{errors.adults.message}</p>}
          {errors.roomsCount && (
            <p className={errorCls}>{errors.roomsCount.message}</p>
          )}

          <div>
            <label className={labelCls}>
              <MessageSquareText className="mr-1 inline h-4 w-4 text-gold-800" />
              Special requests (optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g. high floor, late check-in, extra pillows"
              className={inputCls}
              {...register("specialRequests")}
            />
          </div>
        </div>

        <div className="card-lux sticky top-6 rounded-2xl bg-forest-100 p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-forest-900">
            <ReceiptText className="h-4 w-4" />
            <span>Booking summary</span>
          </div>
          <div className="divider-gold my-4" />

          {selectedRoom ? (
            <div className="space-y-3 text-sm text-ink-soft">
              <div className="flex justify-between gap-3">
                <span className="text-ink">{selectedRoom.type}</span>
                <span>৳{selectedRoom.price.toLocaleString("en-US")}/night</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Rooms</span>
                <span>{roomsCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Nights</span>
                <span>{nights || "—"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Check-in</span>
                <span>{checkIn || "—"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Check-out</span>
                <span>{checkOut || "—"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Guests</span>
                <span>
                  {adults} adult{adults > 1 ? "s" : ""}
                  {childrenCount > 0
                    ? `, ${childrenCount} child${
                        childrenCount > 1 ? "ren" : ""
                      }`
                    : ""}
                </span>
              </div>

              <div className="border-t border-line/60 pt-3">
                <p className="mb-1.5 text-xs font-medium text-ink">
                  {bookedFor === "GUEST" ? "Guest" : "Booked by"}
                </p>
                {bookedFor === "GUEST" ? (
                  <div className="space-y-1 text-xs">
                    <p>{guestName || "—"}</p>
                    <p>{guestPhone || "—"}</p>
                    {guestEmail && <p>{guestEmail}</p>}
                    {guestIdType && guestIdNumber && (
                      <p>
                        {ID_TYPES.find((t) => t.value === guestIdType)?.label}:{" "}
                        {guestIdNumber}
                      </p>
                    )}
                    {guestAddress && <p>{guestAddress}</p>}
                    {guestPurpose && (
                      <p>
                        Purpose:{" "}
                        {PURPOSES.find((p) => p.value === guestPurpose)?.label}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1 text-xs">
                    <p>{actor.name}</p>
                    <p>{actor.email}</p>
                    {actor.phone && <p>{actor.phone}</p>}
                  </div>
                )}
              </div>

              {specialRequests && specialRequests.trim() && (
                <div className="border-t border-line/60 pt-3">
                  <p className="mb-1 text-xs font-medium text-ink">
                    Special requests
                  </p>
                  <p className="text-xs">{specialRequests}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-caption">
              Select a room to see pricing.
            </p>
          )}

          <div className="divider-gold my-4" />
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-lg text-ink">Total</span>
            <span className="font-serif text-2xl text-ink">
              ৳{totalPrice.toLocaleString("en-US")}
            </span>
          </div>
          <p className="mt-1 text-xs text-caption">Taxes and fees included</p>

          <button
            type="submit"
            disabled={isSubmitting || rooms.length === 0}
            className="btn-gold-outline mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-medium text-cream transition-colors disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {bookedFor === "GUEST"
              ? "Create booking for guest"
              : "Confirm reservation"}
          </button>
        </div>
      </div>
    </form>
  );
}
