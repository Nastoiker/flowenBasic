-- CreateTable
CREATE TABLE "UserModel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "phone" TEXT,
    "hashpassword" TEXT NOT NULL,
    "avatar" TEXT
);

-- CreateTable
CREATE TABLE "FirstLevelCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "alias" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "street" TEXT NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
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
CREATE TABLE "BoughtProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "delivered" BOOLEAN NOT NULL,
    "updated_at" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "finnalyPrice" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "BoughtProduct_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "buying" BOOLEAN NOT NULL,
    "productId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "boughtProductId" TEXT,
    "quantity" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Basket_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Basket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Basket_boughtProductId_fkey" FOREIGN KEY ("boughtProductId") REFERENCES "BoughtProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "oldPrice" INTEGER,
    "TagId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "Color" TEXT,
    "Description" TEXT,
    "image" TEXT,
    "Memory" INTEGER,
    "Ram" INTEGER,
    "modelDeviceId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Product_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_modelDeviceId_fkey" FOREIGN KEY ("modelDeviceId") REFERENCES "ModelDevice" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_TagId_fkey" FOREIGN KEY ("TagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
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
    "name" TEXT NOT NULL,
    "secondCategoryId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    CONSTRAINT "ModelDevice_secondCategoryId_fkey" FOREIGN KEY ("secondCategoryId") REFERENCES "SecondLevelCategory" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION,
    CONSTRAINT "ModelDevice_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "pictures" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "writtenById" TEXT NOT NULL,
    "modelDeviceId" TEXT NOT NULL,
    CONSTRAINT "Comment_writtenById_fkey" FOREIGN KEY ("writtenById") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_modelDeviceId_fkey" FOREIGN KEY ("modelDeviceId") REFERENCES "ModelDevice" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "number" INTEGER NOT NULL,
    "writtenById" TEXT NOT NULL,
    "modelDeviceId" TEXT NOT NULL,
    CONSTRAINT "Rating_writtenById_fkey" FOREIGN KEY ("writtenById") REFERENCES "UserModel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Rating_modelDeviceId_fkey" FOREIGN KEY ("modelDeviceId") REFERENCES "ModelDevice" ("id") ON DELETE RESTRICT ON UPDATE NO ACTION
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_userId_key" ON "Address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SecondLevelCategory_name_key" ON "SecondLevelCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_modelDeviceId_key" ON "Product"("modelDeviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");
