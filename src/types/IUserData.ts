export interface IUserData {
    user: IUser;
}
export interface IUser {
    _id: string;
    email: string;
    token: string;
    createdAt: string;
    updatedAt: string;
}