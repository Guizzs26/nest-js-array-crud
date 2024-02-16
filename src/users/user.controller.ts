import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { UserService, IUser } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  index(): IUser[] {
    return this.userService.findAll();
  }

  @Get(':id')
  show(@Param('id') id: string): IUser {
    const user = this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  store(@Body() newUser: IUser): IUser {
    return this.userService.create(newUser);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatedUser: IUser): IUser {
    const user = this.userService.update({ ...updatedUser, id });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Delete(':id')
  delete(@Param('id') id: string): IUser {
    const user = this.userService.delete(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
