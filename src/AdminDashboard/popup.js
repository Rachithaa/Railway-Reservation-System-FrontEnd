import React,{useState,useEffect} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import { UseLocalState } from '../util/UseLocalStorage';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
//import Button from '@mui/material/Button';
//import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Train from '../Imgs/light3.jpg';
import Container from '@mui/material/Container';
import {Navigate,useNavigate} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
//import Popover from '@mui/material/Popover';
import DeleteIcon from '@mui/icons-material/Delete';
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import TramRoundedIcon from '@mui/icons-material/TramRounded';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import TrainSharpIcon from '@mui/icons-material/TrainSharp';
import { deepOrange, deepPurple } from '@mui/material/colors';

const theme = createTheme();

const BasicPopover= ()=> {
  const trainid=window.location.href.split('/admin/adminlisttrain/')[1];
    const[jwt,setjwt] =UseLocalState("","jwt");
  /*const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;*/
  const [routes,setRoutes]=useState({
    routeId:"",
    stationName:"",
    timeOfArrival:"",
    timeOfDeparture:"",
    totalDistance:"",
});
const [classes,setClasses]=useState({
    className:"",
    price:"",
    numOfSeats:"",

});
const[uptrain,setUptrain]=useState({
    trainId: "",
    trainName:"",
    source:"",
    destination:"",
    pricePerKms:"",
    route:[routes],
    totalNumOfSeats:"",
    daysOfRunning:"",
    trainClasses:[classes],

});

useEffect(()=> {
        
  fetch(`/admin/adminlisttrain/${trainid}`,{
          headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
          },
          method: "GET",
      }).then((response) => {
          if(response.status===200)
              return response.json();
      })
      .then((traindata)=>{
          //setTrain(traindata);
          setUptrain(traindata);
      });
},);
const handleSubmit = (event) => {
  event.preventDefault();
  senddata();
};

function updateRoute(prop, value) {
  const newRoute = { ...uptrain.route };
  newRoute[prop] = value;
  setRoutes(newRoute);
}
function updateTrainClass(prop, value) {
  const newTrainClass = { ...uptrain.trainClasses };
  newTrainClass[prop] = value;
  setClasses(newTrainClass);
}
function updateTrain(prop,value)
{
  const newTrain={...uptrain};
  newTrain[prop]=value;
  setUptrain(newTrain);
}

function senddata()
{
 /* const req={
      trainId: trainId,
    trainName: trainName,
    source:source,
    destination:destination,
    pricePerKms:pricePerKms,
    routeId:routeId,
    stationName:stationName,
    timeOfArrival:timeOfArrival,
    timeOfDeparture:timeOfDeparture,
    totalDistance:totalDistance,
   // daysOfRunning:state,
    totalNumOfSeats:totalNumOfSeats,
    className:className,
    price:price,
    numOfSeats:numOfSeats,
    };*/
    fetch(`admin/adminupdatetrain/${trainid}`,{
      headers:{
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
  }).then((response) => {
      if(response.status===200)
          return response.json();
  })}
  /*.then((trainsdata)=>{
      setUptrain(trainsdata);
  });*/

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: `url(${Train})`,
            backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
          }}
        >
<Avatar sx={{ m: 3, bgcolor: 'secondary.main'}}>
                    <TrainSharpIcon fontSize="large"/>
                  </Avatar>
                  <Typography component="h1" variant="h4">
                    Train Details
                  </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                        <TextField
                          name="trainId"
                          required
                          fullWidth
                          id="trainId"
                          label="Train Number"
                          value={uptrain.trainId}
                          onChange={(e) => updateTrain("trainId",e.target.value)}
                          
                        />
                      </Grid>
                      {uptrain ? (
                        <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="trainName"
                          label="Train Name"
                          name="trainName"
                          value={uptrain.trainName}
                          onChange={e => updateTrain("trainName",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="source"
                          label="Source"
                          name="source"
                         value={uptrain.source}
                          onChange={e => updateTrain("source",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="destination"
                          label="Destination"
                          id="destination"
                          value={uptrain.destination}
                          onChange={e => updateTrain("destination",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="pricePerKms"
                          label="Price Per Kilometers"
                          id="pricePerKms"
                         value={uptrain.pricePerKms}
                          onChange={e => updateTrain("pricePerKms",e.target.value)}
                        />
                      </Grid>
            
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="totalNumOfSeats"
                          label="Total Number Of Seats"
                          id="totalNumOfSeats"
                          value={uptrain.totalNumOfSeats}
                          onChange={e => updateTrain("totalNumOfSeats",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          name="daysOfRunning"
                          label="Train Days"
                          id="daysOfRunning"
                          value={uptrain.daysOfRunning}
                          onChange={e => updateTrain("daysOfRunning",e.target.value)}
                        />

                    </Grid>
                    <Grid item xs={12}>
                    <Avatar sx={{ bgcolor: deepOrange[500],display:"inline",position:'relative',margin:'24px',alignItems: 'center',
                webkitBoxPack: 'center' , flexShrink: 0,
                width: '40px',
                height: '40px',
                fontFamily:"sans-serif",
                fontSize: '1.25rem',
                lineHeight: 1,
                borderRadius: '50%',
                overflow: 'hidden'}}><AltRouteRoundedIcon fontSize="Medium"/></Avatar>
                <Typography component="h3" variant="h6" sx={{display:"inline"}} >
                        Route Details
                        </Typography>

                    </Grid>
                    {uptrain? (uptrain.route.map((routes)=>(
                     <>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="routeId"
                          label="Route Number"
                          id="routeId"
                          value={routes.routeId}
                          onChange={(e) => updateRoute("routeId",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="stationName"
                          label="Station Name"
                          value={routes.stationName}
                          id="stationName"
                          onChange={e => updateRoute("stationName",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="timeOfArrival"
                          label="Time Of Arrival"
                          id="timeOfArrival"
                          value={routes.timeOfArrival}
                          onChange={e => updateRoute("timeOfArrival",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="timeOfDeparture"
                          label="Time Of Departure"
                          id="timeOfDeparture"
                          value={routes.timeOfDeparture}
                          onChange={e => updateRoute("timeOfDeparture",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="totalDistance"
                          label="Total Distance"
                          id="totalDistance"
                          value={routes.totalDistance}
                          onChange={e => updateRoute("totalDistance",e.target.value)}
                        />
                      </Grid>
                       </> ))):(<></>)}
                      <Grid item xs={12} sm={6}>
                      <Button
                      variant="contained"  startIcon={<QueueRoundedIcon />} size='large' color="primary"
                      sx={{ mt: 1, mb: 2,justifyContent:"space-between" }}>Add</Button>
                      <Button
                      variant="contained"  startIcon={<DeleteIcon />} size='large' color="error"
                      sx={{ mt: 1, mb: 2, marginInlineStart:2}}>Delete</Button>
                     </Grid>
                     <Grid item xs={12}>
                    <Avatar sx={{ bgcolor: deepOrange[500],display:"inline",position:'relative',margin:'24px',alignItems: 'center',
                webkitBoxPack: 'center' , flexShrink: 0,
                width: '40px',
                height: '40px',
                fontFamily:"sans-serif",
                fontSize: '1.25rem',
                lineHeight: 1,
                borderRadius: '50%',
                overflow: 'hidden'}}><TramRoundedIcon fontSize="Medium"/></Avatar>
                <Typography component="h3" variant="h6" sx={{display:"inline"}} >
                        Train Class Details
                        </Typography>
                    </Grid>
                    {uptrain? (uptrain.trainClasses.map((classes)=>(
                            <>

                     <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="className"
                          label="Train Class Name"
                          id="className"
                          value={classes.className}
                          onChange={e => updateTrainClass("className",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="price"
                          label="Train Class Price"
                          id="price"
                          value={classes.price}
                          onChange={e => updateTrainClass("price",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          required
                          fullWidth
                          name="numOfSeats"
                          label="Train Class Number Of Seats"
                          id="numOfSeats"
                          value={classes.numOfSeats}
                          onChange={ e => updateTrainClass("numOfSeats",e.target.value)}
                        />
                      </Grid>
                      
 </> ))):(<></>)}
                      <Grid item xs={12} sm={6}>
                      <Button
                      variant="contained"  startIcon={<QueueRoundedIcon />} size='large' color="primary"
                      sx={{ mt: 1, mb: 2,justifyContent:"space-between" }}>Add</Button>
                      <Button
                      variant="contained"  startIcon={<DeleteIcon />} size='large' color="error"
                      sx={{ mt: 1, mb: 2, marginInlineStart:2}}>Delete</Button>
                     </Grid>
                     </>  ):(<></>)}
    
                    </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default BasicPopover;