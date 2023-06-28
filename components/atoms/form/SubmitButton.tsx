import { LoadingButton } from "@mui/lab";
import React from "react";

interface SubmitButtonProps {
  loading: boolean;
  onSubmit: () => void;
  text: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  onSubmit,
  text,
}) => {
  return (
    <LoadingButton
      type="submit"
      variant="outlined"
      loading={loading}
      sx={{ mt: 4 }}
      onClick={onSubmit}
    >
      {text}
    </LoadingButton>
  );
};
