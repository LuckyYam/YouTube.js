export declare const URLS: Readonly<{
    YT_BASE: "https://www.youtube.com";
    YT_MUSIC_BASE: "https://music.youtube.com";
    YT_SUGGESTIONS: "https://suggestqueries.google.com/complete/";
    YT_UPLOAD: "https://upload.youtube.com/";
    API: Readonly<{
        BASE: "https://youtubei.googleapis.com";
        PRODUCTION_1: "https://www.youtube.com/youtubei/";
        PRODUCTION_2: "https://youtubei.googleapis.com/youtubei/";
        STAGING: "https://green-youtubei.sandbox.googleapis.com/youtubei/";
        RELEASE: "https://release-youtubei.sandbox.googleapis.com/youtubei/";
        TEST: "https://test-youtubei.sandbox.googleapis.com/youtubei/";
        CAMI: "http://cami-youtubei.sandbox.googleapis.com/youtubei/";
        UYTFE: "https://uytfe.sandbox.google.com/youtubei/";
    }>;
}>;
export declare const OAUTH: Readonly<{
    REGEX: Readonly<{
        TV_SCRIPT: RegExp;
        CLIENT_IDENTITY: RegExp;
    }>;
}>;
export declare const CLIENTS: Readonly<{
    iOS: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
        USER_AGENT: string;
        DEVICE_MODEL: string;
    };
    WEB: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
        API_KEY: string;
        API_VERSION: string;
        STATIC_VISITOR_ID: string;
    };
    WEB_KIDS: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
    };
    YTMUSIC: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
    };
    ANDROID: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
        SDK_VERSION: number;
        USER_AGENT: string;
    };
    YTSTUDIO_ANDROID: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
    };
    YTMUSIC_ANDROID: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
    };
    TV_EMBEDDED: {
        NAME_ID: string;
        NAME: string;
        VERSION: string;
    };
}>;
export declare const STREAM_HEADERS: Readonly<{
    accept: "*/*";
    origin: "https://www.youtube.com";
    referer: "https://www.youtube.com";
    DNT: "?1";
}>;
export declare const INNERTUBE_HEADERS_BASE: Readonly<{
    accept: "*/*";
    'accept-encoding': "gzip, deflate";
    'content-type': "application/json";
}>;
