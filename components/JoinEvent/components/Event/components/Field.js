import React from 'react'
import {TextInput, View, Text, StyleSheet} from 'react-native'

const Field = ({field, setInput}) => {
    const {name, type, presence} = field

    return (
        <View style = {styles.container}>
            <Text style = {styles.text}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
            <TextInput style = {styles.input} onChangeText = {setInput}/>
        </View>
    )
}

export default Field

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },

    input: {
        width: '70%',
        marginLeft: 0,
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 5,
        padding: 5,
    },

    text: {
        fontWeight: '500'
    }
})