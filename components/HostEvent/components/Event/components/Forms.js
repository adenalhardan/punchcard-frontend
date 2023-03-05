import {useState} from 'react'
import {ScrollView, View, Text, TouchableOpacity, StyleSheet} from 'react-native'

const Forms = ({forms}) => {
    const [expanded, setExpanded] = useState(false)
    
    return (
        <View style = {styles.container}>
            <Text style = {styles.title}>Submissions</Text>
            <ScrollView style = {styles.list}>

            </ScrollView>

            <TouchableOpacity style = {styles.button} onPress = {() => setExpanded(!expanded)}>
                <Text style = {styles.buttonText}>{expanded ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Forms

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    list: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 10,
        padding: 5
    },

    title: {
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginBottom: 2,
        fontSize: 15
    },

    button: {
        marginTop: 5
    },

    buttonText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#2F9BF7'
    }
})