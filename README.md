# Masterize App

## Development
1. run `$yarn install`
2. run `$yarn start`

## Dependencies
### Android
> Must install [Java SE Development Kit 8u144](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

1. brew cask uninstall java # uninstall existing java
2. brew tap caskroom/versions
3. brew cask install java8 # install java8
4. touch ~/.android/repositories.cfg # without this file, error will occur on next step
5. brew cask install android-sdk

## Build
> [Building Standalone Apps](https://docs.expo.io/versions/latest/distribution/building-standalone-apps/)

### Android
1. run `$expo build:android`
2. download `masterize-{}.apk` from the provided link
3. run `$adb install masterize-{}.apk`

### iOS
1. run `$expo build:ios`
2. run `$expo build:ios -t simulator`
3. download `$masterize-{}.tar.gz`
4. run `$tar -xvzf masterize-{}.tar.gz`
5. run `$xcrun simctl install booted <app path>`
6. run `$xcrun simctl launch booted <app identifier>`
