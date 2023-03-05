import React from 'react'

import Button from './components/Button/Button'
import Modal from './components/Modal/Modal'

const NewEvent = ({selected, id, loadEvents, onPress}) => (
    selected ? <Modal id = {id} loadEvents = {loadEvents} onPress = {onPress}/> : <Button onPress = {onPress}/>
)

export default NewEvent