import Foundation
import CoreBluetooth

@objc(Bluetooth)
class Bluetooth: RCTEventEmitter, CBCentralManagerDelegate, CBPeripheralManagerDelegate {
	let foundDevice = "foundDevice";
	func centralManagerDidUpdateState(_ central: CBCentralManager) {
		switch central.state {
			case .poweredOn:
				return;
				// d
			case .poweredOff:
				return;
				// Probably send an event telling the user to turn on their bluetooth
			case .resetting:
				return;
				// Wait for next state update and consider logging interruption of Bluetooth service
			case .unauthorized:
				return;
				// Alert user to enable Bluetooth permission in app Settings
			case .unsupported:
				return;
				// Alert user their device does not support Bluetooth and app will not work as expected
			case .unknown:
				return;
			   // Wait for next state update
			@unknown default:
				return;
		}
	}
	
	func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
		if peripheral.name != nil {
			sendEvent(withName: foundDevice, body: peripheral.name!);
		}
	}
	
	func peripheralManagerDidUpdateState(_ peripheral: CBPeripheralManager) {
		switch peripheral.state {
			case .poweredOn:
				return;
				// d
			case .poweredOff:
				return;
				// Probably send an event telling the user to turn on their bluetooth
			case .resetting:
				return;
				// Wait for next state update and consider logging interruption of Bluetooth service
			case .unauthorized:
				return;
				// Alert user to enable Bluetooth permission in app Settings
			case .unsupported:
				return;
				// Alert user their device does not support Bluetooth and app will not work as expected
			case .unknown:
				return;
			   // Wait for next state update
			@unknown default:
				return;
		}
	}
	
	private var centralManager: CBCentralManager!;
	private var peripheralManager: CBPeripheralManager!;
	
	let serviceUUID: CBUUID = CBUUID(string: "00778c48-9147-11ed-a1eb-0242ac120002");
	let characteristicUUID: CBUUID = CBUUID(string: "31cdc2e4-9147-11ed-a1eb-0242ac120002");
	
	
	override init() {
		super.init();
		
		centralManager = CBCentralManager(delegate: self, queue: nil);
		peripheralManager = CBPeripheralManager(delegate: self, queue: nil);
	}
	
	@objc
	func scan() {
		centralManager.scanForPeripherals(withServices: nil, options: [CBCentralManagerScanOptionAllowDuplicatesKey: false]);
	}
	
	@objc
	func broadcast(_ name: NSString) {
		let mutableService: CBMutableService = CBMutableService(type: serviceUUID, primary: true);
		let mutableCharacteristic: CBMutableCharacteristic = CBMutableCharacteristic(type: characteristicUUID, properties: [.read, .write], value: nil, permissions: [.writeable, .readable])
		
		mutableService.characteristics = [mutableCharacteristic]
		peripheralManager.add(mutableService)
		
		peripheralManager.startAdvertising([
			CBAdvertisementDataServiceUUIDsKey: [serviceUUID],
			CBAdvertisementDataLocalNameKey: name
		])
	}
	
	@objc
	override static func requiresMainQueueSetup() -> Bool {
		return true;
	}
	
	override func supportedEvents() -> [String]! {
		return [foundDevice]
	}
}
