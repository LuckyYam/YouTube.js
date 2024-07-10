var _Album_page;
import { __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Parser } from '../index.js';
import MicroformatData from '../classes/MicroformatData.js';
import MusicCarouselShelf from '../classes/MusicCarouselShelf.js';
import MusicDetailHeader from '../classes/MusicDetailHeader.js';
import MusicResponsiveHeader from '../classes/MusicResponsiveHeader.js';
import MusicShelf from '../classes/MusicShelf.js';
import { observe } from '../helpers.js';
class Album {
    constructor(response) {
        var _a, _b, _c;
        _Album_page.set(this, void 0);
        __classPrivateFieldSet(this, _Album_page, Parser.parseResponse(response.data), "f");
        if (!__classPrivateFieldGet(this, _Album_page, "f").contents_memo)
            throw new Error('No contents found in the response');
        this.header = (_a = __classPrivateFieldGet(this, _Album_page, "f").contents_memo.getType(MusicDetailHeader, MusicResponsiveHeader)) === null || _a === void 0 ? void 0 : _a.first();
        this.contents = ((_b = __classPrivateFieldGet(this, _Album_page, "f").contents_memo.getType(MusicShelf)) === null || _b === void 0 ? void 0 : _b.first().contents) || observe([]);
        this.sections = __classPrivateFieldGet(this, _Album_page, "f").contents_memo.getType(MusicCarouselShelf) || observe([]);
        this.background = __classPrivateFieldGet(this, _Album_page, "f").background;
        this.url = (_c = __classPrivateFieldGet(this, _Album_page, "f").microformat) === null || _c === void 0 ? void 0 : _c.as(MicroformatData).url_canonical;
    }
    get page() {
        return __classPrivateFieldGet(this, _Album_page, "f");
    }
}
_Album_page = new WeakMap();
export default Album;
//# sourceMappingURL=Album.js.map