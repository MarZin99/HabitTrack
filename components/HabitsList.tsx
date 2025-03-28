import { Habit } from "@/db/database";
import { FlatList, View, Text } from "react-native";
import {StyleSheet} from "react-native"
import { BlurView } from 'expo-blur';


interface HabitsListProps {
    habits: Habit[]
}

const BluredHeader = () => {
    return (        
    <BlurView tint="light" intensity={80} experimentalBlurMethod="dimezisBlurView" style={[ styles.habitRow, styles.headerContainer]} > 
        <Text style={[styles.habitName, styles.header]}>Name</Text>
        <Text style={[styles.habitName, styles.header]}>Streak</Text>
    </BlurView>
    )
}

const HabitsList = (props: HabitsListProps) => {
    const {habits} = props;

    return (
        <View style={styles.container}>
            <FlatList
                data={habits}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                <View style={styles.habitRow}>
                    <Text style={styles.habitName}>{item.name}</Text>
                    <Text style={styles.habitName}>{item.streak}</Text>
                </View>
                )}
                ListHeaderComponent={BluredHeader}
                stickyHeaderIndices={[0]} 
            />
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
    headerContainer: {
    }

})