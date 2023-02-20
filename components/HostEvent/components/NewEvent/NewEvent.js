import {useState, useEffect} from 'react'
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from 'react-native'

import {postEvent} from '../../../../api'

import Fields from './components/Fields/Fields'
import Create from './components/Create/Create'

const NewEvent = ({id, selected, loadEvents, onPress}) => {
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
        postEvent(id, title, hostName, JSON.stringify(fields.filter(({name}) => name !== '')),
            (message) => {
                console.error(message)
            },

            () => {
                setTitle('')
                setHostName('')
                setFields([{name: '', type: 'string', presence: 'required'}])

                setComplete(false)
                onPress()
                
                loadEvents()
            }
        )
    }

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style = {styles.accent}>
                <Text style = {styles.buttonText}>New Event</Text>
            </View>

            {selected && 
                <View style = {styles.body}>
                    <View style = {styles.title}>
                        <Text style = {styles.text}>Event Title</Text>
                        <TextInput style = {styles.input} value = {title} onChangeText = {setTitle}/>
                    </View>

                    <View style = {styles.name}>
                        <Text style = {styles.text}>Host Name</Text>
                        <TextInput style = {styles.input} value = {hostName} onChangeText = {setHostName}/>
                    </View>
                    
                    <Fields fields = {fields} setFields = {setFields}/>

                   <Create enabled = {complete} onPRess = {onSubmitPress}/>
                </View>
            }
        </TouchableOpacity>
    )
}

export default NewEvent

const styles = StyleSheet.create({
    container: {
        width: '94%',
        marginBottom: 20,
        backgroundColor: '#DE124F',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
        alignSelf: 'center'
    },

    accent: {
        height: 45,
        justifyContent: 'center'
    },

    body: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },

    input: {
        width: '70%',
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
        padding: 5,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '700'
    },

    text: {
        fontWeight: '500'
    },

    title: {
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginBottom: 10
    }
})