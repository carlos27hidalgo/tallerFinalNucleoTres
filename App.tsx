import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { RegisterScreens } from './src/screens/RegisterScreens';
import { PaperProvider } from 'react-native-paper';
import { LogginScreen } from './src/screens/LogginScreen';
import { StackNavigator } from './src/screens/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
     
     <StackNavigator/>
   </PaperProvider>
    </NavigationContainer>
    
  );
}
