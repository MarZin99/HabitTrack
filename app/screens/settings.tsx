import { View, StyleSheet } from "react-native"
import HabitsList from "@/components/HabitsList";
import { Theme }  from "@/constants/Colors"
import { useThemeColor } from "@/hooks/useThemeColor";

const SettingsScreen = () => {
    const bgColor = useThemeColor({light: Theme.light.background, dark: Theme.dark.background}, "background");

    return (
        <View style={[styles.container, {backgroundColor: bgColor}]}>
            <HabitsList />
        </View>
    )
}

export default SettingsScreen
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
    }
})