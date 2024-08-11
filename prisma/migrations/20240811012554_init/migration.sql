/*
  Warnings:

  - Added the required column `deliveryPhoneNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupPhoneNumber` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `route` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "deliveryPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "pickupPhoneNumber" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "route" TEXT NOT NULL;
