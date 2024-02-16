import { Injectable, NotFoundException } from '@nestjs/common';

export interface IUser {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
}

@Injectable()
export class UserService {
  private users: IUser[] = [];

  findAll(): IUser[] {
    return this.users;
  }

  findById(id: string): IUser | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(newUser: IUser): IUser {
    const createdUser: IUser = { ...newUser };

    this.users.push(createdUser);

    return createdUser;
  }

  update(updatedUser: IUser): IUser {
    const index = this.users.findIndex((user) => user.id === updatedUser.id);

    if (index !== -1) {
      const updatedUserData: IUser = { ...this.users[index], ...updatedUser };

      this.users[index] = updatedUserData;

      return updatedUserData;
    } else {
      throw new NotFoundException('User not found');
    }
  }

  delete(id: string): IUser {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      const deletedUser: IUser = this.users[index];

      this.users.splice(index, 1);

      return deletedUser;
    } else {
      throw new NotFoundException('User not found');
    }
  }
}
