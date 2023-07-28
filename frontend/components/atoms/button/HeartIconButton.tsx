import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { useFavoriteItemApi } from "@/hooks/useFavoriteItemApi";

export const HeartIcon = (itemId: number) => {
  const [iconSwitch, setIconSwitch] = useState(false);
  const favoriteItemApi = useFavoriteItemApi()
  const onCrickIcon = () => {
    if (iconSwitch) {
    setIconSwitch(!iconSwitch);
    favoriteItemApi.unregister(itemId)

    } else {
      setIconSwitch(!iconSwitch);
      favoriteItemApi.register(itemId)
  };}
  return (
    <Tooltip title="いいね" placement="left-start">
      <IconButton onClick={onCrickIcon} disableFocusRipple={iconSwitch}>
        {iconSwitch ? (
          <FavoriteIcon sx={{ color: "#FF1744", fontSize: 30 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 30 }} />
        )}
      </IconButton>
    </Tooltip>
  );
};
