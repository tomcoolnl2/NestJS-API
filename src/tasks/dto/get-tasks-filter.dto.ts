
import { IsIn, IsOptional } from 'class-validator'
import { TaskStatus, TaskStatusValues } from '../task-status.enum'


export class GetTasksFilterDto {
    
    @IsOptional()
    @IsIn(TaskStatusValues())
    public status: TaskStatus
    
    @IsOptional() 
    public search: string
}