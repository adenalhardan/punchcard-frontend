import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const Submit = ({enabled, onPress}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {enabled ? styles.enabled : styles.disabled} onPress = {enabled ? onPress : () => {}}>
            <Text style = {enabled ? styles.textEnabled : styles.textDisabled}>Submit</Text>
        </TouchableOpacity>
    </View>
)

export default Submit

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
    },

    disabled: {
        backgroundColor: '#CACACA',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 12,
        opacity: 0.5
    },

    textEnabled: {
        fontWeight: '700',
        fontSize: 14,
        color: '#09361C'
    },

    textDisabled: {
        fontWeight: '700',
        fontSize: 14,
    }
})
