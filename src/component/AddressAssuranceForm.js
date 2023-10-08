import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
export default function AddressAssuranceForm(props) {
    

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
      Payment confirmation      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
          value={props.dated}
          variant='outlined'
          inputProps={
              { readOnly: true, }
          }
            id="year"
            name="year"
            label="Start Date"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           value={props.fin}
           variant='outlined'
           inputProps={
               { readOnly: true, }
           }
            id="month"
            name="month"
            label="Fin date"
            fullWidth
            
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
          value={props.montant}
          variant='outlined'
          inputProps={
              { readOnly: true, }
          }
            id="montant"
            name="montant"
            label="montant"
            fullWidth
           
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
           value={props.type}
           variant='outlined'
           inputProps={
               { readOnly: true, }
           }
            id="type"
            name="type"
            label="type"
            fullWidth
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={new Date().toISOString().split('T')[0]}
            variant='outlined'
            inputProps={
                { readOnly: true, }
            }
            id="date Payement"
            name="date Payement"
            label="date Payement"
            fullWidth
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
           value={props.metricule}
           variant='outlined'
           inputProps={
               { readOnly: true, }
           }
            id="type"
            name="type"
            label="Matricule"
            fullWidth
           
          />
        </Grid>
        
        
       
      </Grid>
    </React.Fragment>
  );
}