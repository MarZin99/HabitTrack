import { Habit } from "@/db/database";
import { FlatList, View, Text, Button } from "react-native";
import { StyleSheet } from "react-native"
import { BlurView } from 'expo-blur';
import CButton from "./CButton";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Theme } from "@/constants/Colors";
import { CModal } from "./CModal";
import { useEffect, useState } from "react";
import EditHabit from "@/forms/EditHabit.form";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from '@/db/database'
import { useIsFocused } from "@react-navigation/native";
import { deleteHabit, updateHabit } from "@/db/habitRepository";



const BluredHeader = () => {
    return (        
    <BlurView tint="light" intensity={80} experimentalBlurMethod="dimezisBlurView" style={styles.habitRow} > 
        <Text style={[styles.habitName, styles.header]}>Name</Text>
        <Text style={[styles.habitName, styles.header]}>Streak</Text>
    </BlurView>
    )
}

const HabitsList = () => {

    const [habits, setHabits] = useState<Habit[]>([]);
    const buttonColor = useThemeColor({light: Theme.light.button, dark: Theme.dark.button}, "button");
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selectedHabit, setSelectedHabit] = useState<Habit | undefined>();

    const db=useSQLiteContext();
    const drizzleDb = drizzle(db, {schema})

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) getUpdateDataFromDataBase();
    }, [isFocused]);

    const getUpdateDataFromDataBase = async () => {
        const data = await drizzleDb.query.habit.findMany();
        setHabits(data);
    }

    const selectHabit = (id: number) => {
        let habit = habits.find(x => x.id === id);
        if (!habit) return
        if (habit) setSelectedHabit(habit)
            setIsModalOpen(true)
        return 
    }

    const onHabitUpdate = async (newHabit: Habit) => {
        console.log(newHabit);
        await updateHabit(selectedHabit!.id, newHabit);
        await getUpdateDataFromDataBase();
    }

    const onHabitDelete = async (id: number) => {
        console.log(id);
        await deleteHabit(id);
        await getUpdateDataFromDataBase();
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                <View style={styles.habitRow}>
                    <Text style={styles.habitName}>{item.name}</Text>
                    <CButton onPress={() => {selectHabit(item.id)}}><FontAwesome size={28} name="bars" color={buttonColor} /></CButton>
                </View>
                )}
                ListHeaderComponent={BluredHeader}
                stickyHeaderIndices={[0]} 
            />
            <CModal isOpen={isModalOpen}>
                {selectedHabit && <EditHabit onClose={() => {setIsModalOpen(false)}} onUpdate={onHabitUpdate} onDelete={onHabitDelete}  habit={selectedHabit}/>}                    
            </CModal>
        </View>
    )
}

export default HabitsList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 16,
        width: "100%",
        height: "50%",
    },
    habitRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    habitName: {
        fontSize: 18,
    },
    habitStreak: {
        fontSize: 16,
        fontWeight: "bold",
        color: "orange",
    },
    header: {
        fontWeight: "700",
    },
})