
import { 
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    LoggerService,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common'
import { 
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse, 
    ApiNotFoundResponse, 
    ApiOkResponse, 
    ApiTags 
} from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from '../auth/get-user.decorator'
import { User } from '../auth/user.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto'
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'
import { TaskStatus } from './task-status.enum'
import { Task } from './task.entity'
import { TaskService } from './task.service'


@ApiBearerAuth()
@ApiTags(TasksController.apiRoute)
@ApiInternalServerErrorResponse({ 
    description: 'Internal server error' 
})
@ApiForbiddenResponse({ 
    description: 'Forbidden'
})
@Controller(TasksController.apiRoute)
@UseGuards(AuthGuard())
export class TasksController {

    public static readonly apiRoute: string = 'task'

    private readonly logger: LoggerService = new Logger(TasksController.name)
    
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Get('/all')
    @ApiOkResponse({
        description: 'Retrieved tasks successfully'
    })
    public getTasks(
        @Query(ValidationPipe) filterDto: GetTasksFilterDto,
        @GetUser() user: User
    ): Promise<Task[]> {

        this.logger.verbose(`
            User "${user.username}" retrieving all tasks. 
            Filters: ${JSON.stringify(filterDto)}
        `)

        return this.taskService.getTasks(filterDto, user)
    }

    @Get('/:id')
    @ApiOkResponse({
        description: 'Retrieved task by ID successfully'
    })
    @ApiNotFoundResponse({ 
        description: 'No task found for ID'
    })
    public getTaskById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.getTaskById(id, user)
    }

    @Post('/')
    @ApiCreatedResponse({
        description: 'The record has been successfully created.'
    })
    @UsePipes(ValidationPipe)
    public createTask(
        @Body() createTaskDto: CreateTaskDto,
        @GetUser() user: User
    ): Promise<Task> {

        this.logger.verbose(`
            User "${user.username}" creating a new task.
            Data: ${JSON.stringify(createTaskDto)}
        `)
        
        return this.taskService.createTask(createTaskDto, user)
    }

    @Delete('/:id')
    @ApiOkResponse({
        description: 'Removed tasks successfully'
    })
    public deleteTask(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<void> {
        return this.taskService.deleteTask(id, user)
    }

    @Patch('/:id/status')
    @ApiOkResponse({
        description: 'Status successfully set for task'
    })
    public updateTaskStatus(
        @Param('id', ParseIntPipe) id: number, 
        @Body('status', TaskStatusValidationPipe) status: TaskStatus,
        @GetUser() user: User
    ): Promise<Task> {
        return this.taskService.updateTaskStatus(id, status, user)
    }
}
