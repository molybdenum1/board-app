import { Status } from 'src/status/entities/status.entity';
import { Task } from 'src/task/entities/task.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => Status, (status) => status.board)
  statuses: Status[];

  @OneToMany(() => Task, (task) => task.board)
  tasks: Task[];
}
