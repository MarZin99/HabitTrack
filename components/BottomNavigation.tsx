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
      tabBarStyle: styles.tabBarStyle,
      tabBarItemStyle: styles.tabBarItemStyle,
      tabBarBackground: () => (
        <BlurView tint="light" intensity={70} style={{...StyleSheet.absoluteFillObject, backgroundColor: "transparent", height: 70}} /> 
      )
    }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{headerShown : false, tabBarIcon: ({color}) => <FontAwesome size={28} name="home" color={color} />,}}/>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{headerShown : false, tabBarIcon: ({color}) => <FontAwesome size={28} name="gear" color={color} />,}} />
    </Tab.Navigator>
   )
}

export default BottomNavigation


const styles = StyleSheet.create({
  tabBarStyle: {
      overflow: "hidden",
      position: "absolute",
      margin: 10,
      alignItems: "center",
      height: 70,
      borderRadius: 20,
      elevation: 0,
    },
    tabBarItemStyle: {
      flexDirection: "row",
      alignItems: "center"
    }
  });

