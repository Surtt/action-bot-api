-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "startDay" TIMESTAMP(3) NOT NULL,
    "endDay" TIMESTAMP(3) NOT NULL,
    "city" TEXT NOT NULL,
    "tags" TEXT[],
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);
