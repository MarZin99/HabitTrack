import { StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@/app/screens/home';
import { BlurView } from 'expo-blur';
import SettingsScreen from '@/app/screens/settings';


const Tab = createBottomTabNavigator();

 const BottomNavigation = () => {

   return (
    <Tab.Navigator screenOptions={{
      tabBarStyle: styles.tabbarWrapper,
      tabBarBackground: () => {
        return <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} /> 
      }
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown : false, tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />,}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown : false, tabBarIcon: ({color}) => <FontAwesome size={28} name="gear" color={color} />,}} />
    </Tab.Navigator>
   )
}

export default BottomNavigation


const styles = StyleSheet.create({
    tabbarWrapper: {
      overflow: "hidden",
      position: "absolute",
      margin: 10,
      alignItems: "center",
      elevation: 5,
      height: 70,
      backgroundColor: "rgba(0,0,0,0.0)",
      paddingTop: 5,
      borderRadius: 20,
      shadowColor: "#7F5DF0",
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.5,   
    },

  });

