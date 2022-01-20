import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AuthLoadingScreen,
  LoginScreen,
  RegisterScreen,
  RegistrationProfileScreen,
  CreateBuisenessScreen,
  ResetPasswordScreen,
  StartScreen,
} from './src/screens';
import AppBottomTabs from './src/components/AppBottomTabs';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="AuthLoadingScreen"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="ResetPasswordScreen"
            component={ResetPasswordScreen}
          />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen
            name="RegistrationProfileScreen"
            component={RegistrationProfileScreen}
          />
          <Stack.Screen
            name="CreateBuisenessScreen"
            component={CreateBuisenessScreen}
          />
          <Stack.Screen name="AppBottom" component={AppBottomTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
