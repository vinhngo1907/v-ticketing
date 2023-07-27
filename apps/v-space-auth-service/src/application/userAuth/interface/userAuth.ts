export type UserAuth = {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone?: string;
    status: string;

    createdAt: number;
    updatedAt: number;
}

export type SignUpPayload = Omit<
    UserAuth,
    'id' | 'status' | 'createdAt' | 'updatedAt'
>;

export type UserAuthReponse = Omit<UserAuth, 'password'>;