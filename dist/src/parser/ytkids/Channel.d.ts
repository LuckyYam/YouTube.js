import Feed from '../../core/mixins/Feed.js';
import C4TabbedHeader from '../classes/C4TabbedHeader.js';
import ItemSection from '../classes/ItemSection.js';
import { ItemSectionContinuation } from '../index.js';
import type { IBrowseResponse } from '../types/index.js';
import type { ApiResponse, Actions } from '../../core/index.js';
declare class Channel extends Feed<IBrowseResponse> {
    header?: C4TabbedHeader;
    contents?: ItemSection | ItemSectionContinuation;
    constructor(actions: Actions, data: ApiResponse | IBrowseResponse, already_parsed?: boolean);
    /**
     * Retrieves next batch of videos.
     */
    getContinuation(): Promise<Channel>;
    get has_continuation(): boolean;
}
export default Channel;
