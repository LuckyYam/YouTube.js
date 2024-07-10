export declare namespace $.youtube.ReelSequence {
    type Params = {
        number: number;
    };
}
export type Type = $.youtube.ReelSequence.Params;
export declare function getDefaultValue(): $.youtube.ReelSequence.Params;
export declare function createValue(partialValue: Partial<$.youtube.ReelSequence.Params>): $.youtube.ReelSequence.Params;
export declare function encodeJson(value: $.youtube.ReelSequence.Params): unknown;
export declare function decodeJson(value: any): $.youtube.ReelSequence.Params;
export declare function encodeBinary(value: $.youtube.ReelSequence.Params): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.youtube.ReelSequence.Params;
