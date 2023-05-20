import {useEffect, useState, useRef} from 'react'
import {FlatList, View, StyleSheet, SafeAreaView, Animated} from 'react-native'

import {NativeModules, NativeEventEmitter} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {getPrefix, getId} from './api'

import Loading from './components/Loading/Loading'
import NavigationBar from './components/NavigationBar/NavigationBar'
import JoinEvent from './components/JoinEvent/JoinEvent'
import HostEvent from './components/HostEvent/HostEvent'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const App = () => {
	const [page, setPage] = useState('joinEvent')
	const ref = useRef(null)

	const [mounted, setMounted] = useState(false)
	const [loading, setLoading] = useState(true)
	const [connected, setConnected] = useState(false)
	const [bluetooth, setBluetooth] = useState(true)

	const [prefix, setPrefix] = useState(null)
	const [id, setId] = useState(null)
	
	const pages = [
		{key: 'join', render: () => <JoinEvent id = {id} bluetooth = {bluetooth}/>},
		{key: 'host', render: () => <HostEvent id = {id} bluetooth = {bluetooth}/>}
	]
	
	const [devices, setDevices] = useState(new Set())

	const offset = useRef(new Animated.Value(0)).current

	const loadName = () => {
		(async () => {
			try {
				const prefix = await getPrefix()
				const id = await getId()

				setPrefix(prefix)
				setId(id)

				Bluetooth.broadcast(prefix + id)
				Bluetooth.scan()

				setLoading(false)
				setConnected(true)

			} catch(error) {
				setConnected(false)
				setTimeout(loadName, 100)
			}
		})()
	}

	useEffect(() => {
		BluetoothEvents.addListener('foundDevice', device => {
			if(!devices.has(device) && device.startsWith(prefix)) {
				setDevices(devices => new Set(devices.add(device)))
			}
		})
		
		BluetoothEvents.addListener('enabled', () => {
			setBluetooth(true)
		})

		BluetoothEvents.addListener('disabled', () => {
			setBluetooth(false)
		})

		loadName()

		return () => {
			BluetoothEvents.removeAllListeners('foundDevice')
			BluetoothEvents.removeAllListeners('enabled')
			BluetoothEvents.removeAllListeners('disabled')
		}
	}, [])

	const onPress = (page) => {
		ref.current.scrollToIndex({index: page === 'join' ? 0 : 1})
		setPage(page)
	}

	const onViewableItemsChanged = ({viewableItems}) => {
		if(viewableItems.length > 0) {
			setPage(viewableItems[0].item.key)
		}
	}

	const viewabilityConfig = {itemVisiblePercentThreshold: 50}
	const viewabilityConfigCallbackPairs = useRef([{viewabilityConfig, onViewableItemsChanged}])

	if(loading) {
		return <Loading/>
	} else {
		return (
			<SafeAreaProvider>
				<NavigationBar page = {page} onPress = {onPress} offset = {offset}/>
				<View style = {styles.container}>
					<Animated.FlatList
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator = {false}
						
						ref = {ref}
						data = {pages}
						keyExtractor = {(item, _) => item.key}
						renderItem = {({item}) => item.render()}

						viewabilityConfigCallbackPairs = {viewabilityConfigCallbackPairs.current}

						onScroll = {Animated.event(
							[{nativeEvent: {contentOffset: {x: offset}}}], 
							{useNativeDriver: true}
						)}
					/>
				</View>
			</SafeAreaProvider>
		)
	}
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		alignItems: 'center'
	}
})