import { PrismaClient, User } from '@prisma/client';
declare abstract class UserDtoBase {
    protected constructor();
    validate<T extends UserDtoBase>(this: T): Promise<void>;
}
export declare class UsersInput extends UserDtoBase {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    constructor(firstName: string, lastName: string, email: string, password: string);
}
export declare class UsersLogin extends UserDtoBase {
    email: string;
    password: string;
    constructor(email: string, password: string);
}
export declare class Users {
    private readonly prismaUser;
    constructor(prismaUser: PrismaClient['user']);
    static issueToken(user: User): Promise<string>;
    create(input: UsersInput): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }>;
    findByEmail(email: string): Promise<User | null>;
}
export {};
