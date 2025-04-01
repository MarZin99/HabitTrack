import { StyleProp, TextStyle, TouchableOpacity, View, Text, ViewStyle } from "react-native";


export interface CButtonProps {
    onPress?: () => void;
    buttonStyle?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    children?: React.ReactNode
}

const CButton = (props: CButtonProps) => {
    
    const {onPress, buttonStyle, textStyle, children} = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={buttonStyle}>
                <Text style={textStyle}>{children}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CButton