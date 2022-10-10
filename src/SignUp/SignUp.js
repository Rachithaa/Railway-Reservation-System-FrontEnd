import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SubwayIcon from '@mui/icons-material/Subway';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import light1 from '../Imgs/light3.jpg';
import light2 from '../Imgs/light2.jpg';
import Validator from '../Validator/Validator';
import Train from '../Imgs/Train3.jpg';
import Homepage from '../Homepage/HomepageDashboard';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { UseLocalState } from '../util/UseLocalStorage';
import { UseLocalEmailStorage } from '../util/UseLocalEmailStorage';
import { UseLocalPasswordStorage } from '../util/UseLocalPasswordStorage';
import { UseLocalNameStorage } from '../util/UseLocalNameStorage';
import { red } from '@mui/material/colors';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Railway Reservation
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function SignUp() {
    const[jwt,setjwt] =UseLocalState("","jwt");
    const[email,setEmail]=useState("","email");
    const[password,setPassword]=useState("","password");
    const[phone,setPhone]=useState(null);
    const[address,setAddress]=useState(null);
    const[name,setName]=useState(null);
    const [validator, showValidationMessage] = Validator();
    
  
     function sendreq () {
       
       if(!jwt)
       {
       const req={
        passengerPassword:password,
        passengerEmail: email,
        passengerName: name,
        passengerPhone: phone,
        passengerAddress:address   
      };
      fetch("/passenger/auth/signup",{
        headers: {
         // Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: "POST",
        body: JSON.stringify(req),
      })
      //.then((response)=> response.json())
      //.then((data)=>console.log(data));
      .then((response) =>
      {if(response.status===200) 
      {
         
          return Promise.all([response.json(),response.headers])
          
      }
      else
      {
           return Promise.reject("SignUp Failed");
           
      }})
      .then((data)=>{
        window.location.href="/login";
       })
     /* .then((data)=>{
        window.location.href = "/login";
    })*/
      /*.then(([body,headers]) => {
        setjwt(headers.get("authorization"));
        window.location.href = "/admindashboard";})*/
       
        .catch((message)=>{alert(message)});
      }}
      

      const handleSubmit = (evt) => {
        if (validator.allValid()) {
          console.log("form submitted");
          evt.preventDefault();
          sendreq();
        } else {
          // validator.showMessages();
          // rerender to show messages for the first time
          showValidationMessage(true);
        }
      }

  return (
    <>
              <AppBar position="static" sx={{backgroundColor:"black", height: '12vh'}}>
            <Container maxWidth="xl" >
              <Toolbar disableGutters="true">
                <SubwayIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 ,mt:2}} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="/"
                  sx={{
                    mt:2,
                    mr: 5,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 1000,
                    fontSize: 23,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  RAILYWAY RESERVATION
                </Typography>
      
                <SubwayIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href=""
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  RAILYWAY RESERVATION
                </Typography>

                    </Toolbar>
                    </Container>
                    </AppBar>

    <ThemeProvider theme={theme}>
     <Container component="main"  maxWidth="l" disableGutters={true} sx={{backgroundImage: `url(${light2})`,
            backgroundSize:'cover',height:"100vh"}} >
      <Container component="main" maxWidth="xs" sx={{backgroundImage: `url(${light1})`,
            backgroundSize:'cover',height:"100vh"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
           // backgroundImage: `url(${light1})`,
            //backgroundSize:'cover',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main',mt:6 }}>
          <LoginTwoToneIcon/>
              <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  //autoComplete="given-name"
                  name="passengerName"
                  required
                  fullWidth
                  id="passengerName"
                  label="Name"
                  onChange={e=>setName(e.target.value)}
                />
            <span style={{ color: "red" }}>   {validator.message("passengerName", name, 
              [
              "required",
              {min:3},
              {max:15},
                            {regex:"^[A-Za-z\\s]+$"},

              ],
              {
            messages: {
            required: "Name is required",
            min:"The Name should be atleast three character",
            max:"The Name should be atmost fifteen character",
            regex:"Only alphabets and spaces are allowed is allowed",
        
        },
        }
      )}</span>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="passengerEmail"
                  label="Email Address"
                  name="passengerEmail"
                  autoComplete="email"
                  onChange={e=>setEmail(e.target.value)}
                />
         <span style={{ color: "red" }}>   {validator.message("passengerEmail", email, 
              [
              "required",
              {min:15},
              {max:20},
               {regex:"^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,})+$"},

              ],
              {
            messages: {
            required: "Email is required",
            min:"The Email should be atleast fifteen character length",
            max:"The Email should be atmost twenty character length",
            regex:"It should be in format abc@gmail.com",
        
        },
        }
      )}</span>     
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passengerPassword"
                  label="Password"
                  type="password"
                  id="passengerPassword"
                  onChange={e=>setPassword(e.target.value)}
                />
         <span style={{ color: "red" }}>
            {validator.message("passengerPassword", password, 
              [
              "required",

              {min:8},
              {max:20},
              {regex:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$)"},
             
              ],
              {
            messages: {
            required: "Password is required",
            min:"The Password should be atleast eight character length",
            max:"The Password should be atmost twenty character length",
            regex:"The password should contain at least one digit, at least one upper case alphabet,atleast one lower case alphabet, at least one special character and doesnot contain any white space.",
        
        },
        }
      )}</span>   
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="passengerPhone"
                  label="Contact Number"
                  name="passengerPhone"
                  onChange={e=>setPhone(e.target.value)}
                  
                />
             <span style={{ color: "red" }}>  
              {validator.message("passengerPhone", phone, 
              [
              "required",
              {regex:"^\\d{10}$"},
              ],
              {
            messages: {
            required: "Contact Number is required",
            regex:"It should be of 10 digits not any alphabet not any special character",
        },
        }
      )}</span> 
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="passengerAddress"
                  label="Address"
                  name="passengerAddress"
                  onChange={e=>setAddress(e.target.value)}
                />
                <span style={{ color: "red" }}>   
                {validator.message("passengerAddress", address, 
              [
              "required",
              {regex:"^[A-Za-z0-9 \\-:/()]+$"},
              {min:10},
              {max:50},
             
              ],
              {
            messages: {
            required: "Address is required",
            min:"The Address should be atleast 10 character length",
            max:"The Address should be atmost 50 character length",
            regex:"address can have alphabets and numbers and special character such as(-,:,/,())",
        
        },
        }
      )}</span>
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 6 }} />
      </Container>
      </Container>
    </ThemeProvider>
    </>
  );
}

export default SignUp;