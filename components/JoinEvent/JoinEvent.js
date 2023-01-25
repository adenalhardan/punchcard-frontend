import React from 'react'
import {View, StyleSheet, useWindowDimensions, FlatList} from 'react-native'

import Event from './components/Event'

const testEvents = [
    {}, 
    {},
    {},
    {}, 
    {},
    {},
    {}, 
    {},
    {}
]

const JoinEvent = () => {
    const {width} = useWindowDimensions()

    return (
        <View style = {{...styles.container, width}}>
            <FlatList 
                data = {testEvents} 
                renderItem = {() => <Event/>}

                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {styles.list}
            />
        </View>
    )
}

export default JoinEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        paddingHorizontal: '3%'
    },

    list: {
        paddingTop: 10,
        paddingBottom: 60
    }
})