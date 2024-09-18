import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BankTransferDetailsProps {
  transactionCode: string;
}

const BankTransferDetails: React.FC<BankTransferDetailsProps> = ({
  transactionCode,
}) => {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Bank Transfer Details</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Bank Name:</strong> Moniepoint
        </p>
        <p>
          <strong>Account Number:</strong> 6381944826
        </p>
        <p>
          <strong>Account Name:</strong> Fastfast Logistics Services
        </p>
        <p>
          <strong>Transaction Code:</strong> {transactionCode}
        </p>
        <p className="mt-2 text-sm bg-white dark:bg-gray-900 shadow-md rounded-lg transition-colors duration-200">
          Please use the transaction code as the reference when making the
          transfer.
        </p>
      </CardContent>
    </Card>
  );
};

export default BankTransferDetails;
