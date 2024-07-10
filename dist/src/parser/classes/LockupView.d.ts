import { YTNode } from '../helpers.js';
import { type RawNode } from '../index.js';
import CollectionThumbnailView from './CollectionThumbnailView.js';
import LockupMetadataView from './LockupMetadataView.js';
import NavigationEndpoint from './NavigationEndpoint.js';
export default class LockupView extends YTNode {
    static type: string;
    content_image: CollectionThumbnailView | null;
    metadata: LockupMetadataView | null;
    content_id: string;
    content_type: 'SOURCE' | 'PLAYLIST' | 'ALBUM' | 'PODCAST' | 'SHOPPING_COLLECTION' | 'SHORT' | 'GAME' | 'PRODUCT';
    on_tap_endpoint: NavigationEndpoint;
    constructor(data: RawNode);
}
