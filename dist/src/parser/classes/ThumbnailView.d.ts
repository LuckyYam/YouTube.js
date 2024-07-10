import { YTNode } from '../helpers.js';
import { type RawNode } from '../index.js';
import ThumbnailHoverOverlayView from './ThumbnailHoverOverlayView.js';
import ThumbnailOverlayBadgeView from './ThumbnailOverlayBadgeView.js';
import Thumbnail from './misc/Thumbnail.js';
export default class ThumbnailView extends YTNode {
    static type: string;
    image: Thumbnail[];
    overlays: (ThumbnailOverlayBadgeView | ThumbnailHoverOverlayView)[];
    background_color: {
        light_theme: number;
        dark_theme: number;
    };
    constructor(data: RawNode);
}
