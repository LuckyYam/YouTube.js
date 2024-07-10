import * as Constants from '../../../utils/Constants.js';
import { observe } from '../../helpers.js';
import { Parser } from '../../index.js';
import Text from './Text.js';
import Thumbnail from './Thumbnail.js';
export default class Author {
    constructor(item, badges, thumbs, id) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2;
        const nav_text = new Text(item);
        this.id = id || ((_d = (_c = (_b = (_a = nav_text === null || nav_text === void 0 ? void 0 : nav_text.runs) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.endpoint) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.browseId) || ((_f = (_e = nav_text === null || nav_text === void 0 ? void 0 : nav_text.endpoint) === null || _e === void 0 ? void 0 : _e.payload) === null || _f === void 0 ? void 0 : _f.browseId) || 'N/A';
        this.name = (nav_text === null || nav_text === void 0 ? void 0 : nav_text.text) || 'N/A';
        this.thumbnails = thumbs ? Thumbnail.fromResponse(thumbs) : [];
        this.endpoint = ((_h = (_g = nav_text === null || nav_text === void 0 ? void 0 : nav_text.runs) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.endpoint) || (nav_text === null || nav_text === void 0 ? void 0 : nav_text.endpoint);
        if (badges) {
            if (Array.isArray(badges)) {
                this.badges = Parser.parseArray(badges);
                this.is_moderator = (_j = this.badges) === null || _j === void 0 ? void 0 : _j.some((badge) => badge.icon_type == 'MODERATOR');
                this.is_verified = (_k = this.badges) === null || _k === void 0 ? void 0 : _k.some((badge) => badge.style == 'BADGE_STYLE_TYPE_VERIFIED');
                this.is_verified_artist = (_l = this.badges) === null || _l === void 0 ? void 0 : _l.some((badge) => badge.style == 'BADGE_STYLE_TYPE_VERIFIED_ARTIST');
            }
            else {
                this.badges = observe([]);
                this.is_verified = !!badges.isVerified;
                this.is_verified_artist = !!badges.isArtist;
            }
        }
        else {
            this.badges = observe([]);
        }
        // @TODO: Refactor this mess.
        this.url =
            ((_q = (_p = (_o = (_m = nav_text === null || nav_text === void 0 ? void 0 : nav_text.runs) === null || _m === void 0 ? void 0 : _m[0]) === null || _o === void 0 ? void 0 : _o.endpoint) === null || _p === void 0 ? void 0 : _p.metadata) === null || _q === void 0 ? void 0 : _q.api_url) === '/browse' &&
                `${Constants.URLS.YT_BASE}${((_u = (_t = (_s = (_r = nav_text === null || nav_text === void 0 ? void 0 : nav_text.runs) === null || _r === void 0 ? void 0 : _r[0]) === null || _s === void 0 ? void 0 : _s.endpoint) === null || _t === void 0 ? void 0 : _t.payload) === null || _u === void 0 ? void 0 : _u.canonicalBaseUrl) || `/u/${(_y = (_x = (_w = (_v = nav_text === null || nav_text === void 0 ? void 0 : nav_text.runs) === null || _v === void 0 ? void 0 : _v[0]) === null || _w === void 0 ? void 0 : _w.endpoint) === null || _x === void 0 ? void 0 : _x.payload) === null || _y === void 0 ? void 0 : _y.browseId}`}` ||
                `${Constants.URLS.YT_BASE}${((_0 = (_z = nav_text === null || nav_text === void 0 ? void 0 : nav_text.endpoint) === null || _z === void 0 ? void 0 : _z.payload) === null || _0 === void 0 ? void 0 : _0.canonicalBaseUrl) || `/u/${(_2 = (_1 = nav_text === null || nav_text === void 0 ? void 0 : nav_text.endpoint) === null || _1 === void 0 ? void 0 : _1.payload) === null || _2 === void 0 ? void 0 : _2.browseId}`}`;
    }
    get best_thumbnail() {
        return this.thumbnails[0];
    }
}
//# sourceMappingURL=Author.js.map