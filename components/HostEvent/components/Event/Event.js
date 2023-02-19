import {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

import {getFormCount, deleteEvent} from '../../../../api'

import Details from './components/Details'

const Event = ({event, selected, onPress, loadEvents}) => {
    const {title, hostName, hostId} = event

    const [formCount, setFormCount] = useState(0)

    const loadFormCount = () => {
        (async () => {
            const formCount = await getFormCount(hostId, title, (message) => {
                console.error(message)
            })

            setFormCount(formCount)
        })()
    }

    const onEndPress = () => {
        deleteEvent(hostId, title, 
            (message) => {
                console.error(message) 
            }, 
            
            () => {
                loadEvents()
                onPress()
            })
    }

    useEffect(() => {
        loadFormCount()
        const interval = setInterval(loadFormCount, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style = {styles.accent}>
                <Text style = {styles.title}>{title}</Text>
            </View>
            
            <View style = {styles.body}>
                <Text style = {styles.hostName}>{hostName}</Text>

                {selected && <Details event = {event} formCount = {formCount} onEndPress = {onEndPress}/>}
            </View>
        </TouchableOpacity>
    )
}

export default Event

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden'
    },

    accent: {
        width: '100%',
        height: 30,
        backgroundColor: 'purple',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    body: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%'
    },

    title: {
        fontSize: 18,
        fontWeight: '500'
    },

    hostName: {
        fontStyle: 'italic'
    },

    fields: {
        marginTop: 10,
        marginLeft: 10
    }
})