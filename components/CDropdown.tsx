import { CDropdownItem } from "@/models/CDropdownOptions.model";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StyleProp, ViewStyle } from "react-native"

export interface CDropdownProps {
    placeholder?: string;
    options: CDropdownItem[];
    value?: string | number;
    onChange: (item: CDropdownItem) => void;
    style?: StyleProp<ViewStyle> | undefined;
}


const CDropdown = (props: CDropdownProps) => {
    const {placeholder, options, onChange, style, value} = props
    const [expanded, setExpanded] = useState<boolean>(false);
    const selected = options.find(opt => opt.value == value);


    const toggle = useCallback(() => {setExpanded(!expanded)}, [expanded])
   
    const onSelect = useCallback((item: CDropdownItem) => {
        onChange(item)
        setExpanded(false)
    }, [])

    return <View style={style}>
        <TouchableOpacity 
            style={styles.dropdown} 
            activeOpacity={0.8}
            onPress={toggle}
            >
            <Text>{selected?.label ?? placeholder}</Text>
            <FontAwesome size={23} name="caret-down" color={"black"} />
        </TouchableOpacity>
        {
            expanded && 
                <View style={[styles.options]}>
                    <FlatList 
                        data={options}
                        keyExtractor={item => item.value.toString()}
                        renderItem={({item}) => 
                            <TouchableOpacity activeOpacity={0.8} style={styles.optionItem} key={item.label} onPress={() => onSelect(item)}>
                                <Text>{item.label}</Text>
                            </TouchableOpacity>}
                        ItemSeparatorComponent={() => <View style={styles.separator} />}
                    />
                </View>
        }
    </View>

}

const styles = StyleSheet.create({
    dropdown: {
        height: 50,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    options: {
        position: "absolute",
        top: 53,
        backgroundColor: "white",
        width: "90%",
        padding: 10,
        borderRadius: 8,
        maxHeight: 250,
        zIndex: 2,
    },
    separator: {
        height: 10,
    },
    optionItem: {
        height: 35,
        justifyContent: "center"
    },
    backdrop: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
})

export default CDropdown