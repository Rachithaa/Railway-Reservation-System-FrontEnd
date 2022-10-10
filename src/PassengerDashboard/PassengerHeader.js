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
import { UseLocalState } from '../util/UseLocalStorage';
import { UseLocalEmailStorage } from '../util/UseLocalEmailStorage';
import {UseLocalNameStorage} from '../util/UseLocalNameStorage';
import SubwayIcon from '@mui/icons-material/Subway';


const PassengerHeader = () => {

    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const[jwt,setjwt] =UseLocalState("","jwt");
    const[email,setEmail]=UseLocalEmailStorage("","email");
    const[details,setDetails]=useState(null);
    const[name,setName]=UseLocalNameStorage("","name");

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
    
    function adminlogout()
    {
      window.localStorage.removeItem("jwt");
      window.localStorage.removeItem("email");
      window.localStorage.removeItem("password");
      window.localStorage.removeItem("name");
    navigate("/login");
    }
    return (
        <AppBar position="static" sx={{backgroundColor:"black", height: '12vh'}}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <SubwayIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 3,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 1000,
                fontSize: 23,
                letterSpacing: '.35rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              RAILYWAY RESERVATION
            </Typography>
  
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
               
                  <MenuItem  onClose={handleCloseNavMenu}  > 
                    <Typography className="click1" textAlign="center" component={Link} to="/aboutus" >ABOUT US</Typography>
                  </MenuItem>
                  <MenuItem  onClose={handleCloseNavMenu}  > 
                    <Typography className="click2" textAlign="center" component={Link} to="/contactus">CONTACT US</Typography>
                  </MenuItem>

                  
            
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mt:1,
                mr: 3,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                fontSize: 23,
                letterSpacing: '.3.5rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              RAILYWAY RESERVATION
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, mr: 1  }}>
             
                <Button
                  onClick={handleCloseNavMenu}
                 // onMouseOver={handleOpen}
                  //onMouseLeave={handleClose}
                  className="click1"
                  sx={{ my: 2, color: 'white', display: 'block' ,mt:3,marginLeft:6}}
                  component={Link} to="/aboutus"
                >
                    About Us
                </Button>
            </Box>
            <Typography sx={{marginRight:2}}>Hi, {name}</Typography>
            <Box sx={{ flexGrow: 0 }}>
            
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                 <Avatar>
                 {name[0]}
                </Avatar>                    
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>navigate(`/passenger/viewpassenger/${email}`)}>Profile</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>navigate('/passengerdashboard')}>Dashboard</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={()=>navigate("/viewticket")}>Ticket</Typography>
                  </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={adminlogout}>Logout</Typography>
                  </MenuItem>

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    );
};

export default PassengerHeader;