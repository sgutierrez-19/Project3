import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import Typography from '@material-ui/core/Typography';
import { useStyles } from '../../createSignup.style';
import { Fragment, useState, useContext } from 'react';
import AuthContext from '../../../../../context/auth/authContext';
import UserMemberContext from '../../../../../context/userMember/userMemberContext';

export default function CreateBandMember({ prevStep }) {
  const classes = useStyles();
  const [newName, setNewName] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newZipcode, setNewZipcode] = useState('');
  const [newInstrument, setNewInstrument] = useState('');
  const [newPicture, setNewPicture] = useState('');
  const authContext = useContext(AuthContext);
  const { registerBandMember } = authContext;
  const userMemberContext = useContext(UserMemberContext);
  const { instruments } = userMemberContext;

  const updateListingInProgress = e => {
    e.preventDefault();
    let obj = {
      bMemberName: newName,
      bMemberCity: newCity,
      bMemberState: newState,
      bMemberZipcode: newZipcode,
      instrument: newInstrument,
      bMemberProfilePicture: newPicture
    };
    console.log(obj);
    registerBandMember(obj);
    prevStep();
  };

  return (
    <Fragment>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonAddOutlinedIcon />
        </Avatar>
        <Typography className={classes.subHeader} component='h4' variant='h4'>
          Tell us about your bandmate:
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid className={classes.formSpace} item xs={12}>
              <TextField
                className='adTextBoxHeight'
                variant='outlined'
                required
                fullWidth
                id='name'
                label='First Name'
                name='name'
                value={newName}
                onChange={e => setNewName(e.target.value)}
              />
            </Grid>
            <Grid className={classes.formSpace} item xs={4}>
              <TextField
                className='adTextBoxHeight'
                variant='outlined'
                required
                fullWidth
                id='city'
                label='City'
                name='city'
                value={newCity}
                onChange={e => setNewCity(e.target.value)}
              />
            </Grid>
            <Grid className={classes.formSpace} item xs={4}>
              <TextField
                className='adTextBoxHeight'
                variant='outlined'
                required
                fullWidth
                id='state'
                label='State'
                name='state'
                value={newState}
                onChange={e => setNewState(e.target.value)}
              />
            </Grid>
            <Grid className={classes.formSpace} item xs={4}>
              <TextField
                className='adTextBoxHeight'
                variant='outlined'
                required
                fullWidth
                id='zipcode'
                label='Zipcode'
                name='zipcode'
                value={newZipcode}
                onChange={e => setNewZipcode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl className={classes.formControlInside}>
                <InputLabel id='demo-simple-select-label'>
                  Main Instrument
                </InputLabel>
                <Select
                  value={newInstrument}
                  onChange={e => setNewInstrument(e.target.value)}
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                >
                  {instruments.map(instrument => {
                    return (
                      <MenuItem key={instrument} value={instrument}>
                        {instrument}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid className={classes.formControl} item xs={12}>
              <TextField
                className='adTextBoxHeight'
                variant='outlined'
                required
                fullWidth
                id='profilePicture'
                label='Profile Picture'
                name='profilePicture'
                value={newPicture}
                onChange={e => setNewPicture(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={prevStep}
              >
                Back
              </Button>
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={5}>
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
            </Grid>
          </Grid>
        </form>
      </div>
    </Fragment>
  );
}
