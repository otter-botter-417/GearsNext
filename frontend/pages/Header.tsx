import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <AppBar position="fixed">
      <Toolbar variant="dense">
        <IconButton edge="start" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Link href={`/`}>
          <Typography variant="h4">Gears</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
