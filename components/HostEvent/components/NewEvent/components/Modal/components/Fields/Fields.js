import {useEffect, useState} from 'react'
import {View, Text, FlatList, StyleSheet} from 'react-native'

import Field from './components/Field/Field'

const Fields = ({fields, setFields}) => {
    useEffect(() => {
        if(fields.length === 0 || fields[fields.length - 1].name !== '') {
            setFields(fields => [...fields, {
                name: '', 
                type: 'string', 
                presence: 'required', 
                id: parseInt(Date.now() * Math.random()),
                isNew: true
            }])
        }

    }, [fields])

    useEffect(() => {
        if(fields.length <= 2 && fields[0].presence === 'optional') {
            setFields(fields => (fields.map((field, i) => (i === 0 ? {
                ...field,
                presence: 'required'
            } : field))))
        }

    }, [fields])

    const setName = (index) => (text) => {
        setFields(fields => fields.map((field, i) => (i === index ? {
            ...field,
            name: text
        } : field)))
    }

    const onTypePress = (index) => () => {
        setFields(fields => fields.map((field, i) => (i === index ? {
            ...field,
            type: field.type === 'string' ? 'integer' : 'string',
        } : field)))
    }

    const onPresencePress = (index) => () => {
        if(fields.filter((_, i) => i !== index).some(({name, presence}) => name !== '' && presence === 'required')) {
            setFields(fields => fields.map((field, i) => (i === index ? {
                ...field,
                presence: field.presence === 'required' ? 'optional' : 'required',
            } : field)))
        }
    }

    const onDeletePress = (index) => (id, animation) => () => {
        if(fields.length > 1 && index < fields.length - 1) {
            animation(() => {
                let newFields = fields.filter(field => field.id !== id)

                if(newFields.every(({name, presence}) => name === '' || presence === 'optional')) {
                    newFields[0].presence = 'required'
                }
                
                setFields(newFields)
            })
        }
    }

    const onInsert = (index) => () => {
        setFields(fields.map((field, i) => (i == index ? {
            ...field,
            isNew: false
        } : field)))
    }

    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Fields</Text>

            {fields.map((field, index) => (
                <Field 
                    key = {field.id + index}
                    field = {field} 

                    setName = {setName(index)}
                    onTypePress = {onTypePress(index)} 
                    onPresencePress = {onPresencePress(index)}
                    onDeletePress = {onDeletePress(index)}

                    onInsert = {onInsert(index)}
                />
            ))}
        </View>
    )
}

export default Fields

const styles = StyleSheet.create({
    container: {

    },

    title: {
        fontWeight: '500',
        fontSize: 18,
        marginBottom: 2,
        color: '#212427'
    }
})