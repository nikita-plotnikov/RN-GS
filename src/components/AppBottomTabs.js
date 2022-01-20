import React from 'react';
import {
  AddressChangeScreen,
  BusinessRolesScreen,
  CreateBuisenessScreen,
  EditBusinessRoleScreen,
  EmailChangeScreen,
  HomeScreen,
  MoreScreen,
  NameChangeScreen,
  PasswordChangeScreen,
  PhoneChangeScreen,
  ProfileBusinessScreen,
  ProfileSettingScreen,
  TeamMemberScreen,
  TeamScreen,
} from '../screens';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { theme } from '../core/theme';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createMaterialBottomTabNavigator();

const MoreStack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

const CRMStack = createNativeStackNavigator();

function MoreStackScreen() {
  return (
    <MoreStack.Navigator
      initialRouteName="MoreScreen"
      screenOptions={{ headerShown: false }}>
      <MoreStack.Screen name="MoreScreen" component={MoreScreen} />
      <MoreStack.Screen
        name="ProfileSettingScreen"
        component={ProfileSettingScreen}
      />
      <MoreStack.Screen
        name="EmailChangeScreen"
        component={EmailChangeScreen}
      />
      <MoreStack.Screen name="NameChangeScreen" component={NameChangeScreen} />
      <MoreStack.Screen
        name="PasswordChangeScreen"
        component={PasswordChangeScreen}
      />
      <MoreStack.Screen
        name="PhoneChangeScreen"
        component={PhoneChangeScreen}
      />
      <MoreStack.Screen
        name="AddressChangeScreen"
        component={AddressChangeScreen}
      />
      <MoreStack.Screen
        name="BuisenessSettingsScreen"
        component={CreateBuisenessScreen}
        options={{ title: 'Настройки бизнеса' }}
      />
      <MoreStack.Screen
        name="ProfileBusinessScreen"
        component={ProfileBusinessScreen}
      />
      <MoreStack.Screen
        name="BusinessRolesScreen"
        component={BusinessRolesScreen}
      />
      <MoreStack.Screen
        name="EditBusinessRoleScreen"
        component={EditBusinessRoleScreen}
      />
      <MoreStack.Screen name="TeamScreen" component={TeamScreen} />
      <MoreStack.Screen name="TeamMemberScreen" component={TeamMemberScreen} />
    </MoreStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    </HomeStack.Navigator>
  );
}

function CRMStackScreen() {
  return <CRMStack.Navigator></CRMStack.Navigator>;
}

export default function AppBottomTabs() {
  return (
    <Tab.Navigator
      labeled={true}
      barStyle={{ backgroundColor: theme.colors.primary }}>
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Главная',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="CRMStackScreen"
        component={CRMStackScreen}
        options={{
          tabBarLabel: 'CRM',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chart-donut-variant"
              color={color}
              size={26}
            />
          ),
        }}
        listeners={{
          tabPress: e => {
            // Prevent default action
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="MoreStackScreen"
        component={MoreStackScreen}
        options={{
          tabBarLabel: 'Еще',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="dots-horizontal"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
