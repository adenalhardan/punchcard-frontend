import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'

import {useSafeAreaInsets} from 'react-native-safe-area-context'

const NavigationBar = ({page, onPress}) => {
    const {top} = useSafeAreaInsets()

    return (
        <View style = {{...styles.container, height: top + 40}}>
            <View style = {{...styles.background, height: top + 40}}/>

            <TouchableOpacity 
                style = {page === 'joinEvent' ? styles.selected : styles.unselected} 
                onPress = {() => onPress('joinEvent')}
            >
                <Text style = {page === 'joinEvent' ? styles.selectedText : styles.unselectedText}>Join Event</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style = {page === 'hostEvent' ? styles.selected : styles.unselected} 
                onPress = {() => onPress('hostEvent')}
            >
                <Text style = {page === 'hostEvent' ? styles.selectedText : styles.unselectedText}>Host Event</Text>
            </TouchableOpacity>
        </View>
    )
}


export default NavigationBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1,
    },

    background: {
        position: 'absolute', 
        resizeMode: 'stretch', 
        top: 0, 
        opacity: 0.95, 
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF'
    },

    selected: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        height: '80%',
        width: '30%',
        borderBottomWidth: 3,
        borderBottomColor: '#2F9BF7'
    },

    unselected: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        height: '80%',
        width: '30%',
    },

    selectedText: {
        fontWeight: '600',
        fontSize: 16,
    },

    unselectedText: {
        fontSize: 16,
        opacity: 0.5,
        fontWeight: '500'
    }
})