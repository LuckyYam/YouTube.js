import { Parser } from '../index.js';
import { YTNode } from '../helpers.js';
import SearchRefinementCard from './SearchRefinementCard.js';
import Button from './Button.js';
import MacroMarkersListItem from './MacroMarkersListItem.js';
import GameCard from './GameCard.js';
import VideoCard from './VideoCard.js';
import VideoAttributeView from './VideoAttributeView.js';
class HorizontalCardList extends YTNode {
    constructor(data) {
        super();
        this.cards = Parser.parseArray(data.cards, [VideoAttributeView, SearchRefinementCard, MacroMarkersListItem, GameCard, VideoCard]);
        this.header = Parser.parseItem(data.header);
        this.previous_button = Parser.parseItem(data.previousButton, Button);
        this.next_button = Parser.parseItem(data.nextButton, Button);
    }
}
HorizontalCardList.type = 'HorizontalCardList';
export default HorizontalCardList;
//# sourceMappingURL=HorizontalCardList.js.map