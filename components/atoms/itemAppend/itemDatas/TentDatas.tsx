import { MenuItem, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TextFieldStyles } from "../../../../styles/ItemAppendPage/TextFieldStyles";
import { Dispatch, SetStateAction } from "react";
import { Box } from "@mui/system";

interface Props {
  abilitys: {
    subCategorys: string;
    openSize: {
      wide: number;
      depth: number;
      high: number;
    };
    storageSize: {
      wide: number;
      depth: number;
      high: number;
    };
    weight: number;
    capacity: number;
    innerTent: string;
    grandSheet: string;
    accessories: string[];
  };
  setAbilitys: Dispatch<
    SetStateAction<{
      subCategorys: string;
      openSize: {
        wide: number;
        depth: number;
        high: number;
      };
      storageSize: {
        wide: number;
        depth: number;
        high: number;
      };
      weight: number;
      capacity: number;
      innerTent: string;
      grandSheet: string;
      accessories: string[];
    }>
  >;
}
const subCategory = [
  "ドームテント",
  "ティピーテント",
  "パップテント",
  "ワンポールテント",
  "ロッジテント",
  "ツールームテント",
];

export const TentDatas = ({ abilitys, setAbilitys }: Props) => {
  const [subCategoryValue, setSubCategoryValue] = useState(""); // valueをstateで管理
  const handleSetAbilitys = useCallback(
    (newAbilitys: Props["abilitys"]) => {
      setAbilitys(newAbilitys);
    },
    [setAbilitys]
  );

  useEffect(() => {
    handleSetAbilitys({
      subCategorys: "",
      openSize: {
        wide: 0,
        depth: 0,
        high: 0,
      },
      storageSize: {
        wide: 0,
        depth: 0,
        high: 0,
      },
      weight: 0,
      capacity: 0,
      innerTent: "",
      grandSheet: "",
      accessories: [],
    });
  }, [handleSetAbilitys]);
  return (
    <>
      <TextField
        id="subCategory"
        select
        label="選択"
        value={subCategoryValue}
        defaultValue="テント"
        helperText="カテゴリーを選択"
        sx={TextFieldStyles.input}
        onChange={(event) => {
          setSubCategoryValue(event.target.value);
          setAbilitys({ ...abilitys, subCategorys: event.target.value });
        }}
      >
        {subCategory.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: "flex", width: "50%" }}>
        <TextField
          id="openSizeWidth"
          label="幅 (cm)"
          required
          defaultValue=""
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              openSize: {
                ...abilitys.openSize,
                wide: Number(event.target.value),
              },
            })
          }
        />
        <TextField
          id="openSizeDepth"
          label="奥行き (cm)"
          required
          defaultValue=""
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              openSize: {
                ...abilitys.openSize,
                depth: Number(event.target.value),
              },
            })
          }
        />
        <TextField
          id="openSizeHeight"
          label="高さ (cm)"
          required
          defaultValue=""
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              openSize: {
                ...abilitys.openSize,
                high: Number(event.target.value),
              },
            })
          }
        />
      </Box>
      <Box sx={{ display: "flex", width: "50%" }}>
        <TextField
          id="storageSizeWidth"
          label="収納幅 (cm)"
          required
          defaultValue=""
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              storageSize: {
                ...abilitys.storageSize,
                wide: Number(event.target.value),
              },
            })
          }
        />
        <TextField
          id="storageSizeDepth"
          label="奥行き (cm)"
          required
          defaultValue=""
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              storageSize: {
                ...abilitys.storageSize,
                depth: Number(event.target.value),
              },
            })
          }
        />
        <TextField
          id="storageSizeHeight"
          label="高さ (cm)"
          required
          defaultValue=""
          sx={TextFieldStyles.input}
          onChange={(event) =>
            setAbilitys({
              ...abilitys,
              storageSize: {
                ...abilitys.storageSize,
                high: Number(event.target.value),
              },
            })
          }
        />
      </Box>
      <TextField
        id="weight"
        label="重量 kg"
        required
        sx={TextFieldStyles.input}
        onChange={(event) =>
          setAbilitys({
            ...abilitys,
            weight: Number(event.target.value),
          })
        }
      />
      <TextField
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
      <TextField
        id="accessories"
        label="その他付属品"
        sx={TextFieldStyles.input}
        onChange={(event) =>
          setAbilitys({
            ...abilitys,
            accessories: [String(event.target.value)],
          })
        }
      />
    </>
  );
};
