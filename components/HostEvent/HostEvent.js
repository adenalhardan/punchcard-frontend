import {useState, useEffect} from 'react'
import {View, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'

import {getEvents} from '../../api'

import Event from './components/Event/Event'
import CreateEvent from './components/CreateEvent/CreateEvent'

const HostEvent = ({id}) => {
    const {width} = useWindowDimensions()

    const [selected, setSelected] = useState(-1)
    const [events, setEvents] = useState([])

    const loadEvents = () => {
        (async () => {
            const events = await getEvents(id, (message) => {
                console.error(message)
            })

            setEvents(events.map(({title, host_name}) => ({
                title: title, 
                hostName: host_name
            })))
        })()
    }

    useEffect(() => {
        loadEvents()
        const interval = setInterval(loadEvents, 30000)

        return () => clearInterval(interval)
    }, [])

    return (
        <View style = {{...styles.container, width}}>
            <ScrollView contentContainerStyle = {styles.list} showsVerticalScrollIndicator = {false}>
                <CreateEvent 
                    key = 'create'
                    id = {id} 
                    selected = {selected === 0} 
                    loadEvents = {loadEvents}
                    onPress = {() => setSelected(selected === 0 ? -1 : 0)}
                />

                {events.map((event, i) => (
                    <Event 
                        key = {i} 
                        event = {event}
                        selected = {selected === i + 1}
                        onPress = {() => setSelected((selected === i + 1) ? -1 : i + 1)}
                    />
                ))}
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