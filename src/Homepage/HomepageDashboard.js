import React from 'react';
import  {useState,useEffect} from 'react';
import {Routes, Route, useNavigate,Navigate,Link,NavLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CssBaseline from '@mui/material/CssBaseline';
import SubwayIcon from '@mui/icons-material/Subway';
//import './AdminDashboard.css';
import { UseLocalState } from '../util/UseLocalStorage';
import { UseLocalEmailStorage } from '../util/UseLocalEmailStorage';
import {UseLocalNameStorage} from '../util/UseLocalNameStorage';
import front from '../Imgs/Front.jpg';

const Homepage = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
    return (
      <>
          <AppBar position="static" sx={{backgroundColor:"black", height: '12vh'}}>
            <Container maxWidth="xl" >
              <Toolbar disableGutters="true">
                <SubwayIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,mt:2}} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mt:2,
                    mr: 5,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 1000,
                    fontSize: 23,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  RAILYWAY RESERVATION
                </Typography>
      
                <SubwayIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  RAILYWAY RESERVATION
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, }}>
                 
                    <Button
                      onClick={handleCloseNavMenu}
                     // onMouseOver={handleOpen}
                      //onMouseLeave={handleClose}
                      className="click1"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      component={Link} to="/SignUp"
                      sx={{ marginLeft:100,mt:2,color:'white',}}
                    >
                        Sign Up 
                    </Button>
                    <Button
                      onClick={handleCloseNavMenu}
                      className="click2"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                      component={Link} to="/login" 
                      sx={{marginLeft:5, mt:2,color:'white',}} >
                        Sign In  
                    </Button>
                </Box>
                
                <Box sx={{ flexGrow: 1,mt:2, 
                  display: { xs: 'flex', md: 'none' }
                  }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    marginTop="2"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      
                    }}
                  >
                   
                      <MenuItem  onClose={handleCloseNavMenu}  sm={{marginLeft:100}}> 
                        <Typography className="click1" textAlign="center" component={Link} to="/SignUp" >Sign Up</Typography>
                      </MenuItem>
                      <MenuItem  onClose={handleCloseNavMenu}  > 
                        <Typography className="click2" textAlign="center" component={Link} to="/login">Sign In</Typography>
                      </MenuItem>

                
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
      
          
                        </>
    );
};

export default Homepage;