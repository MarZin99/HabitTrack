import { Habit } from "@/db/database"
import { View, Text, Button, TextInput, StyleSheet  } from "react-native"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { updateHabit } from "@/db/habitRepository"


export type EditHabitProps = {
    onClose: () => void,
    habit: Habit,
}


const EditHabit = (props: EditHabitProps) => {
    const {onClose, habit} = props;

    const {
        handleSubmit,
        control,
        formState: { errors },
      } = useForm<Habit>({defaultValues: {...habit}})

    const onSubmit: SubmitHandler<Habit> = (e) => {
        updateHabit(habit.id, e);
    }
    
    return (
        <View style={styles.container}>
            <Text>Name:</Text>
            <Controller 
                control={control} 
                name="name" 
                render={({ field: { onChange, value } }) => (
                    <TextInput 
                        style={styles.input}
                        value={value}
                        onChangeText={onChange}/>
                    )}
                />
            <Text>Description:</Text>
            <Controller 
                control={control} 
                name="description" 
                render={({ field: { onChange, value } }) => (
                    <TextInput 
                        style={styles.input}
                        value={value ?? ""}
                        onChangeText={onChange}/>
                    )}
                />
            <Text>Priority:</Text>
            <Controller 
                control={control} 
                name="priority" 
                render={({ field: { onChange, value } }) => (
                    <TextInput 
                        style={styles.input}
                        value={value ?? ""}
                        onChangeText={onChange}/>
                    )}
            />
            <Text>Biggest streak:</Text>
            <Controller 
                control={control} 
                name="biggestStreak" 
                render={({ field: { onChange, value } }) => (
                    <TextInput 
                        style={styles.input}
                        value={value ?? ""}
                        />
                    )}
            />

            <Button onPress={onClose} title={"Close"}></Button>
            <Button onPress={handleSubmit(onSubmit)} title={"Save"}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: "white",
      borderRadius: 10,
      width: "85%",
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 8,
      borderRadius: 5,
      marginBottom: 10,
    },
    error: {
      color: "red",
      marginBottom: 10,
    },
  });

export default EditHabit