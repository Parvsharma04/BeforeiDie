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
}
