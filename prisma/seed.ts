import { prisma } from '../src/lib/prisma.js';
import { mockData } from '../src/data/mockData.js';

async function main() {
    // Users primero
    for (const user of mockData.users){
        const { goals, ...userRest } = user;

        const savedUser = await prisma.user.upsert({
            where: { username: user.username },
            update: {},
            create: userRest,
        });

        // Metas
        for (const goal of goals) {
            const { timeline, tasks, ...goalRest} = goal;

            const savedGoal = await prisma.goal.upsert({
                where: { title_userId: { title: goal.title, userId: savedUser.id } },
                update: {},
                create: {
                    ...goalRest,
                    timeline,
                    userId: savedUser.id,
                }
            })
            
            // Tareas
            for (const task of tasks) {
                const { timeline, ...taskRest } = task as any;
                await prisma.task.upsert({
                    // Clave compuesta unique (title, linkedGoalId) -> En prisma es title_linkedGoalId
                    where: { title_linkedGoalId: { title: task.title, linkedGoalId: savedGoal.id } },
                    update: {},
                    create: {
                        ...taskRest,
                        timeline: timeline || { startDate: task.startDate },
                        linkedGoalId: savedGoal.id,
                    },
                });      
            }
        }

        

    };

    console.log(`Seed OK: ${mockData.users.length} usuarios`);
};

main()
    .catch ((e) => {
        console.error('Error en el seed', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());