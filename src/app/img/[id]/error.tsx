"use client";
import React from "react";
import { ERROR_MESSAGES } from "~/utils/errorData";

type ErrorBoundaryProps = {
  error: Error;
};

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { error } = props;
  return (
    <div className="flex items-center justify-center">
      <div>{`${error.message}: ${ERROR_MESSAGES[error.message].message}`}</div>
    </div>
  );
};

export default ErrorBoundary;
