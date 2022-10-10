import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormControl,FormLabel,FormGroup } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import TrainSharpIcon from '@mui/icons-material/TrainSharp';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Train from '../Imgs/light3.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import TramRoundedIcon from '@mui/icons-material/TramRounded';
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import { UseLocalState } from '../util/UseLocalStorage';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


     
const TrainAdd = () => {

    const [state, setState] = React.useState({
      //  MON: false,
        //TUE: false,
        //WED: false,
        //THU:false,
        //FRI:false,
       // SAT: false,
        //SUN:false,
        daysOfRunning: [],
      });
      const[jwt,setjwt] =UseLocalState("","jwt");
      const [trainId,setTrainId] = React.useState(""); 
      const [trainName,setTrainName] = React.useState(""); 
      const [source,setSource] = React.useState(""); 
      const [destination,setDestination] = React.useState("");  
      const [pricePerKms,setPricePerKms] = React.useState("");  
      const [routeId,setRouteId] = React.useState("");  
      const [stationName,setStationName] = React.useState("");  
      const [timeOfArrival,setTimeOfArrival] = React.useState("");  
      const [timeOfDeparture,setTimeOfDeparture] = React.useState("");  
      const [totalDistance,setTotalDistance] = React.useState("");  
      const [totalNumOfSeats,setTotalNumOfSeats] = React.useState("");  
      const [className,setClassName] = React.useState("");  
      const [price,setPrice] = React.useState("");  
      const [numOfSeats,setNumOfSeats] = React.useState("");    
      
        //  const { MON, TUE, WED,THU,FRI,SAT,SUN } = state;
 
    const handleChange = (event) => {
        /*setState({
            ...state,
            [event.target.name]: event.target.checked,
          });*/
          const { value, checked } = event.target;
        const { daysOfRunning } = state;
        if (checked) {
            setState({
              daysOfRunning: [...daysOfRunning, value],
            });
          }
          else {
            setState({
              daysOfRunning: daysOfRunning.filter((e) => e !== value),
            });
        }
    
      };

        const handleSubmit = (event) => {
            event.preventDefault();
          //  const data = new FormData(event.currentTarget);
            console.log({
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
              daysOfRunning:state,
              totalNumOfSeats:totalNumOfSeats,
              className:className,
              price:price,
              numOfSeats:numOfSeats,    

            });
          };

          function senddata()
          {
            const req={
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
              daysOfRunning:state,
              totalNumOfSeats:totalNumOfSeats,
              className:className,
              price:price,
              numOfSeats:numOfSeats,
              };
              console.log(trainId);
            fetch("train/addTrain",{
                headers:{
                    'Content-Type': 'application/json',
                    Authentication: `Bearer ${jwt}`,
                },
                method: "POST",
                body: JSON.stringify(req)
            }).then((response) => {
                if(response===200)
                    return response.json();
            })
            .then((data)=>{
                console.log(data);
            });
           
          }
        
          return (
            <>
            <AdminDashboard/>
            <ThemeProvider theme={theme}>
              <Container component="main"  sx={{ width: 'auto' }}>
                <CssBaseline />
             <Box
                  sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width:'auto',
                    backgroundImage: `url(${Train})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    
                    /*'&:hover': {
                        backgroundColor: 'primary.main',
                        //opacity: [0.9, 0.8, 0.7],
                      },*/
                  }}
                >
                  <Avatar sx={{ m: 3, bgcolor: 'secondary.main'}}>
                    <TrainSharpIcon fontSize="large"/>
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Train Details
                  </Typography>
                  <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name="trainId"
                          required
                          fullWidth
                          id="trainId"
                          label="Train Number"
                          onChange={e => setTrainId(e.target.value)}
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="trainName"
                          label="Train Name"
                          name="trainName"
                          onChange={e => setTrainName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          id="source"
                          label="Source"
                          name="source"
                          onChange={e => setSource(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="destination"
                          label="Destination"
                          id="destination"
                          onChange={e => setDestination(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="pricePerKms"
                          label="Price Per Kilometers"
                          id="pricePerKms"
                          onChange={e => setPricePerKms(e.target.value)}
                        />
                      </Grid>
            
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="totalNumOfSeats"
                          label="Total Number Of Seats"
                          id="totalNumOfSeats"
                          onChange={e => setTotalNumOfSeats(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} >
                        <FormLabel style={{display: 'flex', marginInlineStart:10}}>Train Days</FormLabel>
                        <FormGroup style={{display: 'flex', flexDirection: 'row',marginInlineStart:100}}>
                        <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning' 
                        value='MON'
                         onChange={handleChange} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="MON"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary'  id='daysOfRunning' 
                        value='TUE'
                        onChange={handleChange} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="TUE" 
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary'id='daysOfRunning'  
                        value='WED' 
                        onChange={handleChange} 
                         name="daysOfRunning"sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="WED"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning' 
                        value='THU'
                        onChange={handleChange} 
                         name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="THU"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning' 
                        value='FRI' 
                        onChange={handleChange} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="FRI"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning'
                        value='SAT' 
                        onChange={handleChange} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="SAT"
                      /><FormControlLabel
                      control={<Checkbox  color='secondary' id='daysOfRunning' 
                      value='SUN' 
                      onChange={handleChange} 
                      name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                      label="SUN"
                    />
                    </FormGroup >
                    </Grid>
                     
                    <Grid item xs={12} >
                      <Avatar sx={{ m: 3, bgcolor: 'secondary.main',display: 'inline-flex', 
                      marginInlineStart:93.5
                    }}>
                     <AltRouteRoundedIcon fontSize="large"/>
                    </Avatar>
                    <Typography component="h2" variant="h5" sx={{marginInlineStart:87}}>
                        Route Details
                        </Typography>
                       </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="routeId"
                          label="Route Number"
                          id="routeId"
                          onChange={e => setRouteId(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="stationName"
                          label="Station Name"
                          id="stationName"
                          onChange={e => setStationName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="timeOfArrival"
                          label="Time Of Arrival"
                          id="timeOfArrival"
                          onChange={e => setTimeOfArrival(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="timeOfDeparture"
                          label="Time Of Departure"
                          id="timeOfDeparture"
                          onChange={e => setTimeOfDeparture(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="totalDistance"
                          label="Total Distance"
                          id="totalDistance"
                          onChange={e => setTotalDistance(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Button
                      variant="contained"  startIcon={<QueueRoundedIcon />} size='large' color="primary"
                      sx={{ mt: 1, mb: 2,justifyContent:"space-between" }}>Add</Button>
                      <Button
                      variant="contained"  startIcon={<DeleteIcon />} size='large' color="error"
                      sx={{ mt: 1, mb: 2, marginInlineStart:2}}>Delete</Button>
                     </Grid>
                      <Grid item xs={12} >
                      <Avatar sx={{ m: 3, bgcolor: 'secondary.main',display: 'inline-flex', 
                      marginInlineStart:93.5
                    }}>
                     <TramRoundedIcon fontSize="large"/>
                    </Avatar>
                    <Typography component="h1" variant="h5" sx={{marginInlineStart:80}}>
                        Train Classes Details
                        </Typography>
                       </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="className"
                          label="Train Class Name"
                          id="className"
                          onChange={e => setClassName(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="price"
                          label="Train Class Price"
                          id="price"
                          onChange={e => setPrice(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="numOfSeats"
                          label="Train Class Number Of Seats"
                          id="numOfSeats"
                          onChange={e => setNumOfSeats(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Button
                      variant="contained"  startIcon={<QueueRoundedIcon />} size='large' color="primary"
                      sx={{ mt: 1, mb: 2,justifyContent:"space-between" }}>Add</Button>
                      <Button
                      variant="contained"  startIcon={<DeleteIcon />} size='large' color="error"
                      sx={{ mt: 1, mb: 2, marginInlineStart:2}}>Delete</Button>
                     </Grid>
                     
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
            
                <Copyright sx={{ mt: 5 }} />
              </Container>
            </ThemeProvider>
            </>
          );
};

export default TrainAdd;