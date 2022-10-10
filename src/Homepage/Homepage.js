import React from 'react';
import  {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {Routes, Route, useNavigate,Navigate,Link,NavLink} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import light1 from '../Imgs/light3.jpg';
import front1 from '../Imgs/Front2.jpg';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
//import './AdminDashboard.css';
import { UseLocalState } from '../util/UseLocalStorage';
import { UseLocalEmailStorage } from '../util/UseLocalEmailStorage';
import {UseLocalNameStorage} from '../util/UseLocalNameStorage';
import front from '../Imgs/Front.jpg';
import HomepageDashboard from './HomepageDashboard';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Stack from '@mui/material/Stack';


const Homepage = () => {
    const navigate=useNavigate();

    
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [date,setDate]=useState(null);
  const[trains,setTrains]=useState(null);

  var journeydate=new Date(date).toLocaleDateString("UK").replaceAll(".","-");


  function sendreq()
  {
    
     fetch(`/passenger/passengersearchtrain?source=${source}&destination=${destination}&journeydate=${journeydate}`,{
         headers: {
          // Accept: 'application/json',
           'Content-Type': 'application/json',
         },
         method: "GET",
       })
       //.then((response)=> response.json())
       //.then((data)=>console.log(data));
       .then((response) =>
       {if(response.status===200) 
       {
          
           return response.json();
           
       }
       else
       {
            return Promise.reject("Search Failed");
            
       }})
       .then((trainsdata)=>{
          setTrains(trainsdata);
          console.log(trainsdata);
        }).catch((message)=>{alert(message)});
  }



  const handleSubmit = (evt) => {
    evt.preventDefault();
    sendreq();
}



    return (
        <>
        
        <HomepageDashboard/>
<CssBaseline />
          <Container component="main"  maxWidth="l" disableGutters={true} >
          <Box
                 component="span"
                  sx={{ 

                      display: 'flex',
                      flexDirection: 'column',
                     // alignItems: 'center',
                      //width:'auto',
                      backgroundImage: `url(${front})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      //width: '97vw',
                      height: 'auto'}}>
                    <Grid container spacing={2}>
                        <Grid item xs={1} sm={1}>

                        </Grid>
                    
                    <Grid item xs={6} sm={6}>
                              
                     <Typography sx={{mt:20,fontSize: 50,color:'black',textAlign: 'left',fontWeight:'bold',backgroundColor:'transparent'}}>Experience The Wonder</Typography>
                    <Typography sx={{mt:2,fontSize: 50,color:'black',textAlign: 'left',fontWeight:'bold',backgroundColor:'transparent'}}>Through Travelling By Train</Typography>
                    </Grid> 
                    </Grid>
                    <Grid container spacing={2}>
                    <Grid item xs={6} sm={3}>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                        </Grid>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
<Grid container spacing={2}>
<Grid item xs={12} sm={12}  >
    <Card sx={{ 
        //minWidth: 275
        mt:5,
        maxwidth:100,
        maxheight: 10,
        //marginLeft: 120,
       // position: "relative",
        display:'flex-right',
        float: 'right', 
        //backgroundColor:'black',
        backgroundImage: `url(${front1})`,
        backgroundSize:'cover',
        
         }}>
      <CardContent sx={{ 
        //minWidth: 275
        mt:3,
        marginLeft: 2,
        marginRight:2,
        marginBottom:2,
        display:'flex-right',
        float: 'right',
        
         }}>
       <FormControl sx={{ m: 1, minWidth: 220 ,display:'flex-right',
        float: 'right',}}>
        <InputLabel id="Source">Source</InputLabel>
        <Select
          labelId="Source"
          id="source"
          name="source"
          value={source}
          label="Source"
         sx={{ backgroundColor:'white'}}
         onChange={e=>setSource(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Mangalore-JN">Mangalore-JN</MenuItem>
          <MenuItem value="Puttur-JN">Puttur-JN</MenuItem>
          <MenuItem value="udupi-JN">Udupi-JN</MenuItem>
        </Select>
      </FormControl>
      <KeyboardDoubleArrowLeftIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,mt:3,display:'flex-right',
        float: 'right', backgroundColor:'white'}} />

      <FormControl sx={{ m: 1, minWidth: 220 ,display:'flex-right',
        float: 'right',}}>
        <InputLabel id="Destination">Destination</InputLabel>
        <Select
          labelId="Destination"
          id="destination"
          name="destination"
          value={destination}
          label="Destination"
          sx={{ backgroundColor:'white'}}
         onChange={e=>setDestination(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Bangalore-JN">Bangalore-JN</MenuItem>
          <MenuItem value="Mangalore-JN">Mangalore-JN</MenuItem>
          <MenuItem value="Puttur-JN">Puttur-JN</MenuItem>
          <MenuItem value="udupi-JN">Udupi-JN</MenuItem>
        </Select>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={3} sx={{display:'flex-right',
        float: 'right',mt:6,
        backgroundColor:'white'}}>
        <DesktopDatePicker
          label="Journey Date"
          inputFormat="DD-MM-YYYY"
          id="journeydate"
          name="journeydate"
          value={date}
          onChange={e=>setDate(e)}
          renderInput={(params) => <TextField {...params} />}
        />
       </Stack>
       </LocalizationProvider>
      </FormControl>
     
      </CardContent>

      <CardActions sx={{display:'flex-right',
        float: 'right',mt:6}} >
        <Button type='submit' size="large" variant="contained" 
       sx={{ 
       justifyContent: "flex-end",
       display:'flex-right',
        float: 'right',
       
        //marginLeft: 2,
        //marginRight:2,marginBottom:3,
   }} 
        color="secondary" 
        startIcon={<TravelExploreOutlinedIcon />}
        >Search</Button>
    
      </CardActions>
    </Card>
    </Grid>
    </Grid>
    </Box>
    <Grid item xs={12} sm={2}>
                        </Grid>
                        
    </Grid>
    
                        </Box>
             
                        {trains? (trains.map((train)=>(
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        backgroundImage ={`url(${front})`}
        style={{ minHeight: '100vh' }}
       >
        <Grid item xs={4}  backgroundImage ={`url(${front})`}>
        <Box
component="span"
sx={{  mx: '2px',
display: 'flex',
}}>
<Card sx={{ 
    //minWidth: 275
    mt:3,
    width:'auto',
    height: 'auto',
    alignItems:"center",
    display: 'inline',
    backgroundImage: `url(${light1})`,
    //backgroundColor:"lightcyan",
     }}>
  <CardContent sx={{ 
    //minWidth: 275
    mt:3,
    marginLeft: 2,
    marginRight:2,
    marginBottom:2,
     }}>
    <Typography variant='h5' color="secondary" gutterBottom>
    Train Number: {train.trainId}
    </Typography>
    <Typography variant="h5" component="div">
      Train Name :{train.trainName}
    </Typography>
    <Typography variant="h5" component="div">
      Train Source :{train.source}
    </Typography>
    <Typography variant="h5" component="div">
      Train Destination :{train.destination}
    </Typography>
{train?
    (train.route.map((routes)=>{
        if(source===routes.stationName){              
                 return(  
                    <> 
          <Typography variant="h6" >
      Train Source : {source}
    </Typography>       
                        <Typography variant="h6" >
                          Time Of Departure From {source} : {routes.timeOfDeparture}
                        </Typography>
                        </>
                 );
                 }
        }
         )):<></>}
     {train?   
       (train.route.map((item) => {
                          if (destination === item.stationName) {
                            return (
                              <>
                                 <Typography variant="h6">
      Train Destination : {destination}
    </Typography>             
                                <Typography
                                  sx={{ fontSize: 20 }}
                                  gutterBottom
                                >
                                  Time Of Arrival At {destination}: {item.timeOfArrival}
                                </Typography>
                              </>
                            );
                          }
                        })):<></>}
                        <Typography variant="h6" >
      Total Number Of Seats : {train.totalNumOfSeats}
    </Typography>
    <Typography variant="h5" >
    <h5>Train Classes :</h5>
   </Typography>
   <container sx={{py:2}} maxWidth="lg">
    <Grid container spacing={2}>
                    {train.trainClasses.map((classes)=>{


            return(
                 <>
      <Grid item xs={12} sm={6} >  
    <Card sx={{ 
    //minWidth: 275
    mt:3,
    width:'auto',
    height: 200,
    //marginLeft: 6,
    //backgroundImage: `url(${light1})`,
    backgroundColor:"white",
     }}>

  <CardContent sx={{ 
    //minWidth: 275
   
    mt:3,
    marginLeft: 2,
    marginRight:2,
    marginBottom:2,
     }}>
    
                        <Typography variant="h5" >
                          Train Class Name : {classes.className}
                        </Typography>
                        <Typography variant="h5" >
                          price for class : {classes.price}
                        </Typography>
                        <Typography variant="h5" >
                          Number of Seats For Each Class : {classes.numOfSeats}
                        </Typography>
                        </CardContent>

        </Card>
        </Grid>


                        </> );    
 }
 )} 
 </Grid>
 </container>
 
  </CardContent>
  <CardActions >
  <Grid container justify="center">

    <Button size="large" variant="contained" 
   sx={{ 
   justifyContent: "center",
   minWidth: 300,

    //marginRight:2
    marginBottom:3,
}} 
   color="error" 
  onClick={()=>navigate('/passengerdashboard')}
    >BOOK</Button>
</Grid>
  </CardActions>
</Card>
</Box>
</Grid>
</Grid>
    ))): <></>}
</Container>


                        </>
    );
};

export default Homepage;