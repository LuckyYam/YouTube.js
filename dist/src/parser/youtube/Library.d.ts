import Feed from '../../core/mixins/Feed.js';
import History from './History.js';
import Playlist from './Playlist.js';
import PageHeader from '../classes/PageHeader.js';
import type { Actions, ApiResponse } from '../../core/index.js';
import type { IBrowseResponse } from '../types/index.js';
declare class Library extends Feed<IBrowseResponse> {
    #private;
    header: PageHeader | null;
    sections: {
        type: string | undefined;
        title: import("../misc.js").Text;
        contents: any[];
        getAll: () => Promise<History | Playlist | Feed<import("../types/ParsedResponse.js").IParsedResponse>>;
    }[];
    constructor(actions: Actions, data: ApiResponse | IBrowseResponse);
    get history(): {
        type: string | undefined;
        title: import("../misc.js").Text;
        contents: any[];
        getAll: () => Promise<History | Playlist | Feed<import("../types/ParsedResponse.js").IParsedResponse>>;
    } | undefined;
    get watch_later(): {
        type: string | undefined;
        title: import("../misc.js").Text;
        contents: any[];
        getAll: () => Promise<History | Playlist | Feed<import("../types/ParsedResponse.js").IParsedResponse>>;
    } | undefined;
    get liked_videos(): {
        type: string | undefined;
        title: import("../misc.js").Text;
        contents: any[];
        getAll: () => Promise<History | Playlist | Feed<import("../types/ParsedResponse.js").IParsedResponse>>;
    } | undefined;
    get playlists_section(): {
        type: string | undefined;
        title: import("../misc.js").Text;
        contents: any[];
        getAll: () => Promise<History | Playlist | Feed<import("../types/ParsedResponse.js").IParsedResponse>>;
    } | undefined;
    get clips(): {
        type: string | undefined;
        title: import("../misc.js").Text;
        contents: any[];
        getAll: () => Promise<History | Playlist | Feed<import("../types/ParsedResponse.js").IParsedResponse>>;
    } | undefined;
}
export default Library;
