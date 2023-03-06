import {useState} from 'react'
import {ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet} from 'react-native'

const Forms = ({keys, values}) => {
    const [expanded, setExpanded] = useState(false)
    
    if(values.length > 0) {
        return (
            <TouchableWithoutFeedback style = {styles.container}>
                <View style = {{alignItems: 'center'}}>
                    <Text style = {styles.title}>Submissions</Text>
                    <ScrollView style = {styles.list} horizontal showsHorizontalScrollIndicator = {false}>
                        {keys.map((key, i) => (
                            <View key = {key} onStartShouldSetResponder={() => true} style = {i !== (keys.length - 1) ? styles.column : {...styles.column, marginRight: 40}}>
                                <View style = {styles.key}>
                                    <Text style = {styles.keyText}>{key}</Text>
                                </View>

                                {values.slice(0, expanded ? values.length : 3).map((value, j) => (
                                    <>
                                        <Text style = {i !== (keys.length - 1) ? {...styles.value, paddingRight: 60} : styles.value}>{value[i]}</Text>
                                        {j !== (expanded ? (values.length - 1) : 2) && <View style = {styles.break}/>}
                                    </>
                                ))}
                            </View>
                        ))}
                    </ScrollView>

                    <TouchableOpacity style = {styles.button} onPress = {() => setExpanded(!expanded)}>
                        <Text style = {styles.buttonText}>{expanded ? 'Show Less' : 'Show All'}</Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    } else {
        return (
            <TouchableWithoutFeedback style = {styles.container}>
                <Text style = {styles.title}>No Submissions</Text>
            </TouchableWithoutFeedback>
        )
    }
}

export default Forms

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },

    list: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#CACACA',
        borderRadius: 10,
        paddingTop: 8,
        paddingBottom: 12,
        paddingLeft: 12,
        paddingRight: 30
    },

    title: {
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginBottom: 2,
        fontSize: 15,
        color: '#212427'
    },

    button: {
        marginTop: 5
    },

    buttonText: {
        fontWeight: '600',
        fontSize: 14,
        color: '#2F9BF7'
    },

    column: {

    },

    key: {
        alignSelf: 'flex-start',
        paddingHorizontal: 9,
        paddingVertical: 2,
        borderRadius: 12,
        backgroundColor: '#F7F8F9',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#DDE4E8'
    },

    keyText: {
        fontWeight: '600',
        fontSize: 15,
        color: '#64707C'
    },

    break: {
        width: '100%',
        borderBottomColor: '#CACACA',
        borderBottomWidth: 1,
        marginVertical: 4
    },

    value: {
        fontSize: 16,
        color: '#212427',
    }
})