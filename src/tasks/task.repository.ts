
import { InternalServerErrorException, Logger } from '@nestjs/common'
import { User } from '../auth/user.entity'
import { EntityRepository, Repository } from 'typeorm'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'


@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    private readonly logger = new Logger(TaskRepository.name)

    public async getTasks(
        getTasksFilterDto: GetTasksFilterDto, 
        user: User
    ): Promise<Task[]> {
        
        const { status, search } = getTasksFilterDto
        const query = this.createQueryBuilder('task')
        
        // get all task owned by current user
        query.where('task.userId = :userId', { userId: user.id })

        if (status) {
            query.andWhere('task.status = :status', { status })
        }

        if (search) {
            query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: `%${search}%` })
        }

        try {
            return await query.getMany()
        }
        catch(error) {

            this.logger.error(`
                Failed to get tasks for user ${user.username}.
                DTO: ${JSON.stringify(getTasksFilterDto)}
            `, error.stack)

            throw new InternalServerErrorException()
        }
    }

    public async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        
        const { title, description } = createTaskDto
        const task = new Task()
        
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        task.user = user
        
        try {
            await task.save()
        }
        catch(error) {

            this.logger.error(`
                Failed to create task for user ${user.username}.
                DTO: ${JSON.stringify(createTaskDto)}.
            `, error.stack)
            
            throw new InternalServerErrorException()
        }
        
        delete task.user
        return task
    }
}