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

const theme = createTheme();


const ParticularTrainView = () => {
    const[train,setTrain]= useState(null);
    //const[uptrain,setUptrain]=useState(null);
    const trainid=window.location.href.split('/admin/adminlisttrain/')[1];
    const[jwt,setjwt] =UseLocalState("","jwt");
    const [anchorEl, setAnchorEl] = React.useState(null);

    function Deletetrain()
         {   
           if(window.confirm("Are you sure"))
           {
             fetch(`/trains/delete/${trainid}`,{
             headers:{
                 "Content-Type": "application/json",
                 Authorization: `Bearer ${jwt}`,
             },
             method: "DELETE",
         }).then((response) => {

             if(response.status===200)
             {
               //return response.json();
               window.location.href='/alltrain';
             }
            
            
         });
        }
    };

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


    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const  name = open ? 'simple-popover' : undefined;

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
                setTrain(traindata);
                setUptrain(traindata);
            });
    },);

    const handleSubmit = (event) => {
        event.preventDefault();
       // senddata();

      //  const data = new FormData(event.currentTarget);
       /* console.log({
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

        });*/
      };
    /* const handleChange=(e, id)=> {
        console.log(e.target.value);
        const newState = {
          item: this.state.item.map((x) =>
            x.id != id ? x : { id: id, trainName: e.target.value }
          )
        };
        this.setState(newState);
    };*/
    /*function handleChangeName(e, id) {
        console.log(e.target.value);
        const newState = {
          train: this.state.train.map((x) =>
            x.id != id ? x : { id: id, trainName: e.target.value }
          )
        };
        this.setState(newState);
    }*/
    
    


       
    return (
        <div>
            <AdminDashboard/>
            <ThemeProvider theme={theme}>
            <CssBaseline />
              <Container component="main"  maxWidth="l">
            <Box
                   component="span"
                    sx={{ marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        //width:'auto',
                        backgroundImage: `url(${Train})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover'}}>
                        <Card sx={{ 
                        //minWidth: 275
                        mt:3,
                        minWidth:'100px',
                       // maxWidth:"l",
                       display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        minHeight: '500px',
                        marginLeft: 5,
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
                            
                    <h1>Train Number: {trainid}</h1>
                     {train ? (
                        <>
                        
                        <Typography variant="h5" component="div">
                         <h3>Train Name :{train.trainName}</h3>
                        </Typography>
                        <Typography variant="h5" >
                          Train Source : {train.source}
                        </Typography>
                        <Typography variant="h5" >
                          Train Destination : {train.destination}
                        </Typography>
                        <Typography variant="h5" >
                          Price Per Kilometers  : {train.pricePerKms}
                        </Typography>
                        <Typography variant="h5" >
                          Total Number of Seats : {train.totalNumOfSeats}
                        </Typography>
                        <Typography variant="h5" >
                          Train Days :
                        </Typography>
                       {train.daysOfRunning.map((days)=>(
                        <Typography variant="h5" >
                            {days}
                        </Typography>
                        ))}
                        <Typography variant="h5" >
                          <h5>Train Route Details:</h5>
                        </Typography>
                        {train? (train.route.map((routes)=>(
                            <>
                             
                        <Typography variant="h5" >
                          Route Number : {routes.routeId}
                        </Typography>
                        <Typography variant="h5" >
                          Station Name : {routes.stationName}
                        </Typography>
                        <Typography variant="h5" >
                          Time Of Arrival : {routes.timeOfArrival}
                        </Typography>
                        <Typography variant="h5" >
                          Time Of Departure : {routes.timeOfDeparture}
                        </Typography>
                        <Typography variant="h5" >
                          Total Distance : {routes.totalDistance}
                        </Typography>
                      
                        </> ))):(<></>)}
                    
                        <Typography variant="h5" >
                          <h5>Train Classes :</h5>
                        </Typography>
                        {train? (train.trainClasses.map((classes)=>(
                            <>
                        <Typography variant="h5" >
                          Train Class Name : {classes.className}
                        </Typography>
                        <Typography variant="h5" >
                          price for class : {classes.price}
                        </Typography>
                        <Typography variant="h5" >
                          Number of Seats For Each Class : {classes.numOfSeats}
                        </Typography>
                        </> ))):(<></>)}
                        </>  ):(<></>)}
                      </CardContent>
                      <CardActions >
                      
                       
      <Button size="large" variant="outlined" 
        sx={{ display: "flex",
        justifyContent: "flex-end"   
     }} 
         color="error" onClick={Deletetrain}>Delete</Button>
      
      <Popover
        id={name}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
             

      </Popover>
                      </CardActions>
                    </Card>
                    </Box>
                    </Container>
                    </ThemeProvider>

        </div>
    );
};

export default ParticularTrainView;