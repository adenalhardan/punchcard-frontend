import React from 'react'
import {TextInput, View, Text, StyleSheet} from 'react-native'

const Field = ({field, setInput}) => {
    const [name, {data_type, data_presence}] = field

    return (
        <View style = {styles.container}>
            <Text>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
            <TextInput style = {styles.input} onChangeText = {setInput}/>
        </View>
    )
}

export default Field

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },

    input: {
        width: '60%',
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 5
    }
})