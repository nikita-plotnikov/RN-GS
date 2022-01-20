import React, { useState } from 'react';
import RegistrationProfileFirstStep from './steps/RegistrationProfileFirstScreen';
import RegistrationProfileSecondStep from './steps/RegistrationProfileSecondStep';
import { requireValidator } from '../../../core/helpers/requireValidator';
import { phoneValidator } from '../../../core/helpers/phoneValidator';

export default function RegistrationProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [secondName, setSecondName] = useState({ value: '', error: '' });
  const [middleName, setMiddleName] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [region, setRegion] = useState({ value: '', error: '' });
  const [city, setCity] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const goBack = () => {
    setStep(1);
  };

  const onNextPressed = () => {
    const firstNameError = requireValidator(firstName.value);
    const secondNameError = requireValidator(secondName.value);
    const phoneError = phoneValidator(phone.value);
    if (firstNameError || secondNameError || phoneError) {
      setFirstName({ ...firstName, error: firstNameError });
      setSecondName({ ...secondName, error: secondNameError });
      setPhone({ ...phone, error: phoneError });
    } else {
      setStep(2);
    }
  };

  const onSavePressed = async () => {
    const regionError = requireValidator(region.value);
    const cityError = requireValidator(city.value);
    const addressError = requireValidator(address.value);
    if (regionError || cityError || addressError) {
      setRegion({ ...region, error: regionError });
      setCity({ ...city, error: cityError });
      setAddress({ ...address, error: addressError });
    } else {
      setLoading(true);
      const formatProfile = {
        firstName: firstName.value,
        secondName: secondName.value,
        middleName: middleName.value,
        phone: phone.value,
        address: {
          region: region.value,
          city: city.value,
          address: address.value,
        },
      };
      navigation.reset({
        routes: [{ name: 'AppBottom' }],
      });
    }
  };
  return (
    <>
      {step === 1 ? (
        <RegistrationProfileFirstStep
          firstName={firstName}
          setFirstName={setFirstName}
          middleName={middleName}
          setMiddleName={setMiddleName}
          secondName={secondName}
          setSecondName={setSecondName}
          phone={phone}
          setPhone={setPhone}
          onNextPressed={onNextPressed}
          navigation={navigation}
        />
      ) : (
        <RegistrationProfileSecondStep
          region={region}
          setRegion={setRegion}
          city={city}
          setCity={setCity}
          address={address}
          setAddress={setAddress}
          loading={loading}
          navigation={navigation}
          onSavePressed={onSavePressed}
          goBack={goBack}
        />
      )}
    </>
  );
}
