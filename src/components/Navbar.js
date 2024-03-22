import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import logo from './../assets/logo-removebg-preview.png';
import LogoutIcon from '@mui/icons-material/Logout';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  getNumberofMessages
} from "../api.js";
import domain from "../assets/domain.js";

export default function Navbar({isLoggedIn, setIsLoggedIn, user, setUser}) {
  const [mailDialogOpen, setMailDialogOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [messages, setMessages] = useState([{ UserCount: 0 }]);

  const handleMailDialogOpen = () => {
    setMailDialogOpen(true);
  };

  const handleMailDialogClose = () => {
    setMailDialogOpen(false);
  };

  const handleLogoutDialogOpen = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutDialogClose = () => {
    setLogoutDialogOpen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    handleLogoutDialogClose();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

   useEffect(() => {
     getData();
    }, [user]);

    async function getData() {
      let datas = await getNumberofMessages( domain.domain + ":5000/getNumberofMessages", user);
      setMessages(datas);
    }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={"/"} style={{ textDecoration: 'none', color: 'inherit' }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="home">
              <img src={logo} alt="logo" height="50px" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            ISEF QUIZ
          </Typography>
            </IconButton>
          </Link>
          
          <Box sx={{ flexGrow: 1 }} />
          {isLoggedIn && (
            <>
              <IconButton size="large" aria-label="show 3 new mails" color="inherit" onClick={handleMailDialogOpen}>
                <Badge badgeContent={0} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
                onClick={handleMenu}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu}>Benutzerprofil: {user}</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Benutzername ändern</MenuItem>
                <MenuItem onClick={handleCloseMenu}>Passwort ändern</MenuItem>
              </Menu>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <IconButton
                  size="large"
                  edge="end"
                  onClick={handleLogoutDialogOpen}
                  color="inherit"
                >
                  <LogoutIcon />
                </IconButton>
              </Link>
            </>
          )}
          {!isLoggedIn && (
            <Link to="/Login" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Button color="inherit" >
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Dialog
        open={mailDialogOpen}
        onClose={handleMailDialogClose}
        aria-labelledby="mail-dialog-title"
        aria-describedby="mail-dialog-description"
      >
        <DialogTitle id="mail-dialog-title">{"Neue Nachrichten"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="mail-dialog-description">
            {isLoggedIn?
             <>Sie haben {messages[0].UserCount} neue Nachrichten. Gehe zu <Link to="/EditQuestion" > Frage bearbeiten </Link>
             </>
          :
          ""
          }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleMailDialogClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={logoutDialogOpen}
        onClose={handleLogoutDialogClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">{"Logout bestätigen"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Möchten Sie sich wirklich ausloggen?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutDialogClose} color="primary">
            Abbrechen
          </Button>
          <Button onClick={handleLogout} color="primary" autoFocus>
            Ausloggen
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}