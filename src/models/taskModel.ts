import { Status } from '../../generated/prisma/enums.js';

export type Task = {
  id: string;
  linkedGoalId: string;
  title: string;
  description: string;
  timeline: {
    startDate: Date;
    endDate: Date;
  }
  status: Status;
};

export type CreateTaskDTO = Omit<Task, 'id' | 'description' | 'timeline'> & {
  description?: string;
  startDate: Date;
  endDate: Date;
};
