import { YTNode } from '../helpers.js';
class ThumbnailBadgeView extends YTNode {
    constructor(data) {
        super();
        this.icon_name = data.icon.sources[0].clientResource.imageName;
        this.text = data.text;
        this.badge_style = data.badgeStyle;
        this.background_color = {
            light_theme: data.backgroundColor.lightTheme,
            dark_theme: data.backgroundColor.darkTheme
        };
    }
}
ThumbnailBadgeView.type = 'ThumbnailBadgeView';
export default ThumbnailBadgeView;
//# sourceMappingURL=ThumbnailBadgeView.js.map