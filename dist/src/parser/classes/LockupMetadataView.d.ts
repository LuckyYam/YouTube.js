import { YTNode } from '../helpers.js';
import { type RawNode } from '../index.js';
import ContentMetadataView from './ContentMetadataView.js';
import Text from './misc/Text.js';
export default class LockupMetadataView extends YTNode {
    static type: string;
    title: Text;
    metadata: ContentMetadataView | null;
    constructor(data: RawNode);
}
