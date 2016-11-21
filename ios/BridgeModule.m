//
//  BridgeModule
//  app_doctor
//
//  Created by 单戈 on 11/11/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "BridgeModule.h"
#import "RCTBridge.h"
#import "RCTEventDispatcher.h"

@implementation BridgeModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(BridgeModule)

// 写入文件
RCT_EXPORT_METHOD(writeFile:(NSDictionary *)dictionary callback:(RCTResponseSenderBlock)callback){
  NSLog(@"Bridge.writeFile写入文件:%@",dictionary);
  NSString *fileName = [dictionary objectForKey:@"fileName"];
  NSString *content = [dictionary objectForKey:@"content"];
  NSInteger *writeType = [[dictionary objectForKey:@"writeType"] integerValue];
  
  // http://www.jianshu.com/p/2a1cc2bbeee6
  NSString *docPath=[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask, YES) objectAtIndex:0];
  //构造字符串文件的存储路径
  NSString *filePath = [docPath stringByAppendingPathComponent:fileName];
  //构造字符串对象
  
  //从文件中读取字符串对象
  NSString *oldContent = @"";
  NSFileManager *fileManager = [NSFileManager defaultManager];
  if(writeType == 1 && [fileManager fileExistsAtPath:filePath]){
    oldContent = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
    if([oldContent length] > 0){
      content = [NSString stringWithFormat:@"%@\r\n%@", oldContent, content];
    }
  }
  //通过将writeToFile:atomically:encoding:error:方法发送给字符串对象完成字符串存储到文件内的功能
  [content writeToFile:filePath atomically:YES encoding:NSUTF8StringEncoding error:nil];
  
  NSString *result = @"写入文件成功";
  callback(@[[NSNull null], result]);
}

// 读取文件
RCT_EXPORT_METHOD(readFile:(NSDictionary *)dictionary callback:(RCTResponseSenderBlock)callback){
  NSLog(@"readFile读取文件:%@",dictionary);
  NSString *fileName = [dictionary objectForKey:@"fileName"];
  
  NSString *docPath=[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,NSUserDomainMask, YES) objectAtIndex:0];
  //构造字符串文件的存储路径
  NSString *filePath = [docPath stringByAppendingPathComponent:fileName];
  //
  NSFileManager *fileManager = [NSFileManager defaultManager];
  //从文件中读取字符串对象
  NSString *content = @"";
  if([fileManager fileExistsAtPath:filePath]){
    content = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
  }
  
  callback(@[[NSNull null], content]);
}

@end
