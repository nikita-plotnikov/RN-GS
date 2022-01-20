import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
import AppBackground from '../../../components/AppBackground';
import { emailValidator } from '../../../core/helpers/emailValidator';
import { phoneValidator } from '../../../core/helpers/phoneValidator';
import { requireValidator } from '../../../core/helpers/requireValidator';
// import { theme } from '../../../core/theme';
import TeamMemberStep1 from './steps/TeamMemberStep1';
import TeamMemberStep2 from './steps/TeamMemberStep2';
// import auth from '@react-native-firebase/auth';

export default function TeamMemberScreen({ navigation }) {
  const [firstName, setFirstName] = useState({ value: '', error: '' });
  const [secondName, setSecondName] = useState({ value: '', error: '' });
  const [middleName, setMiddleName] = useState({ value: '', error: '' });
  const [email, setEmail] = useState({ value: '', error: '' });
  const [phone, setPhone] = useState({ value: '', error: '' });
  const [status, setStatus] = useState({ value: '', error: '' });
  const [business, setBusiness] = useState({ value: '', error: '' });
  const [role, setRole] = useState({ value: '', error: '' });
  const [step, setStep] = useState(1);

  const saveMember = () => {
    const statusError = requireValidator(status.value);
    const businessError = requireValidator(business.value);
    const roleError = requireValidator(role.value);
    if (statusError || businessError || roleError) {
      setStatus({ ...status, error: statusError });
      setBusiness({ ...business, error: businessError });
      setRole({ ...role, error: roleError });
    } else {
      console.log('SAVE');
    }
  };

  const onBack = () => {
    setStep(step - 1);
  };

  const nextStep = () => {
    const firstNameError = requireValidator(firstName.value);
    const secondNameError = requireValidator(secondName.value);
    const emailError = emailValidator(email.value);
    const phoneError = phoneValidator(phone.value);
    if (firstNameError || secondNameError || emailError || phoneError) {
      setFirstName({ ...firstName, error: firstNameError });
      setSecondName({ ...secondName, error: secondNameError });
      setEmail({ ...email, error: emailError });
      setPhone({ ...phone, error: phoneError });
    } else {
      setStep(2);
    }
  };

  return (
    <>
      <AppBackground
        navigation={navigation}
        isProfile={true}
        back={true}
        onBack={onBack}
        step={step}
        title={'Добавить сотрудника'}>
        {step === 1 && (
          <TeamMemberStep1
            setStep={nextStep}
            firstName={firstName}
            setFirstName={setFirstName}
            secondName={secondName}
            setSecondName={setSecondName}
            middleName={middleName}
            setMiddleName={setMiddleName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
        )}
        {step === 2 && (
          <TeamMemberStep2
            status={status}
            setStatus={setStatus}
            business={business}
            setBusiness={setBusiness}
            role={role}
            setRole={setRole}
            saveMember={saveMember}
          />
        )}
      </AppBackground>
    </>
  );
}

// const styles = StyleSheet.create({
//   button: {
//     width: '95%',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginVertical: 10,
//   },
//   firstButton: {
//     marginTop: 20,
//   },
//   firstGroupInButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingStart: 10,
//   },
//   textButton: {
//     fontSize: 18,
//     paddingStart: 10,
//     fontWeight: 'bold',
//   },
//   rightIcon: {
//     backgroundColor: theme.colors.tint,
//   },
// });
