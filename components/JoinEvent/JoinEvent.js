import {useState, useEffect, useRef} from 'react'
import {View, StyleSheet, useWindowDimensions, Text, ScrollView, NativeModules, NativeEventEmitter} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {getEvents} from '../../api'

import Event from './components/Event/Event'
import Message from '../Message/Message'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const JoinEvent = ({id, bluetooth}) => {
    const {width} = useWindowDimensions()
    const {top} = useSafeAreaInsets()

    const [connected, setConnected] = useState(false)
    const [selected, setSelected] = useState(-1)

    const [peerIds, setPeerIds] = useState(new Set())
    const [events, setEvents] = useState([])

    const loadEvents = () => {
        (async () => {
            try {
                const responses = await Promise.all(
                    [...peerIds].map(peerId => getEvents(peerId))
                )

                setEvents(responses.flat(2).map(({title, host_name, host_id, fields, expiration}) => ({
                    title: title, 
                    hostName: host_name,
                    hostId: host_id,
                    fields: fields,
                    expiration: expiration
                })))

                setConnected(true)
                
            } catch(error) {
                setConnected(false)
            }
        })()
    }

    useEffect(() => {
        BluetoothEvents.addListener('discovered', peerId => {
            if(!peerIds.has(peerId)) {
                setPeerIds(peerIds => new Set(peerIds.add(peerId)))
            }
        })

        loadEvents()
        const interval = setInterval(loadEvents, 2000)

        return () => {
            BluetoothEvents.removeAllListeners('discovered')
            clearInterval(interval)
        }
    }, [])

    return (
        <View style = {{...styles.container, width}}>
            <ScrollView 
                contentContainerStyle = {{...styles.list, paddingTop: top + 70}} 
                showsVerticalScrollIndicator = {false}
            >
                {!bluetooth && <Message message = 'bluetooth'/>}
                {!connected && bluetooth && <Message message = 'disconnected'/>}
                {connected && bluetooth && events.length === 0 && <Message message = 'noEvents'/>}

                {connected && bluetooth && events.map((event, i) => (
                    <Event 
                        key = {event.title + event.hostId}
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
        paddingBottom: 60,
    }
})