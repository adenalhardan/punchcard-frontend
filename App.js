import {useEffect, useState, useRef} from 'react'
import {FlatList, View, StyleSheet, SafeAreaView} from 'react-native'

import {NativeModules, NativeEventEmitter} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import NavigationBar from './components/NavigationBar'
import JoinEvent from './components/JoinEvent/JoinEvent'
import HostEvent from './components/HostEvent/HostEvent'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const App = () => {
	const [page, setPage] = useState('joinEvent')
	const ref = useRef(null)
	
	const pages = [
		{key: 'joinEvent', render: () => <JoinEvent/>},
		{key: 'hostEvent', render: () => <HostEvent/>}
	]

	const [devices, setDevices] = useState(new Set())

	const [prefix, setPrefix] = useState(null)
	const [id, setId] = useState(null)

	useEffect(() => {
		(async () => {
			const prefix = await getPrefix()
			const id = await getId()

			Bluetooth.broadcast(prefix.concat(id))

			Bluetooth.scan()
		
			BluetoothEvents.addListener('foundDevice', device => {
				if(!devices.has(device) && device.startsWith(prefix)) {
					setDevices(prev => new Set(prev.add(device)))
				}
			})
		})()

		return () => {
			BluetoothEvents.removeAllListeners('foundDevice')
		}
	}, [])

	const getPrefix = async () => {
		const url = 'https://ikdsbxpo4dc2dz2pvmtfng2sly0cxhfk.lambda-url.us-west-1.on.aws/get-prefix'
		const response = await fetch(url)
		const {prefix} = await response.json()

		setPrefix(prefix)
		return prefix
	}

	const getId = async () => {
		const url = 'https://ikdsbxpo4dc2dz2pvmtfng2sly0cxhfk.lambda-url.us-west-1.on.aws/get-id'
		const key = 'id'

		let id = await AsyncStorage.getItem(key)

		if(id === null) {
			const response = await fetch(url)
			const json = await response.json()

			id = json.id
		}
	
		setId(id)
		await AsyncStorage.setItem(key, id)

		return id
	}

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