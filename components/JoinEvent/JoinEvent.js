import {useState, useEffect} from 'react'
import {View, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {getEvents} from '../../api'

import Event from './components/Event/Event'
import Disconnected from '../Disconnected/Disconnected'

const JoinEvent = ({id}) => {
    const {width} = useWindowDimensions()
    const {top} = useSafeAreaInsets()
    
    const [selected, setSelected] = useState(-1)
    const [events, setEvents] = useState([])

    const [connected, setConnected] = useState(false)

    const loadEvents = () => {
        (async () => {
            try {
                const events = await getEvents(id) 

                setConnected(true)

                setEvents(events.map(({title, host_name, host_id, fields}) => ({
                    title: title, 
                    hostName: host_name,
                    hostId: host_id,
                    fields: fields
                })))

            } catch(error) {
                setConnected(false)
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
                {!connected && <Disconnected/>}

                {connected && events.map((event, i) => (
                    <Event 
                        key = {i}
                        id = {id}
                        event = {event}
                        selected = {selected === i} 
                        onPress = {() => setSelected(selected === i ? -1 : i)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default JoinEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },

    list: {
        paddingBottom: 60
    }
})