import { encodeJson as encodeJson_1, decodeJson as decodeJson_1, encodeBinary as encodeBinary_1, decodeBinary as decodeBinary_1, } from "./(ReelSequence)/Params.js";
import { tsValueToJsonValueFns, jsonValueToTsValueFns, } from "../../runtime/json/scalar.js";
import { WireType, } from "../../runtime/wire/index.js";
import { default as serialize, } from "../../runtime/wire/serialize.js";
import { tsValueToWireValueFns, wireValueToTsValueFns, } from "../../runtime/wire/scalar.js";
import { default as deserialize, } from "../../runtime/wire/deserialize.js";
export function getDefaultValue() {
    return {
        shortId: "",
        params: undefined,
        feature2: 0,
        feature3: 0,
    };
}
export function createValue(partialValue) {
    return Object.assign(Object.assign({}, getDefaultValue()), partialValue);
}
export function encodeJson(value) {
    const result = {};
    if (value.shortId !== undefined)
        result.shortId = tsValueToJsonValueFns.string(value.shortId);
    if (value.params !== undefined)
        result.params = encodeJson_1(value.params);
    if (value.feature2 !== undefined)
        result.feature2 = tsValueToJsonValueFns.int32(value.feature2);
    if (value.feature3 !== undefined)
        result.feature3 = tsValueToJsonValueFns.int32(value.feature3);
    return result;
}
export function decodeJson(value) {
    const result = getDefaultValue();
    if (value.shortId !== undefined)
        result.shortId = jsonValueToTsValueFns.string(value.shortId);
    if (value.params !== undefined)
        result.params = decodeJson_1(value.params);
    if (value.feature2 !== undefined)
        result.feature2 = jsonValueToTsValueFns.int32(value.feature2);
    if (value.feature3 !== undefined)
        result.feature3 = jsonValueToTsValueFns.int32(value.feature3);
    return result;
}
export function encodeBinary(value) {
    const result = [];
    if (value.shortId !== undefined) {
        const tsValue = value.shortId;
        result.push([1, tsValueToWireValueFns.string(tsValue)]);
    }
    if (value.params !== undefined) {
        const tsValue = value.params;
        result.push([5, { type: WireType.LengthDelimited, value: encodeBinary_1(tsValue) }]);
    }
    if (value.feature2 !== undefined) {
        const tsValue = value.feature2;
        result.push([10, tsValueToWireValueFns.int32(tsValue)]);
    }
    if (value.feature3 !== undefined) {
        const tsValue = value.feature3;
        result.push([13, tsValueToWireValueFns.int32(tsValue)]);
    }
    return serialize(result);
}
export function decodeBinary(binary) {
    const result = getDefaultValue();
    const wireMessage = deserialize(binary);
    const wireFields = new Map(wireMessage);
    field: {
        const wireValue = wireFields.get(1);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.string(wireValue);
        if (value === undefined)
            break field;
        result.shortId = value;
    }
    field: {
        const wireValue = wireFields.get(5);
        if (wireValue === undefined)
            break field;
        const value = wireValue.type === WireType.LengthDelimited ? decodeBinary_1(wireValue.value) : undefined;
        if (value === undefined)
            break field;
        result.params = value;
    }
    field: {
        const wireValue = wireFields.get(10);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.int32(wireValue);
        if (value === undefined)
            break field;
        result.feature2 = value;
    }
    field: {
        const wireValue = wireFields.get(13);
        if (wireValue === undefined)
            break field;
        const value = wireValueToTsValueFns.int32(wireValue);
        if (value === undefined)
            break field;
        result.feature3 = value;
    }
    return result;
}
//# sourceMappingURL=ReelSequence.js.map