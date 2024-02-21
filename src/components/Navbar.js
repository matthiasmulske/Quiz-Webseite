import * as React from 'react';
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

export default function PrimarySearchAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <img src={logo} alt="logo" height="50px"></img>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            ISEF QUIZ
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box >
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
            //   onClick={}
              color="inherit"
            >
                <Badge badgeContent="user" color="secondary">
              <AccountCircle />
                </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
            //   onClick={}
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
