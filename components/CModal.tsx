import { KeyboardAvoidingView, Modal, ModalProps, View } from "react-native";
import { StyleSheet } from "react-native"


type CModalProps = ModalProps & {
    isOpen: boolean,
    withInput?: boolean
}

export const CModal = (props: CModalProps) => {
    const {isOpen, withInput, children, ...rest} = props;

    const content = withInput ? (
        <KeyboardAvoidingView style={styles.withKeyboard}>
            {children}
        </KeyboardAvoidingView>
    ) : (
        <View style={styles.withoutKeyboard}>
            {children}
        </View>
    )
    return (
        <Modal
            visible={isOpen}
            transparent
            animationType="fade"
            statusBarTranslucent
            {...rest}
        >
            {content}
        </Modal>
    )
}

const styles = StyleSheet.create({
    withKeyboard: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 3
    },
    withoutKeyboard: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 3,
        backdropFilter: "blur(10px)",
        flex: 1,
        backgroundColor: "rgba(50,50,50,0.4)"
    }
})