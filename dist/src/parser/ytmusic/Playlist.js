var _Playlist_instances, _Playlist_page, _Playlist_actions, _Playlist_continuation, _Playlist_last_fetched_suggestions, _Playlist_suggestions_continuation, _Playlist_fetchSuggestions;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Parser, MusicPlaylistShelfContinuation, SectionListContinuation } from '../index.js';
import MusicCarouselShelf from '../classes/MusicCarouselShelf.js';
import MusicDetailHeader from '../classes/MusicDetailHeader.js';
import MusicEditablePlaylistDetailHeader from '../classes/MusicEditablePlaylistDetailHeader.js';
import MusicPlaylistShelf from '../classes/MusicPlaylistShelf.js';
import MusicShelf from '../classes/MusicShelf.js';
import SectionList from '../classes/SectionList.js';
import MusicResponsiveListItem from '../classes/MusicResponsiveListItem.js';
import MusicResponsiveHeader from '../classes/MusicResponsiveHeader.js';
import { InnertubeError } from '../../utils/Utils.js';
import { observe } from '../helpers.js';
class Playlist {
    constructor(response, actions) {
        var _a, _b, _c, _d, _e, _f;
        _Playlist_instances.add(this);
        _Playlist_page.set(this, void 0);
        _Playlist_actions.set(this, void 0);
        _Playlist_continuation.set(this, void 0);
        _Playlist_last_fetched_suggestions.set(this, void 0);
        _Playlist_suggestions_continuation.set(this, void 0);
        __classPrivateFieldSet(this, _Playlist_actions, actions, "f");
        __classPrivateFieldSet(this, _Playlist_page, Parser.parseResponse(response.data), "f");
        __classPrivateFieldSet(this, _Playlist_last_fetched_suggestions, null, "f");
        __classPrivateFieldSet(this, _Playlist_suggestions_continuation, null, "f");
        if (__classPrivateFieldGet(this, _Playlist_page, "f").continuation_contents) {
            const data = (_a = __classPrivateFieldGet(this, _Playlist_page, "f").continuation_contents) === null || _a === void 0 ? void 0 : _a.as(MusicPlaylistShelfContinuation);
            if (!data.contents)
                throw new InnertubeError('No contents found in the response');
            this.contents = data.contents.as(MusicResponsiveListItem);
            __classPrivateFieldSet(this, _Playlist_continuation, data.continuation, "f");
        }
        else {
            if (!__classPrivateFieldGet(this, _Playlist_page, "f").contents_memo)
                throw new InnertubeError('No contents found in the response');
            this.header = (_b = __classPrivateFieldGet(this, _Playlist_page, "f").contents_memo.getType(MusicResponsiveHeader, MusicEditablePlaylistDetailHeader, MusicDetailHeader)) === null || _b === void 0 ? void 0 : _b.first();
            this.contents = ((_d = (_c = __classPrivateFieldGet(this, _Playlist_page, "f").contents_memo.getType(MusicPlaylistShelf)) === null || _c === void 0 ? void 0 : _c.first()) === null || _d === void 0 ? void 0 : _d.contents) || observe([]);
            this.background = __classPrivateFieldGet(this, _Playlist_page, "f").background;
            __classPrivateFieldSet(this, _Playlist_continuation, ((_f = (_e = __classPrivateFieldGet(this, _Playlist_page, "f").contents_memo.getType(MusicPlaylistShelf)) === null || _e === void 0 ? void 0 : _e.first()) === null || _f === void 0 ? void 0 : _f.continuation) || null, "f");
        }
    }
    /**
     * Retrieves playlist items continuation.
     */
    getContinuation() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _Playlist_continuation, "f"))
                throw new InnertubeError('Continuation not found.');
            const response = yield __classPrivateFieldGet(this, _Playlist_actions, "f").execute('/browse', {
                client: 'YTMUSIC',
                continuation: __classPrivateFieldGet(this, _Playlist_continuation, "f")
            });
            return new Playlist(response, __classPrivateFieldGet(this, _Playlist_actions, "f"));
        });
    }
    /**
     * Retrieves related playlists
     */
    getRelated() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const target_section_list = (_a = __classPrivateFieldGet(this, _Playlist_page, "f").contents_memo) === null || _a === void 0 ? void 0 : _a.getType(SectionList).find((section_list) => section_list.continuation);
            if (!target_section_list)
                throw new InnertubeError('Could not find "Related" section.');
            let section_continuation = target_section_list.continuation;
            while (section_continuation) {
                const data = yield __classPrivateFieldGet(this, _Playlist_actions, "f").execute('/browse', {
                    client: 'YTMUSIC',
                    continuation: section_continuation,
                    parse: true
                });
                const section_list = (_b = data.continuation_contents) === null || _b === void 0 ? void 0 : _b.as(SectionListContinuation);
                const sections = (_c = section_list === null || section_list === void 0 ? void 0 : section_list.contents) === null || _c === void 0 ? void 0 : _c.as(MusicCarouselShelf, MusicShelf);
                const related = (_d = sections === null || sections === void 0 ? void 0 : sections.find((section) => section.is(MusicCarouselShelf))) === null || _d === void 0 ? void 0 : _d.as(MusicCarouselShelf);
                if (related)
                    return related;
                section_continuation = section_list === null || section_list === void 0 ? void 0 : section_list.continuation;
            }
            throw new InnertubeError('Could not fetch related playlists.');
        });
    }
    getSuggestions() {
        return __awaiter(this, arguments, void 0, function* (refresh = true) {
            const require_fetch = refresh || !__classPrivateFieldGet(this, _Playlist_last_fetched_suggestions, "f");
            const fetch_promise = require_fetch ? __classPrivateFieldGet(this, _Playlist_instances, "m", _Playlist_fetchSuggestions).call(this) : Promise.resolve(null);
            const fetch_result = yield fetch_promise;
            if (fetch_result) {
                __classPrivateFieldSet(this, _Playlist_last_fetched_suggestions, fetch_result.items, "f");
                __classPrivateFieldSet(this, _Playlist_suggestions_continuation, fetch_result.continuation, "f");
            }
            return (fetch_result === null || fetch_result === void 0 ? void 0 : fetch_result.items) || __classPrivateFieldGet(this, _Playlist_last_fetched_suggestions, "f") || observe([]);
        });
    }
    get page() {
        return __classPrivateFieldGet(this, _Playlist_page, "f");
    }
    get items() {
        return this.contents || observe([]);
    }
    get has_continuation() {
        return !!__classPrivateFieldGet(this, _Playlist_continuation, "f");
    }
}
_Playlist_page = new WeakMap(), _Playlist_actions = new WeakMap(), _Playlist_continuation = new WeakMap(), _Playlist_last_fetched_suggestions = new WeakMap(), _Playlist_suggestions_continuation = new WeakMap(), _Playlist_instances = new WeakSet(), _Playlist_fetchSuggestions = function _Playlist_fetchSuggestions() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const target_section_list = (_a = __classPrivateFieldGet(this, _Playlist_page, "f").contents_memo) === null || _a === void 0 ? void 0 : _a.getType(SectionList).find((section_list) => section_list.continuation);
        const continuation = __classPrivateFieldGet(this, _Playlist_suggestions_continuation, "f") || (target_section_list === null || target_section_list === void 0 ? void 0 : target_section_list.continuation);
        if (continuation) {
            const page = yield __classPrivateFieldGet(this, _Playlist_actions, "f").execute('/browse', {
                client: 'YTMUSIC',
                continuation: continuation,
                parse: true
            });
            const section_list = (_b = page.continuation_contents) === null || _b === void 0 ? void 0 : _b.as(SectionListContinuation);
            const sections = (_c = section_list === null || section_list === void 0 ? void 0 : section_list.contents) === null || _c === void 0 ? void 0 : _c.as(MusicCarouselShelf, MusicShelf);
            const suggestions = (_d = sections === null || sections === void 0 ? void 0 : sections.find((section) => section.is(MusicShelf))) === null || _d === void 0 ? void 0 : _d.as(MusicShelf);
            return {
                items: (suggestions === null || suggestions === void 0 ? void 0 : suggestions.contents) || observe([]),
                continuation: (suggestions === null || suggestions === void 0 ? void 0 : suggestions.continuation) || null
            };
        }
        return {
            items: observe([]),
            continuation: null
        };
    });
};
export default Playlist;
//# sourceMappingURL=Playlist.js.map