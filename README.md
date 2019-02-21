# Masterize App

## Dependencies

### Android

- Must install [Java SE Development Kit 8u144](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

1. brew cask uninstall java # uninstall existing java
2. brew tap caskroom/versions
3. brew cask install java8 # install java8
4. touch ~/.android/repositories.cfg # without this file, error will occur on next step
5. brew cask install android-sdk
