import {useState} from 'react'
import {View, StyleSheet, useWindowDimensions, FlatList} from 'react-native'

import Event from './components/Event/Event'

const testEvents = [
    {fields:  {
        "name": {
            "data_type": "string",
            "data_presence": "required"
        }
    }}, 
    {fields:  {
        "name": {
            "data_type": "string",
            "data_presence": "required"
        }
    }}, 
    {fields:  {
        "name": {
            "data_type": "string",
            "data_presence": "required"
        }
    }}, 
    {fields:  {
        "name": {
            "data_type": "string",
            "data_presence": "required"
        }
    }}, 
    {fields:  {
        "name": {
            "data_type": "string",
            "data_presence": "required"
        }
    }}, 
]

const JoinEvent = () => {
    const {width} = useWindowDimensions()
    
    const [selected, setSelected] = useState(-1)

    return (
        <View style = {{...styles.container, width}}>
            <FlatList 
                data = {testEvents} 
                renderItem = {({item, index}) => (
                    <Event 
                        fields = {item.fields} 
                        selected = {selected === index} 
                        onPress = {() => setSelected(selected === index ? -1 : index)}
                    />
                )}

                showsVerticalScrollIndicator = {false}
                contentContainerStyle = {styles.list}
            />
        </View>
    )
}

export default JoinEvent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        paddingHorizontal: '3%'
    },

    list: {
        paddingTop: 10,
        paddingBottom: 60
    }
})