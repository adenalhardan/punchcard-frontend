import React from 'react'
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Submit = ({enabled, onPress}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {enabled ? {} : {opacity: 0.5}} onPress = {enabled ? onPress : () => {}}>
            <LinearGradient colors = {['#6a65a6', '#3c33a6', '#382b8c']} style={styles.button}>
            <Text style = {styles.text}>Submit</Text>
            <Image style = {styles.image} source = {require('./assets/submit.png')}/>
            </LinearGradient>
        </TouchableOpacity>
    </View>
)

export default Submit

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end', 
        marginTop: 20,
        marginBottom: 5
    },

    button: {
        borderRadius: 10,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        aspectRatio: 7.8
    },

    text: {
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF'
    },

    image: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 6,
        tintColor: '#FFFFFF'
    }
})
