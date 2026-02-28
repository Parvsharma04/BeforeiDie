import { Controller, Get, Post, Body, Query, Delete, Param, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('activities')
@UseGuards(JwtAuthGuard)
export class ActivitiesController {
    constructor(private activitiesService: ActivitiesService) { }

    @Get()
    findAll(
        @CurrentUser() user: { userId: string },
        @Query('limit') limit?: string,
        @Query('offset') offset?: string,
    ) {
        return this.activitiesService.findAll(
            user.userId,
            limit ? parseInt(limit) : 20,
            offset ? parseInt(offset) : 0,
        );
    }

    @Post('thought')
    createThought(
        @CurrentUser() user: { userId: string },
        @Body() dto: { text: string }
    ) {
        return this.activitiesService.createThought(user.userId, dto.text);
    }

    @Delete(':id')
    deleteActivity(
        @CurrentUser() user: { userId: string },
        @Param('id') id: string
    ) {
        return this.activitiesService.deleteActivity(user.userId, id);
    }
}
