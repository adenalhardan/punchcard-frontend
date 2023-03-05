import {useState, useEffect} from 'react'
import {TouchableOpacity, Image, Text, View, TextInput, StyleSheet} from 'react-native'

import {postEvent} from '../../../../../../api'

import Fields from './components/Fields/Fields'
import Create from './components/Create/Create'

const Modal = ({id, loadEvents, onPress}) => {
    const [complete, setComplete] = useState(false)

    const [title, setTitle] = useState('')
    const [hostName, setHostName] = useState('')
    const [fields, setFields] = useState([{name: '', type: 'string', presence: 'required'}])

    useEffect(() => {
        setComplete(
            title !== '' && 
            hostName !== '' && 
            fields.some(({name, presence}) => name !== '' && presence === 'required')
        )
    }, [title, hostName, fields])

    const onSubmitPress = () => {
        (async () => {
            try {
                await postEvent(id, title, hostName, JSON.stringify(fields.filter(({name}) => name !== '')))

                setTitle('')
                setHostName('')
                setFields([{name: '', type: 'string', presence: 'required'}])

                setComplete(false)
                onPress()
                
                loadEvents()

            } catch(error) {
                console.error(error)
            }
        })()
    }

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style = {styles.head}>
                <Text style = {styles.title}>New Event</Text>
            </View>

            <View style = {styles.body}>
                <View style = {styles.eventTitle}>
                    <Text style = {styles.text}>Event Title</Text>
                    <TextInput style = {styles.input} value = {title} onChangeText = {setTitle}/>
                </View>

                <View style = {styles.hostName}>
                    <Text style = {styles.text}>Host Name</Text>
                    <TextInput style = {styles.input} value = {hostName} onChangeText = {setHostName}/>
                </View>
                
                <Fields fields = {fields} setFields = {setFields}/>

                <Create enabled = {complete} onPress = {onSubmitPress}/>
            </View>
        </TouchableOpacity>
    )
}

export default Modal

const styles = StyleSheet.create({
    container: {
        width: '94%',
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
        alignSelf: 'center'
    },

    head: {
        height: 40,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: '5%'
    },

    body: {
        borderTopColor: '#CACACA',
        borderTopWidth: 1,
        paddingVertical: 10,
        width: '90%',
    },

    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 7,
        fontSize: 16
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
    },

    text: {
        fontWeight: '500',
        fontSize: 16
    },

    eventTitle: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginBottom: 15
    },

    hostName: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginBottom: 15
    },

    image: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        marginLeft: 10
    }
})