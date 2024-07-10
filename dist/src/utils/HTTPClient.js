var _HTTPClient_instances, _HTTPClient_session, _HTTPClient_cookie, _HTTPClient_fetch, _HTTPClient_adjustContext;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import * as Constants from './Constants.js';
import { Platform, generateSidAuth, getRandomUserAgent, InnertubeError, getCookie } from './Utils.js';
class HTTPClient {
    constructor(session, cookie, fetch) {
        _HTTPClient_instances.add(this);
        _HTTPClient_session.set(this, void 0);
        _HTTPClient_cookie.set(this, void 0);
        _HTTPClient_fetch.set(this, void 0);
        __classPrivateFieldSet(this, _HTTPClient_session, session, "f");
        __classPrivateFieldSet(this, _HTTPClient_cookie, cookie, "f");
        __classPrivateFieldSet(this, _HTTPClient_fetch, fetch || Platform.shim.fetch, "f");
    }
    get fetch_function() {
        return __classPrivateFieldGet(this, _HTTPClient_fetch, "f");
    }
    fetch(input, init) {
        return __awaiter(this, void 0, void 0, function* () {
            const innertube_url = Constants.URLS.API.PRODUCTION_1 + __classPrivateFieldGet(this, _HTTPClient_session, "f").api_version;
            const baseURL = (init === null || init === void 0 ? void 0 : init.baseURL) || innertube_url;
            const request_url = typeof input === 'string' ?
                (!baseURL.endsWith('/') && !input.startsWith('/')) ?
                    new URL(`${baseURL}/${input}`) :
                    new URL(baseURL + input) :
                input instanceof URL ?
                    input : new URL(input.url, baseURL);
            const headers = (init === null || init === void 0 ? void 0 : init.headers) ||
                (input instanceof Platform.shim.Request ? input.headers : new Platform.shim.Headers()) ||
                new Platform.shim.Headers();
            const body = (init === null || init === void 0 ? void 0 : init.body) || (input instanceof Platform.shim.Request ? input.body : undefined);
            const request_headers = new Platform.shim.Headers(headers);
            request_headers.set('Accept', '*/*');
            request_headers.set('Accept-Language', '*');
            request_headers.set('X-Goog-Visitor-Id', __classPrivateFieldGet(this, _HTTPClient_session, "f").context.client.visitorData || '');
            request_headers.set('X-Youtube-Client-Version', __classPrivateFieldGet(this, _HTTPClient_session, "f").context.client.clientVersion || '');
            const client_constant = Object.values(Constants.CLIENTS).find((client) => {
                return client.NAME === __classPrivateFieldGet(this, _HTTPClient_session, "f").context.client.clientName;
            });
            if (client_constant) {
                request_headers.set('X-Youtube-Client-Name', client_constant.NAME_ID);
            }
            if (Platform.shim.server) {
                request_headers.set('User-Agent', getRandomUserAgent('desktop'));
                request_headers.set('Origin', request_url.origin);
            }
            request_url.searchParams.set('prettyPrint', 'false');
            request_url.searchParams.set('alt', 'json');
            const content_type = request_headers.get('Content-Type');
            let request_body = body;
            let is_web_kids = false;
            const is_innertube_req = baseURL === innertube_url ||
                baseURL === Constants.URLS.YT_UPLOAD;
            // Copy context into payload when possible
            if (content_type === 'application/json' && is_innertube_req && (typeof body === 'string')) {
                const json = JSON.parse(body);
                const n_body = Object.assign(Object.assign({}, json), { 
                    // Deep copy since we're gonna be modifying it
                    context: JSON.parse(JSON.stringify(__classPrivateFieldGet(this, _HTTPClient_session, "f").context)) });
                __classPrivateFieldGet(this, _HTTPClient_instances, "m", _HTTPClient_adjustContext).call(this, n_body.context, n_body.client);
                request_headers.set('X-Youtube-Client-Version', n_body.context.client.clientVersion);
                const client_constant = Object.values(Constants.CLIENTS).find((client) => {
                    return client.NAME === n_body.context.client.clientName;
                });
                if (client_constant) {
                    request_headers.set('X-Youtube-Client-Name', client_constant.NAME_ID);
                }
                delete n_body.client;
                if (n_body.context.client.clientName === 'ANDROID' || n_body.context.client.clientName === 'ANDROID_MUSIC') {
                    request_headers.set('User-Agent', Constants.CLIENTS.ANDROID.USER_AGENT);
                    request_headers.set('X-GOOG-API-FORMAT-VERSION', '2');
                }
                else if (n_body.context.client.clientName === 'iOS') {
                    request_headers.set('User-Agent', Constants.CLIENTS.iOS.USER_AGENT);
                }
                is_web_kids = n_body.context.client.clientName === 'WEB_KIDS';
                request_body = JSON.stringify(n_body);
            }
            else if (content_type === 'application/x-protobuf') {
                // Assume it is always an Android request.
                if (Platform.shim.server) {
                    request_headers.set('User-Agent', Constants.CLIENTS.ANDROID.USER_AGENT);
                    request_headers.set('X-GOOG-API-FORMAT-VERSION', '2');
                    request_headers.delete('X-Youtube-Client-Version');
                }
            }
            // Authenticate (NOTE: YouTube Kids does not support regular bearer tokens)
            if (__classPrivateFieldGet(this, _HTTPClient_session, "f").logged_in && is_innertube_req && !is_web_kids) {
                const oauth = __classPrivateFieldGet(this, _HTTPClient_session, "f").oauth;
                if (oauth.oauth2_tokens) {
                    if (oauth.shouldRefreshToken()) {
                        yield oauth.refreshAccessToken();
                    }
                    request_headers.set('Authorization', `Bearer ${oauth.oauth2_tokens.access_token}`);
                }
                if (__classPrivateFieldGet(this, _HTTPClient_cookie, "f")) {
                    const sapisid = getCookie(__classPrivateFieldGet(this, _HTTPClient_cookie, "f"), 'SAPISID');
                    if (sapisid) {
                        request_headers.set('Authorization', yield generateSidAuth(sapisid));
                        request_headers.set('X-Goog-Authuser', __classPrivateFieldGet(this, _HTTPClient_session, "f").account_index.toString());
                    }
                    request_headers.set('Cookie', __classPrivateFieldGet(this, _HTTPClient_cookie, "f"));
                }
            }
            const request = new Platform.shim.Request(request_url, input instanceof Platform.shim.Request ? input : init);
            const response = yield __classPrivateFieldGet(this, _HTTPClient_fetch, "f").call(this, request, Object.assign({ body: request_body, headers: request_headers, redirect: input instanceof Platform.shim.Request ? input.redirect : (init === null || init === void 0 ? void 0 : init.redirect) || 'follow' }, (Platform.shim.runtime !== 'cf-worker' ? { credentials: 'include' } : {})));
            // Check if 2xx
            if (response.ok) {
                return response;
            }
            throw new InnertubeError(`Request to ${response.url} failed with status ${response.status}`, yield response.text());
        });
    }
}
_HTTPClient_session = new WeakMap(), _HTTPClient_cookie = new WeakMap(), _HTTPClient_fetch = new WeakMap(), _HTTPClient_instances = new WeakSet(), _HTTPClient_adjustContext = function _HTTPClient_adjustContext(ctx, client) {
    if (client === 'ANDROID' ||
        client === 'YTMUSIC_ANDROID' ||
        client === 'YTMUSIC_ANDROID' ||
        client === 'YTSTUDIO_ANDROID') {
        ctx.client.androidSdkVersion = Constants.CLIENTS.ANDROID.SDK_VERSION;
        ctx.client.userAgent = Constants.CLIENTS.ANDROID.USER_AGENT;
        ctx.client.osName = 'Android';
        ctx.client.osVersion = '13';
        ctx.client.platform = 'MOBILE';
    }
    switch (client) {
        case 'iOS':
            ctx.client.deviceModel = Constants.CLIENTS.iOS.DEVICE_MODEL;
            ctx.client.clientVersion = Constants.CLIENTS.iOS.VERSION;
            ctx.client.clientName = Constants.CLIENTS.iOS.NAME;
            ctx.client.platform = 'MOBILE';
            break;
        case 'YTMUSIC':
            ctx.client.clientVersion = Constants.CLIENTS.YTMUSIC.VERSION;
            ctx.client.clientName = Constants.CLIENTS.YTMUSIC.NAME;
            break;
        case 'ANDROID':
            ctx.client.clientVersion = Constants.CLIENTS.ANDROID.VERSION;
            ctx.client.clientFormFactor = 'SMALL_FORM_FACTOR';
            ctx.client.clientName = Constants.CLIENTS.ANDROID.NAME;
            break;
        case 'YTMUSIC_ANDROID':
            ctx.client.clientVersion = Constants.CLIENTS.YTMUSIC_ANDROID.VERSION;
            ctx.client.clientFormFactor = 'SMALL_FORM_FACTOR';
            ctx.client.clientName = Constants.CLIENTS.YTMUSIC_ANDROID.NAME;
            break;
        case 'YTSTUDIO_ANDROID':
            ctx.client.clientVersion = Constants.CLIENTS.YTSTUDIO_ANDROID.VERSION;
            ctx.client.clientFormFactor = 'SMALL_FORM_FACTOR';
            ctx.client.clientName = Constants.CLIENTS.YTSTUDIO_ANDROID.NAME;
            break;
        case 'TV_EMBEDDED':
            ctx.client.clientName = Constants.CLIENTS.TV_EMBEDDED.NAME;
            ctx.client.clientVersion = Constants.CLIENTS.TV_EMBEDDED.VERSION;
            ctx.client.clientScreen = 'EMBED';
            ctx.thirdParty = { embedUrl: Constants.URLS.YT_BASE };
            break;
        case 'YTKIDS':
            ctx.client.clientVersion = Constants.CLIENTS.WEB_KIDS.VERSION;
            ctx.client.clientName = Constants.CLIENTS.WEB_KIDS.NAME;
            ctx.client.kidsAppInfo = {
                categorySettings: {
                    enabledCategories: [
                        'approved_for_you',
                        'black_joy',
                        'camp',
                        'collections',
                        'earth',
                        'explore',
                        'favorites',
                        'gaming',
                        'halloween',
                        'hero',
                        'learning',
                        'move',
                        'music',
                        'reading',
                        'shared_by_parents',
                        'shows',
                        'soccer',
                        'sports',
                        'spotlight',
                        'winter'
                    ]
                },
                contentSettings: {
                    corpusPreference: 'KIDS_CORPUS_PREFERENCE_YOUNGER',
                    kidsNoSearchMode: 'YT_KIDS_NO_SEARCH_MODE_OFF'
                }
            };
            break;
        default:
            break;
    }
};
export default HTTPClient;
//# sourceMappingURL=HTTPClient.js.map