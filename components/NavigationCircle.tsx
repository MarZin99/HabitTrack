import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Pressable } from 'react-native-gesture-handler';


export function NavigationCircle() {

    const [isOpen, setIsOpen] = useState(false);
    const scale = useSharedValue(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        scale.value = isOpen ? withTiming(0) : withTiming(1);
    }

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: scale.value,
      }));
 

    return (

        <View style={styles.container}>
        {/* Opcje menu */}
        <Animated.View style={[styles.menu, animatedStyle]}>
            <Pressable style={styles.menuItem} onPress={() => console.log("Opcja 1")}>
            <Text style={styles.menuText}>Opcja 1</Text>
            </Pressable>
            <Pressable style={styles.menuItem} onPress={() => console.log("Opcja 2")}>
            <Text style={styles.menuText}>Opcja 2</Text>
            </Pressable>
        </Animated.View>
    
        {/* Główna kulka */}
        <Pressable style={styles.fab} onPress={toggleMenu}>
            <Text style={styles.fabText}>{isOpen ? "×" : "+"}</Text>
        </Pressable>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
      position: "absolute",
      bottom: 30,
      right: 30,
      alignItems: "center",
    },
    fab: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: "#6200ea",
      justifyContent: "center",
      alignItems: "center",
      elevation: 5,
    },
    fabText: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
    },
    menu: {
      position: "absolute",
      bottom: 70,
      alignItems: "center",
    },
    menuItem: {
      backgroundColor: "#3700b3",
      padding: 10,
      marginBottom: 10,
      borderRadius: 8,
      width: 80,
      alignItems: "center",
    },
    menuText: {
      color: "white",
      fontSize: 16,
    },
  });

