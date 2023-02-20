import {useState, useEffect} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

import { postForm } from '../../../../api'

import Field from './components/Field'
import Submit from './components/Submit'

const Event = ({id, event, selected, onPress}) => {
    const {title, hostName, hostId, fields} = event

    const [completed, setCompleted] = useState(false)

    const [inputs, setInputs] = useState(fields.map(({name}) => ({
        name: name,
        value: ''
    })))

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
                onPress()
            }
        )
    }

    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style = {styles.accent}>
                <Text style = {styles.title}>{title}</Text>
            </View>
            
            <View style = {styles.body}>
                <Text style = {styles.hostName}>{hostName}</Text>

                {selected && 
                    <>
                        <View style = {styles.fields}>
                            {fields.map((field, i) => (
                                <Field key = {i} field = {field} setInput = {setInput(i)}/>
                            ))}
                        </View>
                        
                        <Submit enabled = {completed} onPress = {onSubmitPress}/>
                    </>
                }
            </View>
        </TouchableOpacity>
    )
}

export default Event

const styles = StyleSheet.create({
    container: {
        width: '94%',
        marginBottom: 15,
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
        height: 40,
        backgroundColor: '#2D61F4',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
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
    }
})