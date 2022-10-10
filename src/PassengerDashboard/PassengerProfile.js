import React,{useState,useEffect} from 'react';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { UseLocalState } from '../util/UseLocalStorage';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Train from '../Imgs/light3.jpg';
import Container from '@mui/material/Container';
import {Navigate,useNavigate} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import TramRoundedIcon from '@mui/icons-material/TramRounded';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import TrainSharpIcon from '@mui/icons-material/TrainSharp';
import { deepOrange, deepPurple } from '@mui/material/colors';
import PassengerHeader from './PassengerHeader';

const theme = createTheme();

const AdminProfile = () => {
    const[passengerdetails,setPassengerDetails]= useState({
        passengerName:"",
        passengerPhone:"",
        passengerAddress:"",
    });
    const email=window.location.href.split('/passenger/viewpassenger/')[1];

    const[jwt,setjwt] =UseLocalState("","jwt");

    useEffect(()=> {
        fetch(`/passenger/viewpassenger/${email}`,{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                method: "GET",
            }).then((response) => {
                if(response.status===200)
                {
                    return response.json();
                }
                else
                 {
                return Promise.reject("No profile detected");
            
                  }
            })
            .then((passengerdata)=>{
               
                setPassengerDetails(passengerdata);
            }).catch((message)=>{alert(message)});
    },);

    return (
        <div>
            <PassengerHeader/>
            <ThemeProvider theme={theme}>
            <CssBaseline />
              <Container component="main"  maxWidth="l">
            <Box
                   component="span"
                    sx={{ marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width:'auto',
                        backgroundImage: `url(${Train})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        //width: '97vw',
                        height: '100vh'}}>
                        <Card sx={{ 
                        //minWidth: 275
                        mt:3,
                        minWidth:'100px',
                       // maxWidth:"l",
                       display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '500px',
                        //marginLeft: 5,
                        backgroundColor: "#ffffcc",
                      //  backgroundImage: `url(${Train})`,
                         }}>
                      <CardContent sx={{ 
                        //minWidth: 275
                        mt:3,
                        marginLeft: 2,
                        marginRight:2,
                        marginBottom:2,
                         }}>

                
                        <Typography variant="h5" component="div">
                         <h3>Email :{email}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Name: {passengerdetails.passengerName}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Contact Number: {passengerdetails.passengerPhone}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Address: {passengerdetails.passengerAddress}</h3>
                        </Typography>
                       
                       
                       
                      </CardContent>
                      <CardActions >
                      
                
      </CardActions>
      </Card>
     </Box>
     </Container>
     </ThemeProvider>
        </div>
        );
}

export default AdminProfile;