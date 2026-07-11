import { Goal } from "../models/goalModel.js";
import { Task } from "../models/taskModel.js";
import { User } from "../models/userModel.js";
import { Status } from "../../generated/prisma/enums.js";

type SeedTask = Omit<Task, "id" | "linkedGoalId">;
type SeedGoal = Omit<Goal, "id" | "userId"> & { tasks: SeedTask[] };
type SeedUser = Omit<User, "id" | "createdAt"> & { goals: SeedGoal[] };

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
          status: Status.COMPLETED,
          categoryId: 1,
          tasks: [
            {
              title: "Crear tipos básicos",
              description: "Aprender tipos primitivos, uniones y literales",
              timeline: {
                startDate: new Date("2026-06-02"),
                endDate: new Date("2026-06-07")
              },
              status: Status.COMPLETED
            },
            {
              title: "Entender interfaces y types",
              description: "Diferencias entre interface y type alias",
              timeline: {
                startDate: new Date("2026-06-08"),
                endDate: new Date("2026-06-15")
              },
              status: Status.COMPLETED
            },
            {
              title: "Practicar con proyecto real",
              description: "Aplicar conocimientos en el proyecto goalApp",
              timeline: {
                startDate: new Date("2026-06-16"),
                endDate: new Date("2026-06-30")
              },
              status: Status.PENDING
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
          status: Status.PENDING,
          categoryId: 1,
          tasks: [
            {
              title: "Configurar Express y TS",
              description: "Setup del proyecto con TypeScript y Express",
              timeline: {
                startDate: new Date("2026-06-16"),
                endDate: new Date("2026-06-20")
              },
              status: Status.COMPLETED
            },
            {
              title: "Implementar repositorios",
              description: "Patrón Repository para acceso a datos",
              timeline: {
                startDate: new Date("2026-06-21"),
                endDate: new Date("2026-07-05")
              },
              status: Status.PAUSED
            },
            {
              title: "Agregar validación con Zod",
              description: "Validación de inputs en todos los endpoints",
              timeline: {
                startDate: new Date("2026-07-06"),
                endDate: new Date("2026-07-20")
              },
              status: Status.PENDING
            }
          ],
        },
        {
          title: "Aprender Prisma ORM",
          description: "Dominar el ORM para PostgreSQL",
          timeline: {
            startDate: new Date("2026-07-01"),
            endDate: new Date("2026-08-01")
          },
          status: Status.PENDING,
          categoryId: 1,
          tasks: [
            {
              title: "Configurar schema de Prisma",
              description: "Definir modelos y relaciones",
              timeline: {
                startDate: new Date("2026-07-01"),
                endDate: new Date("2026-07-07")
              },
              status: Status.COMPLETED
            },
            {
              title: "Practicar migraciones",
              description: "Crear y gestionar migraciones de la DB",
              timeline: {
                startDate: new Date("2026-07-08"),
                endDate: new Date("2026-07-15")
              },
              status: Status.PENDING
            },
            {
              title: "Integrar con Express",
              description: "Conectar Prisma con la API REST",
              timeline: {
                startDate: new Date("2026-07-16"),
                endDate: new Date("2026-07-31")
              },
              status: Status.INACTIVE
            }
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
          title: "Correr un medio maratón",
          description: "Preparación física para 21km",
          timeline: {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-09-01")
          },
          status: Status.PENDING,
          categoryId: 2,
          tasks: [
            {
              title: "Plan de entrenamiento semanal",
              description: "Crear rutina de 4 días por semana",
              timeline: {
                startDate: new Date("2026-06-01"),
                endDate: new Date("2026-06-07")
              },
              status: Status.COMPLETED
            },
            {
              title: "Comprar equipamiento",
              description: "Zapatillas de running y ropa deportiva",
              timeline: {
                startDate: new Date("2026-06-08"),
                endDate: new Date("2026-06-10")
              },
              status: Status.COMPLETED
            },
            {
              title: "Primera carrera de práctica",
              description: "Correr 5km para medir nivel base",
              timeline: {
                startDate: new Date("2026-06-15"),
                endDate: new Date("2026-06-15")
              },
              status: Status.PAUSED
            }
          ],
        },
        {
          title: "Leer 12 libros este año",
          description: "Meta de lectura anual",
          timeline: {
            startDate: new Date("2026-01-01"),
            endDate: new Date("2026-12-31")
          },
          status: Status.PENDING,
          categoryId: 3,
          tasks: [
            {
              title: "Elegir lista de libros",
              description: "Seleccionar 12 libros de diferentes géneros",
              timeline: {
                startDate: new Date("2026-01-01"),
                endDate: new Date("2026-01-15")
              },
              status: Status.COMPLETED
            },
            {
              title: "Leer libro mensual enero",
              description: "Completar primer libro del año",
              timeline: {
                startDate: new Date("2026-01-16"),
                endDate: new Date("2026-01-31")
              },
              status: Status.COMPLETED
            },
            {
              title: "Leer libro mensual febrero",
              description: "Completar segundo libro del año",
              timeline: {
                startDate: new Date("2026-02-01"),
                endDate: new Date("2026-02-28")
              },
              status: Status.REJECTED
            }
          ],
        },
        {
          title: "Aprender a cocinar 5 platos nuevos",
          description: "Ampliar repertorio culinario",
          timeline: {
            startDate: new Date("2026-05-01"),
            endDate: new Date("2026-08-01")
          },
          status: Status.PAUSED,
          categoryId: 4,
          tasks: [
            {
              title: "Investigar recetas",
              description: "Buscar 5 recetas interesantes para probar",
              timeline: {
                startDate: new Date("2026-05-01"),
                endDate: new Date("2026-05-07")
              },
              status: Status.COMPLETED
            },
            {
              title: "Cocinar pasta carbonara",
              description: "Primera receta: pasta alla carbonara auténtica",
              timeline: {
                startDate: new Date("2026-05-10"),
                endDate: new Date("2026-05-10")
              },
              status: Status.COMPLETED
            },
            {
              title: "Cocinar curry tailandés",
              description: "Segunda receta: curry verde con arroz",
              timeline: {
                startDate: new Date("2026-05-17"),
                endDate: new Date("2026-05-17")
              },
              status: Status.INACTIVE
            }
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
          title: "Obtener certificación AWS",
          description: "Certificar como Solutions Architect Associate",
          timeline: {
            startDate: new Date("2026-06-01"),
            endDate: new Date("2026-09-01")
          },
          status: Status.PENDING,
          categoryId: 1,
          tasks: [
            {
              title: "Comprar curso de preparación",
              description: "Adquirir curso en Udemy o similar",
              timeline: {
                startDate: new Date("2026-06-01"),
                endDate: new Date("2026-06-03")
              },
              status: Status.COMPLETED
            },
            {
              title: "Completar módulo de redes",
              description: "Estudiar VPC, subnets y security groups",
              timeline: {
                startDate: new Date("2026-06-04"),
                endDate: new Date("2026-06-20")
              },
              status: Status.PENDING
            },
            {
              title: "Hacer practice exams",
              description: "Resolver al menos 3 exámenes de práctica",
              timeline: {
                startDate: new Date("2026-07-01"),
                endDate: new Date("2026-07-15")
              },
              status: Status.PENDING
            }
          ],
        },
        {
          title: "Viajar a Japón",
          description: "Ahorro y planificación para viaje de 2 semanas",
          timeline: {
            startDate: new Date("2026-01-01"),
            endDate: new Date("2027-03-01")
          },
          status: Status.PENDING,
          categoryId: 5,
          tasks: [
            {
              title: "Definir presupuesto",
              description: "Calcular costos de vuelos, hotel y gastos",
              timeline: {
                startDate: new Date("2026-01-01"),
                endDate: new Date("2026-01-31")
              },
              status: Status.COMPLETED
            },
            {
              title: "Investurar visa y requisitos",
              description: "Verificar documentación necesaria para entry",
              timeline: {
                startDate: new Date("2026-02-01"),
                endDate: new Date("2026-02-15")
              },
              status: Status.COMPLETED
            },
            {
              title: "Reservar vuelos",
              description: "Comprar pasajes de avión ida y vuelta",
              timeline: {
                startDate: new Date("2026-06-01"),
                endDate: new Date("2026-06-30")
              },
              status: Status.PAUSED
            }
          ],
        },
        {
          title: "Estudiar inglés avanzado",
          description: "Alcanzar nivel C1 de inglés",
          timeline: {
            startDate: new Date("2026-03-01"),
            endDate: new Date("2026-12-31")
          },
          status: Status.PAUSED,
          categoryId: 6,
          tasks: [
            {
              title: "Hacer test de nivel",
              description: "Determinar nivel actual con examen oficial",
              timeline: {
                startDate: new Date("2026-03-01"),
                endDate: new Date("2026-03-05")
              },
              status: Status.COMPLETED
            },
            {
              title: "Inscribirse en academia",
              description: "Buscar academia con horarios flexibles",
              timeline: {
                startDate: new Date("2026-03-10"),
                endDate: new Date("2026-03-20")
              },
              status: Status.REJECTED
            },
            {
              title: "Practicar conversación semanal",
              description: "Sesiones de speaking con tutor online",
              timeline: {
                startDate: new Date("2026-04-01"),
                endDate: new Date("2026-12-31")
              },
              status: Status.INACTIVE
            }
          ],
        },
      ]
    }
  ],
};
