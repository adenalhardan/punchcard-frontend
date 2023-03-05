import {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

import {getForms} from '../../../../api'

import FormCount from './components/FormCount/FormCount'

import Download from './components/Download/Download'
import EndEvent from './components/EndEvent/EndEvent'
import Forms from './components/Forms'

const Event = ({event, selected, onPress, loadEvents}) => {
    const {title, hostName, hostId, fields} = event
    
    const [forms, setForms] = useState([])

    const loadForms = () => {
        (async () => {
            try {
                const forms = await getForms(hostId, title)
                setForms(forms)

            } catch(error) {
                console.error(error)
            }
        })()
    }

    const onDelete = () => {
        loadEvents()
        onPress()
    }
    
    useEffect(() => {
        loadForms()
        const interval = setInterval(loadForms, 5000)

        return () => clearInterval(interval)
    }, [])

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style = {styles.head}>
                <View>
                    <Text style = {styles.title}>{title}</Text>
                    <Text style = {styles.hostName}>{hostName}</Text>
                </View>

                <FormCount count = {forms.length}/>
            </View>
            
            {selected && 
                <View style = {styles.body}>
                    <View style = {styles.buttons}>
                        <Download forms = {forms}/>
                        <EndEvent event = {event} onDelete = {onDelete}/>
                    </View>

                    <Forms forms = {forms}/>
                </View>
            }
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

    head: {
        width: '90%',
        height: 60,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    body: {
        borderTopColor: '#CACACA',
        borderTopWidth: 1,
        paddingTop: 5,
        marginTop: 2,
        paddingBottom: 10,
        width: '90%',
    },

    title: {
        fontSize: 20,
        fontWeight: '600'
    },

    hostName: {
        fontStyle: 'italic',
        fontSize: 16
    },

    buttons: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 5
    }
})