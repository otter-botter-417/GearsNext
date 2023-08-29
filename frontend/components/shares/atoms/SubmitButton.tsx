import React from "react";
import { LoadingButton } from "@mui/lab";

interface SubmitButtonProps {
  loading: boolean;
  text: string;
  type?: "submit" | "button"; // Add this line
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  text,
  type = "submit", // Set default value
}) => {
  return (
    <LoadingButton
      type={type} // Use it here
      variant="outlined"
      loading={loading}
      sx={{ mt: 4 }}
    >
      {text}
    </LoadingButton>
  );
};
