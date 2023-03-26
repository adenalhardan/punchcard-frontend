import React from 'react'
import {TextInput, View, Text, StyleSheet} from 'react-native'

const Field = ({field, setInput}) => {
    const {name, type, presence} = field

    return (
        <View style = {styles.container}>
            <View style = {styles.banner}>
                <Text style = {styles.text}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>

                {presence === 'required' &&
                    <View style = {styles.required}>
                        <Text style = {styles.requiredText}>Required</Text>
                    </View>
                }
            </View>

            <TextInput style = {styles.input} onChangeText = {setInput}/>
        </View>
    )
}

export default Field

const styles = StyleSheet.create({
    container: {
        width: '80%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 12
    },

    banner: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 3, 
        justifyContent: 'space-between', 
        width: '100%'
    },

    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 7,
        fontSize: 18
    },

    text: {
        fontWeight: '500',
        marginBottom: -2,
        fontSize: 18,
        color: '#212427'
    },

    required: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 12,
        backgroundColor: '#fedbd6',
        marginLeft: 4,
    },

    requiredText: {
        fontSize: 12,
        color: '#cf1c00',
        fontWeight: '600'
    }
})