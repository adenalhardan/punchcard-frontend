import React from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const Create = ({enabled, onPress}) => (
    <View style = {styles.container}>
        <TouchableOpacity 
            onPress = {enabled ? onPress : () => {}} 
            style = {enabled ? {} : {opacity: 0.5}}
            activeOpacity = {enabled ? 0.75 : 0.5}
        >
            <LinearGradient colors = {['#65A66F', '#33A645', '#2B8C44']} style={styles.button}>
                <Text style = {styles.text}>Create</Text>
                <Image style = {styles.image} source = {require('./assets/create.png')}/>
            </LinearGradient>
        </TouchableOpacity>
    </View>
)

export default Create

const styles = StyleSheet.create({
    container: {
        alignItems: 'flex-end', 
        marginTop: 20,
        marginBottom: 5
    },

    button: {
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        aspectRatio: 7.4
    },

    text: {
        fontWeight: '600',
        fontSize: 18,
        color: '#FFFFFF'
    },

    image: {
        height: 28,
        width: 28,
        resizeMode: 'contain',
        marginLeft: 6,
        tintColor: '#FFFFFF'
    }
})