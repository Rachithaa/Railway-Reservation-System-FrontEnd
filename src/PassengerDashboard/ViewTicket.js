import React, { useEffect, useState } from 'react';
import PassengerHeader from './PassengerHeader';
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
import { UseLocalBookingStorage } from '../util/UseLocalBookingStorage';
import { UseLocalState } from '../util/UseLocalStorage';

const theme = createTheme();

const ViewTicket = () => {

 const [bookingId,setBookingId]=UseLocalBookingStorage("","bookingid");
 const[jwt,setjwt] =UseLocalState("","jwt");
 const[bookings,setBookings]=useState({
    trainName:"",
    trainNumber:"",
    currentDate:"",
    journeydate:"",
    source:"",
    destination:"",
    price:"",
    trainClass:"",
    totalNumOfSeats:"",
    sourcetimeOfDeparture:"",
    destinationtimeOfArrival:"",

 });

 useEffect(()=> {
        
    fetch(`/passenger/passengersticket?bookingId=${bookingId}`,{
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "GET",
        }).then((response) => {
            if(response.status===200)
                return response.json();
        })
        .then((data)=>{
            console.log(data);
            setBookings(data);
        });
},);

    return (
        <>
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
                        height: 'auto'}}>
                        <Card sx={{ 
                        //minWidth: 275
                        mt:3,
                        minWidth:'100px',
                       // maxWidth:"l",
                       height:"auto",
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
                        height:"auto",
                         }}>

                
                        <Typography variant="h5" component="div">
                      <h2> Ticket</h2>
                        </Typography>
                        <Typography variant="h5" component="div">
                        <h3>Train Number: {bookings.trainNumber}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Train Name: {bookings.trainName}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Booked Date:{bookings.currentDate}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Journey Date:{bookings.journeyDate}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Source:{bookings.source}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Destination:{bookings.destination}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Train Class:{bookings.trainClass}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Total Price:{bookings.price}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Total Number Of Seats:{bookings.totalNumOfSeats}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Time of arrival at destination:{bookings.destinationtimeOfArrival}</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Time Of departure at source:{bookings.sourcetimeOfDeparture}</h3>
                        </Typography>
                        
                       
                       
                       
                      </CardContent>
                      <CardActions >
                      
              
      </CardActions>
      </Card>
     </Box>
     </Container>
     </ThemeProvider>
        </>
    );
};

export default ViewTicket;