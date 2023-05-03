import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma } from '@prisma/client';
import { RegisterUserDto } from 'src/dto/register-user.dto';
import * as bcrypt from 'bcrypt';

export interface UserWithoutPassword {
  id: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

const userWithoutPassword = {
  id: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async getUser(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<UserWithoutPassword | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
      select: userWithoutPassword,
    });
  }

  async getUserLogin(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserWithoutPassword[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      select: userWithoutPassword,
    });
  }

  async createUser(user: RegisterUserDto): Promise<UserWithoutPassword> {
    if (await this.getUser({ email: user.username })) {
      throw new ConflictException('User with provided email already exists!');
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    return this.prisma.user.create({
      data: {
        email: user.username,
        password: hash,
      },
      select: userWithoutPassword,
    });
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ): Promise<UserWithoutPassword> {
    return this.prisma.user.update({
      data,
      where,
      select: userWithoutPassword,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }

  async getUsersCount(): Promise<number> {
    return this.prisma.user.count();
  }
}
