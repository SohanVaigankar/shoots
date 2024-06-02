"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ERROR_MESSAGES, ERROR_TYPE } from "~/utils/errorData";

type ErrorBoundaryProps = {
  error: Error;
};

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { error } = props;
  const router = useRouter();

  if (ERROR_TYPE.UNAUTHORIZED === ERROR_TYPE[error.message]) {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div>{`${error.message}: ${ERROR_MESSAGES[error.message].message}`}</div>
      {ERROR_TYPE.UNAUTHORIZED === ERROR_TYPE[error.message] ? (
        <div>Please login to continue</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ErrorBoundary;
