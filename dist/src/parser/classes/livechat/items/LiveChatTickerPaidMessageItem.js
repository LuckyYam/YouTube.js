import Author from '../../misc/Author.js';
import { Parser } from '../../../index.js';
import NavigationEndpoint from '../../NavigationEndpoint.js';
import Text from '../../misc/Text.js';
import { YTNode } from '../../../helpers.js';
class LiveChatTickerPaidMessageItem extends YTNode {
    constructor(data) {
        var _a, _b;
        super();
        this.author = new Author(data.authorName, data.authorBadges, data.authorPhoto, data.authorExternalChannelId);
        this.amount = new Text(data.amount);
        this.duration_sec = data.durationSec;
        this.full_duration_sec = data.fullDurationSec;
        this.show_item = Parser.parseItem((_b = (_a = data.showItemEndpoint) === null || _a === void 0 ? void 0 : _a.showLiveChatItemEndpoint) === null || _b === void 0 ? void 0 : _b.renderer);
        this.show_item_endpoint = new NavigationEndpoint(data.showItemEndpoint);
        this.id = data.id;
    }
}
LiveChatTickerPaidMessageItem.type = 'LiveChatTickerPaidMessageItem';
export default LiveChatTickerPaidMessageItem;
//# sourceMappingURL=LiveChatTickerPaidMessageItem.js.map