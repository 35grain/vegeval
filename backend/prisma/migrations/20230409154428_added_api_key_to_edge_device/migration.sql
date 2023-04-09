/*
  Warnings:

  - Added the required column `apiKey` to the `EdgeDevice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EdgeDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "modelId" INTEGER,
    "clientId" INTEGER NOT NULL,
    "lastIp" TEXT,
    "lastSeen" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EdgeDevice_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EdgeDevice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EdgeDevice" ("clientId", "createdAt", "id", "label", "lastIp", "lastSeen", "modelId", "updatedAt") SELECT "clientId", "createdAt", "id", "label", "lastIp", "lastSeen", "modelId", "updatedAt" FROM "EdgeDevice";
DROP TABLE "EdgeDevice";
ALTER TABLE "new_EdgeDevice" RENAME TO "EdgeDevice";
CREATE UNIQUE INDEX "EdgeDevice_apiKey_key" ON "EdgeDevice"("apiKey");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
