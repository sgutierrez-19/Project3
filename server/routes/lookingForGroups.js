// Requiring our models and passport as we've configured it
var db = require('../models');
// var passport = require('../config/passport');
const router = require('express').Router();

// var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

// Individual - create listing
// @desc -   Create LFG listing
// @route - api/lfg/create
// @access - private
// Db.lfg.create
//isAuthenticatedData, ... to be added after testing
router.post('/api/listings/lfg/create', async (req, res) => {
  const {
    youtubeLink,
    city,
    state,
    zipcode,
    distance,
    ad,
    instrument
  } = req.body;
  try {
    if (!req.body.city) {
      return res.status(500).send('The city field cannot be blank');
    } else if (!req.body.state) {
      return res.status(500).send('The state field cannot be blank');
    } else if (!req.body.zipcode) {
      return res.status(500).send('The zip code field cannot be blank');
    } else if (!req.body.distance) {
      return res
        .status(500)
        .send('Please select a distance you are willing to travel');
    } else if (!req.body.ad) {
      return res.status(500).send('The ad text cannot be left blank');
    } else if (!req.body.instrument) {
      return res.status(500).send('You must select your instrument');
    }
    const member = await db.Member.findOne({
      where: {
        UserId: req.user.id
      }
    });
    const newListing = {
      youtubeLink,
      city,
      state,
      zipcode,
      distance,
      ad,
      instrument,
      MemberId: member.id
    };
    const listing = await db.lfg.create(newListing);
    res.json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc -  Upon load of discovery page, load LFG based off usermember location - hard coded for now....need to figure out geolocation/mysql
// @route - /api/listings/lfg/:zipcode
// @access - private
router.get('/api/listings/lfg/general/:zipcode', async (req, res) => {
  try {
    const loadlfgDiscovery = await db.lfg.findAll({
      where: {
        zipcode: req.params.zipcode
      },
      include: [{ model: db.Member, include: [db.User] }]
    });
    res.json(loadlfgDiscovery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc -  search LFG
// @route - api/lfg/searchlfg
// @access - private
router.post('/api/listings/lfg/search', async (req, res) => {
  try {
    const { city, state, zipcode, instrument } = req.body;
    const searchWhat = {};
    if (city) searchWhat.city = city;
    if (state) searchWhat.state = state;
    if (zipcode) searchWhat.zipcode = zipcode;
    if (instrument) searchWhat.instrument = instrument;
    const loadlfgDiscovery = await db.lfg.findAll({
      where: searchWhat,
      include: [{ model: db.Member, include: [db.User] }]
    });
    console.log('in route: ', searchWhat);

    res.json(loadlfgDiscovery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc -  delete usermember lfg
// @route - api/listings/lfg/delete
// @access - private

router.delete('/api/listings/lfg/delete/:id', async (req, res) => {
  try {
    const lfg = await db.lfg.destroy({
      where: {
        id: req.params.id,
        MemberId: req.user.id
      }
    });
    console.log('Deleted');
    res.json({
      message: `Your looking-for-group listing was deleted successfully`
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
