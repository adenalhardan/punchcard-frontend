import React from 'react'
import {View, TextInput, Text, StyleSheet, TouchableOpacity} from 'react-native'

const Field = ({name, type, presence, setName, onTypePress, onPresencePress, onDeletePress}) => (
    <View style = {styles.container}>
        <TextInput style = {styles.input} placeholder = "Field Name" value = {name} onChangeText = {setName}/>

        <TouchableOpacity style = {styles.presence} onPress = {onPresencePress}>
            <Text>{presence.charAt(0).toUpperCase() + presence.slice(1)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.type} onPress = {onTypePress}>
            <Text>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.delete} onPress = {onDeletePress}/>
    </View>
)

export default Field

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 7,
        alignItems: 'center'
    },

    type: {
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 5,
        marginLeft: 5
    },

    presence: {
        backgroundColor: 'grey',
        padding: 5,
        borderRadius: 5,
        marginLeft: 5
    },

    input: {
        width: '40%',
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 5,
    },

    delete: {
        height: 20,
        width: 20,
        backgroundColor: 'red',
        borderRadius: 10,
        marginLeft: 'auto'
    }
})