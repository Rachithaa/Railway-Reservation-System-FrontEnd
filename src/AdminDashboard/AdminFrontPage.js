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
import { UseLocalState } from '../util/UseLocalStorage';
import { UseLocalEmailStorage } from '../util/UseLocalEmailStorage';
import {UseLocalNameStorage} from '../util/UseLocalNameStorage';
import SubwayIcon from '@mui/icons-material/Subway';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import light1 from '../Imgs/light3.jpg';
import front1 from '../Imgs/Front2.jpg';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
//import './AdminDashboard.css';
import TextField from '@mui/material/TextField';
import front from '../Imgs/Front.jpg';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import AdminDashboard from './AdminDashboard';
const AdminFrontPage = () => {

    const[jwt,setjwt] =UseLocalState("","jwt");
    const[email,setEmail]=UseLocalEmailStorage("","email");
    const[details,setDetails]=useState(null);
    const[name,setName]=UseLocalNameStorage("","name");

    useEffect(() =>{

        fetch(`passenger/viewpassenger/${email}`,{
          headers: {
           // Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: "GET",
        })
        //.then((response)=> response.json())
        //.then((data)=>console.log(data));
       .then((response) => {
          if(response.status===200)
          {
              return response.json();
          }
          else
           {
                return Promise.reject("No profile detected");
                
           }
      })
      .then((data)=>{
          setDetails(data);
          console.log(data);
          setName(data.passengerName);
      }).catch((message)=>{alert(message)});
        },);
    return (
        <>
       <AdminDashboard/>
        <Container component="main"  maxWidth="l" disableGutters={true} >
      <Box
             component="span"
              sx={{ 

                  display: 'flex',
                  flexDirection: 'column',
                 // alignItems: 'center',
                  width:'auto',
                  backgroundImage: `url(${light1})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  //width: '97vw',
                  height: '100vw'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2} sx={{fontSize:50,mt:3}}>
                    Welcome,
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{fontSize:50,mt:3}}>
                    Hello
                    </Grid>

</Grid>

</Box>
         
</Container>
</>
    );
};

export default AdminFrontPage;