import React, { useReducer } from 'react';
import axios from 'axios';
import BandMemberContext from './bandMemberContext';
import bandMemberReducer from './bandMemberReducer';
import {
  GET_BAND_MEMBER,
  UPDATE_BAND_MEMBER,
  BAND_MEMBER_ERROR,
  CLEAR_BAND_MEMBER_ERROR
} from '../types';

const BandMemberState = props => {
  const initialState = {
    bandUserMember: null,
    loading: true,
    error: null // add necessary state
  };

  const [state, dispatch] = useReducer(bandMemberReducer, initialState);

  // Signup Band Member --ALREADY IN AUTHSTATE.js (registerBandMember())
  // const signupBandMember = async bandMember => {
  //   try {
  //     const res = await axios.get('/api/member/bandmember/signup', bandMember);

  //     dispatch({
  //       type: SIGNUP_BAND_MEMBER,
  //       payload: res.data
  //     });
  //   } catch (err) {
  //     console.log(err);
  //     dispatch({
  //       type: BAND_MEMBER_ERROR,
  //       payload: err.response.msg
  //     });
  //   }
  // };

  // Get Band Member
  const getBandMember = async () => {
    try {
      const res = await axios.get('/api/member/band');

      dispatch({
        type: GET_BAND_MEMBER,
        payload: res.data
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: BAND_MEMBER_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Band Member
  const updateBandMember = async (memberid, instrumentid, bandMember) => {
    try {
      await axios.put(
        `/api/member/updatebandmember/${memberid}/${instrumentid}`,
        bandMember
      );
      dispatch({
        type: UPDATE_BAND_MEMBER,
        payload: bandMember
      });
    } catch (err) {
      console.log(err); // find out what error message comes from err
      dispatch({
        type: BAND_MEMBER_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Update Band Member
  const updateBand = async bandData => {
    try {
      await axios.put(`/api/band/update`, bandData);
      dispatch({
        type: UPDATE_BAND_MEMBER,
        payload: bandData
      });
    } catch (err) {
      console.log(err); // find out what error message comes from err
      dispatch({
        type: BAND_MEMBER_ERROR,
        payload: err.response.msg
      });
    }
  };

  // Clear Band Member Errors
  const clearBandMemberError = () =>
    dispatch({
      type: CLEAR_BAND_MEMBER_ERROR
    });

  return (
    <BandMemberContext.Provider
      value={{
        bandUserMember: state.bandUserMember,
        loading: state.loading,
        error: state.error,
        getBandMember,
        updateBandMember,
        updateBand,
        clearBandMemberError
      }}
    >
      {props.children}
    </BandMemberContext.Provider>
  );
};

export default BandMemberState;
