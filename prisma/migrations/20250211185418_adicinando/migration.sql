-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "imagemURL" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
