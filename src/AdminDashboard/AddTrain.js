import React,{useState,useEffect} from 'react';
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
import AdminDashboard from './AdminDashboard';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import TramRoundedIcon from '@mui/icons-material/TramRounded';
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from '@mui/icons-material/Delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import { UseLocalState } from '../util/UseLocalStorage';
import { deepOrange, deepPurple } from '@mui/material/colors';
import {Navigate,useNavigate} from 'react-router-dom';
import Validator from '../Validator/Validator';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/admindashboard">
        Railway Reservation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();


const AddTrain = () => {

        const[jwt,setjwt] =UseLocalState("","jwt");
        const [day, setDay] = useState([]);
        const [day1, setDay1] = useState([]);
        const [validator, showValidationMessage] = Validator();
        const [routes, setRoutes] = useState({
          routeId: "",
          stationName: "",
          timeOfArrival: "",
          timeOfDeparture: "",
          totalDistance: "",
        });
        const [route1, setRoute1] = useState([]);
        const [trainClass, setTrainClass] = useState({
          className: "",
          price: "",
          numOfSeats: "",
        });
        const [trainClass1, setTrainClass1] = useState([]);
        const [train, setTrain] = useState({
          trainId: "",
          trainName: "",
          source: "",
          destination: "",
          route: [],
          pricePerKms: "",
          daysOfRunning: [],
          totalNumOfSeats: "",
          trainClasses: [],
        });
  
          const handleSubmit = (event) => {
              if (validator.allValid()) {
                console.log("train details submitted successfully");
                event.preventDefault();
                senddata();
              } else {
                // validator.showMessages();
                // rerender to show messages for the first time
                showValidationMessage(true);
              }
            };
  
            function senddata()
            {   
              fetch("/admin/adminaddtrain",{
                  headers:{
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${jwt}`,
                  },
                  method: "POST",
                  body: JSON.stringify(train)
              }).then((response) => {
                  if(response===200)
                      return response.json();
              })
              .then((data)=>{
                  setTrain(data);
                  window.location.href = `/admin/adminlisttrain/${train.trainId}`;
              }).catch((message)=>{alert(message)});
             
            }
            function handleRoute(event) {
              const { name, value } = event.target;
              setRoutes((prevState) => ({ ...prevState, [name]: value }));
            }
          
            useEffect(() => {
              console.log(train);
            }, [train]);
            useEffect(() => {
              console.log(routes);
            }, [routes]);
          
            function handleTrainClass(event) {
              const { name, value } = event.target;
              setTrainClass((prevState) => ({ ...prevState, [name]: value }));
            }
          
            function handleTrain(event) {
              setTrain({ ...train, [event.target.name]: event.target.value });
            }
            //Handle Check Box
            const handleCheckBox = (event) => {
              if (event.target.checked === true) {
                setDay([...day, event.target.value]);
              } else if (event.target.checked === false) {
                let freshArray = day.filter((val) => val !== event.target.value);
                setDay([...freshArray]);
              }
            };
            useEffect(() => {
              console.log(day);
            }, [day]);
            useEffect(() => {
              console.log(route1);
            }, [route1]);
          
            //To add new route
          
            const addRoute = (event) => {

             // if (validator.allValid()) {
                event.preventDefault();
                setRoute1((route1) => route1.concat(routes));
                setTrain({ ...train, daysOfRunning: day1, route: route1 });
                alert("Success");
           //   } else {
                // validator.showMessages();
                // rerender to show messages for the first time
              //  showValidationMessage(true);
             // }
            };
          
            //To add new Train class
          
            const addTrainClass = (event) => {
              setTrainClass1((trainClass1) => trainClass1.concat(trainClass));
              setTrain({ ...train, route: route1, trainClasses: trainClass1 });
              alert("Success");
            };
          
            const addDaysOfRunning = (event) => {
              //if (validator.allValid()) {
                setDay1((day1) => day1.concat(day));
                setTrain({ ...train, daysOfRunning: day1 });
                alert("Success");
          //    } else {
                // validator.showMessages();
                // rerender to show messages for the first time
            //    showValidationMessage(true);
            //  }
             
            };
          
            const confirmAllDetail = () => {
              setTrain({
                ...train,
                daysOfRunning: day1,
                route: route1,
                trainClasses: trainClass1,
              });
            };
          
            const navigate = useNavigate();
          
    return (
        <>
        <AdminDashboard/>
      
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
                          fullWidth
                          id="trainId"
                          label="Train Number"
                          onChange={handleTrain}
                        />
                        <span style={{ color: "red" }}>  
 {validator.message("trainId", train.trainId, 
              [
              "required",
              {max:5},
              {regex:"^\\d{5}$"},
              ],
              {
            messages: {
            required: "Train Number is required",
            regex:"Only digits upto 5 digits",
        
        },
        }
      )}</span> 
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="trainName"
                          label="Train Name"
                          name="trainName"
                          onChange={handleTrain}
                        />
                           <span style={{ color: "red" }}>  
 {validator.message("trainName", train.trainName, 
              [
              "required",
              {min:3},
              {max:20},
              {regex:"^[A-Za-z -]+$"},
              ],
              {
            messages: {
            required: "Train Name is required",
            min:"Train Name should be atleat 3 character length",
            max:"Train Name should be atmost twenty character length",
            regex:"Only alphabets and - allowed",
        
        },
        }
      )}</span>  
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="source"
                          label="Source"
                          name="source"
                          onChange={handleTrain}
                        />
      <span style={{ color: "red" }}>  
 {validator.message("source", train.source, 
              [
              "required",
              {min:3},
              {max:20},
              {regex:"^[A-Za-z -]+$"},
              ],
              {
            messages: {
            required: "Source is required",
            min:"Source should be atleat 3 character length",
            max:"Source should be atmost twenty character length",
            regex:"Only alphabets and - allowed",
        
        },
        }
      )}</span> 
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
  
                          fullWidth
                          name="destination"
                          label="Destination"
                          id="destination"
                          onChange={handleTrain}
                        />
                          <span style={{ color: "red" }}>  
 {validator.message("destination", train.destination, 
              [
              "required",
              {min:3},
              {max:20},
              {regex:"^[A-Za-z -]+$"},
              ],
              {
            messages: {
            required: "destination is required",
            min:"Destination should be atleat 3 character length",
            max:"Destination should be atmost twenty character length",
            regex:"Only alphabets and - allowed",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="pricePerKms"
                          label="Price Per Kilometers"
                          id="pricePerKms"
                          onChange={handleTrain}
                        />

                      </Grid>
            
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="totalNumOfSeats"
                          label="Total Number Of Seats"
                          id="totalNumOfSeats"
                          onChange={handleTrain}
                        />
                          <span style={{ color: "red" }}>  
 {validator.message("totalNumOfSeats", train.totalNumOfSeats, 
              [
              "required",
              {regex:"^\\d{1,4}"},
              ],
              {
            messages: {
            required: "total number of seats is required",
            regex:"total number of seats is from 0-1000",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} >
                        <FormLabel style={{display: 'flex', marginInlineStart:10}}>Train Days</FormLabel>
                        <FormGroup style={{display: 'flex', flexDirection: 'row',marginInlineStart:100}}>
                        <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning' 
                        value='MON'
                         onChange={handleCheckBox} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="MON"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary'  id='daysOfRunning' 
                        value='TUE'
                        onChange={handleCheckBox} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="TUE" 
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary'id='daysOfRunning'  
                        value='WED' 
                        onChange={handleCheckBox} 
                         name="daysOfRunning"sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="WED"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning' 
                        value='THU'
                        onChange={handleCheckBox} 
                         name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="THU"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning' 
                        value='FRI' 
                        onChange={handleCheckBox} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="FRI"
                      />
                      <FormControlLabel
                        control={<Checkbox  color='secondary' id='daysOfRunning'
                        value='SAT' 
                        onChange={handleCheckBox} 
                        name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                        label="SAT"
                      /><FormControlLabel
                      control={<Checkbox  color='secondary' id='daysOfRunning' 
                      value='SUN' 
                      onChange={handleCheckBox} 
                      name="daysOfRunning" sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } , }}/>}
                      label="SUN"
                    />
                    </FormGroup >
                    </Grid>
                    <Grid item xs={7} sm={4}>
                    <FormGroup>
                    <FormControl> <Button variant="contained"
                    sx={{ mt: 1, mb: 2,justifyContent:"center",minWidth:'10px' }}
                    color="success" onClick={addDaysOfRunning} startIcon={<CheckIcon />} > Confirm </Button></FormControl> 
                   </FormGroup>
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
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="routeId"
                          label="Route Number"
                          id="routeId"
                          onChange={handleRoute}
                        />
                          <span style={{ color: "red" }}>  
 {validator.message("routeId", routes.routeId, 
              [
              "required",
              {regex:"^\\d{1,2}"},
              ],
              {
            messages: {
            required: "Route Number is required",
            regex:"Route Number may be single or double digit",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="stationName"
                          label="Station Name"
                          id="stationName"
                          onChange={handleRoute}
                        />
                         <span style={{ color: "red" }}>  
 {validator.message("stationName", routes.stationName, 
              [
              "required",
              {min:3},
              {max:20},
              {regex:"^[A-Za-z -]+$"},
              ],
              {
            messages: {
            required: "Station Name is required",
            min:"atleast 3 character length",
            max:"utmost 20 character length",
            regex:"Only alphabets and - allowed",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="timeOfArrival"
                          label="Time Of Arrival"
                          id="timeOfArrival"
                          onChange={handleRoute}
                        />
              <span style={{ color: "red" }}>  
                        {validator.message("timeOfArrival", routes.timeOfArrival, 
              [
              "required",
              {min:8},
              {max:8},
              {regex:"[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$"},
              ],
              {
            messages: {
            required: "time of arrival is required",
            regex:"time should be in 00:00:00 format",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="timeOfDeparture"
                          label="Time Of Departure"
                          id="timeOfDeparture"
                          onChange={handleRoute}
                        />
            <span style={{ color: "red" }}>  
                        {validator.message("timeOfDepature", routes.timeOfDeparture, 
              [
              "required",
              {min:8},
              {max:8},
              {regex:"[0-2][0-9]:[0-5][0-9]:[0-5][0-9]$"},
              ],
              {
            messages: {
            required: "time of departure is required",
            regex:"time should be in 00:00:00 format",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          name="totalDistance"
                          label="Total Distance"
                          id="totalDistance"
                          onChange={handleRoute}
                        />
                          <span style={{ color: "red" }}>  
                        {validator.message("totalDistance", routes.totalDistance, 
              [
              "required",
              {regex:"^\\d{1,4}$"},
              ],
              {
            messages: {
            required: "total distance is required",
            regex:"total distance value ranges from 0-9999",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Button variant="contained" 
                      sx={{ mt: 1, mb: 2,justifyContent:"space-between" }} color="primary" onClick={addRoute} startIcon={<QueueRoundedIcon />}  > Add Route </Button> 
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

                     <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="className"
                          label="Train Class Name"
                          id="className"
                          onChange={handleTrainClass}
                        />

<span style={{ color: "red" }}>  
                        {validator.message("className", trainClass.className, 
              [
              "required",
              {min:3},
              {max:20},
              {regex:"^[A-Za-z0-9 -]+$"},
              ],
              {
            messages: {
            required: "train class name is required",
            regex:"Only alphabets and digits allowed along -. No special characters allowed",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="price"
                          label="Train Class Price"
                          id="price"
                          onChange={handleTrainClass}
                        />
                 <span style={{ color: "red" }}>  
                        {validator.message("price", trainClass.price, 
              [
              "required",
              {regex:"^\\d{1,3}.\\d{1,2}$"},
              ],
              {
            messages: {
            required: "train price is required",
            regex:"It should be of format as 125.67",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          required
                          fullWidth
                          name="numOfSeats"
                          label="Train Class Number Of Seats"
                          id="numOfSeats"
                          onChange={handleTrainClass}
                        />
                  <span style={{ color: "red" }}>  
                        {validator.message("numOfSeats", trainClass.numOfSeats, 
              [
              "required",
              {regex:"^\\d{1,4}$"},
              ],
              {
            messages: {
            required: "Number of seats  is required",
            regex:"It should be of digits range from 1-9999",
        
        },
        }
      )}</span>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <Button variant="contained"
                      sx={{ mt: 1, mb: 2,justifyContent:"space-between" }} color="primary" onClick={addTrainClass} startIcon={<QueueRoundedIcon />} > Add Train Class </Button>
                     </Grid>
                     </Grid>
                     <Grid items xs={12} sm={4}>
                     <Button variant="contained"
                     sx={{ mt: 1, mb: 2,justifyContent:"center",minWidth:'10px' }} color="error" onClick={confirmAllDetail} startIcon={<CheckIcon />} > Confirm All Added Details </Button>
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

export default AddTrain;