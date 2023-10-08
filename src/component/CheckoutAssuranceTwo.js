import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'; 
import Spinner from 'react-bootstrap/Spinner';
import $ from 'jquery'; 
import PDFASS from './PDFASS';
import AssuranceService from '../pages/AssuranceService';
import AddressAssuranceForm from './AddressAssuranceForm';

function Copyright() {
  return (
    <></>
  );
}

const steps = ['Shipping address'];
var     etat ="paye";
var     metricule="";
var     montant= "";
var     type="";
var     dateDebut="";
var     dateFin="";
function getStepContent(step,props) {
  switch (step) {
    case 0:
      metricule = props.metricule;
      montant = props.montant;
      type = props.type;
      dateDebut = props.dated;
      dateFin = props.fin;
      
      return <AddressAssuranceForm dated={props.dated} fin={props.fin} montant={props.montant} type={props.type} id={props.name} metricule={props.metricule}/>;

    default:
      throw new Error('Unknown step');
  }
  
}

const theme = createTheme();

export default function CheckoutAssuranceTwo(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [load, setLoad] = React.useState(0);
  const [facture, setFacture] = React.useState("");
  
  const payeFacture = async()=>{

    const factures = {
      etat: etat,
      metricule: metricule,
      montant: montant,
      type:type,
      dateDebut:dateDebut,
      dateFin:dateFin
};

    axios.post("http://192.168.48.31:8085/facture-new",factures)
  //console.log("test");
    //console.log(facture);
    
        // Handle the response from backend here
        .then((res) => {
            setActiveStep(activeStep + 1)
            console.log(res.data)
            setFacture(res.data);
      //      setLoad(0)
        })
    
        // Catch errors if any
       // .catch((err) => { 
         
      //  });
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
    //AssuranceService.handleUpload()
    //setActiveStep(0);
    window.location.reload();
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
                <PDFASS facture = {facture}/></Grid>
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
                >
               
               Confirm payment
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