import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivitiesService {
    constructor(private prisma: PrismaService) { }

    async findAll(userId: string, limit = 20, offset = 0) {
        const [activities, total] = await Promise.all([
            this.prisma.activity.findMany({
                where: { userId },
                include: { list: { select: { id: true, title: true, emoji: true } } },
                orderBy: { createdAt: 'desc' },
                take: Math.min(limit, 100),
                skip: offset,
            }),
            this.prisma.activity.count({ where: { userId } }),
        ]);
        return { activities, total, limit, offset };
    }

    async createThought(userId: string, text: string) {
        return this.prisma.activity.create({
            data: {
                userId,
                type: 'thought',
                message: text,
            }
        });
    }

    async deleteActivity(userId: string, id: string) {
        // Find first to ensure ownership
        const activity = await this.prisma.activity.findUnique({ where: { id } });
        if (!activity || activity.userId !== userId) {
            throw new Error('Activity not found or unauthorized');
        }
        return this.prisma.activity.delete({ where: { id } });
    }
}
