import {
    Controller,
    Get,
    Param,
    Put,
    Body,
    Delete,
    UseGuards,
    UseInterceptors,
    UsePipes,
    Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { ZodValidationPipe } from '../../shared/pipe/zod-validation.pipe';
import { UpdateUserDto, updateUserSchema } from '../dto/update-user.dto';

@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers(@Query('role') role?: 'admin' | 'user') {
        return this.userService.getAllUsers(role);
    }


    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        return this.userService.getUserById(userId);
    }

    @Put(':userId')
    async updateUser(
        @Param('userId') userId: string,
        @Body() updateData: UpdateUserDto, // use o tipo correto
    ) {
        console.log('Payload recebido:', updateData);
        return this.userService.updateUser(userId, updateData);
    }


    @Delete(':userId')
    async deleteUser(@Param('userId') userId: string) {
        return this.userService.deleteUser(userId);
    }
}
