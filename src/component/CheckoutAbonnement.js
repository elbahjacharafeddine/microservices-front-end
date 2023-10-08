import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import axios from 'axios'; 
import Spinner from 'react-bootstrap/Spinner';
import $ from 'jquery'; 
import WaterService from '../pages/WaterService';
import PDFAbonnement from './PDFAbonnement';

function Copyright() {
  return (
    <></>
  );
}

const steps = ['Shipping address'];

function getStepContent(step,props) {
  switch (step) {
    case 0:
      return <AddressForm year={props.year} month={props.month} montant={props.montant} type={props.type} id={props.name}/>;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function CheckoutAbonnement(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [load, setLoad] = React.useState(0);
  const [abonnement, setAbonnement] = React.useState("");
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem("user")));
  
  const payeFacture = async()=>{
    setLoad(1)
    axios({
        // Endpoint to send files
        url: "http://192.168.48.118:8086/userAbonnement/"+user.id+"/pay_abonnement/"+props.name,
        method: "GET",
        })
    
        // Handle the response from backend here
        .then((res) => {

            setActiveStep(activeStep + 1)
            console.log(res.data)
            setAbonnement(res.data);
            setLoad(0)
        })
    
        // Catch errors if any
        .catch((err) => { 
         
        });
}
//   setActiveStep(props.cm);
React.useEffect(()=>{
    setActiveStep(parseInt(props.cm));
},[])
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handle = () => {
    setActiveStep(0);
  };

  return (
    
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          
          
          
          
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
              your operation was successful              </Typography>
              <Typography variant="subtitle1">
              your operation was successful. check your email to receive you confirmation receipt.
              </Typography>
              <Grid container spacing={3}>
              <Button
                  variant="contained"
                  onClick={handle}
                  sx={{ mt: 3, ml: 1 }}
                  data-dismiss="modal"
                >
                 Done
                </Button>
                <PDFAbonnement abonnement = {abonnement}/></Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep,props)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }} >
                    Back
                  </Button>
                )}
                
                <Button
                  id="btn"
                  variant="contained"
                  onClick={payeFacture}
                  sx={{ mt: 3, ml: 1 }}
                >{load == 1?
                    <Spinner animation="border" variant="light"/>
               :
               ' Confirm payment'}
                </Button>
              </Box>
            </React.Fragment>
          )}
          
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
    
  );
}