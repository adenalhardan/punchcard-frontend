import {useState, useEffect} from 'react'
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
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        backgroundColor: 'green'
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