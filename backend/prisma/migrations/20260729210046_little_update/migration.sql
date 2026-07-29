/*
  Warnings:

  - Added the required column `age` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "age" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0;
