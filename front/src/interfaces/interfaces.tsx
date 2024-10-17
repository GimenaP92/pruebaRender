export interface IUserRegister {
    email: string;
    password: string;
    phone: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IUserResponse {
    id: string;
    email: string;
    password: string;
    phone: string;
}
