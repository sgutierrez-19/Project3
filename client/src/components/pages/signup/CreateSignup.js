import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import InstrumentComponent from './1-instrument/InstrumentComponent';
import LocationComponent from './2 - location/LocationComponent';
import YoutubeComponent from './3-youtube/YoutubeComponent';
import AdDescriptionComponent from './4-adDescription/AdDescriptionComponent';
import Container from '@material-ui/core/Container';

export default function SignUp() {
  let history = useHistory();

  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const switchPage = () => {
    switch (step) {
      case 1:
        return <InstrumentComponent nextStep={nextStep} />;
      case 2:
        return <LocationComponent nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <YoutubeComponent nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return (
          <AdDescriptionComponent nextStep={nextStep} prevStep={prevStep} />
        );
      case 5:
        console.log('yay');
        break;
      default:
        history.push('/');
    }
  };

  return (
    <Container component='main' maxWidth='sm'>
      {switchPage()}
    </Container>
  );
}