import React from 'react'
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Button = ({onPress}) => (
    <TouchableOpacity style = {styles.container} onPress = {onPress}>
        <LinearGradient colors={['#65A66F', '#33A645', '#2B8C44']} style={styles.background}>
            <Text style = {styles.text}>New Event</Text>
            <Image style = {styles.image} source = {require('./assets/create.png')}/>
        </LinearGradient>
    </TouchableOpacity>
)

export default Button

const styles = StyleSheet.create({
    container: {
        width: '94%',
        alignSelf: 'center',
        marginBottom: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
    },

    background: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 55,
    },

    text: {
        fontWeight: '600',
        fontSize: 18,
        color: '#FFFFFF'
    },

    image: {
        height: 35,
        width: 35,
        resizeMode: 'contain',
        marginLeft: 10,
        tintColor: '#FFFFFF'
    }
})