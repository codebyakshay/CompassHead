import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const App = () => {
  return (
    <View
      style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center' }}>
      <StatusBar hidden />
      <Text>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
