// Requiring our models and passport as we've configured it
var db = require('../models');
var passport = require('../config/passport');
const router = require('express').Router();

var isAuthenticatedData = require('../config/middleware/isAuthenticatedData');

router.get('/api/member/band', async (req, res) => {
  try {
    const member = await db.Member.findOne({
      where: {
        UserId: req.user.id
      }
    });
    const band = await db.Band.findOne({
      where: {
        UserId: req.user.id
      }
    });
    const bandMembers = await db.BandMember.findAll({
      where: { BandId: band.id }
    });

    const bandMembersInfo = [];
    for (let i = 0; i < bandMembers.length; i++) {
      const bandMembersInfoProcess = await db.Member.findOne({
        where: {
          id: bandMembers[i].MemberId
        }
      });
      const memberInstrumentsProcess = await db.MemberInstrument.findAll({
        where: {
          MemberId: bandMembers[i].MemberId
        }
      });
      bandMembersInfo.push({
        bandmember: bandMembers[i],
        member: bandMembersInfoProcess,
        memberinstrument: memberInstrumentsProcess
      });
    }
    res.json({
      userMember: member,
      band,
      bandMembersInfo
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// @desc -  additional band member creation - does not have userID
// @route - api/band/bandmember
// @access - private
// Db.member.create;
// Db.memberinstrument.create;
// db.bandmember.create;
//
router.post('/api/member/bandmember/signup', async (req, res) => {
  try {
    if (!req.body.bMemberName) {
      return res.status(500).send('The name field cannot be blank');
    } else if (!req.body.bMemberCity) {
      return res.status(500).send('The city field cannot be blank');
    } else if (!req.body.bMemberState) {
      return res.status(500).send('The state field cannot be blank');
    } else if (!req.body.bMemberZipcode) {
      return res.status(500).send('The zip code field cannot be blank');
    } else if (!req.body.instrument) {
      return res.status(500).send('The instrument field cannot be blank');
    }
    const band = await db.Band.findOne({
      where: {
        UserId: req.user.id
      }
    });
    const member = await db.Member.create({
      memberName: req.body.bMemberName,
      city: req.body.bMemberCity,
      state: req.body.bMemberState,
      zipcode: req.body.bMemberZipcode,
      latitude: req.body.bMemberLatitude,
      longitude: req.body.bMemberLongitude,
      profilePicture: req.body.bMemberProfilePicture,
      createdByUserId: req.user.id
    });
    const memberInstrument = await db.MemberInstrument.create({
      instrument: req.body.instrument,
      MemberId: member.id
    });
    const bandMember = await db.BandMember.create({
      instrument: req.body.instrument,
      MemberId: member.id,
      BandId: band.id
    });
    res.json({ member, memberInstrument, bandMember });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

// @desc -  route for usermember to update, (if that                   member               doesn't have an associated UserId AND usermember was the                        user to create them originally), a band members name and instrument             in the MEMBER, MEMBERINSTRUMENT, and BANDMEMBER tables
// @route - api/member/updategroupmember
// @access - private
router.put(
  '/api/member/updatebandmember/:memberid/:instrumentid',
  async (req, res) => {
    try {
      if (req.body.memberName) {
        const { memberName, city, state, zipcode, profilePicture } = req.body;
        const toUpdateMember = {};
        if (memberName) toUpdateMember.memberName = memberName;
        if (city) toUpdateMember.city = city;
        if (state) toUpdateMember.state = state;
        if (zipcode) toUpdateMember.zipcode = zipcode;
        if (profilePicture) toUpdateMember.profilePicture = profilePicture;
        const memberToUpdate = await db.Member.findOne({
          where: {
            id: req.params.memberid,
            createdByUserId: req.user.id
          }
        });
        if (
          memberToUpdate.UserId !== null &&
          memberToUpdate.createdByUserId !== req.user.id
        ) {
          return res
            .status(500)
            .send(`You do not have permission to edit this member`);
        }
        await db.Member.update(toUpdateMember, {
          where: {
            id: req.params.memberid,
            createdByUserId: req.user.id
          }
        });
      }
      if (req.body.instrument) {
        const findMember = await db.MemberInstrument.findOne({
          where: {
            id: req.params.instrumentid
          },
          include: [db.Member]
        });
        if (
          findMember.Member.createdByUserId === req.user.id &&
          findMember.Member.UserId === null
        ) {
          await db.MemberInstrument.update(
            {
              instrument: req.body.instrument
            },
            {
              where: {
                MemberId: findMember.Member.id,
                id: req.params.instrumentid
              }
            }
          );
          await db.BandMember.update(
            {
              instrument: req.body.instrument
            },
            {
              where: { MemberId: findMember.Member.id }
            }
          );
        }
      } else {
        return res
          .status(500)
          .send(`You do not have permission to edit this member's instrument`);
      }
      res.json({ message: `Your band member was updated successfully` });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send('Server Error');
    }
  }
);

// @desc -  updates usermember's associated band table's name, location and band pic
// @route - api/band/update
// @access - private
router.put('/api/band/update', async (req, res) => {
  try {
    const { bandName, city, state, zipcode, bandPicture } = req.body;
    const toUpdate = {};
    if (bandName) toUpdate.bandName = bandName;
    if (city) toUpdate.city = city;
    if (state) toUpdate.state = state;
    if (zipcode) toUpdate.zipcode = zipcode;
    if (bandPicture) toUpdate.bandPicture = bandPicture;
    const band = db.Band.update(toUpdate, {
      where: {
        UserId: req.user.id
      }
    });
    res.json({ message: `Your band has been updated successfully` });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
