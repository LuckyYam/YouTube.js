import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import CollectionThumbnailView from './CollectionThumbnailView.js';
import LockupMetadataView from './LockupMetadataView.js';
import NavigationEndpoint from './NavigationEndpoint.js';
class LockupView extends YTNode {
    constructor(data) {
        super();
        this.content_image = Parser.parseItem(data.contentImage, CollectionThumbnailView);
        this.metadata = Parser.parseItem(data.metadata, LockupMetadataView);
        this.content_id = data.contentId;
        this.content_type = data.contentType.replace('LOCKUP_CONTENT_TYPE_', '');
        this.on_tap_endpoint = new NavigationEndpoint(data.rendererContext.commandContext.onTap);
    }
}
LockupView.type = 'LockupView';
export default LockupView;
//# sourceMappingURL=LockupView.js.map