import { prisma } from '../src/lib/prisma.js';
import { mockData } from '../src/data/mockData.js';

async function main() {
    let totalGoals = 0;
    let totalTasks = 0;

    for (const userData of mockData.users) {
        const { goals, ...userRest } = userData;

        const savedUser = await prisma.user.upsert({
            where: { username: userRest.username },
            update: {},
            create: userRest,
        });

        for (const goalData of goals) {
            const { timeline, tasks, ...goalRest } = goalData;

            const savedGoal = await prisma.goal.upsert({
                where: { title_userId: { title: goalRest.title, userId: savedUser.id } },
                update: {},
                create: {
                    ...goalRest,
                    startDate: timeline.startDate,
                    endDate: timeline.endDate,
                    userId: savedUser.id,
                },
            });
            totalGoals++;

            for (const taskData of tasks) {
                const { timeline: taskTimeline, ...taskRest } = taskData;

                await prisma.task.upsert({
                    where: { title_linkedGoalId: { title: taskRest.title, linkedGoalId: savedGoal.id } },
                    update: {},
                    create: {
                        ...taskRest,
                        startDate: taskTimeline.startDate,
                        endDate: taskTimeline.endDate,
                        linkedGoalId: savedGoal.id,
                    },
                });
                totalTasks++;
            }
        }
    }

    console.log(`Seed OK: ${mockData.users.length} usuarios, ${totalGoals} metas, ${totalTasks} tareas`);
};

main()
    .catch((e) => {
        console.error('Error en el seed', e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
