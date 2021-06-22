
import { BadRequestException, PipeTransform } from '@nestjs/common'
import { TaskStatus } from '../task-status.enum'

export class TaskStatusValidationPipe implements PipeTransform {

    public transform(value: string): string {
        
        value = value.toUpperCase()
        const status: TaskStatus = TaskStatus[value]

        if (!status) {
            throw new BadRequestException(`"${value}" is an invalid status.`)
        }

        return value
    }
}
