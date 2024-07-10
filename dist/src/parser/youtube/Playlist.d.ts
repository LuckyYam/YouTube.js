import Feed from '../../core/mixins/Feed.js';
import Message from '../classes/Message.js';
import ReelItem from '../classes/ReelItem.js';
import PlaylistVideo from '../classes/PlaylistVideo.js';
import { type ObservedArray } from '../helpers.js';
import type { ApiResponse, Actions } from '../../core/index.js';
import type { IBrowseResponse } from '../types/ParsedResponse.js';
import type Thumbnail from '../classes/misc/Thumbnail.js';
import type NavigationEndpoint from '../classes/NavigationEndpoint.js';
export default class Playlist extends Feed<IBrowseResponse> {
    #private;
    info: {
        subtitle: import("../misc.js").Text | null;
        author: import("../misc.js").Author;
        thumbnails: Thumbnail[];
        total_items: string;
        views: string;
        last_updated: string;
        can_share: boolean;
        can_delete: boolean;
        is_editable: boolean;
        privacy: string;
        title?: string | undefined;
        description?: string | undefined;
        type?: string | undefined;
    };
    menu: import("../helpers.js").YTNode;
    endpoint?: NavigationEndpoint;
    messages: ObservedArray<Message>;
    constructor(actions: Actions, data: ApiResponse | IBrowseResponse, already_parsed?: boolean);
    get items(): ObservedArray<PlaylistVideo | ReelItem>;
    get has_continuation(): boolean;
    getContinuationData(): Promise<IBrowseResponse | undefined>;
    getContinuation(): Promise<Playlist>;
}
