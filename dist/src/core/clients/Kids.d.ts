import { Channel, HomeFeed, Search, VideoInfo } from '../../parser/ytkids/index.js';
import type { Session, ApiResponse } from '../index.js';
export default class Kids {
    #private;
    constructor(session: Session);
    /**
     * Searches the given query.
     * @param query - The query.
     */
    search(query: string): Promise<Search>;
    /**
     * Retrieves video info.
     * @param video_id - The video id.
     */
    getInfo(video_id: string): Promise<VideoInfo>;
    /**
     * Retrieves the contents of the given channel.
    * @param channel_id - The channel id.
     */
    getChannel(channel_id: string): Promise<Channel>;
    /**
     * Retrieves the home feed.
     */
    getHomeFeed(): Promise<HomeFeed>;
    /**
     * Retrieves the list of supervised accounts that the signed-in user has
     * access to, and blocks the given channel for each of them.
     * @param channel_id - The channel id to block.
     * @returns A list of API responses.
     */
    blockChannel(channel_id: string): Promise<ApiResponse[]>;
}
