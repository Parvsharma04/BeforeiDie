import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ListsModule } from './lists/lists.module';
import { UsersModule } from './users/users.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
    imports: [PrismaModule, AuthModule, ListsModule, UsersModule, ActivitiesModule],
})
export class AppModule { }
