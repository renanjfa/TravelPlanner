import React from 'react'
import { View, TextInput, StyleSheet} from 'react-native'


const Input = ({ inputValue, inputChange, ...props }) => (
    <TextInput
        value={inputValue}
        style={styles.input}
        onChangeText={inputChange}
        {...props}
    />
)

const styles = StyleSheet.create({

    input: {
        height: 40,
        backgroundColor: '#d3c9d8c0',
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
    }
})


export default Input

