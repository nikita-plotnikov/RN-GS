# Gain Systems Frontend

Guide how to deploy project locally.

## Installation

1. Clone this repository.
2. Install [Node 12](https://computingforgeeks.com/install-node-js-14-on-ubuntu-debian-linux/) or newer.
3. Install [JDK](https://openjdk.java.net/) version at least 8.
4. Install [android studio](https://developer.android.com/studio).
   While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- `Android SDK`
- `Android SDK Platform`
- `Android Virtual Device`

4. Install the Android SDK
   Android Studio installs the latest Android SDK by default. Building a React Native app with native code, however, requires the `Android 10 (Q)` SDK in particular. Additional Android SDKs can be installed through the SDK Manager in Android Studio.

- `Android SDK Platform 29`
- `Intel x86 Atom_64 System Image` or `Google APIs Intel x86 Atom System Image`

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that `29.0.2` is selected.

5. Configure the ANDROID_HOME environment variable
   Add the following lines to your `$HOME/.bash_profile` or `$HOME/.bashrc` (if you are using zsh then `~/.zprofile` or `~/.zshrc`) config file:

```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

6. Follow the [Watchman installation guide](https://facebook.github.io/watchman/docs/install.html) to compile and install Watchman from source.
7. Using a virtual android device
   If you use Android Studio to open `gainsystems.front/android`, you can see the list of available Android Virtual Devices (AVDs) by opening the "AVD Manager" from within Android Studio.
8. Go to the folder `gainsystems.front` and run

```bash
npm install
```

## Running project

Open Android Studio and start Android emulator which you create.

Go to the folder `gainsystems.front`.

To start Metro, run `npx react-native start`.

```bash
npx react-native start
```

After that run `npx react-native run-android`

```bash
npx react-native run-android
```

That's it.
