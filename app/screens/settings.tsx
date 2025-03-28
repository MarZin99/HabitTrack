import { Habit } from "@/db/database"
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import * as schema from '@/db/database'
import {useIsFocused} from '@react-navigation/native';
import HabitsList from "@/components/HabitsList";


const SettingsScreen = () => {
    const [habits, setHabits] = useState<Habit[]>([]);

    const db=useSQLiteContext();
    const drizzleDb = drizzle(db, {schema})

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) getUpdateDataFromDataBase();
    }, [isFocused]);

    const getUpdateDataFromDataBase = async () => {
        const data = await drizzleDb.query.habits.findMany();
        setHabits(data);

    }

    return (
        <View style={styles.container}>
            <HabitsList habits={habits} />
        </View>
    )
}

export default SettingsScreen
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        backgroundColor: "orangered"
    }
})