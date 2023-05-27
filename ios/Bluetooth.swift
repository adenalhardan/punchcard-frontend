import Foundation
import CoreBluetooth

@objc(Bluetooth)
class Bluetooth: RCTEventEmitter, CBCentralManagerDelegate, CBPeripheralManagerDelegate {
	private var centralManager: CBCentralManager!
	private var peripheralManager: CBPeripheralManager!
	
	let serviceUUID: CBUUID = CBUUID(string: "053462F7-2700-42EE-B7D5-1B3D4D5491A5")
	
	let enabled: String = "enabled"
	let disabled: String = "disabled"
	let discovered: String = "discovered"
	
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
		if(advertisementData["kCBAdvDataLocalName"] != nil) {
			sendEvent(withName: discovered, body: advertisementData["kCBAdvDataLocalName"]!)
		}
	}
	
	@objc func scan() {
		centralManager.scanForPeripherals(withServices: [serviceUUID], options: [CBCentralManagerScanOptionAllowDuplicatesKey: false])
	}
		
	@objc func broadcast(_ name: NSString) {
		let mutableService: CBMutableService = CBMutableService(type: serviceUUID, primary: true)
		peripheralManager.add(mutableService)
		
		peripheralManager.startAdvertising([
			CBAdvertisementDataServiceUUIDsKey: [serviceUUID],
			CBAdvertisementDataLocalNameKey: name,
		])
	}
	
	@objc override static func requiresMainQueueSetup() -> Bool {
		return true
	}
	
	override func supportedEvents() -> [String]! {
		return [enabled, disabled, discovered]
	}
}
