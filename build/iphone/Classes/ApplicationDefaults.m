/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[TiUtils stringValue:@"iW0Ui1WR6dhiA6FNLZ8DZzXhJFxadKKF"] forKey:@"acs-oauth-secret-production"];
    [_property setObject:[TiUtils stringValue:@"FONwiM7UXph9YoQFOLiSki0x3QgyUXlp"] forKey:@"acs-oauth-key-production"];
    [_property setObject:[TiUtils stringValue:@"8s8NZzwZ8G10YzE2HeuQEpljdM6Jtxd0"] forKey:@"acs-api-key-production"];
    [_property setObject:[TiUtils stringValue:@"pWLuNVNIy0UVHBwsF2dj5SkNAeTwZ5O9"] forKey:@"acs-oauth-secret-development"];
    [_property setObject:[TiUtils stringValue:@"JM5Smilu7rNhjDmg4qjCmE880FnAFSN8"] forKey:@"acs-oauth-key-development"];
    [_property setObject:[TiUtils stringValue:@"s8Ex3aMFJNZ8pXIzoEP4DwnqViNPAvmY"] forKey:@"acs-api-key-development"];
    [_property setObject:[TiUtils stringValue:@"system"] forKey:@"ti.ui.defaultunit"];

    return _property;
}
@end
