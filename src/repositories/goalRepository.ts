import { mockData } from '../data/mockData.js';
import { Goal } from '../models/goalModel.js';
import { createRepository } from './repository.js';

const goals = mockData["goals"];

export const goalRepository = createRepository<Goal>([]);