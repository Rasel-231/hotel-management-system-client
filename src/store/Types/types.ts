export interface LoginResponse {
    success: boolean;
    data: {
        accessToken: string;
        user: IUserResponse;
    };
}

export type UserRole = "Admin" | "Seller" | "User";

export interface LoginData {
    email?: string;
    password?: string;
    [key: string]: unknown;
}
export interface IUserApiResponse {
    data?: IUserResponse;
    success?: boolean;
    message?: string;
}
export interface IRoom {
    id: string;
    type: string;
    price: number;
    basePrice?: number | null;
    capacity: number;
    bedConfig?: string | null;
    quantity: number;
}

export interface IRoomsResponse {
    success: boolean;
    message?: string;
    data: IRoom[];
}
export interface RegistrationData {
    name: string;
    email: string;
    contactNumber: string;
    password: string;
    [key: string]: unknown;
}
export interface ITimer {
    deadline: string;
}

export interface IUserResponse {
    length?: number;
    id: string;
    name: string;
    email: string;
    contactNumber: string;
    role: UserRole;
    address?: string;
    admin?: {
        id: string;
        profilePhoto: string | null;
    };
    seller?: {
        id: string;
        profilePhoto: string | null;
        shopName: string | null;
        shopSlug: string | null;
    };
}