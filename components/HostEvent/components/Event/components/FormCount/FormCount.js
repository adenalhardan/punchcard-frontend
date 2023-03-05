import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'

const FormCount = ({count}) => (
    <View style = {count === 0 ? {...styles.container, opacity: 0.5} : styles.container}>
        <Text style = {styles.text}>{count}</Text>
        <Image style = {styles.image} source = {require('./assets/forms.png')}/>
    </View>
)

export default FormCount

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontSize: 18,
        fontWeight: '600',
        marginRight: 8
    },

    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    }
})