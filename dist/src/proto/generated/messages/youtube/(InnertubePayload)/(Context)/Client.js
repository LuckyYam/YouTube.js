import { tsValueToJsonValueFns, jsonValueToTsValueFns, } from "../../../../runtime/json/scalar.js";
import { default as serialize, } from "../../../../runtime/wire/serialize.js";
import { tsValueToWireValueFns, wireValueToTsValueFns, } from "../../../../runtime/wire/scalar.js";
import { default as deserialize, } from "../../../../runtime/wire/deserialize.js";
export function getDefaultValue() {
    return {
        deviceMake: "",
        deviceModel: "",
        nameId: 0,
        clientVersion: "",
        osName: "",
        osVersion: "",
        acceptLanguage: "",
        acceptRegion: "",
        androidSdkVersion: 0,
        windowWidthPoints: 0,
        windowHeightPoints: 0,
    };
}
export function createValue(partialValue) {
    return Object.assign(Object.assign({}, getDefaultValue()), partialValue);
}
export function encodeJson(value) {
    const result = {};
    if (value.deviceMake !== undefined)
        result.deviceMake = tsValueToJsonValueFns.string(value.deviceMake);
    if (value.deviceModel !== undefined)
        result.deviceModel = tsValueToJsonValueFns.string(value.deviceModel);
    if (value.nameId !== undefined)
        result.nameId = tsValueToJsonValueFns.int32(value.nameId);
    if (value.clientVersion !== undefined)
        result.clientVersion = tsValueToJsonValueFns.string(value.clientVersion);
    if (value.osName !== undefined)
        result.osName = tsValueToJsonValueFns.string(value.osName);
    if (value.osVersion !== undefined)
        result.osVersion = tsValueToJsonValueFns.string(value.osVersion);
    if (value.acceptLanguage !== undefined)
        result.acceptLanguage = tsValueToJsonValueFns.string(value.acceptLanguage);
    if (value.acceptRegion !== undefined)
        result.acceptRegion = tsValueToJsonValueFns.string(value.acceptRegion);
    if (value.androidSdkVersion !== undefined)
        result.androidSdkVersion = tsValueToJsonValueFns.int32(value.androidSdkVersion);
    if (value.windowWidthPoints !== undefined)
        result.windowWidthPoints = tsValueToJsonValueFns.int32(value.windowWidthPoints);
    if (value.windowHeightPoints !== undefined)
        result.windowHeightPoints = tsValueToJsonValueFns.int32(value.windowHeightPoints);
    return result;
}
export function decodeJson(value) {
    const result = getDefaultValue();
    if (value.deviceMake !== undefined)
        result.deviceMake = jsonValueToTsValueFns.string(value.deviceMake);
    if (value.deviceModel !== undefined)
        result.deviceModel = jsonValueToTsValueFns.string(value.deviceModel);
    if (value.nameId !== undefined)
        result.nameId = jsonValueToTsValueFns.int32(value.nameId);
    if (value.clientVersion !== undefined)
        result.clientVersion = jsonValueToTsValueFns.string(value.clientVersion);
    if (value.osName !== undefined)
        result.osName = jsonValueToTsValueFns.string(value.osName);
    if (value.osVersion !== undefined)
        result.osVersion = jsonValueToTsValueFns.string(value.osVersion);
    if (value.acceptLanguage !== undefined)
        result.acceptLanguage = jsonValueToTsValueFns.string(value.acceptLanguage);
    if (value.acceptRegion !== undefined)
        result.acceptRegion = jsonValueToTsValueFns.string(value.acceptRegion);
    if (value.androidSdkVersion !== undefined)
        result.androidSdkVersion = jsonValueToTsValueFns.int32(value.androidSdkVersion);
    if (value.windowWidthPoints !== undefined)
        result.windowWidthPoints = jsonValueToTsValueFns.int32(value.windowWidthPoints);
    if (value.windowHeightPoints !== undefined)
        result.windowHeightPoints = jsonValueToTsValueFns.int32(value.windowHeightPoints);
    return result;
}
export function encodeBinary(value) {
    const result = [];
    if (value.deviceMake !== undefined) {
        const tsValue = value.deviceMake;
        result.push([12, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.deviceModel !== undefined) {
        const tsValue = value.deviceModel;
        result.push([13, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.nameId !== undefined) {
        const tsValue = value.nameId;
        result.push([16, tsValueToWireValueFns.int32(tsValue)]);
    }
    if (value.clientVersion !== undefined) {
        const tsValue = value.clientVersion;
        result.push([17, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.osName !== undefined) {
        const tsValue = value.osName;
        result.push([18, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.osVersion !== undefined) {
        const tsValue = value.osVersion;
        result.push([19, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.acceptLanguage !== undefined) {
        const tsValue = value.acceptLanguage;
        result.push([21, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.acceptRegion !== undefined) {
        const tsValue = value.acceptRegion;
        result.push([22, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.androidSdkVersion !== undefined) {
        const tsValue = value.androidSdkVersion;
        result.push([34, tsValueToWireValueFns.int32(tsValue)]);
    }
    if (value.windowWidthPoints !== undefined) {
        const tsValue = value.windowWidthPoints;
        result.push([37, tsValueToWireValueFns.int32(tsValue)]);
    }
    if (value.windowHeightPoints !== undefined) {
        const tsValue = value.windowHeightPoints;
        result.push([38, tsValueToWireValueFns.int32(tsValue)]);
    }
    return serialize(result);
}
export function decodeBinary(binary) {
    const result = getDefaultValue();
    const wireMessage = deserialize(binary);
    const wireFields = new Map(wireMessage);
    field: {
        const wireValue = wireFields.get(12);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.deviceMake = value;
    }
    field: {
        const wireValue = wireFields.get(13);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.deviceModel = value;
    }
    field: {
        const wireValue = wireFields.get(16);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.int32(wireValue);
        if (value === undefined)
            break field;
        result.nameId = value;
    }
    field: {
        const wireValue = wireFields.get(17);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.clientVersion = value;
    }
    field: {
        const wireValue = wireFields.get(18);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.osName = value;
    }
    field: {
        const wireValue = wireFields.get(19);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.osVersion = value;
    }
    field: {
        const wireValue = wireFields.get(21);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.acceptLanguage = value;
    }
    field: {
        const wireValue = wireFields.get(22);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.acceptRegion = value;
    }
    field: {
        const wireValue = wireFields.get(34);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.int32(wireValue);
        if (value === undefined)
            break field;
        result.androidSdkVersion = value;
    }
    field: {
        const wireValue = wireFields.get(37);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.int32(wireValue);
        if (value === undefined)
            break field;
        result.windowWidthPoints = value;
    }
    field: {
        const wireValue = wireFields.get(38);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.int32(wireValue);
        if (value === undefined)
            break field;
        result.windowHeightPoints = value;
    }
    return result;
}
//# sourceMappingURL=Client.js.map