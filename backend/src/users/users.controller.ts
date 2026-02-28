import { Controller, Get, Patch, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/users.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('profile')
    getProfile(@CurrentUser() user: { userId: string }) {
        return this.usersService.getProfile(user.userId);
    }

    @Patch('profile')
    updateProfile(@Body() dto: UpdateProfileDto, @CurrentUser() user: { userId: string }) {
        return this.usersService.updateProfile(user.userId, dto);
    }

    @Post('change-password')
    changePassword(@Body() dto: ChangePasswordDto, @CurrentUser() user: { userId: string }) {
        return this.usersService.changePassword(user.userId, dto);
    }

    @Get('stats')
    getStats(@CurrentUser() user: { userId: string }) {
        return this.usersService.getStats(user.userId);
    }

    @Get('memories')
    getMemories(@CurrentUser() user: { userId: string }) {
        return this.usersService.getMemories(user.userId);
    }
}
