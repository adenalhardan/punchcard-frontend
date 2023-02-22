import React from 'react'
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native'

const Submit = ({enabled, onPress}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {enabled ? styles.enabled : styles.disabled} onPress = {enabled ? onPress : () => {}}>
            <Text style = {enabled ? styles.textEnabled : styles.textDisabled}>Submit</Text>
            <Image style = {styles.image} source = {require('./assets/submit.png')}/>
        </TouchableOpacity>
    </View>
)

export default Submit

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end', 
        marginTop: 10,
        marginBottom: 5
    },

    enabled: {
        backgroundColor: '#B6D0FF',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    disabled: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
        opacity: 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#CACACA'
    },

    textEnabled: {
        fontWeight: '700',
        fontSize: 16
    },

    textDisabled: {
        fontWeight: '700',
        fontSize: 16
    },

    image: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        marginLeft: 4
    }
})
