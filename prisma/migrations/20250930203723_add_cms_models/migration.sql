-- CreateTable
CREATE TABLE "public"."Project" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "services" TEXT[],
    "client" TEXT,
    "location" TEXT,
    "year" INTEGER,
    "coverImage" TEXT NOT NULL,
    "gallery" TEXT[],
    "videoUrl" TEXT,
    "metrics" JSONB,
    "status" "public"."ArticleStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "featuredAt" TIMESTAMP(3),
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "metaTitleEn" TEXT,
    "metaTitleAr" TEXT,
    "metaDescriptionEn" TEXT,
    "metaDescriptionAr" TEXT,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Testimonial" (
    "id" TEXT NOT NULL,
    "quoteEn" TEXT NOT NULL,
    "quoteAr" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorTitleEn" TEXT NOT NULL,
    "authorTitleAr" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyLogoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "projectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeamMember" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "roleEn" TEXT NOT NULL,
    "roleAr" TEXT NOT NULL,
    "bioEn" TEXT NOT NULL,
    "bioAr" TEXT NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "department" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Package" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameAr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionAr" TEXT NOT NULL,
    "services" TEXT[],
    "deliverables" TEXT[],
    "timeline" TEXT,
    "priceType" TEXT NOT NULL DEFAULT 'QUOTE',
    "price" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "highlightsEn" TEXT[],
    "highlightsAr" TEXT[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "metaTitleEn" TEXT,
    "metaTitleAr" TEXT,
    "metaDescriptionEn" TEXT,
    "metaDescriptionAr" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "public"."Project"("slug");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "public"."Project"("slug");

-- CreateIndex
CREATE INDEX "Project_status_idx" ON "public"."Project"("status");

-- CreateIndex
CREATE INDEX "Project_industry_idx" ON "public"."Project"("industry");

-- CreateIndex
CREATE INDEX "Project_publishedAt_idx" ON "public"."Project"("publishedAt");

-- CreateIndex
CREATE INDEX "Project_featured_idx" ON "public"."Project"("featured");

-- CreateIndex
CREATE INDEX "Testimonial_isActive_idx" ON "public"."Testimonial"("isActive");

-- CreateIndex
CREATE INDEX "Testimonial_featured_idx" ON "public"."Testimonial"("featured");

-- CreateIndex
CREATE INDEX "Testimonial_order_idx" ON "public"."Testimonial"("order");

-- CreateIndex
CREATE INDEX "TeamMember_isActive_idx" ON "public"."TeamMember"("isActive");

-- CreateIndex
CREATE INDEX "TeamMember_order_idx" ON "public"."TeamMember"("order");

-- CreateIndex
CREATE INDEX "TeamMember_department_idx" ON "public"."TeamMember"("department");

-- CreateIndex
CREATE UNIQUE INDEX "Package_slug_key" ON "public"."Package"("slug");

-- CreateIndex
CREATE INDEX "Package_slug_idx" ON "public"."Package"("slug");

-- CreateIndex
CREATE INDEX "Package_isActive_idx" ON "public"."Package"("isActive");

-- CreateIndex
CREATE INDEX "Package_featured_idx" ON "public"."Package"("featured");

-- CreateIndex
CREATE INDEX "Package_order_idx" ON "public"."Package"("order");
