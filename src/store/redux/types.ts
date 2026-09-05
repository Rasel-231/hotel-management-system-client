export enum tagtypes {
    user = "user",
}

export interface IMeta {
    limit: number;
    page: number;
    total: number;
}


export const tagtypeList = [tagtypes.user];