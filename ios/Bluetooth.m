#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(Bluetooth, RCTEventEmitter)

RCT_EXTERN_METHOD(scan)
RCT_EXTERN_METHOD(broadcast:(NSString *)name)

@end
