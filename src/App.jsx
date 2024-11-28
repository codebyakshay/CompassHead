import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, StyleSheet, Animated } from 'react-native';
import {
  magnetometer,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';

const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N'];

const getDirection = (degree) => {
  const index = Math.round(degree / 45) % 8;
  return directions[index];
};

const App = () => {
  const [degree, setDegree] = useState(0);
  const [direction, setDirection] = useState('N');
  const animatedDegree = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setUpdateIntervalForType(SensorTypes.magnetometer, 50);

    const subscription = magnetometer.subscribe(({ x, y, z }) => {
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      if (angle < 0) {
        angle += 360;
      }
      angle = angle % 360;

      setDegree(Math.round(angle));
      setDirection(getDirection(angle));

      // Animate the degree value
      Animated.timing(animatedDegree, {
        toValue: angle,
        duration: 50,
        useNativeDriver: false, // Cannot use native driver for color interpolation
      }).start();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Define the color spectrum for directions
  const inputRange = [0, 45, 90, 135, 180, 225, 270, 315, 360];
  const outputRange = [
    'rgb(255, 0, 0)', // Red (N)
    'rgb(255, 165, 0)', // Orange (NE)
    'rgb(255, 255, 0)', // Yellow (E)
    'rgb(0, 128, 0)', // Green (SE)
    'rgb(0, 0, 255)', // Blue (S)
    'rgb(75, 0, 130)', // Indigo (SW)
    'rgb(238, 130, 238)', // Violet (W)
    'rgb(255, 105, 180)', // Pink (NW)
    'rgb(255, 0, 0)', // Red (N) - Loop back
  ];

  // Interpolate the text color based on the degree
  const textColor = animatedDegree.interpolate({
    inputRange: inputRange,
    outputRange: outputRange,
  });

  return (
    <Animated.View style={styles.container}>
      <StatusBar hidden />
      <Animated.Text style={[styles.text, { color: textColor }]}>
        {degree}° {direction}
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    backgroundColor: 'white', // Set background to white
  },
  text: {
    fontSize: 60,
    textAlign: 'center',
  },
});

export default App;
