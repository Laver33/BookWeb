/*
  Warnings:

  - Added the required column `hashed_password` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "hashed_password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "price" DOUBLE PRECISION;
