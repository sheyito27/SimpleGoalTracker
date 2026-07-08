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
  userId: string;
};

export enum Status {
  PENDING = 'PENDING',
  INACTIVE = 'INACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}

export type CreateTaskDTO = Omit<Task, 'id' | 'description'> & { description?: string };