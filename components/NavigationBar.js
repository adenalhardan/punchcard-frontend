import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import {useSafeAreaInsets} from 'react-native-safe-area-context'

const NavigationBar = ({page, onPress}) => {
    const {top} = useSafeAreaInsets()

    return (
        <View style = {{...styles.container, height: top + 40}}>

            <TouchableOpacity style = {styles.button} onPress = {() => onPress('joinEvent')}>
                <Text style = {page === 'joinEvent' ? styles.selected : styles.unselected}>Join Event</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style = {styles.button} onPress = {() => onPress('hostEvent')}>
                <Text style = {page === 'hostEvent' ? styles.selected : styles.unselected}>Host Event</Text>
            </TouchableOpacity>
        </View>
    )
}


export default NavigationBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
    },

    background: {
        position: 'absolute', 
        resizeMode: 'stretch', 
        top: 0, 
        opacity: 0.9, 
        width: '100%'
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