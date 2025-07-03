/*
  Warnings:

  - You are about to drop the `_TecnologiaToTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_TecnologiaToTemplate" DROP CONSTRAINT "_TecnologiaToTemplate_A_fkey";

-- DropForeignKey
ALTER TABLE "_TecnologiaToTemplate" DROP CONSTRAINT "_TecnologiaToTemplate_B_fkey";

-- DropTable
DROP TABLE "_TecnologiaToTemplate";

-- CreateTable
CREATE TABLE "_TemplateTecnologias" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_TemplateTecnologias_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_TemplateTecnologias_B_index" ON "_TemplateTecnologias"("B");

-- AddForeignKey
ALTER TABLE "_TemplateTecnologias" ADD CONSTRAINT "_TemplateTecnologias_A_fkey" FOREIGN KEY ("A") REFERENCES "Tecnologia"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TemplateTecnologias" ADD CONSTRAINT "_TemplateTecnologias_B_fkey" FOREIGN KEY ("B") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;
