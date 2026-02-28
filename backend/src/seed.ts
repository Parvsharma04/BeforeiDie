import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seed() {
    console.log('🌱 Seeding database...');

    const hashedPassword = await bcrypt.hash('password123', 12);
    const user = await prisma.user.upsert({
        where: { email: 'demo@beforeidie.app' },
        update: {},
        create: {
            email: 'demo@beforeidie.app',
            name: 'Alex Johnson',
            password: hashedPassword,
            bio: 'Adventure seeker and dream chaser. Always looking for the next meaningful experience.',
        },
    });
    console.log(`✅ Created user: ${user.name} (${user.email})`);

    const travelList = await prisma.list.create({
        data: {
            title: 'World Adventures', description: 'Places that call to my soul', emoji: '🌍', category: 'travel', userId: user.id,
            items: {
                create: [
                    { text: 'Watch the sunrise at Machu Picchu', completed: true, completedAt: new Date('2024-11-26'), completedBy: 'You', priority: 'high', photo: true, notes: 'The most breathtaking moment of my life. The mist clearing to reveal the ancient city...', order: 0 },
                    { text: 'See the Northern Lights in Iceland', completed: false, priority: 'high', order: 1 },
                    { text: 'Walk through the Sahara at night', completed: true, completedAt: new Date('2024-09-15'), completedBy: 'You', priority: 'medium', photo: true, notes: 'The silence was deafening. Stars like dust.', order: 2 },
                    { text: 'Ride a train across Japan', completed: false, priority: 'low', order: 3 },
                    { text: 'Swim in the Blue Grotto, Capri', completed: false, priority: 'medium', order: 4 },
                ],
            },
        },
    });

    const learningList = await prisma.list.create({
        data: {
            title: 'Things to Learn', description: 'Growing never stops', emoji: '📚', category: 'learning', userId: user.id,
            items: {
                create: [
                    { text: 'Learn conversational Italian', completed: true, completedAt: new Date('2024-10-01'), completedBy: 'You', priority: 'high', notes: 'Parlo un po\' di italiano adesso!', order: 0 },
                    { text: 'Develop my own photographs', completed: true, completedAt: new Date('2024-08-15'), completedBy: 'You', priority: 'medium', order: 1 },
                    { text: 'Read 50 books in one year', completed: false, priority: 'medium', order: 2 },
                    { text: 'Learn to play piano', completed: false, priority: 'high', order: 3 },
                ],
            },
        },
    });

    const fitnessList = await prisma.list.create({
        data: {
            title: 'Physical Milestones', description: 'What my body can do', emoji: '🏔️', category: 'health', userId: user.id,
            items: {
                create: [
                    { text: 'Complete a half marathon', completed: true, completedAt: new Date('2024-12-10'), completedBy: 'You', priority: 'high', photo: true, notes: 'Crossing that finish line felt like crossing a threshold. I cried.', order: 0 },
                    { text: 'Climb a real mountain', completed: false, priority: 'medium', order: 1 },
                    { text: 'Swim in the open ocean', completed: true, completedAt: new Date('2024-07-30'), completedBy: 'You', priority: 'low', notes: 'Terrifying and freeing at the same time.', order: 2 },
                ],
            },
        },
    });

    console.log(`✅ Created 3 lists with items`);

    await prisma.activity.createMany({
        data: [
            { type: 'created_list', message: 'Created "World Adventures"', userId: user.id, listId: travelList.id },
            { type: 'completed_item', message: 'Completed "Watch the sunrise at Machu Picchu"', userId: user.id, listId: travelList.id },
            { type: 'created_list', message: 'Created "Things to Learn"', userId: user.id, listId: learningList.id },
            { type: 'completed_item', message: 'Completed "Complete a half marathon"', userId: user.id, listId: fitnessList.id },
        ],
    });

    console.log('✅ Created sample activities');
    console.log('\n🎉 Seed complete!');
    console.log('📧 Demo login: demo@beforeidie.app / password123');
}

seed()
    .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
    .finally(async () => { await prisma.$disconnect(); });
