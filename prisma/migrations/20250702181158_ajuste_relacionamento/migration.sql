/*
  Warnings:

  - You are about to drop the `_CompraToTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CompraToTemplate" DROP CONSTRAINT "_CompraToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompraToTemplate" DROP CONSTRAINT "_CompraToTemplate_B_fkey";

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "compraId" INTEGER;

-- DropTable
DROP TABLE "_CompraToTemplate";

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_compraId_fkey" FOREIGN KEY ("compraId") REFERENCES "Compra"("id") ON DELETE SET NULL ON UPDATE CASCADE;
