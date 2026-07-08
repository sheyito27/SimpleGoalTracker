import { Goal } from "../models/goalModel.js";
import { Task } from "../models/taskModel.js";
import { User } from "../models/userModel.js";

type SeedTask = Omit<Task, "id" | "linkedGoalId">;
type SeedGoal = Omit<Goal, "id" | "userId"> & { tasks: SeedTask[] };
type SeedUser = Omit<User, "id" | "createdAt"> & { goals: SeedGoal[]}

export const mockData: { users: SeedUser[] } = {
  users: [
    {
      username: 'user1',
      passwordHash: 'futureHashPw',
      name: 'Nombre 1',
      email: 'email1@test.com',
      birthDate: new Date('2000-01-10'),
      isActive: true,
      goals: [
        {
          title: "Dominar TypeScript",
          description: "Aprender a usar tipos, interfaces y arquitectura",
          timeline: {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-07-01")
          },
          isCompleted: false,
          tasks: [
            {
              title: "Crear tipos básicos",
              description: "",
              startDate: new Date("2026-06-02"),
              isCompleted: true
            },
            {
              title: "Entender el repositorio",
              description: "",
              startDate: new Date("2026-06-16"),
              isCompleted: false
            }
          ],
        },
        {
          title: "Construir una API Profesional",
          description: "Implementar un backend con arquitectura limpia",
          timeline: {
            startDate: new Date("2026-06-15"),
            endDate: new Date("2026-08-15")
          },
          isCompleted: false,
          tasks: [
            {
              title: "Configurar Express y TS",
              description: "",
              startDate: new Date("2026-06-16"),
              isCompleted: false
            },
          ],
        },

      ]
    },
    {
      username: 'user2',
      passwordHash: 'futureHashPw',
      name: 'Nombre 2',
      email: 'email2@test.com',
      birthDate: new Date('2000-05-20'),
      isActive: true,
      goals: [
        {
          title: "Test Goal 1 User 2",
          description: "whatever",
          timeline: {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-07-01")
          },
          isCompleted: false,
          tasks: [
            {
              title: "Test Task 1",
              description: "",
              startDate: new Date("2026-06-02"),
              isCompleted: true
            },
            {
              title: "Test Task 2",
              description: "",
              startDate: new Date("2026-06-16"),
              isCompleted: false
            }
          ],
        },
        {
          title: "Test Goal 2 User 2",
          description: "...",
          timeline: {
            startDate: new Date("2026-06-15"),
            endDate: new Date("2026-08-15")
          },
          isCompleted: false,
          tasks: [
            {
              title: "Test Task 1",
              description: "",
              startDate: new Date("2026-06-16"),
              isCompleted: false
            },
          ],
        },

      ]
    },
    {
      username: 'user3',
      passwordHash: 'futureHashPw',
      name: 'Nombre 3',
      email: 'email3@test.com',
      birthDate: new Date('2000-12-02'),
      isActive: true,
      goals: [
        {
          title: "Test Goal 1 User 3",
          description: "...",
          timeline: {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-07-01")
          },
          isCompleted: false,
          tasks: [
            {
              title: "Test Task 1",
              description: "",
              startDate: new Date("2026-06-02"),
              isCompleted: true
            },
            {
              title: "Test Task 2",
              description: "",
              startDate: new Date("2026-06-16"),
              isCompleted: false
            }
          ],
        },
      ]
    }
  ],
};
