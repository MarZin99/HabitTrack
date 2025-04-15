import { CDropdownItem } from "@/models/CDropdownOptions.model";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList, StyleProp, ViewStyle } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export interface CDropdownProps {
    placeholder?: string;
    options: CDropdownItem[];
    value?: string | number;
    onChange: (item: CDropdownItem) => void;
    style?: StyleProp<ViewStyle> | undefined;
    dropdownHeight?: number;
}

const CDropdown = (props: CDropdownProps) => {
    const {placeholder, options, onChange, style, value, dropdownHeight = 150} = props
    const [expanded, setExpanded] = useState<boolean>(false);
    const selected = options.find(opt => opt.value == value);

    const optionsHeight = useSharedValue(0);
    const animatedStyle=useAnimatedStyle(() => {
        return {height: optionsHeight.value}
    })

    const toggle = useCallback(() => {
        setExpanded(!expanded);
        if(expanded) {
            optionsHeight.value = withTiming(0, {duration: 230})
        }else{
            optionsHeight.value = withSpring( dropdownHeight, {stiffness: 60})
        }
    }, [expanded])
    
   
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
        <Animated.View style={[styles.options, animatedStyle]}>
            <FlatList
                data={options}
                keyExtractor={item => item.value.toString()}
                renderItem={({item}) => 
                    <TouchableOpacity activeOpacity={0.8} style={styles.optionItem} key={item.label} onPress={() => {onSelect(item), toggle()}}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />
        </Animated.View>
        
    </View>

}

const styles = StyleSheet.create({
    dropdown: {
        height: 38,
        justifyContent: "space-between",
        backgroundColor: "#fff",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 8,
    },
    options: {
        position: "absolute",
        top: 40,
        boxShadow: "0 5 15 rgba(0,0,0,0.4)",
        backgroundColor: "white",
        width: "100%",
        borderRadius: 8,
        zIndex: 2,
    },
    separator: {
        height: 10,
    },
    optionItem: {
        padding: 10,
        height: 40,
        justifyContent: "center"
    },
})

export default CDropdown