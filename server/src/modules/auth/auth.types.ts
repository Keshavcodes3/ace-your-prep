export type RegisterInput = {
    name: string;
    email: string;
    password: string;
};

export type LoginInput = {
    email: string;
    password: string;
};

export type AuthResponse = {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
};

export type JwtPayload = {
    userId: string;
    email: string;
    role?: string;
};