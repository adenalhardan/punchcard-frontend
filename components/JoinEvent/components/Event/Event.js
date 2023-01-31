import {useState} from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

import Field from './components/Field'
import Submit from './components/Submit'

const Event = ({fields, selected, onPress}) => {
    return (
        <TouchableOpacity style = {styles.container} onPress = {onPress}>
            <View style = {styles.accent}>
                <Text style = {styles.title}>Event</Text>
            </View>

            <View style = {styles.body}>
                <Text style = {styles.host}>Host</Text>

                {selected && 
                    <>
                        <View style = {styles.fields}>
                            {Object.entries(fields).map((field, i) => (
                                <Field key = {i} field = {field}/>
                            ))}
                        </View>
                        
                        <Submit/>
                    </>
                }
            </View>
        </TouchableOpacity>
    )
}

export default Event

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden'
    },

    accent: {
        width: '100%',
        height: 30,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        paddingHorizontal: 10
    },

    body: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%'
    },

    title: {
        fontSize: 18,
        fontWeight: '500'
    },

    host: {
        fontStyle: 'italic'
    },

    fields: {
        marginTop: 10,
        marginLeft: 10
    }
})