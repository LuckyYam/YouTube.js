import { MediaInfo } from '../../core/mixins/index.js';
import PlayerOverlay from '../classes/PlayerOverlay.js';
import SlimVideoMetadata from '../classes/SlimVideoMetadata.js';
import type { ApiResponse, Actions } from '../../core/index.js';
import type { ObservedArray, YTNode } from '../helpers.js';
import type NavigationEndpoint from '../classes/NavigationEndpoint.js';
declare class VideoInfo extends MediaInfo {
    basic_info: import("../misc.js").VideoDetails | undefined;
    captions: import("../nodes.js").PlayerCaptionsTracklist | undefined;
    slim_video_metadata?: SlimVideoMetadata;
    watch_next_feed?: ObservedArray<YTNode>;
    current_video_endpoint?: NavigationEndpoint;
    player_overlays?: PlayerOverlay;
    constructor(data: [ApiResponse, ApiResponse?], actions: Actions, cpn: string);
    /**
   * Adds video to the watch history.
   */
    addToWatchHistory(): Promise<Response>;
}
export default VideoInfo;
