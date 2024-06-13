import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import veleta from "./veleta.png";

import * as styles from "./NavStyles";
import classes from "./Nav.module.css";

const pages = ["Carousel", "Chat", "Nosotros"];

function Nav() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position={styles.appBarStyles.position}
      sx={{ backgroundColor: styles.appBarStyles.backgroundColor }}
    >
      <Container maxWidth={styles.containerStyles.maxWidth}>
        <Toolbar disableGutters={styles.toolbarStyles.disableGutters}>
          <Box sx={styles.logoBoxStyles}>
            <img src={veleta} className={classes.AppLogo} alt="logo" />
          </Box>

          <Typography
            variant={styles.typographyStyles.variant}
            noWrap={styles.typographyStyles.noWrap}
            component={styles.typographyStyles.component}
            href={styles.typographyStyles.href}
            sx={styles.typographyStyles}
          >
            GALERÍA
          </Typography>

          <Box sx={styles.buttonContainerStyles}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={styles.buttonStyles}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={styles.iconButtonBoxStyles}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={styles.menuStyles}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={styles.menuItemTypographyStyles}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={styles.secondLogoBoxStyles}>
            <img src={veleta} className={classes.AppLogo} alt="logo" />
          </Box>

          <Typography
            variant={styles.secondTypographyStyles.variant}
            noWrap={styles.secondTypographyStyles.noWrap}
            component={styles.secondTypographyStyles.component}
            href={styles.secondTypographyStyles.href}
            sx={styles.secondTypographyStyles}
          >
            GALERÍA
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
