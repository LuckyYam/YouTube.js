import type NavigationEndpoint from '../classes/NavigationEndpoint.js';
import type PlayerOverlay from '../classes/PlayerOverlay.js';
import type { ApiResponse, Actions } from '../../core/index.js';
import type { ObservedArray, YTNode } from '../helpers.js';
declare class VideoInfo {
    #private;
    basic_info: import("../misc.js").VideoDetails | undefined;
    watch_next_feed?: ObservedArray<YTNode>;
    current_video_endpoint?: NavigationEndpoint;
    player_overlays?: PlayerOverlay;
    constructor(data: [ApiResponse, ApiResponse], actions: Actions);
    /**
     * Retrieves watch next feed continuation.
     */
    getWatchNextContinuation(): Promise<VideoInfo>;
}
export default VideoInfo;
