-- CreateTable
CREATE TABLE "UserModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "FirstLevelCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "SecondLevelCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL,
    "firstLevelId" TEXT NOT NULL,
    CONSTRAINT "SecondLevelCategory_firstLevelId_fkey" FOREIGN KEY ("firstLevelId") REFERENCES "FirstLevelCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "TagId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "modelDeviceId" TEXT NOT NULL,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_modelDeviceId_fkey" FOREIGN KEY ("modelDeviceId") REFERENCES "ModelDevice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_TagId_fkey" FOREIGN KEY ("TagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "delivered" BOOLEAN NOT NULL DEFAULT false,
    "productId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    CONSTRAINT "Order_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BrandOnSecondCategory" (
    "brandId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    PRIMARY KEY ("brandId", "categoryId"),
    CONSTRAINT "BrandOnSecondCategory_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BrandOnSecondCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "SecondLevelCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ModelDevice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comment" TEXT NOT NULL,
    "writtenById" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    CONSTRAINT "Comment_writtenById_fkey" FOREIGN KEY ("writtenById") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SecondLevelCategory_name_key" ON "SecondLevelCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_modelDeviceId_key" ON "Product"("modelDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
