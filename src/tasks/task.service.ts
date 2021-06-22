
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskStatus } from './task-status.enum'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskRepository } from './task.repository'
import { Task } from './task.entity'
import { User } from '../auth/user.entity'
import { TranslatorService } from 'src/translator/translator.service'
import { Translator } from 'src/translator/translator.decorator'

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(TaskRepository)
        private readonly taskRepository: TaskRepository,
        @Translator(TaskService.name) 
        private translatorService: TranslatorService
    ) {
        this.translatorService.translate('USER_ADDED_PRODUCT', { id: 1, username: 'Toon' })
    }

    public async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return await this.taskRepository.getTasks(filterDto, user)
    }

    public async getTaskById(id: number, user: User): Promise<Task> {
        
        const task: Task = await this.taskRepository.findOne({ where: { id, userId: user.id }})
    
        if (!task) {
            throw new NotFoundException(`Task with ID "${id}" not found!`)
        }

        return task
    }

    public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task: Task = await this.taskRepository.createTask(createTaskDto, user)
        return task
    }

    public async deleteTask(id: number, user: User): Promise<void> {
        
        const result = await this.taskRepository.delete({ id, userId: user.id })
        
        if (result.affected === 0) {
            throw new NotFoundException(`Task with ID "${id}" not found!`)
        }
    }

    public async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
        
        const task: Task = await this.getTaskById(id, user)
        task.status = status
        await task.save()

        return task
    }
}
