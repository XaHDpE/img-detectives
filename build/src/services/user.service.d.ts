import { User } from '@prisma/client';
import { StatusEnum as Status } from '../utils/statuses';
import { UsersInput } from '../models/users';
export declare function findByEmail(email: string): Promise<User>;
export declare function authorize(user: User, password: string): Promise<string>;
export declare function register(req: UsersInput): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
} | {
    code: Status;
    message: string;
}>;
