import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

const NavigationBar = ({page, onPress}) => (
    <View style = {styles.container}>
        <TouchableOpacity style = {styles.button} onPress = {() => onPress('joinEvent')}>
            <Text style = {page === 'joinEvent' ? styles.selected : styles.unselected}>Join Event</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style = {styles.button} onPress = {() => onPress('hostEvent')}>
            <Text style = {page === 'hostEvent' ? styles.selected : styles.unselected}>Host Event</Text>
        </TouchableOpacity>
    </View>
) 

export default NavigationBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '6%',
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row'
    },

    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    selected: {
        fontWeight: 'bold'
    },

    unselected: {

    }
})