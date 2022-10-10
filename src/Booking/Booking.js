import React,{useState,useEffect} from 'react';
import PassengerHeader from '../PassengerDashboard/PassengerHeader';
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
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Train from '../Imgs/light3.jpg';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AltRouteRoundedIcon from '@mui/icons-material/AltRouteRounded';
import TramRoundedIcon from '@mui/icons-material/TramRounded';
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from '@mui/icons-material/Delete';
import Radio from '@mui/material/Radio';
import {PayPalScriptProvider,PayPalButtons} from '@paypal/react-paypal-js';
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import RadioGroup from '@mui/material/RadioGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QueueRoundedIcon from '@mui/icons-material/QueueRounded';
import { UseLocalState } from '../util/UseLocalStorage';
import { deepOrange, deepPurple } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import {Navigate,useLocation,useNavigate} from 'react-router-dom';
import { UseLocalEmailStorage } from '../util/UseLocalEmailStorage';
import { UseLocalBookingStorage } from '../util/UseLocalBookingStorage';

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

const Booking = () => {
  
  const location=useLocation();
  const params=new URLSearchParams(location.search);
  let trainid=params.get("trainId");
  let Email=params.get("passengerEmail");
  let source=params.get("source");
  const[email,setEmail]=UseLocalEmailStorage("","email");
  const [bookingId,setBookingId]=UseLocalBookingStorage("","bookingid");
  let destination=params.get("destination");
  let journeydate=params.get("journeydate");
  //const [trainclass, setTrainClass] = useState(null);
  //const [NumOfSeats, setNumOfSeats] = useState(null);
  const[passengerdetails,setPassengerDetails]= useState({
    passengerName:"",
    passengerPhone:"",
    passengerAddress:"",
});
  
 /* const [classes,setClasses]=useState({
    className:"",
    price:"",
    numOfSeats:"",
  
  });*/
  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [orderId, setOrderId] = useState(false)
  const[bookingPreview,setBookingPreview]=useState({
    price:""
  })

  function handlePaymentPreview(event)
  {
    
    const { name, value } = event.target;
    setBookingPreview((prevState) => ({ ...prevState, [name]: value }));

  }
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          description: 'Payment for booking ticket',
          amount: {
            currency_code: 'USD',
            value:booking1.price
          },
        },  
      ],
      application_context: {
        shipping_preference:'NO_SHIPPING'
      }
    })
      .then((orderID) => {
        setOrderId(orderID)
        return orderID
    })
  }

  const onApprove = (data,actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details
      setSuccess(true)
    })
  }

  const onError = (data, actions) => {
    setErrorMessage("An error occured with your payment")
  }
 

  const[booking,setbooking]=useState({
    bookingId:"",
    trainClass:"",
    totalNumOfSeats:"",
    passengers:[],
   
});
const[booking1,setbooking1]=useState({
  bookingId:"",
  trainClass:"",
  totalNumOfSeats:"",
  passengers:[],
 
});
const[passengersdetails,setPassengersDetails]= useState({
  passengersName:"",
  passengersGender:"",
  passengersAge:null,
});
const[passdetails,setpassdetails]=useState([]);
 

function handlePassengers(event) {
  const { name, value } = event.target;
  setPassengersDetails((prevState) => ({ ...prevState, [name]: value }));
}

 
const addPassengers = (event) => {
  event.preventDefault();
  setpassdetails((passdetails) => passdetails.concat(passengersdetails));
  setbooking({ ...booking,  passengers: passdetails });
  alert("Success");
};

const confirmAllDetail= (event)=>{
  setbooking({ ...booking,  passengers: passdetails });
  alert("all details successfully added");
};

function onChangehandlebooking(event){
  const { name, value } = event.target;
  setbooking((prevState) => ({ ...prevState, [name]: value }));
}

useEffect(() => {
  console.log(booking);
  console.log(booking1.price)
  if(booking.bookingId!==null)
  {
    //setbooking1(booking.bookingId);
    setBookingId(booking.bookingId);
  }
}, [booking]);

useEffect(() => {
  fetch(`/passenger/passengersticket?bookingId=${bookingId}`,{
    headers: {
     // Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwt}`,
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
          return Promise.reject("No bookings");
          
     }
})
.then((data)=>{
    setbooking1(data);
});
  },);

  const[jwt,setjwt] =UseLocalState("","jwt");
const[traindetails,setTraindetails]=useState({
    trainName:"",
    trainClasses:[
      {
        className:"",
        price:"",
        numOfSeats:"",
      }
    ],

});
            
            const navigate = useNavigate();


            useEffect(() =>{
              fetch(`/passenger/gettrain/${trainid}`,{
                headers: {
                 // Accept: 'application/json',
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${jwt}`,
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
                      return Promise.reject("No trains detected");
                      
                 }
            })
            .then((data)=>{
                setTraindetails(data);
            }).catch((message)=>{alert(message)});
              },);

            /*  useEffect(() =>{
                fetch(`/passenger/viewpassenger/${passengerEmail}`,{
                  headers: {
                   // Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
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
                        return Promise.reject("No Passengers exist");
                        
                   }
              })
              .then((data)=>{
                  setPassengerDetails(data);
                  console.log(data);
              });
                },);*/
                function handleSubmit()
                {
                  fetch(`/passenger/passengersavebooking?trainId=${trainid}&passengerEmail=${email}&source=${source}&destination=${destination}&journeydate=${journeydate}`,{
                    headers: {
                     // Accept: 'application/json',
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${jwt}`,
                    },
                    method: "POST",
                    body: JSON.stringify(booking)
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
                          return Promise.reject("Booking not completed");
                          
                     }
                })
                .then((data)=>{
                    setbooking(data);
                    console.log(data);
                }).catch((message)=>{alert(message)});
                   
                }

    return (
       <>
       <PassengerHeader/>
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
          <Box component="form" noValidate 
          
          sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12} >
                 <TextField
                          required
                          fullWidth
                          id="trainId"
                          label="Train Number"
                          name="trainId"
                          value={trainid}
                          disabled="true"
                         // onChange={e => updateTrain("trainName",e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="trainName"
                          label="Train Name"
                          name="trainName"
                          value={traindetails.trainName}
                           disabled="true"
                        />
                      </Grid>
                      <Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="source"
                          label="Source"
                          name="source"
                          value={source}
                           disabled="true"
                        />
                      </Grid>
                      <Grid item xs={12} >
                      <TextField
                          required
                          fullWidth
                          id="destination"
                          label="Destination"
                          name="destination"
                          value={destination}
                           disabled="true"
                        />
                      </Grid>
                      {traindetails.trainClasses.map((classes)=>{
                        return(
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
                          Number of Seats  : {classes.numOfSeats}
                        </Typography>
                        </CardContent>

        </Card>
        </Grid>
                     ); })}
             


              <Grid item xs={12}>
                     <FormControl sx={{ m: 1, minWidth: 830 }}>
                     <InputLabel id="TrainClasses">Train Classes</InputLabel>
        <Select
          labelId="TrainClasses"
          id="trainClass"
          name="trainClass"
          label="Train classes"
          sx={{ backgroundColor:'white'}}
         onChange={onChangehandlebooking}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="AC Coach">AC Coach</MenuItem>
          <MenuItem value="Sleeper Coach">Sleeper</MenuItem>
          <MenuItem value="General">General</MenuItem>

        </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 830 }}>
        <InputLabel id="NumOfSeats">Number Of Seats</InputLabel>
        <Select
          labelId="NumOfSeats"
          id="totalNumOfSeats"
          name="totalNumOfSeats"
        //  value={booking.totalNumOfSeats}
          label="Number Of Seats"
          sx={{ backgroundColor:'white'}}
          onChange={onChangehandlebooking}
         //onChange={e=>setDestination(e.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="1">1</MenuItem>
          <MenuItem value="2">2</MenuItem>
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="4">4</MenuItem>
          <MenuItem value="5">5</MenuItem>
          <MenuItem value="6">6</MenuItem>

        </Select>
        </FormControl>

                      </Grid>
                      <Grid item xs={12} >
                 <TextField
                          required
                          fullWidth
                          id="passengersName"
                          label="Passenger Name"
                          name="passengersName"
                          //value={passengersName}
                          onChange={handlePassengers}
                        />
                      </Grid>
                      <Grid item xs={12} >
                 <TextField
                          required
                          fullWidth
                          id="passengersAge"
                          label="Passenger Age"
                          name="passengersAge"
                         onChange={handlePassengers}
                        />
                      </Grid>
                      <Grid item xs={12} gutterBottom>
                            <FormControl fullWidth>
                              <InputLabel id="Gender-label">Gender</InputLabel>
                              <Select
                                required
                                fullWidth
                                labelId="Gender-label"
                                id="passengersGender"
                                label="Gender"
                                name="passengersGender"
                                onChange={handlePassengers}
                              >
                                <MenuItem value={"Male"}>Male</MenuItem>
                                <MenuItem value={"Female"}>Female</MenuItem>
                                <MenuItem value={"Others"}>Others</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                      <Grid item xs={12} sm={6}>
                      <Button variant="contained" 
                      sx={{ mt: 1, mb: 2,justifyContent:"space-between" }} color="secondary" 
                      onClick={addPassengers} 
                      startIcon={<QueueRoundedIcon />}  > Add Passenger Details </Button> 
                     </Grid>
                     <Grid items xs={12} sm={4}>
                     <Button variant="contained"
                     sx={{ mt: 1, mb: 2,justifyContent:"center",minWidth:'10px' }} color="error" 
                    onClick={confirmAllDetail} 
                     startIcon={<CheckIcon />} > Confirm All Added Details </Button>
                     </Grid>
                     <Grid items xs={12} sm={4}>
                     <Button variant="contained"
                     sx={{ mt: 1, mb: 2,justifyContent:"center",minWidth:'10px' }} color="error" 
                     onClick={handleSubmit} 
                     startIcon={<CheckIcon />} >Confirm Booking</Button>
                     </Grid>
        {bookingId ? (
            <>
              <Container sx={{ py: 4 }} maxWidth="lg">
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={12} sm={6} md={4}>
                    <Card
                      variant="outlined"
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent justifyContent="center">
                        <Typography variant="h4" component="div">
                          Make Booking Ticket Payment
                        </Typography>
                        <br />
                        <Grid item xs={12}>
                          <TextField
                            required
                            fullWidth
                            id="price"
                            name="price"
                            label="Price"
                            onChange={handlePaymentPreview}
                            value={booking1.price}
                          />
                        </Grid>
                        <br />
                      </CardContent>
                      <CardActions>
                        <PayPalScriptProvider
                          options={{
                            "client-id":
                              "AWi2JZL11LYYGOnqejmfWlxv4hAg3Odmgl8AUg2w0zg-w2INI-4fwmrO1xVlN52baWA0V976aaFXZ06K",
                          }}
                        >
                          <PayPalButtons
                            style={{
                              layout: "horizontal",
                              color: "blue",
                              lable: "paypal",
                              height: 50,
                            }}
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          />
                        </PayPalScriptProvider>
                      </CardActions>
                    </Card>
                  </Grid>
                  <br />
                  <Grid>
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      {success ? (
                        <Alert severity="success">
                          Your Payment has been done successfully!
                        </Alert>
                      ) : (
                        <Alert severity="warning">
                          Payment is pending! You can make the payment using
                          PayPal.
                        </Alert>
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Container>
            </>
          ) : (
            <></>
          )}
           </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>

       </>
    );
};

export default Booking;