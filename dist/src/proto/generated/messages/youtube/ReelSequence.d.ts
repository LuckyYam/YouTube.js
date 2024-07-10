import { Type as Params } from "./(ReelSequence)/Params.js";
export declare namespace $.youtube {
    type ReelSequence = {
        shortId: string;
        params?: Params;
        feature2: number;
        feature3: number;
    };
}
export type Type = $.youtube.ReelSequence;
export declare function getDefaultValue(): $.youtube.ReelSequence;
export declare function createValue(partialValue: Partial<$.youtube.ReelSequence>): $.youtube.ReelSequence;
export declare function encodeJson(value: $.youtube.ReelSequence): unknown;
export declare function decodeJson(value: any): $.youtube.ReelSequence;
export declare function encodeBinary(value: $.youtube.ReelSequence): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.youtube.ReelSequence;
