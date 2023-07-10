import { Dispatch, SetStateAction } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { UseFormReturn, FieldError } from "react-hook-form";
import Chip from "@mui/material/Chip";

interface Props {
  name: string;
  text: string;
  formMethods: UseFormReturn<any>;
  items: string[];
}

export const Tags: React.FC<Props> = ({ name, text, formMethods, items }) => {
  const { register, setValue, watch } = formMethods;

  const selectedTags = Array.isArray(watch(name, [])) ? watch(name, []) : [];

  const handleChange = (event: SelectChangeEvent<typeof selectedTags>) => {
    const {
      target: { value },
    } = event;
    setValue(name, typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{text}</InputLabel>
      <Select
        id="demo-multiple-chip"
        multiple
        {...register(name)}
        value={selectedTags}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value: string) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {items.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
