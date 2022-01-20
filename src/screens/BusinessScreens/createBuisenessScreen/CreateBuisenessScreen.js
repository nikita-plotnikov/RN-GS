import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { CREATE_BUISENESS } from '../../../apollo/mutations/createBuisenessMutation';
import { GET_BUSINESS_TYPES } from '../../../apollo/queries/getBusinessTypes';
import AppBackground from '../../../components/AppBackground';
import { requireValidator } from '../../../core/helpers/requireValidator';
import CreateBuisenessStep1 from './steps/CreateBuisenessStep1';
import CreateBuisenessStep2 from './steps/CreateBuisenessStep2';
import CreateBuisenessStep3 from './steps/CreateBuisenessStep3';
import CreateBuisenessStep4 from './steps/CreateBuisenessStep4';
import CreateBuisenessStep5 from './steps/CreateBuisenessStep5';
import CreateBuisenessStep6 from './steps/CreateBuisenessStep6';

export default function CreateBuisenessScreen({ navigation, route }) {
  const [name, setName] = useState({ value: '', error: '' });
  const [type, setType] = useState({ value: '', id: '' });
  const [typeError, setTypeError] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState({ value: '', error: '' });
  const [services, setServices] = useState({ value: '', error: '' });
  const [date, setDate] = useState(new Date());
  const [region, setRegion] = useState({ value: '', error: '' });
  const [city, setCity] = useState({ value: '', error: '' });
  const [address, setAddress] = useState({ value: '', error: '' });
  const [availibleTime, setAvailibleTime] = useState({
    start: { hours: '00', minutes: '00' },
    end: { hours: '00', minutes: '00' },
  });
  const [site, setSite] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [attributes, setAttributes] = useState([{ name: '', value: '' }]);
  const [marker, setMarker] = useState(undefined);
  const [step, setStep] = useState(1);
  const { data, loading } = useQuery(GET_BUSINESS_TYPES);
  const back = route.name === 'BuisenessSettingsScreen' ? true : false;

  const [createBusinessMutation] = useMutation(CREATE_BUISENESS, {
    async onCompleted({ createBusiness }) {
      console.log('ON COMPLETED');
      const { created } = createBusiness;
      try {
        console.log('created', created);
        navigation.reset({
          routes: [{ name: back ? 'ProfileSettingScreen' : 'AppBottom' }],
        });
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  console.log('MARKER', marker);

  const getTypes = () => {
    const formatTypes = [];
    if (data && data.getScopedBusinessTypes) {
      data.getScopedBusinessTypes.map(item => {
        const newItem = {
          label: item.name,
          value: item.name,
          id: item.id,
        };
        formatTypes.push(newItem);
      });
      return formatTypes;
    }
  };

  const goToSecondStep = () => {
    const nameError = requireValidator(name.value);
    const typeErrorValid = requireValidator(type);
    if (nameError || typeErrorValid) {
      setName({ ...name, error: nameError });
      setTypeError(typeErrorValid);
    } else {
      setStep(2);
    }
  };

  const saveAndGoHomePage = () => {
    createBusinessMutation({
      variables: {
        title: name.value,
        scopeTypeId: type.id,
        typeBusiness: 'NEW',
        description: description.value ? description.value : null,
        address: address.value ? address.value : null,
        services: services.value ? services.value : null,
        region: region.value ? region.value : null,
        city: city.value ? city.value : null,
        latitude: marker ? marker.lat : null,
        longitude: marker ? marker.lon : null,
        email: email.value ? email.value : null,
        phone: phone.value ? phone.value : null,
        website: site.value ? site.value : null,
        operationHours: `${availibleTime.start.hours}:${availibleTime.start.minutes} - ${availibleTime.end.hours}:${availibleTime.end.minutes}`,
      },
    });
  };

  useEffect(() => {
    if (!loading) {
      const fortmatTypes = getTypes();
      setTypeList(fortmatTypes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const changeType = text => {
    const typeObj = data.getScopedBusinessTypes.find(
      item => item.name === text,
    );
    setType({ value: text, id: typeObj.id });
    setTypeError('');
  };

  const onChangeAttribute = (index, text, key) => {
    const newAttributes = [...attributes];
    if (key === 'name') {
      newAttributes[index] = { ...newAttributes[index], name: text };
      setAttributes(newAttributes);
    } else {
      newAttributes[index] = { ...newAttributes[index], value: text };
      setAttributes(newAttributes);
    }
  };

  const addAttribute = () => {
    const newAttributes = attributes.concat([{ name: '', value: '' }]);
    setAttributes(newAttributes);
  };

  const onBack = () => {
    setStep(step - 1);
  };

  const switchStep = () => {
    switch (step) {
      case 1:
        return (
          <AppBackground
            navigation={navigation}
            back={back}
            onBack={onBack}
            step={step}
            title={'Настройка бизнеса'}>
            <CreateBuisenessStep1
              name={name}
              setName={setName}
              type={type}
              typeError={typeError}
              changeType={changeType}
              typeList={typeList}
              navigation={navigation}
              photo={photo}
              setPhoto={setPhoto}
              goToSecondStep={goToSecondStep}
              back={back}
            />
          </AppBackground>
        );
      case 2:
        return (
          <AppBackground
            navigation={navigation}
            back={back}
            onBack={onBack}
            step={step}
            title={'Настройка бизнеса'}>
            <CreateBuisenessStep2
              navigation={navigation}
              description={description}
              setDescription={setDescription}
              services={services}
              setServices={setServices}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
              date={date}
              setDate={setDate}
              back={back}
            />
          </AppBackground>
        );
      case 3:
        return (
          <AppBackground
            navigation={navigation}
            back={back}
            onBack={onBack}
            step={step}
            title={'Настройка бизнеса'}>
            <CreateBuisenessStep3
              region={region}
              setRegion={setRegion}
              city={city}
              setCity={setCity}
              address={address}
              setAddress={setAddress}
              availibleTime={availibleTime}
              setAvailibleTime={setAvailibleTime}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
              back={back}
            />
          </AppBackground>
        );
      case 4:
        return (
          <AppBackground
            navigation={navigation}
            back={back}
            onBack={onBack}
            step={step}
            title={'Настройка бизнеса'}>
            <CreateBuisenessStep4
              site={site}
              setSite={setSite}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
              back={back}
            />
          </AppBackground>
        );
      case 5:
        return (
          <AppBackground
            navigation={navigation}
            back={back}
            onBack={onBack}
            step={step}
            title={'Настройка бизнеса'}>
            <CreateBuisenessStep5
              marker={marker}
              setMarker={setMarker}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
              back={back}
            />
          </AppBackground>
        );
      case 6:
        return (
          <AppBackground
            navigation={navigation}
            back={back}
            onBack={onBack}
            step={step}
            title={'Настройка бизнеса'}>
            <CreateBuisenessStep6
              attributes={attributes}
              onChangeAttribute={onChangeAttribute}
              addAttribute={addAttribute}
              saveAndGoHomePage={saveAndGoHomePage}
              back={back}
            />
          </AppBackground>
        );
    }
  };

  return (
    <>
      {loading ? (
        <AppBackground isLoading={true}>
          <ActivityIndicator size="large" />
        </AppBackground>
      ) : back ? (
        switchStep()
      ) : (
        <>
          {step === 1 && (
            <CreateBuisenessStep1
              name={name}
              setName={setName}
              type={type}
              typeError={typeError}
              changeType={changeType}
              typeList={typeList}
              navigation={navigation}
              photo={photo}
              setPhoto={setPhoto}
              goToSecondStep={goToSecondStep}
            />
          )}
          {step === 2 && (
            <CreateBuisenessStep2
              navigation={navigation}
              description={description}
              setDescription={setDescription}
              services={services}
              setServices={setServices}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
              date={date}
              setDate={setDate}
            />
          )}
          {step === 3 && (
            <CreateBuisenessStep3
              region={region}
              setRegion={setRegion}
              city={city}
              setCity={setCity}
              address={address}
              setAddress={setAddress}
              availibleTime={availibleTime}
              setAvailibleTime={setAvailibleTime}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
            />
          )}
          {step === 4 && (
            <CreateBuisenessStep4
              site={site}
              setSite={setSite}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
            />
          )}
          {step === 5 && (
            <CreateBuisenessStep5
              marker={marker}
              setMarker={setMarker}
              saveAndGoHomePage={saveAndGoHomePage}
              setStep={setStep}
            />
          )}
          {step === 6 && (
            <CreateBuisenessStep6
              attributes={attributes}
              onChangeAttribute={onChangeAttribute}
              addAttribute={addAttribute}
              saveAndGoHomePage={saveAndGoHomePage}
            />
          )}
        </>
      )}
    </>
  );
}
