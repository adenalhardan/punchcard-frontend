import React from 'react'
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native'

const Details = ({formCount, onEndPress}) => (
    <View style = {styles.container}>
        <View style = {styles.section}>
            <View style = {styles.submissions}>
                <Text style = {styles.submissionsText}>{formCount}</Text>
            </View>

            <Text style = {styles.text}>Submissions</Text>
        </View>

        <View style = {styles.section}>
            <TouchableOpacity style = {styles.download}>

            </TouchableOpacity>

            <Text style = {styles.text}>Download</Text>
        </View>

        <View style = {styles.section}>
            <TouchableOpacity style = {styles.end} onPress = {onEndPress}>

            </TouchableOpacity>

            <Text style = {styles.text}>End Event</Text>
        </View>
    </View>
)

export default Details

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },

    section: {
        alignItems: 'center'
    },

    text: {
        marginTop: 5
    },

    submissions: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: 'brown',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submissionsText: {
        fontSize: 20
    },

    download: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center'
    },

    end: {
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    }
})