import {PrismaClient, User} from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  validateOrReject,
} from 'class-validator';
import {hash} from 'bcryptjs';
import {Secret, sign} from 'jsonwebtoken';
import {GenericError, SecurityError} from '../utils/error.utils';

abstract class UserDtoBase {
  protected constructor() {}

  async validate<T extends UserDtoBase>(this: T) {
    await validateOrReject(this, {validationError: {target: false}});
  }
}

export class UsersInput extends UserDtoBase {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) {
    super();
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
  }
}

export class UsersLogin extends UserDtoBase {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}

export class Users {
  constructor(private readonly prismaUser: PrismaClient['user']) {}

  static async issueToken(user: User): Promise<string> {
    const email = user.email;
    try {
      return sign({user_id: user.id, email}, process.env.API_KEY as Secret, {
        expiresIn: '2d',
      });
    } catch (e) {
      throw new SecurityError(`Unable to generate token for ${email}`, e);
    }
  }

  async create(input: UsersInput) {
    try {
      const hashPassword = await hash(input.password, 10);
      return this.prismaUser.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: hashPassword,
        },
      });
    } catch (e) {
      throw new GenericError(String(e));
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prismaUser.findUnique({
      where: {
        email: email,
      },
    });
  }
}
