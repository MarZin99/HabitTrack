import { Habit } from "@/db/database"
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import * as schema from '@/db/database'
import {useIsFocused} from '@react-navigation/native';
import HabitsList from "@/components/HabitsList";
import { Theme }  from "@/constants/Colors"
import { useThemeColor } from "@/hooks/useThemeColor";


const SettingsScreen = () => {
    const [habits, setHabits] = useState<Habit[]>([]);
    const bgColor = useThemeColor({light: Theme.light.background, dark: Theme.dark.background}, "background");

    const db=useSQLiteContext();
    const drizzleDb = drizzle(db, {schema})

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused)getUpdateDataFromDataBase()
    }, [isFocused]);

    const getUpdateDataFromDataBase = async () => {
        console.log("test")
        const data = await drizzleDb.query.habit.findMany();
        setHabits(data);
    }

    return (
        <View style={[styles.container, {backgroundColor: bgColor}]}>
            <HabitsList habits={habits} />
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