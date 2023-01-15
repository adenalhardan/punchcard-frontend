import {useEffect, useState} from 'react'
import {StyleSheet, Text, SafeAreaView} from 'react-native'
import {NativeModules, NativeEventEmitter} from 'react-native'

const {Bluetooth} = NativeModules
const BluetoothEvents = new NativeEventEmitter(Bluetooth)

const App = () => {
	const [devices, setDevices] = useState(new Set())
	const [name, setName] = useState(null)

	useEffect(() => {
		(async () => {
			const response = await fetch('https://ikdsbxpo4dc2dz2pvmtfng2sly0cxhfk.lambda-url.us-west-1.on.aws/get-name')
			const {name} = await response.json()

			setName(name)
			Bluetooth.broadcast(name)
		})()

		Bluetooth.scan()
		
		BluetoothEvents.addListener('foundDevice', device => {
			if(!devices.has(device)) {
				setDevices(prev => new Set(prev.add(device)))
			}
		})

		return () => {
			BluetoothEvents.removeAllListeners()
		}
	}, [])
	
	return (
		<SafeAreaView style = {styles.container}>
			<Text>{name}'s Devices: </Text>

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