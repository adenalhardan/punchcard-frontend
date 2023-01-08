import {useEffect, useState} from 'react'
import {StyleSheet, Text, SafeAreaView} from 'react-native'

//import {BleManager} from 'react-native-ble-plx'
//import Peripheral, {Service, Characteristic} from 'react-native-peripheral'

//const manager = new BleManager()

const App = () => {
	const [devices, setDevices] = useState([])
	/*
	useEffect(() => {
		manager.startDeviceScan(null, {allowDuplicates: false}, async (error, device) => {
			if(error) {
				manager.stopDeviceScan()
			}

			setDevices([...devices, device.localName])
		})

		Peripheral.onStateChanged(state => {
			if(state === 'poweredOn') {
				const ch = new Characteristic({
					uuid: '...',
					value: '...',
					properties: ['read', 'write'],
					permissions: ['readable', 'writeable']
				})

				const service = new Service({
					uuid: '...',
					characteristics: [ch]
				})

				Peripheral.addService(serivce).then(() => {
					Peripheral.startAdvertising({
						name: 'name from API',
						serviceUuids: ['...']
					})
				})
			}
		})
	}, [])
	*/
	return (
		<SafeAreaView style = {styles.container}>
			<Text>Devices:</Text>
			
			{devices.map(device => (
				<Text key = {device}>{device}</Text>
			))}
		</SafeAreaView>
	)
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
