import {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import { postForm } from '../../../../api'

import Field from './components/Field'
import Submit from './components/Submit/Submit'

const Event = ({id, event, selected, onPress}) => {
    const {title, hostName, hostId, fields} = event

    const submittedKey = `submitted-form-hostId=${hostId}&eventTitle=${title}`

    const [completed, setCompleted] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [inputs, setInputs] = useState(fields.map(({name}) => ({
        name: name,
        value: ''
    })))

    useEffect(() => {
        (async () => {
            const submitted = await AsyncStorage.getItem(submittedKey)
    
            if(submitted) {
                setSubmitted(submitted)
            }
        })()
    }, [])

    useEffect(() => {
        setCompleted(inputs.every(({value}, i) => (
            value !== '' || fields[i].presence === 'optional'
        )))
        
    }, [inputs])

    const setInput = (i) => (text) => {
        setInputs(inputs.map((input, j) => (i === j ? {name: input.name, value: text} : input)))
    }

    const onSubmitPress = () => {
        postForm(id, hostId, title, JSON.stringify(inputs), 
            (message) => {
                console.error(message)
            },

            () => {
                (async () => {
                    onPress()

                    setSubmitted(true)
                    await AsyncStorage.setItem(submittedKey, 'true')
                })()
            }
        )
    }

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style = {styles.head}>
                <View>
                    <Text style = {styles.title}>{title}</Text>
                    <Text style = {styles.hostName}>{hostName}</Text>
                </View>

                {submitted && <Image style = {styles.submitted} source = {require('./assets/submitted.png')}/>}
            </View>
            
            {selected && 
                <View style = {styles.body}>
                    <View style = {styles.fields}>
                        {fields.map((field, i) => (
                            <Field key = {i} field = {field} setInput = {setInput(i)}/>
                        ))}
                    </View>
                    
                    <Submit enabled = {completed} onPress = {onSubmitPress}/>
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
        paddingVertical: 5,
        marginTop: 5,
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

    fields: {
        marginTop: 10,
    },

    submitted: {
        height: 25,
        width: 25,
        resizeMode: 'contain',
        tintColor: 'green'
    }
})