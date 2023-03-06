import React from 'react'
import {View, TextInput, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'

const Field = ({name, type, presence, setName, onTypePress, onPresencePress, onDeletePress}) => (
    <View style = {name === '' ? {...styles.container, opacity: 0.45} : styles.container}>
        <View style = {{flexDirection: 'row', marginBottom: 4, marginLeft: -5}}>
            <TouchableOpacity 
                style = {[presence === 'required' ? styles.required : styles.optional, styles.button]} 
                onPress = {onPresencePress}
            >
                <Text style = {[presence === 'required' ? styles.requiredText : styles.optionalText, styles.text]}>
                    {presence.charAt(0).toUpperCase() + presence.slice(1)}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style = {[type === 'string' ? styles.string : styles.integer, styles.button]} 
                onPress = {onTypePress}
            >
                <Text style = {[type === 'string' ? styles.stringText : styles.integerText, styles.text]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </Text>
            </TouchableOpacity>
        </View>
        <View style = {{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <TextInput style = {styles.input} placeholder = "Field Name" value = {name} onChangeText = {setName}/>

            <TouchableOpacity style = {styles.delete} onPress = {onDeletePress}>
                <Image style = {styles.delete} source = {require('./assets/delete.png')}/>
            </TouchableOpacity>
        </View>

    </View>
)

export default Field

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 15,
        alignItems: 'flex-start',
        justifyContent: 'space-between'
    },

    text: {
        fontSize: 14,
        fontWeight: '600',
    },

    button: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 12,
        marginLeft: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },

    required: {
        backgroundColor: '#fedbd6',
    },

    requiredText: {
        color: '#cf1c00',
    },

    optional: {
        backgroundColor: '#d6feea',
    },

    optionalText: {
        color: '#00cf6e',
    },

    string: {
        backgroundColor: '#feefd6',
    }, 

    stringText: {
        color: '#CF8300',
    },

    integer: {
        backgroundColor: '#D6E8FE',
    },

    integerText: {
        color: '#005FCF',
    },

    input: {
        width: '75%',
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
    }
})