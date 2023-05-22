import Foundation
import CoreBluetooth

@objc(Bluetooth)
class Bluetooth: RCTEventEmitter, CBCentralManagerDelegate, CBPeripheralManagerDelegate {
	private var centralManager: CBCentralManager!
	private var peripheralManager: CBPeripheralManager!
	
	let enabled = "enabled"
	let disabled = "disabled"
	let discovered = "discovered"
	
	var state: String
	var listening: Bool
	
	override init() {
		state = disabled
		listening = false
		
		super.init()
		
		centralManager = CBCentralManager(delegate: self, queue: nil)
		peripheralManager = CBPeripheralManager(delegate: self, queue: nil)
	}
	
	override func startObserving() {
		super.startObserving()
		
		listening = true
		sendEvent(withName: state, body: nil)
	}
	
	func centralManagerDidUpdateState(_ central: CBCentralManager) {
		switch central.state {
			case .poweredOn:
				if(listening) {
					sendEvent(withName: enabled, body: nil)
				}
			
				state = enabled
				break
			
			case .poweredOff, .resetting, .unauthorized, .unsupported, .unknown:
				if(listening) {
					sendEvent(withName: disabled, body: nil)
				}
			
				state = disabled
				break
			
			@unknown default:
				if(listening) {
					sendEvent(withName: disabled, body: nil)
				}
			
				state = disabled
				break
		}
	}
	
	func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
		switch peripheral.state {
			case .poweredOn:
				if(listening) {
					sendEvent(withName: enabled, body: nil)
				}
			
				state = enabled
				break
			
			case .poweredOff, .resetting, .unauthorized, .unsupported, .unknown:
				if(listening) {
					sendEvent(withName: disabled, body: nil)
				}
			
				state = disabled
				break
			
			@unknown default:
				if(listening) {
					sendEvent(withName: disabled, body: nil)
				}
			
				state = disabled
				break
		}
	}
	
	func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
		if peripheral.name != nil {
			sendEvent(withName: discovered, body: peripheral.name!)
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
		return [enabled, disabled, discovered]
	}
}
