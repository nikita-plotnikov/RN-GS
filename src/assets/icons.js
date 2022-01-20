import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const GoogleLogo = () => (
  <Svg width="24" height="24" viewBox="0 0 256 256">
    <Path
      fill="#e24e3c"
      d="M127 0h7c31 1 61 12 84 33l-37 35a73 73 0 0 0-41-18 79 79 0 0 0-84 52L14 70c8-16 20-30 33-41C70 11 98 1 127 0z"
    />
    <Path
      fill="#f7c243"
      d="M0 125c0-19 5-38 14-55l42 32c-5 17-5 35 0 51l-42 32c-9-17-13-36-14-55v-5z"
    />
    <Path
      fill="#4b87f5"
      d="M131 104h122c4 16 3 32 1 48-3 27-16 54-37 72l-41-31c14-9 24-25 27-41h-72v-48z"
    />
    <Path
      fill="#55a85a"
      d="M56 153a78 78 0 0 0 71 53c17 0 35-3 49-13l41 31c-16 14-35 24-56 28a130 130 0 0 1-147-67l42-32z"
    />
  </Svg>
);

export const ProfileIcon = ({ fill }) => (
  <Svg viewBox="0 0 24 24" width="24" height="24" fill={fill}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </Svg>
);

export const HomeIcon = ({ fill }) => (
  <Svg width="24" height="24" fill={fill}>
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </Svg>
);

export const SettingsIcon = ({ fill }) => (
  <Svg viewBox="0 0 24 24" width="24" height="24" fill={fill}>
    <Path d="M0,0h24v24H0V0z" fill="none" />
    <Path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
  </Svg>
);
