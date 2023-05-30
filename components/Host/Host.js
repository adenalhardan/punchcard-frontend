import {useState, useEffect} from 'react'
import {View, StyleSheet, useWindowDimensions, Image, Text, ScrollView} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {getEvents} from '../../api'

import Event from './components/Event/Event'
import NewEvent from './components/NewEvent/NewEvent'
import Message from '../Message/Message'

const Host = ({id, bluetooth, connected, setConnected}) => {
    const {width} = useWindowDimensions()
    const {top} = useSafeAreaInsets()

    const [selected, setSelected] = useState(-1)
    const [events, setEvents] = useState([])

    const loadEvents = () => {
        (async () => {
            try {
                const events = await getEvents(id)

                setEvents(events.map(({title, host_name, host_id, fields}) => ({
                    title: title, 
                    hostName: host_name,
                    hostId: host_id,
                    fields: fields
                })))

                setConnected(true)

            } catch(error) {
                setConnected(false)
            }
        })()
    }

    useEffect(() => {
        loadEvents()
        const interval = setInterval(loadEvents, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <View style = {{...styles.container, width}}>
            <ScrollView 
                contentContainerStyle = {{...styles.list, paddingTop: top + 70}} 
                showsVerticalScrollIndicator = {false}
            >
                {!bluetooth && <Message message = 'bluetooth'/>}
                {bluetooth && !connected && <Message message = 'disconnected'/>}

                {bluetooth && connected && <NewEvent 
                    key = 'new'
                    id = {id} 
                    selected = {selected === 0} 
                    loadEvents = {loadEvents}
                    onPress = {() => setSelected(selected === 0 ? -1 : 0)}
                />}
                
                {bluetooth && connected && events.map((event, i) => (
                    <Event 
                        key = {event.title + event.hostId} 
                        event = {event}
                        selected = {selected === i + 1}
                        onPress = {() => setSelected((selected === i + 1) ? -1 : i + 1)}
                        loadEvents = {loadEvents}
                    />
                ))}

                {bluetooth && connected && events.length === 0 && <Text style = {styles.text}>No Events</Text>}
            </ScrollView>
        </View>
    )
}

export default Host

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE'
    },

    list: {
        paddingBottom: 60
    },

    text: {
        fontSize: 18,
        color: '#CACACA',
        fontWeight: '600',
        alignSelf: 'center',
        marginTop: 5
    }
})