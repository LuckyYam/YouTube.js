var _VideoInfo_watch_next_continuation, _VideoInfo_actions;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { Parser, ContinuationCommand } from '../index.js';
import { InnertubeError } from '../../utils/Utils.js';
import { Reel } from '../../core/endpoints/index.js';
class VideoInfo {
    constructor(data, actions) {
        var _a, _b;
        _VideoInfo_watch_next_continuation.set(this, void 0);
        _VideoInfo_actions.set(this, void 0);
        __classPrivateFieldSet(this, _VideoInfo_actions, actions, "f");
        const info = Parser.parseResponse(data[0].data);
        const watch_next = Parser.parseResponse(data[1].data);
        this.basic_info = info.video_details;
        this.watch_next_feed = (_a = watch_next.entries) === null || _a === void 0 ? void 0 : _a.array();
        __classPrivateFieldSet(this, _VideoInfo_watch_next_continuation, (_b = watch_next.continuation_endpoint) === null || _b === void 0 ? void 0 : _b.as(ContinuationCommand), "f");
    }
    /**
     * Retrieves watch next feed continuation.
     */
    getWatchNextContinuation() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!__classPrivateFieldGet(this, _VideoInfo_watch_next_continuation, "f"))
                throw new InnertubeError('Watch next feed continuation not found');
            const response = yield __classPrivateFieldGet(this, _VideoInfo_actions, "f").execute(Reel.WatchSequenceEndpoint.PATH, Reel.WatchSequenceEndpoint.build({
                sequenceParams: __classPrivateFieldGet(this, _VideoInfo_watch_next_continuation, "f").token
            }));
            if (!response.success) {
                throw new InnertubeError('Continue failed ', response.status_code);
            }
            const parsed = Parser.parseResponse(response.data);
            this.watch_next_feed = (_a = parsed.entries) === null || _a === void 0 ? void 0 : _a.array();
            __classPrivateFieldSet(this, _VideoInfo_watch_next_continuation, (_b = parsed.continuation_endpoint) === null || _b === void 0 ? void 0 : _b.as(ContinuationCommand), "f");
            return this;
        });
    }
}
_VideoInfo_watch_next_continuation = new WeakMap(), _VideoInfo_actions = new WeakMap();
export default VideoInfo;
//# sourceMappingURL=VideoInfo.js.map