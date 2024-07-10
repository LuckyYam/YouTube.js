import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import ContentMetadataView from './ContentMetadataView.js';
import Text from './misc/Text.js';
class LockupMetadataView extends YTNode {
    constructor(data) {
        super();
        this.title = Text.fromAttributed(data.title);
        this.metadata = Parser.parseItem(data.metadata, ContentMetadataView);
    }
}
LockupMetadataView.type = 'LockupMetadataView';
export default LockupMetadataView;
//# sourceMappingURL=LockupMetadataView.js.map