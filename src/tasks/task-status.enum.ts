
export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export const TaskStatusValues = () => Object.values(TaskStatus)