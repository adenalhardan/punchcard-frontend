import React from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'

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
                <Image style = {styles.image} source = {require('./assets/download.png')}/>
            </TouchableOpacity>

            <Text style = {styles.text}>Download</Text>
        </View>

        <View style = {styles.section}>
            <TouchableOpacity style = {styles.end} onPress = {onEndPress}>
                <Image style = {styles.image} source = {require('./assets/end.png')}/>
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
        marginTop: 5,
        fontWeight: '500'
    },

    submissions: {
        height: 50,
        width: 50,
        borderRadius: 12,
        backgroundColor: '#5CBF2A',
        justifyContent: 'center',
        alignItems: 'center'
    },

    submissionsText: {
        fontSize: 20,
        fontWeight: '600'
    },

    download: {
        height: 50,
        width: 50,
        borderRadius: 12,
        backgroundColor: '#A221A3',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,  
        elevation: 2,
    },

    end: {
        height: 50,
        width: 50,
        borderRadius: 12,
        backgroundColor: '#FF4C44',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,  
        elevation: 2,
    },

    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    }
})