-- CreateTable
CREATE TABLE "public"."Media" (
    "id" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicUrl" TEXT,
    "size" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "uploadedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Media_uploadedBy_idx" ON "public"."Media"("uploadedBy");

-- CreateIndex
CREATE INDEX "Media_mimeType_idx" ON "public"."Media"("mimeType");

-- CreateIndex
CREATE INDEX "Media_createdAt_idx" ON "public"."Media"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."Media" ADD CONSTRAINT "Media_uploadedBy_fkey" FOREIGN KEY ("uploadedBy") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
