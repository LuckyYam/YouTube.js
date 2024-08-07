import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
class LiveChatItemList extends YTNode {
    constructor(data) {
        super();
        this.max_items_to_display = data.maxItemsToDisplay;
        this.more_comments_below_button = Parser.parseItem(data.moreCommentsBelowButton, Button);
    }
}
LiveChatItemList.type = 'LiveChatItemList';
export default LiveChatItemList;
//# sourceMappingURL=LiveChatItemList.js.map