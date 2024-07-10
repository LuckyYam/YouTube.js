var _Playlist_instances, _Playlist_getStat;
import { __awaiter, __classPrivateFieldGet } from "tslib";
import { InnertubeError } from '../../utils/Utils.js';
import Feed from '../../core/mixins/Feed.js';
import Message from '../classes/Message.js';
import PlaylistCustomThumbnail from '../classes/PlaylistCustomThumbnail.js';
import PlaylistHeader from '../classes/PlaylistHeader.js';
import PlaylistMetadata from '../classes/PlaylistMetadata.js';
import PlaylistSidebarPrimaryInfo from '../classes/PlaylistSidebarPrimaryInfo.js';
import PlaylistSidebarSecondaryInfo from '../classes/PlaylistSidebarSecondaryInfo.js';
import PlaylistVideoThumbnail from '../classes/PlaylistVideoThumbnail.js';
import ReelItem from '../classes/ReelItem.js';
import VideoOwner from '../classes/VideoOwner.js';
import Alert from '../classes/Alert.js';
import ContinuationItem from '../classes/ContinuationItem.js';
import PlaylistVideo from '../classes/PlaylistVideo.js';
import SectionList from '../classes/SectionList.js';
import { observe } from '../helpers.js';
class Playlist extends Feed {
    constructor(actions, data, already_parsed = false) {
        var _a, _b, _c, _d, _e;
        super(actions, data, already_parsed);
        _Playlist_instances.add(this);
        const header = this.memo.getType(PlaylistHeader).first();
        const primary_info = this.memo.getType(PlaylistSidebarPrimaryInfo).first();
        const secondary_info = this.memo.getType(PlaylistSidebarSecondaryInfo).first();
        const alert = (_a = this.page.alerts) === null || _a === void 0 ? void 0 : _a.firstOfType(Alert);
        if (alert && alert.alert_type === 'ERROR')
            throw new InnertubeError(alert.text.toString(), alert);
        if (!primary_info && !secondary_info && Object.keys(this.page).length === 0)
            throw new InnertubeError('Got empty continuation response. This is likely the end of the playlist.');
        this.info = Object.assign(Object.assign({}, (_b = this.page.metadata) === null || _b === void 0 ? void 0 : _b.item().as(PlaylistMetadata)), {
            subtitle: header ? header.subtitle : null,
            author: (_d = (_c = secondary_info === null || secondary_info === void 0 ? void 0 : secondary_info.owner) === null || _c === void 0 ? void 0 : _c.as(VideoOwner).author) !== null && _d !== void 0 ? _d : header === null || header === void 0 ? void 0 : header.author,
            thumbnails: (_e = primary_info === null || primary_info === void 0 ? void 0 : primary_info.thumbnail_renderer) === null || _e === void 0 ? void 0 : _e.as(PlaylistVideoThumbnail, PlaylistCustomThumbnail).thumbnail,
            total_items: __classPrivateFieldGet(this, _Playlist_instances, "m", _Playlist_getStat).call(this, 0, primary_info),
            views: __classPrivateFieldGet(this, _Playlist_instances, "m", _Playlist_getStat).call(this, 1, primary_info),
            last_updated: __classPrivateFieldGet(this, _Playlist_instances, "m", _Playlist_getStat).call(this, 2, primary_info),
            can_share: header === null || header === void 0 ? void 0 : header.can_share,
            can_delete: header === null || header === void 0 ? void 0 : header.can_delete,
            is_editable: header === null || header === void 0 ? void 0 : header.is_editable,
            privacy: header === null || header === void 0 ? void 0 : header.privacy
        });
        this.menu = primary_info === null || primary_info === void 0 ? void 0 : primary_info.menu;
        this.endpoint = primary_info === null || primary_info === void 0 ? void 0 : primary_info.endpoint;
        this.messages = this.memo.getType(Message);
    }
    get items() {
        return observe(this.videos.as(PlaylistVideo, ReelItem).filter((video) => video.style !== 'PLAYLIST_VIDEO_RENDERER_STYLE_RECOMMENDED_VIDEO'));
    }
    get has_continuation() {
        const section_list = this.memo.getType(SectionList).first();
        if (!section_list)
            return super.has_continuation;
        return !!this.memo.getType(ContinuationItem).find((node) => !section_list.contents.includes(node));
    }
    getContinuationData() {
        const _super = Object.create(null, {
            getContinuationData: { get: () => super.getContinuationData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const section_list = this.memo.getType(SectionList).first();
            /**
             * No section list means there can't be additional continuation nodes here,
             * so no need to check.
             */
            if (!section_list)
                return yield _super.getContinuationData.call(this);
            const playlist_contents_continuation = this.memo.getType(ContinuationItem)
                .find((node) => !section_list.contents.includes(node));
            if (!playlist_contents_continuation)
                throw new InnertubeError('There are no continuations.');
            const response = yield playlist_contents_continuation.endpoint.call(this.actions, { parse: true });
            return response;
        });
    }
    getContinuation() {
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield this.getContinuationData();
            if (!page)
                throw new InnertubeError('Could not get continuation data');
            return new Playlist(this.actions, page, true);
        });
    }
}
_Playlist_instances = new WeakSet(), _Playlist_getStat = function _Playlist_getStat(index, primary_info) {
    var _a;
    if (!primary_info || !primary_info.stats)
        return 'N/A';
    return ((_a = primary_info.stats[index]) === null || _a === void 0 ? void 0 : _a.toString()) || 'N/A';
};
export default Playlist;
//# sourceMappingURL=Playlist.js.map