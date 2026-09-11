export enum tagtypes {
    user = "user",
    room = "room",
}

export interface IMeta {
    limit: number;
    page: number;
    total: number;
}


export const tagtypeList = [tagtypes.user, tagtypes.room];