import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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

  button: {
    backgroundColor: '#2196F3', // Blue background
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 18,
    textAlign: 'center',
  },
});
