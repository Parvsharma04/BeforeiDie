import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto, ChangePasswordDto } from './dto/users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true, email: true, name: true, bio: true, avatar: true, createdAt: true,
                _count: { select: { lists: true, activities: true } },
            },
        });
        if (!user) throw new NotFoundException('User not found');

        const [totalItems, completedItems] = await Promise.all([
            this.prisma.listItem.count({ where: { list: { userId } } }),
            this.prisma.listItem.count({ where: { list: { userId }, completed: true } }),
        ]);

        return {
            ...user,
            stats: {
                totalLists: user._count.lists,
                totalGoals: totalItems,
                completedGoals: completedItems,
                completionRate: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0,
            },
        };
    }

    async updateProfile(userId: string, dto: UpdateProfileDto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: dto,
            select: { id: true, email: true, name: true, bio: true, avatar: true },
        });
    }

    async changePassword(userId: string, dto: ChangePasswordDto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new NotFoundException('User not found');

        const valid = await bcrypt.compare(dto.currentPassword, user.password);
        if (!valid) throw new BadRequestException('Current password is incorrect');

        const hashed = await bcrypt.hash(dto.newPassword, 12);
        await this.prisma.user.update({ where: { id: userId }, data: { password: hashed } });
        return { message: 'Password changed successfully' };
    }

    async getStats(userId: string) {
        const [totalLists, totalItems, completedItems] = await Promise.all([
            this.prisma.list.count({ where: { userId } }),
            this.prisma.listItem.count({ where: { list: { userId } } }),
            this.prisma.listItem.count({ where: { list: { userId }, completed: true } }),
        ]);

        const lists = await this.prisma.list.findMany({
            where: { userId },
            select: { category: true, items: { select: { completed: true } } },
        });

        const categoryBreakdown = lists.reduce((acc: Record<string, { total: number; completed: number }>, list) => {
            const cat = list.category || 'general';
            if (!acc[cat]) acc[cat] = { total: 0, completed: 0 };
            acc[cat].total += list.items.length;
            acc[cat].completed += list.items.filter((i) => i.completed).length;
            return acc;
        }, {});

        return { totalLists, totalGoals: totalItems, completedGoals: completedItems, completionRate: totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0, categoryBreakdown };
    }

    async getMemories(userId: string) {
        return this.prisma.listItem.findMany({
            where: { list: { userId }, completed: true },
            include: { list: { select: { id: true, title: true, emoji: true } } },
            orderBy: { completedAt: 'desc' },
        });
    }
}
