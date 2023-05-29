import {useRef, useEffect, useState} from 'react'
import {Animated, View, Easing, StyleSheet} from 'react-native'

import Button from './components/Button/Button'
import Modal from './components/Modal/Modal'

const NewEvent = ({selected, id, loadEvents, onPress}) => {
    const [expanded, setExpanded] = useState(false)

    const buttonMaxHeight = useRef(new Animated.Value(100)).current

    const modalMaxHeight = useRef(new Animated.Value(0)).current
    const modalPaddingTop = useRef(new Animated.Value(0)).current
    const modalPaddingBottom = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if(selected) {
            setExpanded(true)
        }

        const useNativeDriver = false

        const buttonDuration = 50
        const modalDuration = 200

        const buttonEasing = selected ? Easing.out(Easing.ease) : Easing.in(Easing.ease)
        const modalEasing = selected ? Easing.in(Easing.ease) : Easing.out(Easing.ease)

        const buttonAnimation = Animated.timing(
            buttonMaxHeight, 
            {toValue: selected ? 0 : 100, duration: buttonDuration, useNativeDriver, easing: buttonEasing}
        )

        const modalAnimation = Animated.parallel([
            Animated.timing(modalMaxHeight, {toValue: selected ? 100 : 0, duration: modalDuration, useNativeDriver, easing: modalEasing}),
            Animated.timing(modalPaddingTop, {toValue: selected ? 12 : 0, duration: modalDuration, useNativeDriver, easing: modalEasing}),
            Animated.timing(modalPaddingBottom, {toValue: selected ? 10 : 0, duration: modalDuration, useNativeDriver, easing: modalEasing})
        ])

        Animated.sequence(selected ? 
            [buttonAnimation, modalAnimation] : 
            [modalAnimation, buttonAnimation]
        ).start(!selected ? () => setExpanded(false) : () => {})

    }, [selected])

    return (
        <View style = {styles.container}>
            <Button maxHeight = {buttonMaxHeight}  onPress = {onPress}/>

            {expanded && <Modal 
                id = {id} 
                loadEvents = {loadEvents} 
                onPress = {onPress}
                maxHeight = {modalMaxHeight} 
                paddingTop = {modalPaddingTop}
                paddingBottom = {modalPaddingBottom}
            />}
        </View>
    )
}

export default NewEvent

const styles = StyleSheet.create({
    container: {
        marginBottom: 20
    }
})