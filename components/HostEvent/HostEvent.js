import {useState} from 'react'
import {View, StyleSheet, useWindowDimensions, ScrollView} from 'react-native'

import Event from './components/Event/Event'
import CreateEvent from './components/CreateEvent/CreateEvent'

const testEvents = [
    {title: "Class", hostName: 'Yeww'}, 
    {title: "Class", hostName: 'Yeww'}, 
    {title: "Class", hostName: 'Yeww'}, 
    {title: "Class", hostName: 'Yeww'}, 
    {title: "Class", hostName: 'Yeww'}, 
]

const HostEvent = ({id}) => {
    const {width} = useWindowDimensions()

    const [selected, setSelected] = useState(-1)

    return (
        <View style = {{...styles.container, width}}>
            <ScrollView contentContainerStyle = {styles.list} showsVerticalScrollIndicator = {false}>
                <CreateEvent 
                    key = 'create'
                    id = {id} 
                    selected = {selected === 0} 
                    onPress = {() => setSelected(selected === 0 ? -1 : 0)}
                />

                {testEvents.map((event, i) => (
                    <Event 
                        key = {i} 
                        event = {event}
                        selected = {selected === i + 1}
                        onPress = {() => setSelected((selected === i + 1) ? -1 : i + 1)}
                    />
                ))}
            </ScrollView>
        </View>
    )
}

export default HostEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
        paddingHorizontal: '3%'
    },

    list: {
        paddingTop: 10,
        paddingBottom: 60
    }
})