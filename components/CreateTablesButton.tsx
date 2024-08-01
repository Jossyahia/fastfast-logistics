"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CreateTablesButton = () => {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTables = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-tables", { method: "POST" });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.details || `HTTP error! status: ${response.status}`
        );
      }
      setStatus({ type: "success", message: data.message });
    } catch (error) {
      console.error("Error creating tables:", error);
      setStatus({
        type: "error",
        message: `Failed to create tables: ${error.message}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button onClick={handleCreateTables} disabled={isLoading}>
        {isLoading ? "Creating Tables..." : "Create Tables"}
      </Button>
      {status && (
        <Alert variant={status.type === "success" ? "default" : "destructive"}>
          <AlertTitle>
            {status.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default CreateTablesButton;
