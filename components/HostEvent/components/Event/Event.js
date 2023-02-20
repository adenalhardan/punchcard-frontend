import {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

import {getFormCount, deleteEvent} from '../../../../api'

import Details from './components/Details/Details'

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
        width: '94%',
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
        alignSelf: 'center'
    },

    accent: {
        width: '100%',
        height: 35,
        backgroundColor: '#1E55EB',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    body: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%'
    },

    title: {
        fontSize: 18,
        fontWeight: '600'
    },

    hostName: {
        fontStyle: 'italic',
        fontSize: 16
    },

    fields: {
        marginTop: 10,
        marginLeft: 10
    }
})