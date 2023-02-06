import {useState} from 'react'
import {TouchableOpacity, Text, View, TextInput, StyleSheet} from 'react-native'

import Fields from './components/Fields/Fields'
import Create from './components/Create'

const CreateEvent = () => {
    const [selected, setSelected] = useState(false)
    const [complete, setComplete] = useState(false)

    const [title, setTitle] = useState('')
    const [hostName, setHostName] = useState('')
    const [fields, setFields] = useState([{name: '', type: 'string', presence: 'required'}])

    return (
        <TouchableOpacity style = {styles.container} onPress = {() => setSelected(!selected)}>
            <View style = {styles.accent}>
                <Text>Create Event</Text>
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

                    <Create enabled = {complete}/>
                </View>
            }
        </TouchableOpacity>
    )
}

export default CreateEvent

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