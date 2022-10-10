import React, { useEffect, useState } from 'react';
import { UseLocalState } from '../util/UseLocalStorage';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AdminDashboard from './AdminDashboard';
import Train from '../Imgs/light3.jpg';
import Container from '@mui/material/Container';
import {Navigate,useNavigate} from 'react-router-dom';




const ViewTrain = () => {
    const navigate = useNavigate();

    const[trains,setTrains]=useState(null);
    const[jwt,setjwt] =UseLocalState("","jwt");
    useEffect(()=> {
        
        fetch("admin/adminlistalltrain",{
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
                method: "GET",
            }).then((response) => {
                if(response.status===200)
                    return response.json();
            })
            .then((trainsdata)=>{
                setTrains(trainsdata);
            });
    },);
  
   /* .then((trainsdata)=>{
        setTrains(trainsdata);
    });*/
  
    return (
        <>
        <AdminDashboard/>
        {trains? (trains.map((train)=>(
        
            <Box
    component="span"
    sx={{  mx: '2px',marginTop: 8,
    display: 'flex',float:'left' }}>
    <Card sx={{ 
        //minWidth: 275
        mt:3,
        width:'330px',
        height: '350px',
        marginLeft: 6,
        backgroundImage: `url(${Train})`,
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
        <Typography variant="h6" color="text.secondary">
          Train Source : {train.source}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Train Destination : {train.destination}
        </Typography>
      </CardContent>
      <CardActions >
        <Button size="large" variant="outlined" 
       sx={{ display: "flex",
       justifyContent: "flex-end"
     
        //marginLeft: 2,
        //marginRight:2,marginBottom:3,
    }} 
        color="success" onClick={()=>navigate(`/admin/adminlisttrain/${train.trainId}`)}>More Details</Button>
    
      </CardActions>
    </Card>
    </Box>
        ))): <></>}

        </>
    );
};

export default ViewTrain;