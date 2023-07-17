import { MenuItem, TextField } from "@mui/material";
import { TextFieldStyles } from "../../../../styles/ItemAppendPage/TextFieldStyles";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import { UseFormReturn } from "react-hook-form";
import { ItemInformationInputFields } from "../../form/ItemInformationInputFields";
import { detailListsForTent } from "../../valueNameList/detailListsForTent";

interface formMethodsProps {
  formMethods: UseFormReturn<any>;
}

export const TentDatas = ({ formMethods }: formMethodsProps) => {
  return (
    <>
      <ItemInformationInputFields
        formMethods={formMethods}
        inputFormFieldsList={detailListsForTent()}
      />
      {/* <TextField
          id="capacity"
          label="収容人数"
          required
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              capacity: Number(event.target.value),
            })
          }
        />
        <TextField
          id="innerTent"
          label="インナーテント"
          required
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              innerTent: String(event.target.value),
            })
          }
        />
        <TextField
          id="grandSheet"
          label="グランドシート"
          required
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              grandSheet: String(event.target.value),
            })
          }
        />
        <Typography variant="body2">
          フライ:ポリエステル(耐水圧1,500mm)　インナー:ポリエステル　
          フロア:ポリエステル(耐水圧1,500mm)　ポール:FRP
        </Typography>
        <TextField
          id="fabrics"
          label="素材"
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              fabrics: [String(event.target.value)],
            })
          }
        /> */}
    </>
  );
};
