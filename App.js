import {useEffect, useState, useRef} from 'react'
import {FlatList, View, StyleSheet, Animated, NativeModules, NativeEventEmitter} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import {getPrefix, getId} from './api'

import NavigationBar from './components/NavigationBar/NavigationBar'
import Join from './components/Join/Join'
import Host from './components/Host/Host'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const App = () => {
	const [page, setPage] = useState('join')
	const ref = useRef(null)

	const [loading, setLoading] = useState(true)

	const [connected, setConnected] = useState(false)
	const [bluetooth, setBluetooth] = useState(false)
	
	const pages = [
		{key: 'join', render: () => <Join id = {id} bluetooth = {bluetooth} connected = {connected} setConnected = {setConnected}/>},
		{key: 'host', render: () => <Host id = {id} bluetooth = {bluetooth} connected = {connected} setConnected = {setConnected}/>}
	]

	const offset = useRef(new Animated.Value(0)).current

	const [id, setId] = useState(null)

	const loadId = () => {
		(async () => {
			try {
				const id = await getId()
				setId(id)

				Bluetooth.broadcast(id)
				Bluetooth.scan()

				setConnected(true)

			} catch(error) {
				setTimeout(loadId, 100)
			}
		})()
	}

	useEffect(() => {
		BluetoothEvents.addListener('enabled', () => {
			setBluetooth(true)
		})

		BluetoothEvents.addListener('disabled', () => {
			setBluetooth(false)
		})

		loadId()

		return () => {
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

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EEEEEE',
		alignItems: 'center'
	}
})