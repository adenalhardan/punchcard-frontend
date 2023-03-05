import {useState, useEffect} from 'react'
import {View, StyleSheet, useWindowDimensions, Image, Text, ScrollView} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {getEvents} from '../../api'

import Event from './components/Event/Event'
import NewEvent from './components/NewEvent/NewEvent'
import Disconnected from './components/Disconnected/Disconnected'

const HostEvent = ({id}) => {
    const {width} = useWindowDimensions()
    const {top} = useSafeAreaInsets()

    const [selected, setSelected] = useState(-1)
    const [events, setEvents] = useState([])

    const [connected, setConnected] = useState(false)

    const loadEvents = () => {
        (async () => {
            const events = await getEvents(id, (message) => {
                console.error(message)
                setConnected(false)
            })

            if(events) {
                setConnected(true)

                setEvents(events.map(({title, host_name, host_id}) => ({
                    title: title, 
                    hostName: host_name,
                    hostId: host_id
                })))
            }
        })()
    }

    useEffect(() => {
        loadEvents()
        const interval = setInterval(loadEvents, 30000)

        return () => clearInterval(interval)
    }, [])

    return (
        <View style = {{...styles.container, width}}>
            <ScrollView 
                contentContainerStyle = {{...styles.list, paddingTop: top + 60}} 
                showsVerticalScrollIndicator = {false}
            >
                <NewEvent 
                    key = 'new'
                    id = {id} 
                    selected = {selected === 0} 
                    loadEvents = {loadEvents}
                    onPress = {() => setSelected(selected === 0 ? -1 : 0)}
                />

                {!connected && <Disconnected/>}

                {connected && events.map((event, i) => (
                    <Event 
                        key = {i} 
                        event = {event}
                        selected = {selected === i + 1}
                        onPress = {() => setSelected((selected === i + 1) ? -1 : i + 1)}
                        loadEvents = {loadEvents}
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
        backgroundColor: '#EEEEEE'
    },

    list: {
        paddingBottom: 60
    },
})