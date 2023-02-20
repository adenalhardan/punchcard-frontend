import {useState, useEffect} from 'react'
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from 'react-native'

import {postEvent} from '../../../../api'

import Fields from './components/Fields/Fields'
import Create from './components/Create'

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
                <Text>New Event</Text>
            </View>

            {selected && 
                <View style = {styles.body}>
                    <View style = {{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                        <Text>Title</Text>
                        <TextInput style = {styles.input} value = {title} onChangeText = {setTitle}/>
                    </View>

                    <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                        <Text>Name</Text>
                        <TextInput style = {styles.input} value = {hostName} onChangeText = {setHostName}/>
                    </View>
                    
                    <Fields fields = {fields} setFields = {setFields}/>

                    <Create enabled = {complete} onPress = {onSubmitPress}/>
                </View>
            }
        </TouchableOpacity>
    )
}

export default NewEvent

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: 'orange',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },

    accent: {
        height: 50,
        justifyContent: 'center'
    },

    body: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10
    },

    input: {
        width: '60%',
        marginLeft: 10,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 5,
    }
})