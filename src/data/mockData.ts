import { Goal } from "../models/goalModel.js";
import { Task } from "../models/taskModel.js";

type SeedTask = Omit<Task, "id" | "linkedGoalId">;
type SeedGoal = Omit<Goal, "id"> & { tasks: SeedTask[] };

export const mockData: { goals: SeedGoal[] } = {
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
  ],
};
