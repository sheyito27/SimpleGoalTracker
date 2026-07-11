import { Status } from '../../generated/prisma/enums.js';

export type Goal = {
  id: string;
  title: string;
  description: string;
  timeline: {
    startDate: Date,
    endDate: Date
  }
  status: Status;
  userId: string;
  categoryId: number | null;
};


