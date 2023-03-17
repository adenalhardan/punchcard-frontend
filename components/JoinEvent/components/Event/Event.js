import {useState, useEffect, useRef} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet, Animated, Easing} from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {postForm} from '../../../../api'

import Field from './components/Field'
import Submit from './components/Submit/Submit'
import Error from './components/Error/Error'

const Event = ({id, event, selected, onPress}) => {
    const {title, hostName, hostId, fields, expiration} = event

    const submittedKey = `submitted-form?hostId=${hostId}&eventTitle=${title}&expiration=${expiration}`

    const [completed, setCompleted] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [error, setError] = useState('')

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

    const maxHeight = useRef(new Animated.Value(0)).current
    const paddingTop = useRef(new Animated.Value(0)).current
    const paddingBottom = useRef(new Animated.Value(0)).current
    const borderTopWidth = useRef(new Animated.Value(0)).current

    useEffect(() => {
        const duration = 200
        const useNativeDriver = false
        const easing = selected ? Easing.in(Easing.ease) : Easing.out(Easing.ease)

        Animated.parallel([
            Animated.timing(maxHeight, {toValue: selected ? 100 : 0, duration, useNativeDriver, easing}),
            Animated.timing(paddingTop, {toValue: selected ? 5 : 0, duration, useNativeDriver, easing}),
            Animated.timing(paddingBottom, {toValue: selected ? 10 : 0, duration, useNativeDriver, easing}),
            Animated.timing(borderTopWidth, {toValue: selected ? 1 : 0, duration, useNativeDriver, easing})
        ]).start()

    }, [selected])

    const setInput = (i) => (text) => {
        setInputs(inputs.map((input, j) => (i === j ? {name: input.name, value: text} : input)))
    }

    const onSubmitPress = () => {
        (async () => {
            try {
                await postForm('WXACA', hostId, title, JSON.stringify(inputs)) // replace with id

                onPress()
                setSubmitted(true)
                setError('')
                await AsyncStorage.setItem(submittedKey, 'true')

            } catch(error) {
                setError(error)
            }
        })()
    }

    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress}>
                <View style = {styles.head}>
                    <View>
                        <Text style = {styles.title}>{title}</Text>
                        <Text style = {styles.hostName}>{hostName}</Text>
                    </View>

                    {submitted && <Image style = {styles.submitted} source = {require('./assets/submitted.png')}/>}
                </View>
                
                <Animated.View style = {{...styles.body, maxHeight: maxHeight.interpolate({inputRange: [0, 100], outputRange: ['0%', '100%']}), paddingTop, paddingBottom, borderTopWidth}}>
                    <View style = {styles.fields}>
                        {fields.map((field, i) => (
                            <Field key = {i} field = {field} setInput = {setInput(i)}/>
                        ))}
                    </View>

                    {error && <Error message = {error}/>}
                    
                    <Submit enabled = {completed} onPress = {onSubmitPress}/>
                </Animated.View>
                
            </TouchableOpacity>
        </View>
    )
}

export default Event

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center'
    },

    container: {
        width: '94%',
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },

    head: {
        width: '90%',
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    body: {
        borderTopColor: '#CACACA',
        width: '90%',
    },

    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#212427',
        marginBottom: 4
    },

    hostName: {
        fontStyle: 'italic',
        fontSize: 16,
        color: '#212427'
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