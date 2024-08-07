import { YTNode } from '../../helpers.js';
import { Parser } from '../../index.js';
import NavigationEndpoint from '../NavigationEndpoint.js';
import SectionList from '../SectionList.js';
class AnchoredSection extends YTNode {
    constructor(data) {
        var _a, _b;
        super();
        this.title = data.title;
        this.content = Parser.parseItem(data.content, SectionList);
        this.endpoint = new NavigationEndpoint(data.navigationEndpoint);
        this.category_assets = {
            asset_key: (_a = data.categoryAssets) === null || _a === void 0 ? void 0 : _a.assetKey,
            background_color: (_b = data.categoryAssets) === null || _b === void 0 ? void 0 : _b.backgroundColor
        };
        this.category_type = data.categoryType;
    }
}
AnchoredSection.type = 'AnchoredSection';
export default AnchoredSection;
//# sourceMappingURL=AnchoredSection.js.map