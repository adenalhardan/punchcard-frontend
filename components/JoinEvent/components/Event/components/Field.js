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
        marginLeft: 0,
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 5,
        paddingVertical: 6,
        paddingHorizontal: 7,
        fontSize: 16
    },

    text: {
        fontWeight: '500',
        marginBottom: -2,
        fontSize: 16
    },

    required: {
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 12,
        backgroundColor: '#FC4138',
        marginLeft: 4,
        opacity: 0.95
    },

    requiredText: {
        fontSize: 12,
        color: '#750D07',
        fontWeight: '700'
    }
})