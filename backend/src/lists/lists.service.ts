import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto, UpdateListDto, CreateItemDto, UpdateItemDto } from './dto/lists.dto';

@Injectable()
export class ListsService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string) {
        const lists = await this.prisma.list.findMany({
            where: { userId },
            include: { items: { select: { id: true, completed: true } } },
            orderBy: { updatedAt: 'desc' },
        });

        return lists.map((list) => ({
            ...list,
            completed: list.items.filter((i) => i.completed).length,
            total: list.items.length,
            progress: list.items.length > 0
                ? Math.round((list.items.filter((i) => i.completed).length / list.items.length) * 100)
                : 0,
        }));
    }

    async findOne(id: string, userId: string) {
        const list = await this.prisma.list.findFirst({
            where: { id, userId },
            include: { items: { orderBy: [{ completed: 'asc' }, { order: 'asc' }, { createdAt: 'desc' }] } },
        });
        if (!list) throw new NotFoundException('List not found');

        const completed = list.items.filter((i) => i.completed).length;
        return { ...list, completed, total: list.items.length, progress: list.items.length > 0 ? Math.round((completed / list.items.length) * 100) : 0 };
    }

    async create(dto: CreateListDto, userId: string) {
        const list = await this.prisma.list.create({ data: { ...dto, userId } });

        await this.prisma.activity.create({
            data: { type: 'created_list', message: `Created "${list.title}"`, userId, listId: list.id },
        });

        return list;
    }

    async update(id: string, dto: UpdateListDto, userId: string) {
        const existing = await this.prisma.list.findFirst({ where: { id, userId } });
        if (!existing) throw new NotFoundException('List not found');
        return this.prisma.list.update({ where: { id }, data: dto });
    }

    async remove(id: string, userId: string) {
        const existing = await this.prisma.list.findFirst({ where: { id, userId } });
        if (!existing) throw new NotFoundException('List not found');
        await this.prisma.list.delete({ where: { id } });
    }

    // --- Items ---

    async addItem(listId: string, dto: CreateItemDto, userId: string) {
        const list = await this.prisma.list.findFirst({ where: { id: listId, userId } });
        if (!list) throw new NotFoundException('List not found');

        const count = await this.prisma.listItem.count({ where: { listId } });
        const item = await this.prisma.listItem.create({ data: { ...dto, listId, order: count } });

        await this.prisma.activity.create({
            data: { type: 'added_item', message: `Added "${item.text}" to "${list.title}"`, userId, listId },
        });

        return item;
    }

    async updateItem(listId: string, itemId: string, dto: UpdateItemDto, userId: string) {
        const list = await this.prisma.list.findFirst({ where: { id: listId, userId } });
        if (!list) throw new NotFoundException('List not found');

        const existing = await this.prisma.listItem.findFirst({ where: { id: itemId, listId } });
        if (!existing) throw new NotFoundException('Item not found');

        const updateData: any = { ...dto };
        if (dto.completed !== undefined && dto.completed !== existing.completed) {
            updateData.completedAt = dto.completed ? new Date() : null;
            updateData.completedBy = dto.completed ? userId : null;
        }

        const item = await this.prisma.listItem.update({ where: { id: itemId }, data: updateData });

        if (dto.completed && !existing.completed) {
            await this.prisma.activity.create({
                data: { type: 'completed_item', message: `Completed "${item.text}" in "${list.title}"`, userId, listId },
            });
        }

        return item;
    }

    async removeItem(listId: string, itemId: string, userId: string) {
        const list = await this.prisma.list.findFirst({ where: { id: listId, userId } });
        if (!list) throw new NotFoundException('List not found');

        const existing = await this.prisma.listItem.findFirst({ where: { id: itemId, listId } });
        if (!existing) throw new NotFoundException('Item not found');

        await this.prisma.listItem.delete({ where: { id: itemId } });
    }
}
