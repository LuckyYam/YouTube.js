import Text from './misc/Text.js';
import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
export default class ItemSectionHeader extends YTNode {
    static type: string;
    title: Text;
    constructor(data: RawNode);
}
