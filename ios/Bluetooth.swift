import Foundation
import CoreBluetooth

@objc(Bluetooth)
class Bluetooth: RCTEventEmitter, CBCentralManagerDelegate, CBPeripheralManagerDelegate {
	private var centralManager: CBCentralManager!
	private var peripheralManager: CBPeripheralManager!
	
	let foundDevice = "foundDevice"
	let enabled = "enabled"
	let disabled = "disabled"
	
	override init() {
		super.init()
		
		centralManager = CBCentralManager(delegate: self, queue: nil)
		peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
	}
	
	func centralManagerDidUpdateState(_ central: CBCentralManager) {
		switch central.state {
			case .poweredOn:
				sendEvent(withName: enabled, body: nil)
				break
			
			case .poweredOff:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .resetting:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .unauthorized:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .unsupported:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .unknown:
				sendEvent(withName: disabled, body: nil)
				break
			
			@unknown default:
				sendEvent(withName: disabled, body: nil)
				break
		}
	}
	
	func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
		if peripheral.name != nil {
			sendEvent(withName: foundDevice, body: peripheral.name!)
		}
	}
	
	func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
		switch peripheral.state {
			case .poweredOn:
				sendEvent(withName: enabled, body: nil)
				break
			
			case .poweredOff:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .resetting:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .unauthorized:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .unsupported:
				sendEvent(withName: disabled, body: nil)
				break
			
			case .unknown:
				sendEvent(withName: disabled, body: nil)
				break
			
			@unknown default:
				sendEvent(withName: disabled, body: nil)
				break
		}
	}
	
	@objc func scan() {
		centralManager.scanForPeripherals(withServices: nil, options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
	}
	
	@objc func broadcast(_ name: NSString) {
		let serviceUUID: CBUUID = CBUUID(string: "00778c48-9147-11ed-a1eb-0242ac120002")
		let characteristicUUID: CBUUID = CBUUID(string: "31cdc2e4-9147-11ed-a1eb-0242ac120002")
		
		let mutableService: CBMutableService = CBMutableService(type: serviceUUID, primary: true)
		let mutableCharacteristic: CBMutableCharacteristic = CBMutableCharacteristic(
			type: characteristicUUID,
			properties: [.read, .write],
			value: nil,
			permissions: [.writeable, .readable]
		)
		
		mutableService.characteristics = [mutableCharacteristic]
		peripheralManager.add(mutableService)
		
		peripheralManager.startAdvertising([
			CBAdvertisementDataServiceUUIDsKey: [serviceUUID],
			CBAdvertisementDataLocalNameKey: name
		])
	}
	
	@objc override static func requiresMainQueueSetup() -> Bool {
		return true
	}
	
	override func supportedEvents() -> [String]! {
		return [foundDevice, enabled, disabled]
	}
}
