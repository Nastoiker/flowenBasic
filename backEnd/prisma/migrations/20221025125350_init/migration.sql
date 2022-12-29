CREATE TABLE "UserModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

CREATE TABLE "FirstLevelCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

CREATE TABLE "SecondLevelCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "firstLevelId" INTEGER NOT NULL,
    CONSTRAINT "SecondLevelCategory_firstLevelId_fkey" FOREIGN KEY ("firstLevelId") REFERENCES "FirstLevelCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "secondLevelCategoryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "TagId" INTEGER NOT NULL,
    "brandId" INTEGER NOT NULL,
    "modelDeviceId" INTEGER NOT NULL,
    CONSTRAINT "Product_secondLevelCategoryId_fkey" FOREIGN KEY ("secondLevelCategoryId") REFERENCES "SecondLevelCategory" ("name") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_modelDeviceId_fkey" FOREIGN KEY ("modelDeviceId") REFERENCES "ModelDevice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_TagId_fkey" FOREIGN KEY ("TagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "productId" INTEGER NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Order_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

CREATE TABLE "ModelDevice" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

CREATE TABLE "Comment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,
    "writtenById" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Comment_writtenById_fkey" FOREIGN KEY ("writtenById") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

CREATE UNIQUE INDEX "SecondLevelCategory_name_key" ON "SecondLevelCategory"("name");

CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
