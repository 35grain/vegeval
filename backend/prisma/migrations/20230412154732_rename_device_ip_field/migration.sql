/*
  Warnings:

  - You are about to drop the column `lastIp` on the `EdgeDevice` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_EdgeDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "modelId" INTEGER,
    "clientId" INTEGER NOT NULL,
    "ip" TEXT,
    "lastSeen" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "EdgeDevice_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "EdgeDevice_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_EdgeDevice" ("apiKey", "clientId", "createdAt", "id", "label", "lastSeen", "modelId", "updatedAt") SELECT "apiKey", "clientId", "createdAt", "id", "label", "lastSeen", "modelId", "updatedAt" FROM "EdgeDevice";
DROP TABLE "EdgeDevice";
ALTER TABLE "new_EdgeDevice" RENAME TO "EdgeDevice";
CREATE UNIQUE INDEX "EdgeDevice_apiKey_key" ON "EdgeDevice"("apiKey");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
