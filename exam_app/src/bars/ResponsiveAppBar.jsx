import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from 'react-router-dom'
import './ResponsiveAppBar.css'
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";

const pages = ['Home', 'Pricing', 'About', 'Products', 'Contact', 'Login', 'Signup'];
const settings = ["Profile", "Logout"]; //"Dashboard"

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigator = useNavigate()

  const {isLoggedIn, user} = useAuth()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (evt) => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="outer_appbar">
      <Container maxWidth="xl" className="appbar">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
              (!(['Login', 'Signup'].includes(page) && isLoggedIn)) && (
                <NavLink to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`} key={page} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {page}
                    </Typography>
                  </MenuItem>
                </NavLink>
              )
            ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            MCQBOT
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            (!(['Login', 'Signup'].includes(page) && isLoggedIn)) && (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <NavLink to={page.toLowerCase() === 'home' ? '/' : `/${page.toLowerCase()}`} key={page} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {page}
                </NavLink>
              </Button>
            )
          ))}
          </Box>

          <Box sx={{ flexGrow: 0 }} visibility={isLoggedIn?'visible':'hidden'}>
            <Tooltip title="buy coins">
              <IconButton onClick={() => navigator('/buy_coins')} sx={{ p: 0, mr: "16px" }}>
                {/* <Avatar alt="Remy Sharp" src={localStorage.getItem('profileImage') ? localStorage.getItem('profileImage') : "./hacker_logo.png"} /> */}
                <div className="no_coins" style={{background: 'radial-gradient(goldenrod, rgb(170, 122, 1))', width: '2rem', height: '2rem', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className="coins" style={{fontSize: '0.8rem', fontWeight: '600', color: 'white'}}>{user.creaditPoints}</div>
                </div>
              </IconButton>
            </Tooltip>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={localStorage.getItem('profileImage') ? localStorage.getItem('profileImage') : "./hacker_logo.png"} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                 <NavLink to={`/${setting.toLowerCase()}`} key={setting}>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" >{setting}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;