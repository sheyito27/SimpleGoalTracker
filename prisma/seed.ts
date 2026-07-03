import { prisma } from '../src/lib/prisma.js';
import { mockData } from '../src/data/mockData.js';

async function main() {
    // Metas primero
    for (const goal of mockData.goals){
        const { timeline, tasks, ...rest } = goal;

        // Upsert por la clave natural (title es unique) y capturar id generado
        const savedGoal = await prisma.goal.upsert({
            where: { title: goal.title},
            update: {},
            create: { ...rest, startDate: timeline.startDate, endDate: timeline.endDate },
        });
        
        // Tareas
        for (const task of tasks) {
            await prisma.task.upsert({
                // Clave compuesta unique (title, linkedGoalId) -> En prisma es title_linkedGoalId
                where: { title_linkedGoalId: { title: task.title, linkedGoalId: savedGoal.id } },
                update: {},
                create: { ...task, linkedGoalId: savedGoal.id },
            });      
        }

    };

    console.log(`Seed OK: ${mockData.goals.length} metas`);
};

main()
    .catch ((e) => {
        console.error('Error en el seed', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());