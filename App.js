import {useEffect, useState} from 'react'
import {StyleSheet, Text, SafeAreaView} from 'react-native'
import {NativeModules, NativeEventEmitter} from 'react-native'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const App = () => {
	const [devices, setDevices] = useState(new Set())
	const [prefix, setPrefix] = useState(null)
	const [id, setId] = useState(null)

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('https://ikdsbxpo4dc2dz2pvmtfng2sly0cxhfk.lambda-url.us-west-1.on.aws/get-prefix')
				const {prefix} = await response.json()
				setPrefix(prefix)

			} catch(error) {
				throw error
			}

			try {
				const response = await fetch('https://ikdsbxpo4dc2dz2pvmtfng2sly0cxhfk.lambda-url.us-west-1.on.aws/get-id')
				const {id} = await response.json()
				setId(id)

			} catch(error) {
				throw error
			}
		})()

		Bluetooth.broadcast(prefix.concat(id))
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