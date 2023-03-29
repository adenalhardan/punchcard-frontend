import React from 'react'
import {TouchableOpacity, Text, Image, View, Animated, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Button = ({maxHeight, onPress}) => (
    <TouchableOpacity style = {styles.shadow} onPress = {onPress} activeOpacity = {0.5}>
        <Animated.View style = {{
            ...styles.container,  
            maxHeight: maxHeight.interpolate({inputRange: [0, 100], outputRange: ['0%', '100%']})
        }}> 
            <LinearGradient colors = {['#65A66F', '#33A645', '#2B8C44']} style={styles.background}>
                <Text style = {styles.text}>New Event</Text>
                <Image style = {styles.image} source = {require('./assets/create.png')}/>
            </LinearGradient>
        </Animated.View>
    </TouchableOpacity>
)

export default Button

const styles = StyleSheet.create({
    container: {
        width: '94%',
        alignSelf: 'center',
        overflow: 'hidden'
    },

    shadow: {
        shadowColor: '#000000',
        shadowOffset: {width: 2, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
    },

    background: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: 60,
    },

    text: {
        fontWeight: '600',
        fontSize: 20,
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