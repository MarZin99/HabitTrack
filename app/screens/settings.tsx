import { Habit } from "@/db/database"
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import * as schema from '@/db/database'
import {useIsFocused} from '@react-navigation/native';


const SettingsScreen = () => {
    const [data, setData] = useState<Habit[]>([]);

    const db=useSQLiteContext();
    const drizzleDb = drizzle(db, {schema})

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) getUpdateDataFromDataBase();
    }, [isFocused]);

    const getUpdateDataFromDataBase = async () => {
        const data = await drizzleDb.query.habits.findMany();
        setData(data);
        console.log(...data)
    }

    return (
        <View style={styles.container}>
        <Text>Settings Screen</Text>
        </View>
    )
}

export default SettingsScreen
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "orangered"
    }
})