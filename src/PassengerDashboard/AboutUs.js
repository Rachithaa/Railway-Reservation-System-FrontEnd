import React from 'react';
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


const theme = createTheme();


const AboutUs = () => {
    return (<>
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
                      <h2> ABOUT US</h2>
                        </Typography>
                        <Typography variant="h5" component="div">
                        <h3>Railway Reservation system</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Email: xxxxx@gmail.com</h3>
                        </Typography>
                        <Typography variant="h5" component="div">
                         <h3>Contact: xxxxxxx003</h3>
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

export default AboutUs;