import { IconButton, Tooltip } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";

export const HeartIcon = () => {
  const [iconSwitch, setIconSwitch] = useState(false);
  const onCkickIcon = () => setIconSwitch(!iconSwitch);
  return (
    <Tooltip title="いいね" placement="left-start">
      <IconButton onClick={onCkickIcon} disableFocusRipple={iconSwitch}>
        {iconSwitch ? (
          <FavoriteIcon sx={{ color: "#FF1744", fontSize: 30 }} />
        ) : (
          <FavoriteBorderIcon sx={{ fontSize: 30 }} />
        )}
      </IconButton>
    </Tooltip>
  );
};
