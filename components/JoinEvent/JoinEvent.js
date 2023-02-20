import {useState} from 'react'
import {View, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'

import Event from './components/Event/Event'

const testEvents = [
    {
        title: "Class",
        hostName: "Aden",
        hostId: 'WHLAs',
        fields: [
            {name: 'Name', type: 'string', presence: 'required'},
        ]
    }, 

]

const JoinEvent = ({id}) => {
    const {width} = useWindowDimensions()
    
    const [selected, setSelected] = useState(-1)

    return (
        <View style = {{...styles.container, width}}>
            <ScrollView contentContainerStyle = {styles.list} showsVerticalScrollIndicator = {false}>
                {testEvents.map((event, i) => (
                    <Event 
                        key = {i}
                        id = {id}
                        event = {event}
                        selected = {selected === i} 
                        onPress = {() => setSelected(selected === i ? -1 : i)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default JoinEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },

    list: {
        paddingTop: 10,
        paddingBottom: 60
    }
})