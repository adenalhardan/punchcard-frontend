import React from 'react'
import {View, TextInput, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

const Field = ({name, type, presence, setName, onTypePress, onPresencePress, onDeletePress}) => (
    <View style = {name === '' ? {...styles.container, opacity: 0.5} : styles.container}>
        <TextInput style = {styles.input} placeholder = "Field Name" value = {name} onChangeText = {setName}/>

        <TouchableOpacity style = {presence === 'required' ? styles.required : styles.optional} onPress = {onPresencePress}>
            <Text style = {presence === 'required' ? styles.requiredText : styles.optionalText}>{presence.charAt(0).toUpperCase() + presence.slice(1)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {type === 'string' ? styles.string : styles.integer} onPress = {onTypePress}>
            <Text style = {type === 'string' ? styles.stringText : styles.integerText}>{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style = {styles.delete} onPress = {onDeletePress}>
            <Image style = {styles.delete} source = {require('./assets/delete.png')}/>
        </TouchableOpacity>
    </View>
)

export default Field

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    required: {
        backgroundColor: '#FC4138',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },

    requiredText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '500'
    },

    optional: {
        backgroundColor: '#82F54C',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    optionalText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '500'
    },

    string: {
        backgroundColor: '#F2C230',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    stringText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '500'
    },

    integer: {
        backgroundColor: '#507DC7',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    integerText: {
        fontSize: 15,
        color: '#000000',
        fontWeight: '500'
    },

    input: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 7,
        fontSize: 16
    },

    delete: {
        height: 24,
        width: 24,
        tintColor: '#E01C10',
        resizeMode: 'contain',
        marginLeft: 'auto',
    }
})