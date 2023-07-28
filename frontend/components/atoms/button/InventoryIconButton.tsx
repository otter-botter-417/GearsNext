import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import LibraryAddIcon  from "@mui/icons-material/Favorite";
import LibraryAddRoundedIcon from '@mui/icons-material/LibraryAddRounded';
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../state/userAuth.State";
import { useUserInventoryApi } from "@/hooks/useUserInventoryApi";

//持っているものに登録用アイコンボタン


export const InventoryIconButton = (itemId: number) => {
  const [iconSwitch, setIconSwitch] = useState(false);
  const userInventoryApi = useUserInventoryApi()
  const onCrickIcon = () => {
    if (iconSwitch) {
    setIconSwitch(!iconSwitch);
    userInventoryApi.unregister(itemId)

    } else {
      setIconSwitch(!iconSwitch);
      userInventoryApi.register(itemId)
  };}
  return (
    <Tooltip title="持っているもの" placement="left-start">
      <IconButton onClick={onCrickIcon} disableFocusRipple={iconSwitch}>
        {iconSwitch ? (
          <LibraryAddRoundedIcon sx={{ color: "#008b8b", fontSize: 30 }} />
        ) : (
          <LibraryAddRoundedIcon sx={{ fontSize: 30 }} />
        )}
      </IconButton>
    </Tooltip>
  );
};