import {useState, useEffect, useRef} from 'react'
import {View, TouchableOpacity, Text, Animated, StyleSheet, Easing} from 'react-native'

import {getForms} from '../../../../api'
import {useInterval} from '../../../../hooks'

import FormCount from './components/FormCount/FormCount'

import Download from './components/Download/Download'
import EndEvent from './components/EndEvent/EndEvent'
import Forms from './components/Forms'

const Event = ({event, id, selected, onPress, loadEvents}) => {
    const {title, hostName, fields} = event

    const [expanded, setExpanded] = useState(false)
    
    const [forms, setForms] = useState([])
    
    const loadForms = () => {
        (async () => {
            try {
                const forms = await getForms(id, title)
                setForms(forms)

            } catch(error) {
                console.error(error)
            }
        })()
    }

    const onDelete = () => {
        loadEvents()
        onPress()
    }
    
    useEffect(loadForms, [])
    useInterval(loadForms, 2000)

    const maxHeight = useRef(new Animated.Value(0)).current
    const paddingTop = useRef(new Animated.Value(0)).current
    const paddingBottom = useRef(new Animated.Value(0)).current
    const borderTopWidth = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if(selected) {
            setExpanded(true)
        }

        const duration = 200
        const useNativeDriver = false
        const easing = selected ? Easing.in(Easing.ease) : Easing.out(Easing.ease)

        Animated.parallel([
            Animated.timing(maxHeight, {toValue: selected ? 100 : 0, duration, useNativeDriver, easing}),
            Animated.timing(paddingTop, {toValue: selected ? 8 : 0, duration, useNativeDriver, easing}),
            Animated.timing(paddingBottom, {toValue: selected ? 10 : 0, duration, useNativeDriver, easing}),
            Animated.timing(borderTopWidth, {toValue: selected ? 1 : 0, duration, useNativeDriver, easing})
        ]).start(!selected ? () => setExpanded(false) : () => {})
    }, [selected])

    return (
        <View style = {styles.shadow}>
            <TouchableOpacity style = {styles.container} onPress = {onPress} activeOpacity = {0.75}>
                <View style = {styles.head}>
                    <View>
                        <Text style = {styles.title}>{title}</Text>
                        <Text style = {styles.hostName}>{hostName}</Text>
                    </View>

                    <FormCount count = {forms.length}/>
                </View>

                {expanded &&
                    <Animated.View style = {{...styles.body, maxHeight: maxHeight.interpolate({inputRange: [0, 100], outputRange: ['0%', '100%']}), paddingTop, paddingBottom, borderTopWidth}}>
                        <View style = {styles.buttons}>
                            <Download 
                                title = {title} 
                                keys = {fields.map(({name}) => name)} 
                                values = {forms.map(({fields}) => fields.map(({value}) => value))}
                            />

                            <EndEvent id = {id} title = {title} onDelete = {onDelete}/>
                        </View>

                        <Forms 
                            keys = {fields.map(({name}) => name)} 
                            values = {forms.map(({fields}) => fields.map(({value}) => value))}
                        />
                    </Animated.View>
                }
            </TouchableOpacity>
        </View>
    )
}

export default Event

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000000',
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,  
        elevation: 5,
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center'
    },

    container: {
        width: '94%',
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },

    head: {
        width: '90%',
        height: 72,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    body: {
        borderTopColor: '#CACACA',
        width: '90%',
        borderTopWidth: 1,
        paddingTop: 8,
        paddingBottom: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212427',
        marginBottom: 3
    },

    hostName: {
        fontStyle: 'italic',
        fontSize: 16,
        color: '#212427'
    },

    buttons: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between',
        marginBottom: 14,
        marginTop: 5
    }
})