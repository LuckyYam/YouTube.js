import { Type as Field1 } from "./(ShortsParam)/Field1.js";
export declare namespace $.youtube {
    type ShortsParam = {
        f1?: Field1;
        p59: number;
    };
}
export type Type = $.youtube.ShortsParam;
export declare function getDefaultValue(): $.youtube.ShortsParam;
export declare function createValue(partialValue: Partial<$.youtube.ShortsParam>): $.youtube.ShortsParam;
export declare function encodeJson(value: $.youtube.ShortsParam): unknown;
export declare function decodeJson(value: any): $.youtube.ShortsParam;
export declare function encodeBinary(value: $.youtube.ShortsParam): Uint8Array;
export declare function decodeBinary(binary: Uint8Array): $.youtube.ShortsParam;
