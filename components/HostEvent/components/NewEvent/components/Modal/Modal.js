import {useState, useEffect} from 'react'
import {TouchableOpacity, Text, View, TextInput, Animated, StyleSheet} from 'react-native'

import {postEvent} from '../../../../../../api'

import Fields from './components/Fields/Fields'
import Create from './components/Create/Create'
import Error from './components/Error/Error'

const Modal = ({id, loadEvents, onPress, maxHeight, paddingTop, paddingBottom}) => {
    const [complete, setComplete] = useState(false)
    const [error, setError] = useState('')

    const [title, setTitle] = useState('')
    const [hostName, setHostName] = useState('')
    const [fields, setFields] = useState([{
        name: '', 
        type: 'string', 
        presence: 'required', 
        id: parseInt(Date.now() * Math.random()),
        isNew: false
    }])

    useEffect(() => {
        setComplete(
            title !== '' && 
            hostName !== '' && 
            fields.some(({name, presence}) => name !== '' && presence === 'required')
        )
    }, [title, hostName, fields])

    const onCreatePress = () => {
        (async () => {
            try {
                await postEvent(id, title, hostName, 
                    JSON.stringify(fields.filter(({name}) => name !== '').map(({name, presence, type}) => ({name, presence, type})))
                )

                loadEvents()
                onPress()
                
                setTitle('')
                setHostName('')
                setFields([{name: '', type: 'string', presence: 'required'}])

            } catch(error) {
                setError(error.message)
            }
        })()
    }

    return (
        <TouchableOpacity style = {styles.shadow} onPress = {onPress} activeOpacity = {0.75}>
            <Animated.View style = {{
                ...styles.container,
                paddingTop, 
                paddingBottom,  
                maxHeight: maxHeight.interpolate({inputRange: [0, 100], outputRange: ['0%', '100%'],
            })}}>
                <View style = {{flexDirection: 'column', justifyContent: 'center', marginBottom: 15}}>
                    <Text style = {styles.text}>Event Title</Text>
                    <TextInput style = {styles.input} value = {title} onChangeText = {setTitle}/>
                </View>

                <View style = {{flexDirection: 'column', justifyContent: 'center', marginBottom: 15}}>
                    <Text style = {styles.text}>Host Name</Text>
                    <TextInput style = {styles.input} value = {hostName} onChangeText = {setHostName}/>
                </View>
                
                <Fields fields = {fields} setFields = {setFields}/>

                {error && <Error message = {error}/>}

                <Create enabled = {complete} onPress = {onCreatePress}/>
            </Animated.View>
        </TouchableOpacity>
    )
}

export default Modal

const styles = StyleSheet.create({
    container: {
        width: '94%',
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        paddingHorizontal: '5%',
        overflow: 'hidden'
    },

    shadow: {
        shadowColor: '#000000',
        shadowOffset: {width: 2, height: 5},
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5
    },

    input: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 7,
        fontSize: 16,
        color: '#212427'
    },

    text: {
        fontWeight: '500',
        fontSize: 16,
        color: '#212427'
    },
})