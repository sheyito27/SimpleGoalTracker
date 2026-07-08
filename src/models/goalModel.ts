export type Goal = {
  id: string;
  title: string;
  description: string;
  timeline: {
    startDate: Date;
    endDate: Date;
  };
  status: Status;
  userId: string;
  categoryId: number;
};

export enum Status {
  PENDING = 'PENDING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}