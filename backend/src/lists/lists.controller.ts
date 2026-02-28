import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, HttpCode } from '@nestjs/common';
import { ListsService } from './lists.service';
import { CreateListDto, UpdateListDto, CreateItemDto, UpdateItemDto } from './dto/lists.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('lists')
@UseGuards(JwtAuthGuard)
export class ListsController {
    constructor(private listsService: ListsService) { }

    @Get()
    findAll(@CurrentUser() user: { userId: string }) {
        return this.listsService.findAll(user.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
        return this.listsService.findOne(id, user.userId);
    }

    @Post()
    create(@Body() dto: CreateListDto, @CurrentUser() user: { userId: string }) {
        return this.listsService.create(dto, user.userId);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateListDto, @CurrentUser() user: { userId: string }) {
        return this.listsService.update(id, dto, user.userId);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string, @CurrentUser() user: { userId: string }) {
        return this.listsService.remove(id, user.userId);
    }

    // --- Items ---

    @Post(':id/items')
    addItem(@Param('id') id: string, @Body() dto: CreateItemDto, @CurrentUser() user: { userId: string }) {
        return this.listsService.addItem(id, dto, user.userId);
    }

    @Patch(':id/items/:itemId')
    updateItem(@Param('id') id: string, @Param('itemId') itemId: string, @Body() dto: UpdateItemDto, @CurrentUser() user: { userId: string }) {
        return this.listsService.updateItem(id, itemId, dto, user.userId);
    }

    @Delete(':id/items/:itemId')
    @HttpCode(204)
    removeItem(@Param('id') id: string, @Param('itemId') itemId: string, @CurrentUser() user: { userId: string }) {
        return this.listsService.removeItem(id, itemId, user.userId);
    }
}
