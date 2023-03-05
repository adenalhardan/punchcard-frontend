import React from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

const Create = ({enabled, onPress}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {[enabled ? styles.enabled : styles.disabled, styles.button]} onPress = {enabled ? onPress : () => {}}>
            <Text style = {[enabled ? styles.enabledText : styles.disabledText, styles.text]}>Create</Text>
            <Image style = {styles.image} source = {require('./assets/create.png')}/>
        </TouchableOpacity>
    </View>
)

export default Create

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end', 
        marginTop: 10,
        marginBottom: 5
    },

    button: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },

    text: {
        fontWeight: '600',
        fontSize: 16,
        
    },

    enabled: {
        backgroundColor: '#009A4B',
    },

    disabled: {
        opacity: 0.5,
        backgroundColor: '#CACACA'
    },

    enabledText: {
        
    },

    disabledText: {
    },

    image: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
        marginLeft: 4
    }
})