
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';


const mockUser = { id: 12, username: 'Test user' }

const mockTask: CreateTaskDto = { title: 'Test title', description: 'test desc' }

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn()
})

describe('TaskService', () => {
    
    let taskService
    let taskRepository

    beforeEach(async () => {
        
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TaskService,
                { provide: TaskRepository, useFactory: mockTaskRepository }
            ]
        }).compile()

        taskService = module.get<TaskService>(TaskService)
        taskRepository = module.get<TaskRepository>(TaskRepository)
    })

    describe('getTasks', () => {
        it('gets all tasks from the repository', async () => {

            const tasks = [mockTask]

            taskRepository.getTasks.mockResolvedValue(tasks)
            expect(taskRepository.getTasks).not.toHaveBeenCalled()

            const filters: GetTasksFilterDto = { status: TaskStatus.IN_PROGRESS, search: 'Some query' }
            const result = await taskService.getTasks(filters, mockUser)           
            expect(taskRepository.getTasks).toHaveBeenCalled()
            expect(result).toEqual(tasks)
        })
    })

    describe('getTaskById', () => {

        it('calls taskRepository.findOne and succesfully retrieve and return the task', async () => {
            
            taskRepository.findOne.mockResolvedValue(mockTask)

            const result = await taskService.getTaskById(1, mockUser)
            expect(result).toEqual(mockTask)

            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: { id: 1, userId: mockUser.id }
            })
        })

        it('throws an error if task is not found', () => {

            taskRepository.findOne.mockResolvedValue(null)
            expect(taskService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException)
        })
    })


    describe('createTask', () => {
        
        it('creates a task through the repository', async () => {

            taskRepository.createTask.mockResolvedValue(mockTask, mockUser)
            
            expect(taskRepository.createTask).not.toHaveBeenCalled()
            const result = await taskService.createTask(mockTask, mockUser)

            expect(taskRepository.createTask).toHaveBeenCalledWith(mockTask, mockUser)
            expect(result).toEqual(mockTask)
        })
    })


    describe('deleteTask', () => {

        it('calls taskRepository.deleteTask() to delete a task', async () => {
            
            taskRepository.delete.mockResolvedValue({ affected: 1 })
            expect(taskRepository.delete).not.toHaveBeenCalled()
            
            await taskService.deleteTask(1, mockUser)
            expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id })
        })

        it('throws an error as task could not be found', async () => {

            taskRepository.delete.mockResolvedValue({ affected: 0 })
            expect(taskService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException)
        })
    })

    describe('updateTaskStatus', () => {

        it('updates task status', async () => {
            
            const save = jest.fn().mockResolvedValue(true)
            
            taskService.getTaskById = jest.fn().mockResolvedValue({
                status: TaskStatus.OPEN,
                save
            })

            expect(taskService.getTaskById).not.toHaveBeenCalled()

            const result = await taskService.updateTaskStatus(1, TaskStatus.DONE)
            expect(taskService.getTaskById).toHaveBeenCalled()
            expect(save).toHaveBeenCalled()
            expect(result.status).toBe(TaskStatus.DONE)
        })
    })
})