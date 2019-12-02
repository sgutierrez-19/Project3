import React, { useContext, useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../createLFM.style';
import { Fragment } from 'react';
import ListingsContext from '../../../../context/listings/listingsContext';

export default function lfgDistance({ nextStep }) {
  const classes = useStyles();
  const listingsContext = useContext(ListingsContext);
  const { updateNewListing, newListing } = listingsContext;
  const [newInstrument, setNewInstrument] = useState('');

  useEffect(() => {
    console.log('STATE', newListing);
  }, [newListing]);

  const updateListingInProgress = e => {
    e.preventDefault();
    let instrumentAdd = { instrument: newInstrument };
    updateNewListing(instrumentAdd);
    nextStep();
  };

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h2'>
          Let's get your listing started...
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component='h3' variant='h4'>
                What kind of musician are you looking for?
              </Typography>
              <FormControl className={classes.formControl}>
                <InputLabel id='demo-simple-select-label'>
                  Main Instrument
                </InputLabel>
                <Select
                  value={newInstrument}
                  onChange={e => setNewInstrument(e.target.value)}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                >
                  <MenuItem value={'Voice-Soprano'}>Voice-Soprano</MenuItem>
                  <MenuItem value={'Voice-Alto'}>Voice-Alto</MenuItem>
                  <MenuItem value={'Voice-Tenor'}>Voice-Tenor</MenuItem>
                  <MenuItem value={'Voice-Bas'}>Voice-Bass</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={updateListingInProgress}
          >
            Next
          </Button>
        </form>
      </div>
    </Fragment>
  );
}