import React from 'react'
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native'

import {useSafeAreaInsets} from 'react-native-safe-area-context'

const NavigationBar = ({page, onPress}) => {
    const {top} = useSafeAreaInsets()

    return (
        <View style = {{...styles.container, height: top + 40}}>
            <View style = {{...styles.background, height: top + 40}}/>

            <TouchableOpacity 
                style = {[page === 'joinEvent' ? styles.selected : styles.unselected, styles.tab]} 
                onPress = {() => onPress('joinEvent')}
            >
                <Text style = {page === 'joinEvent' ? styles.selectedText : styles.unselectedText}>Join</Text>
                <Image style = {page === 'joinEvent' ? styles.joinImage : {...styles.joinImage, opacity: 0.5}} source = {require('./assets/join.png')}/>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style = {[page === 'hostEvent' ? styles.selected : styles.unselected, styles.tab]} 
                onPress = {() => onPress('hostEvent')}
            >
                <Text style = {page === 'hostEvent' ? styles.selectedText : styles.unselectedText}>Host</Text>
                <Image style = {page === 'hostEvent' ? styles.hostImage : {...styles.hostImage, opacity: 0.5}} source = {require('./assets/host.png')}/>
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

    tab: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
        height: '40%',
        width: '30%',
        flexDirection: 'row'
    },

    selected: {
        borderBottomWidth: 3,
        borderBottomColor: '#2F9BF7'
    },

    unselected: {

    },

    selectedText: {
        fontWeight: '600',
        fontSize: 16,
    },

    unselectedText: {
        fontSize: 16,
        opacity: 0.5,
        fontWeight: '500'
    },

    joinImage: {
        height: 28,
        width: 28,
        marginLeft: 5,
        resizeMode: 'contain',
    },

    hostImage: {
        height: 35,
        width: 35,
        marginLeft: 8,
        resizeMode: 'contain',
    }
})