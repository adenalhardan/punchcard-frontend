import {useEffect, useState} from 'react'
import {StyleSheet, Text, SafeAreaView} from 'react-native'

import {NativeModules, NativeEventEmitter} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const App = () => {
	const [devices, setDevices] = useState(new Set())
	const [prefix, setPrefix] = useState(null)
	const [id, setId] = useState(null)

	useEffect(() => {
		(async () => {
			try {
				const prefix = await getPrefix()
				const id = await getId()

				Bluetooth.broadcast(prefix.concat(id))

			} catch(error) {
				throw error
			}
		})()

		Bluetooth.scan()
		
		BluetoothEvents.addListener('foundDevice', device => {
			if(!devices.has(device)) {
				setDevices(prev => new Set(prev.add(device)))
			}
		})

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
	
	return (
		<SafeAreaView style = {styles.container}>
			<Text>{prefix + id}'s Devices: </Text>

			{[...devices].map(device => (
				<Text key = {device}>{device}</Text>
			))}
		</SafeAreaView>
	)
}

export default App

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		alignItems: 'center',
		justifyContent: 'center',
	},
})