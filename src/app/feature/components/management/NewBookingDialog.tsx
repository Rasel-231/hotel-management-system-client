"use client";

import { useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarPlus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, todayKey } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Room } from "@/types/types";

export interface NewBookingInput {
  guestName: string;
  email: string;
  phone?: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
}

const newBookingSchema = z
  .object({
    guestName: z.string().trim().min(2, "Guest name is required"),
    email: z.string().trim().email("Enter a valid email"),
    phone: z.string().trim().optional(),
    roomId: z.string().min(1, "Pick a room"),
    checkIn: z.string().min(1, "Check-in is required"),
    checkOut: z.string().min(1, "Check-out is required"),
    adults: z.number().int().min(1, "At least 1 adult").max(8, "Max 8 adults"),
  })
  .refine((d) => d.checkOut > d.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

type NewBookingForm = z.infer<typeof newBookingSchema>;

interface NewBookingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rooms: Room[];
  onCreated: (input: NewBookingInput) => void;
}

export default function NewBookingDialog({
  open,
  onOpenChange,
  rooms,
  onCreated,
}: NewBookingDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NewBookingForm>({
    resolver: zodResolver(newBookingSchema),
    defaultValues: {
      guestName: "",
      email: "",
      phone: "",
      roomId: "",
      checkIn: todayKey(),
      checkOut: todayKey(),
      adults: 2,
    },
  });

  const watchRoomId = useWatch({ control, name: "roomId" });
  const checkIn = useWatch({ control, name: "checkIn" });
  const checkOut = useWatch({ control, name: "checkOut" });

  const availableRooms = useMemo(
    () => rooms.filter((r) => r.status !== "occupied" && r.status !== "maintenance"),
    [rooms],
  );

  const selectedRoom = useMemo(
    () => availableRooms.find((r) => r.id === watchRoomId),
    [availableRooms, watchRoomId],
  );

  const nights = useMemo(() => {
    if (!checkIn || !checkOut || checkOut <= checkIn) return 0;
    const ms = new Date(`${checkOut}T00:00:00`).getTime() - new Date(`${checkIn}T00:00:00`).getTime();
    return Math.floor(ms / 86_400_000);
  }, [checkIn, checkOut]);

  const total = nights > 0 && selectedRoom ? selectedRoom.baseRate * nights : 0;

  const onSubmit = (values: NewBookingForm) => {
    onCreated({
      guestName: values.guestName,
      email: values.email,
      phone: values.phone || undefined,
      roomId: values.roomId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      adults: values.adults,
    });
    toast.success("Booking created");
    reset();
    onOpenChange(false);
  };

  const inputClass = "border-line bg-sand focus-visible:border-gold/60 focus-visible:ring-gold/20";

  return (
    <Dialog open={open} onOpenChange={(next) => { if (!next) reset(); onOpenChange(next); }}>
      <DialogContent className="bg-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-lg text-forest-deep">
            New booking
          </DialogTitle>
          <DialogDescription>
            Create a direct reservation. It starts as <span className="font-medium text-gold-800">pending</span> until confirmed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="guestName" className="text-xs font-semibold text-ink-soft">
              Guest name
            </Label>
            <Input id="guestName" className={inputClass} placeholder="e.g. Farhan Ahmed" {...register("guestName")} />
            {errors.guestName ? (
              <p className="text-xs font-medium text-danger">{errors.guestName.message}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-semibold text-ink-soft">
                Email
              </Label>
              <Input id="email" className={inputClass} placeholder="guest@email.com" {...register("email")} />
              {errors.email ? (
                <p className="text-xs font-medium text-danger">{errors.email.message}</p>
              ) : null}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-xs font-semibold text-ink-soft">
                Phone <span className="font-normal text-caption">(optional)</span>
              </Label>
              <Input id="phone" className={inputClass} placeholder="+880 …" {...register("phone")} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="roomId" className="text-xs font-semibold text-ink-soft">
              Room
            </Label>
            <select
              id="roomId"
              className={cn(
                "h-9 w-full rounded-lg border border-line bg-sand px-2.5 text-sm text-ink outline-none transition-colors focus:border-gold/60 focus:ring-2 focus:ring-gold/20",
                !watchRoomId && "text-caption",
              )}
              {...register("roomId")}
            >
              <option value="" disabled>
                Select an available room…
              </option>
              {availableRooms.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.type} · {r.number} — {formatCurrency(r.baseRate)}/night
                </option>
              ))}
            </select>
            {errors.roomId ? (
              <p className="text-xs font-medium text-danger">{errors.roomId.message}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="checkIn" className="text-xs font-semibold text-ink-soft">
                Check-in
              </Label>
              <Input id="checkIn" type="date" className={inputClass} {...register("checkIn")} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="checkOut" className="text-xs font-semibold text-ink-soft">
                Check-out
              </Label>
              <Input id="checkOut" type="date" className={inputClass} {...register("checkOut")} />
            </div>
            {errors.checkOut ? (
              <p className="col-span-2 -mt-1 text-xs font-medium text-danger">{errors.checkOut.message}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="adults" className="text-xs font-semibold text-ink-soft">
                Adults
              </Label>
              <Input id="adults" type="number" min={1} max={8} className={inputClass} {...register("adults", { valueAsNumber: true })} />
              {errors.adults ? (
                <p className="text-xs font-medium text-danger">{errors.adults.message}</p>
              ) : null}
            </div>
            <div className="flex flex-col justify-end pb-1">
              <div className="flex items-baseline justify-between rounded-lg bg-gold-100/70 px-3 py-2">
                <span className="text-xs text-gold-800">
                  {nights} night{nights === 1 ? "" : "s"}
                </span>
                <span className="font-serif text-base font-bold text-forest-deep">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-forest text-cream hover:bg-forest-deep"
            >
              {isSubmitting ? <Loader2 size={15} className="animate-spin" /> : <CalendarPlus size={15} />}
              Create booking
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}