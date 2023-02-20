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
        marginBottom: 7,
        alignItems: 'center'
    },

    required: {
        backgroundColor: '#FC4138',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    requiredText: {
        fontSize: 13,
        color: '#750D07',
        fontWeight: '700'
    },

    optional: {
        backgroundColor: '#82F54C',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },

    optionalText: {
        fontSize: 13,
        color: '#366620',
        fontWeight: '700'
    },

    string: {
        backgroundColor: '#F2C230',
        paddingVertical: 3,
        paddingHorizontal: 6,
        borderRadius: 12,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }, 

    stringText: {
        fontSize: 13,
        color: '#A18120',
        fontWeight: '700'
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
        fontSize: 13,
        color: '#24395B',
        fontWeight: '700'
    },

    input: {
        width: '45%',
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
        padding: 5,
    },

    delete: {
        height: 22,
        width: 22,
        tintColor: '#E01C10',
        resizeMode: 'contain',
        marginLeft: 'auto',
    }
})