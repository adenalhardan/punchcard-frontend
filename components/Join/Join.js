import {useState, useEffect, useRef} from 'react'
import {View, StyleSheet, useWindowDimensions, Text, ScrollView, NativeModules, NativeEventEmitter} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'

import {getEvents} from '../../api'
import {useInterval} from '../../hooks'

import Event from './components/Event/Event'
import Message from '../Message/Message'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const Join = ({id, bluetooth, connected, setConnected}) => {
    const {width} = useWindowDimensions()
    const {top} = useSafeAreaInsets()

    const [selected, setSelected] = useState(-1)

    const [peerIds, setPeerIds] = useState(new Set())
    const [events, setEvents] = useState([])

    const loadEvents = () => {
        (async () => {
            try {
                const responses = await Promise.all(
                    [...peerIds].map(peerId => getEvents(peerId))
                )

                setEvents(responses.flat(2).map(({title, host_name, host_id, fields}) => ({
                    title: title, 
                    hostName: host_name,
                    hostId: host_id,
                    fields: fields
                })))

                if(peerIds.size > 0) {
                    setConnected(true)
                }
                
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

        return () => {
            BluetoothEvents.removeAllListeners('discovered')
        }
    }, [])

    useInterval(loadEvents, 1000)

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

export default Join

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEEEE',
    },

    list: {
        paddingBottom: 60,
    }
})