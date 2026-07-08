export type Goal = {
  id: string;
  title: string;
  description: string;
  timeline: {
    startDate: Date;
    endDate: Date;
  };
  isCompleted: boolean;
};

export enum Status {
  PENDING = 'PENDING',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED'
}