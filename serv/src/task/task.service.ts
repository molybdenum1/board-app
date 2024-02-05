import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(taskDto: CreateTaskDto): Promise<Task> {
    return await this.taskRepository.create(taskDto);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, taskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return this.taskRepository.save({ ...task, ...taskDto });
  }

  async remove(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}
