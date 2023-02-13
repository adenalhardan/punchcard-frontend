import {useEffect, useState, useRef} from 'react'
import {FlatList, View, StyleSheet, SafeAreaView} from 'react-native'

import {NativeModules, NativeEventEmitter} from 'react-native'

import {getPrefix, getId} from './api'

import NavigationBar from './components/NavigationBar'
import JoinEvent from './components/JoinEvent/JoinEvent'
import HostEvent from './components/HostEvent/HostEvent'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const App = () => {
	const [page, setPage] = useState('joinEvent')
	const ref = useRef(null)

	const [prefix, setPrefix] = useState(null)
	const [id, setId] = useState(null)
	
	const pages = [
		{key: 'joinEvent', render: () => <JoinEvent id = {id}/>},
		{key: 'hostEvent', render: () => <HostEvent id = {id}/>}
	]
	
	const [devices, setDevices] = useState(new Set())

	useEffect(() => {
		(async () => {
			const prefix = await getPrefix()
			const id = await getId()

			setPrefix(prefix)
			setId(id)

			Bluetooth.broadcast(prefix + id)
			Bluetooth.scan()
		
			BluetoothEvents.addListener('foundDevice', device => {
				if(!devices.has(device) && device.startsWith(prefix)) {
					setDevices(devices => new Set(devices.add(device)))
				}
			})
		})()

		return () => {
			BluetoothEvents.removeAllListeners('foundDevice')
		}
	}, [])

	const onPress = (page) => {
		ref.current.scrollToIndex({index: page === 'joinEvent' ? 0 : 1})
		setPage(page)
	}

	const onViewableItemsChanged = ({viewableItems}) => {
		if(viewableItems.length > 0) {
			setPage(viewableItems[0].item.key)
		}
	}
	
	const viewabilityConfig = {itemVisiblePercentThreshold: 75}
	const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}])
	
	return (
		<>
			<SafeAreaView/>
			<NavigationBar page = {page} onPress = {onPress}/>
			<View style = {styles.container}>
				<FlatList
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator = {false}
					
					ref = {ref}
					data = {pages}
					keyExtractor = {(item, _) => item.key}
					renderItem = {({item}) => item.render()}

					viewabilityConfigCallbackPairs = {viewabilityConfigCallbackPairs.current}
				/>
			</View>
		</>
	)
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
	},
})