import React, { Fragment, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';

import ListingsContext from '../../../../context/listings/listingsContext';

import { useStyles } from './listings.style';

export default function Listings({ listings }) {
  const listingsContext = useContext(ListingsContext);
  const { setCurrent } = listingsContext;

  const descListings = listings && listings[0].reverse();

  const classes = useStyles();
  return (
    <Fragment>
      <Typography component='h1' variant='h4' className={classes.title}>
        Listings
      </Typography>
      {// listings && listings[0]
      descListings &&
        descListings.map(listing => {
          return (
            <Card key={listing.id} className={classes.card}>
              <CardMedia
                className={classes.cover}
                image='https://picsum.photos/200'
                title='Live from space album cover'
              />
              <CardContent className={classes.content}>
                <Typography component='h5' variant='h6'>
                  {listing.ad}
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                  {listing.city}
                  {', '}
                  {listing.state}
                </Typography>
              </CardContent>
              <CardContent className={classes.view}>
                <Fab
                  variant='extended'
                  color='primary'
                  aria-label='add'
                  onClick={() => setCurrent(listing)}
                >
                  View
                </Fab>
              </CardContent>
            </Card>
          );
        })}
    </Fragment>
  );
}
