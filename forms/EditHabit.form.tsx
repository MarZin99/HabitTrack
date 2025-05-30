import { Habit } from "@/db/database"
import { View, Text, Button, TextInput, StyleSheet  } from "react-native"
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { CDropdownItem } from "@/models/CDropdownOptions.model";
import { Priority } from "@/enums/Priority";
import CDropdown from "@/components/CDropdown";


export type EditHabitProps = {
    onClose: () => void,
    onUpdate: (habit: Habit) => void;
    onCreate: (habit: Habit) => void;
    onDelete: (id: number) => void;
    habit?: Habit,
}

const priorityOptions: CDropdownItem[] = [
    { label: "Low", value: Priority.Low },
    { label: "Medium", value: Priority.Medium },
    { label: "High", value: Priority.High },
  ];


const EditHabit = (props: EditHabitProps) => {
    const {onClose, onUpdate, onDelete, onCreate, habit} = props;

    const {
        handleSubmit,
        control,
      } = useForm<Habit>({defaultValues: {...habit}})

    const onSubmit: SubmitHandler<Habit> = (newHabit: Habit) =>  {
        habit ? onUpdate({ ...habit, ...newHabit }) : onCreate(newHabit)
        onClose();
    };
    
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
                    <CDropdown options={priorityOptions} onChange={(e) => onChange(e.value)} placeholder={value} style={styles.dropdown} value={value}/>
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
            <View style={styles.buttonContainer}>
                <View style={styles.editButtonWraper}>
                    <View style={styles.buttonWrapper}>
                        <Button onPress={onClose} title={"Close"}></Button>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button onPress={handleSubmit(onSubmit)} title={habit ? "Save" : "Add"}></Button>
                    </View>
                </View>
             
                {onDelete && habit && <Button onPress={() => {
                    onDelete(habit.id)
                    onClose();
                    }} 
                title={"Delete"} color="red"></Button>}
            </View>
            
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
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
    },
    error: {
      color: "red",
      marginBottom: 10,
    },
    buttonContainer: {
        padding: 1,
        gap: 10,
    },
    editButtons: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "flex-start"
    },
    editButtonWraper: {
        flexDirection: 'row',
        gap: 10,
      },
    buttonWrapper: {
        flex: 1,
    },
  });

export default EditHabit