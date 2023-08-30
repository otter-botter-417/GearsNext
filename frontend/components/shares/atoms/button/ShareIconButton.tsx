import { useState } from "react";
import { IconButton, Popover, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import {
  TwitterIcon,
  TwitterShareButton,
  LineShareButton,
  LineIcon,
} from "react-share";
import * as React from "react";

type Props = {
  url: string;
  title: string;
};

export const ShareIconButton = (props: Props) => {
  const { url, title } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Tooltip title="共有" placement="right-start">
        <IconButton onClick={handleClick}>
          <ShareIcon aria-describedby={id} sx={{ fontSize: 30 }} />
        </IconButton>
      </Tooltip>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <IconButton>
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon round={true} size={30} />
          </TwitterShareButton>
        </IconButton>
        <IconButton>
          <LineShareButton url={url} title={title}>
            <LineIcon round={true} size={30} />
          </LineShareButton>
        </IconButton>
      </Popover>
    </>
  );
};
