import {PrismaClient, User} from '@prisma/client';
import {default as bcrypt} from 'bcryptjs';
import {StatusEnum as Status} from '../utils/statuses';
import {Users, UsersInput} from '../models/users';
import {NotFoundError, SecurityError} from '../utils/error.utils';

export async function findByEmail(email: string): Promise<User> {
  const users = new Users(new PrismaClient().user);
  const res = await users.findByEmail(email);
  if (res === null)
    throw new NotFoundError(`User with email ${email} not found`);
  return res;
}

export async function authorize(user: User, password: string): Promise<string> {
  if (await bcrypt.compare(password, user.password)) {
    return await Users.issueToken(user);
  } else {
    throw new SecurityError('Provided password is invalid');
  }
}

export async function register(req: UsersInput) {
  const users = new Users(new PrismaClient().user);

  const existingUser = await users.findByEmail(req.email.toLowerCase());
  if (existingUser) {
    return {
      code: Status.Conflict,
      message: 'User already exists, please login',
    };
  }
  return await users.create(req);
}
