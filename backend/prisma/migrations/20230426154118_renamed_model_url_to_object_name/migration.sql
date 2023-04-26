/*
  Warnings:

  - You are about to drop the column `url` on the `Model` table. All the data in the column will be lost.
  - Added the required column `objectName` to the `Model` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Model" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "objectName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Model" ("createdAt", "id", "name", "updatedAt", "version") SELECT "createdAt", "id", "name", "updatedAt", "version" FROM "Model";
DROP TABLE "Model";
ALTER TABLE "new_Model" RENAME TO "Model";
CREATE UNIQUE INDEX "Model_name_key" ON "Model"("name");
CREATE UNIQUE INDEX "Model_objectName_key" ON "Model"("objectName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
