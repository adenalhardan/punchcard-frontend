import {useState} from 'react'
import {View, FlatList, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'

import Event from './components/Event'
import CreateEvent from './components/CreateEvent'

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

const HostEvent = ({onScroll}) => {
    const [offset, setOffset] = useState(0)

    const {width} = useWindowDimensions()

    return (
        <View style = {{...styles.container, width}}>
            <ScrollView 
                contentContainerStyle = {styles.list}
                showsVerticalScrollIndicator = {false}
            >
                <CreateEvent key = 'createEventButton'/>
                {testEvents.map((_, i) => <Event key = {i}/>)}
            </ScrollView>
        </View>
    )
}

export default HostEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        paddingHorizontal: '3%'
    },

    list: {
        paddingTop: 10,
        paddingBottom: 60
    }
})