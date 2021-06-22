
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TasksController } from './tasks.controller'
import { TaskService } from './task.service'
import { TaskRepository } from './task.repository'
import { AuthModule } from '../auth/auth.module'
import { TranslatorService } from '../translator/translator.service'
import { TranslatorModule } from 'src/translator/translator.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskRepository]),
    TranslatorModule.forRoot(),
    AuthModule
  ],
  controllers: [TasksController],
  providers: [TaskService, TranslatorService]
})
export class TasksModule {}
