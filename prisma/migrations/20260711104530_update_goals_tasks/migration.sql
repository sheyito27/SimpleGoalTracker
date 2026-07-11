-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "description" DROP DEFAULT;
