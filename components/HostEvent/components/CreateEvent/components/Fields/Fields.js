import {useEffect} from 'react'
import {View, Text, StyleSheet} from 'react-native'

import Field from './components/Field'

const Fields = ({fields, setFields}) => {
    useEffect(() => {
        if(fields.length === 0 || fields[fields.length - 1].name !== '') {
            setFields([...fields, {name: '', type: 'string', presence: 'required'}])
        }

    }, [fields])

    useEffect(() => {
        if(fields.length === 1 && fields[0].presence === 'optional') {
            setFields()
        }
    })

    const setName = (index) => (text) => {
        setFields(fields.map((field, i) => (i === index ? {
            name: text, 
            type: field.type,
            presence: field.presence
        } : field)))
    }

    const onTypePress = (index) => () => {
        setFields(fields.map((field, i) => (i === index ? {
            name: field.name,
            type: field.type === 'string' ? 'integer' : 'string',
            presence: field.presence
        } : field)))
    }

    const onPresencePress = (index) => () => {
        if(fields.length > 2 || (index === 0 && fields[0].presence === 'optional')) {
            setFields(fields.map((field, i) => (i === index ? {
                name: field.name,
                type: field.type,
                presence: field.presence === 'required' ? 'optional' : 'required'
            } : field)))
        }
    }

    const onDeletePress = (index) => () => {
        setFields(fields.filter((_, i) => i !== index))
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Fields</Text>

            {fields.map((field, index) => (
                <Field 
                    key = {index} 
                    name = {field.name} 
                    type = {field.type} 
                    presence = {field.presence}

                    setName = {setName(index)}
                    onTypePress = {onTypePress(index)} 
                    onPresencePress = {onPresencePress(index)}
                    onDeletePress = {onDeletePress(index)}
                />
            ))}
        </View>
    )
}

export default Fields

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },

    title: {
        marginBottom: 5
    }
})