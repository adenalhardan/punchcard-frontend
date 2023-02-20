import React from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

const Create = ({enabled, onPress}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {enabled ? styles.enabled : styles.disabled} onPress = {enabled ? onPress : () => {}}>
            <Text style = {enabled ? styles.textEnabled : styles.textDisabled}>Create</Text>
            <Image style = {styles.image} source = {require('./assets/create.png')}/>
        </TouchableOpacity>
    </View>
)

export default Create

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end', 
        marginTop: 10
    },

    enabled: {
        backgroundColor: '#1A964E',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },

    disabled: {
        backgroundColor: '#CACACA',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        opacity: 0.5,
        flexDirection: 'row',
        alignItems: 'center'
    },

    textEnabled: {
        fontWeight: '700',
        fontSize: 14,
    },

    textDisabled: {
        fontWeight: '700',
        fontSize: 14,
    },

    image: {
        height: 15,
        width: 15,
        resizeMode: 'contain',
        marginLeft: 4
    }
})