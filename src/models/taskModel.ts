export type Task = {
  id: string;
  linkedGoalId: string;
  title: string;
  description: string;
  startDate: Date;
  isCompleted: boolean;
};
