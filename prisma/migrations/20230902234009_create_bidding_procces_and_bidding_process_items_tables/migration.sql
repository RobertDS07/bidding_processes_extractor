-- CreateTable
CREATE TABLE "bidding_process" (
    "id" INTEGER NOT NULL,
    "identification" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "bidding_situation_code" INTEGER NOT NULL,
    "status_code" INTEGER NOT NULL,
    "bidding_start_date_time" TIMESTAMP(3) NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bidding_process_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biddin_process_item" (
    "bidding_process_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reference_value" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "paricipation_code" INTEGER NOT NULL,
    "code" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "biddin_process_item_pkey" PRIMARY KEY ("bidding_process_id","code")
);

-- AddForeignKey
ALTER TABLE "biddin_process_item" ADD CONSTRAINT "biddin_process_item_bidding_process_id_fkey" FOREIGN KEY ("bidding_process_id") REFERENCES "bidding_process"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
