import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stock from './Stock';
import { Base, Typography } from '../styles';

export default function Home() {
  return (
    <SafeAreaView style={Base.container}>
      <View style={Base.container}>
        <Stock />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
