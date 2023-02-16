import { IUser } from "../../features/login/models/IUser";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}