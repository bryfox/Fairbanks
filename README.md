# Fairbanks

Fairbanks is a personal project that provides short-term Vermont weather forecasts based on data from the Eye on the Sky forecast. This app's namesake, the Fairbanks Museum in St. Johnsbury, is the source for fairly reliable forecasts for our fickle little micro-climate.

## Why?

1. Research into modern web-related technologies: how is it (for a developer with iOS, Android, and some React [Web] experience) to build a React Native app?

2. Other weather apps haven't been able to give reliable forecasts for our little valley in Vermont. My former go-to app highlights the distinction between accuracy and precision when faced with this challenge.

## Navigation

Fairbanks makes use of [React Native Navigation](https://wix.github.io/react-native-navigation/), one of two solutions available for native navigation controllers on iOS + Android. FB developed an iOS-only one, and otherwise recommends a pure-JS solution. (The *Native* in *React Native* doesn't refer to UIKit, Android's application framework, or anything like that.)

## Unit Tests

The `__tests__` directory makes use of Jest and snapshot testing for component unit testing. Note that I've removed the top-level (ios/android) tests, and skipped anything involving the React Native Navigation framework, since the latter can't currently run with the react-test-renderer; it assumes native bindings are in place.

## Setup

Copy `.env.example` to `.env` and (optionally) change the value of `API_ROOT` as needed.

Dependencies: see "Building Projects with Native Code" at [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html). This app requires native tools, so the Quick Start won't work.
