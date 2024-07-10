import { __awaiter } from "tslib";
import Feed from '../../core/mixins/Feed.js';
import FilterableFeed from '../../core/mixins/FilterableFeed.js';
import { ChannelError, InnertubeError } from '../../utils/Utils.js';
import TabbedFeed from '../../core/mixins/TabbedFeed.js';
import C4TabbedHeader from '../classes/C4TabbedHeader.js';
import CarouselHeader from '../classes/CarouselHeader.js';
import ChannelAboutFullMetadata from '../classes/ChannelAboutFullMetadata.js';
import AboutChannel from '../classes/AboutChannel.js';
import ChannelMetadata from '../classes/ChannelMetadata.js';
import InteractiveTabbedHeader from '../classes/InteractiveTabbedHeader.js';
import MicroformatData from '../classes/MicroformatData.js';
import SubscribeButton from '../classes/SubscribeButton.js';
import ExpandableTab from '../classes/ExpandableTab.js';
import SectionList from '../classes/SectionList.js';
import Tab from '../classes/Tab.js';
import PageHeader from '../classes/PageHeader.js';
import TwoColumnBrowseResults from '../classes/TwoColumnBrowseResults.js';
import ChipCloudChip from '../classes/ChipCloudChip.js';
import FeedFilterChipBar from '../classes/FeedFilterChipBar.js';
import ChannelSubMenu from '../classes/ChannelSubMenu.js';
import SortFilterSubMenu from '../classes/SortFilterSubMenu.js';
import ContinuationItem from '../classes/ContinuationItem.js';
import NavigationEndpoint from '../classes/NavigationEndpoint.js';
export default class Channel extends TabbedFeed {
    constructor(actions, data, already_parsed = false) {
        var _a, _b, _c, _d, _e, _f;
        super(actions, data, already_parsed);
        this.header = (_b = (_a = this.page.header) === null || _a === void 0 ? void 0 : _a.item()) === null || _b === void 0 ? void 0 : _b.as(C4TabbedHeader, CarouselHeader, InteractiveTabbedHeader, PageHeader);
        const metadata = (_c = this.page.metadata) === null || _c === void 0 ? void 0 : _c.item().as(ChannelMetadata);
        const microformat = (_d = this.page.microformat) === null || _d === void 0 ? void 0 : _d.as(MicroformatData);
        if (this.page.alerts) {
            const alert = this.page.alerts.first();
            if ((alert === null || alert === void 0 ? void 0 : alert.alert_type) === 'ERROR') {
                throw new ChannelError(alert.text.toString());
            }
        }
        if (!metadata && !this.page.contents)
            throw new InnertubeError('Invalid channel', this);
        this.metadata = Object.assign(Object.assign({}, metadata), (microformat || {}));
        this.subscribe_button = (_e = this.page.header_memo) === null || _e === void 0 ? void 0 : _e.getType(SubscribeButton).first();
        this.current_tab = (_f = this.page.contents) === null || _f === void 0 ? void 0 : _f.item().as(TwoColumnBrowseResults).tabs.array().filterType(Tab, ExpandableTab).get({ selected: true });
    }
    /**
     * Applies given filter to the list. Use {@link filters} to get available filters.
     * @param filter - The filter to apply
     */
    applyFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            let target_filter;
            const filter_chipbar = this.memo.getType(FeedFilterChipBar).first();
            if (typeof filter === 'string') {
                target_filter = filter_chipbar === null || filter_chipbar === void 0 ? void 0 : filter_chipbar.contents.get({ text: filter });
                if (!target_filter)
                    throw new InnertubeError(`Filter ${filter} not found`, { available_filters: this.filters });
            }
            else if (filter instanceof ChipCloudChip) {
                target_filter = filter;
            }
            if (!target_filter)
                throw new InnertubeError('Invalid filter', filter);
            const page = yield ((_a = target_filter.endpoint) === null || _a === void 0 ? void 0 : _a.call(this.actions, { parse: true }));
            if (!page)
                throw new InnertubeError('No page returned', { filter: target_filter });
            return new FilteredChannelList(this.actions, page, true);
        });
    }
    /**
     * Applies given sort filter to the list. Use {@link sort_filters} to get available filters.
     * @param sort - The sort filter to apply
     */
    applySort(sort) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const sort_filter_sub_menu = this.memo.getType(SortFilterSubMenu).first();
            if (!sort_filter_sub_menu)
                throw new InnertubeError('No sort filter sub menu found');
            const target_sort = (_a = sort_filter_sub_menu === null || sort_filter_sub_menu === void 0 ? void 0 : sort_filter_sub_menu.sub_menu_items) === null || _a === void 0 ? void 0 : _a.find((item) => item.title === sort);
            if (!target_sort)
                throw new InnertubeError(`Sort filter ${sort} not found`, { available_sort_filters: this.sort_filters });
            if (target_sort.selected)
                return this;
            const page = yield ((_b = target_sort.endpoint) === null || _b === void 0 ? void 0 : _b.call(this.actions, { parse: true }));
            return new Channel(this.actions, page, true);
        });
    }
    /**
     * Applies given content type filter to the list. Use {@link content_type_filters} to get available filters.
     * @param content_type_filter - The content type filter to apply
     */
    applyContentTypeFilter(content_type_filter) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const sub_menu = (_c = (_b = (_a = this.current_tab) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.as(SectionList).sub_menu) === null || _c === void 0 ? void 0 : _c.as(ChannelSubMenu);
            if (!sub_menu)
                throw new InnertubeError('Sub menu not found');
            const item = sub_menu.content_type_sub_menu_items.find((item) => item.title === content_type_filter);
            if (!item)
                throw new InnertubeError(`Sub menu item ${content_type_filter} not found`, { available_filters: this.content_type_filters });
            if (item.selected)
                return this;
            const page = yield ((_d = item.endpoint) === null || _d === void 0 ? void 0 : _d.call(this.actions, { parse: true }));
            return new Channel(this.actions, page, true);
        });
    }
    get filters() {
        var _a, _b;
        return ((_b = (_a = this.memo.getType(FeedFilterChipBar)) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.contents.filterType(ChipCloudChip).map((chip) => chip.text)) || [];
    }
    get sort_filters() {
        var _a;
        const sort_filter_sub_menu = this.memo.getType(SortFilterSubMenu).first();
        return ((_a = sort_filter_sub_menu === null || sort_filter_sub_menu === void 0 ? void 0 : sort_filter_sub_menu.sub_menu_items) === null || _a === void 0 ? void 0 : _a.map((item) => item.title)) || [];
    }
    get content_type_filters() {
        var _a, _b, _c;
        const sub_menu = (_c = (_b = (_a = this.current_tab) === null || _a === void 0 ? void 0 : _a.content) === null || _b === void 0 ? void 0 : _b.as(SectionList).sub_menu) === null || _c === void 0 ? void 0 : _c.as(ChannelSubMenu);
        return (sub_menu === null || sub_menu === void 0 ? void 0 : sub_menu.content_type_sub_menu_items.map((item) => item.title)) || [];
    }
    getHome() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('featured');
            return new Channel(this.actions, tab.page, true);
        });
    }
    getVideos() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('videos');
            return new Channel(this.actions, tab.page, true);
        });
    }
    getShorts() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('shorts');
            return new Channel(this.actions, tab.page, true);
        });
    }
    getLiveStreams() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('streams');
            return new Channel(this.actions, tab.page, true);
        });
    }
    getReleases() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('releases');
            return new Channel(this.actions, tab.page, true);
        });
    }
    getPodcasts() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('podcasts');
            return new Channel(this.actions, tab.page, true);
        });
    }
    getPlaylists() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('playlists');
            return new Channel(this.actions, tab.page, true);
        });
    }
    getCommunity() {
        return __awaiter(this, void 0, void 0, function* () {
            const tab = yield this.getTabByURL('community');
            return new Channel(this.actions, tab.page, true);
        });
    }
    /**
     * Retrieves the about page.
     * Note that this does not return a new {@link Channel} object.
     */
    getAbout() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            if (this.hasTabWithURL('about')) {
                const tab = yield this.getTabByURL('about');
                return tab.memo.getType(ChannelAboutFullMetadata)[0];
            }
            const tagline = ((_a = this.header) === null || _a === void 0 ? void 0 : _a.is(C4TabbedHeader)) && this.header.tagline;
            if (tagline || ((_b = this.header) === null || _b === void 0 ? void 0 : _b.is(PageHeader)) && ((_c = this.header.content) === null || _c === void 0 ? void 0 : _c.description)) {
                if (tagline && tagline.more_endpoint instanceof NavigationEndpoint) {
                    const response = yield tagline.more_endpoint.call(this.actions);
                    const tab = new TabbedFeed(this.actions, response, false);
                    return tab.memo.getType(ChannelAboutFullMetadata)[0];
                }
                const endpoint = (_e = (_d = this.page.header_memo) === null || _d === void 0 ? void 0 : _d.getType(ContinuationItem)[0]) === null || _e === void 0 ? void 0 : _e.endpoint;
                if (!endpoint) {
                    throw new InnertubeError('Failed to extract continuation to get channel about');
                }
                const response = yield endpoint.call(this.actions, { parse: true });
                if (!response.on_response_received_endpoints_memo) {
                    throw new InnertubeError('Unexpected response while fetching channel about', { response });
                }
                return response.on_response_received_endpoints_memo.getType(AboutChannel)[0];
            }
            throw new InnertubeError('About not found');
        });
    }
    /**
     * Searches within the channel.
     */
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const tab = (_a = this.memo.getType(ExpandableTab)) === null || _a === void 0 ? void 0 : _a[0];
            if (!tab)
                throw new InnertubeError('Search tab not found', this);
            const page = yield ((_b = tab.endpoint) === null || _b === void 0 ? void 0 : _b.call(this.actions, { query, parse: true }));
            return new Channel(this.actions, page, true);
        });
    }
    get has_home() {
        return this.hasTabWithURL('featured');
    }
    get has_videos() {
        return this.hasTabWithURL('videos');
    }
    get has_shorts() {
        return this.hasTabWithURL('shorts');
    }
    get has_live_streams() {
        return this.hasTabWithURL('streams');
    }
    get has_releases() {
        return this.hasTabWithURL('releases');
    }
    get has_podcasts() {
        return this.hasTabWithURL('podcasts');
    }
    get has_playlists() {
        return this.hasTabWithURL('playlists');
    }
    get has_community() {
        return this.hasTabWithURL('community');
    }
    get has_about() {
        var _a, _b, _c, _d, _e;
        // Game topic channels still have an about tab, user channels have switched to the popup
        return this.hasTabWithURL('about') ||
            !!(((_a = this.header) === null || _a === void 0 ? void 0 : _a.is(C4TabbedHeader)) && ((_b = this.header.tagline) === null || _b === void 0 ? void 0 : _b.more_endpoint)) ||
            !!(((_c = this.header) === null || _c === void 0 ? void 0 : _c.is(PageHeader)) && ((_e = (_d = this.header.content) === null || _d === void 0 ? void 0 : _d.description) === null || _e === void 0 ? void 0 : _e.more_endpoint));
    }
    get has_search() {
        var _a;
        return ((_a = this.memo.getType(ExpandableTab)) === null || _a === void 0 ? void 0 : _a.length) > 0;
    }
    /**
     * Retrives list continuation.
     */
    getContinuation() {
        const _super = Object.create(null, {
            getContinuationData: { get: () => super.getContinuationData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield _super.getContinuationData.call(this);
            if (!page)
                throw new InnertubeError('Could not get continuation data');
            return new ChannelListContinuation(this.actions, page, true);
        });
    }
}
export class ChannelListContinuation extends Feed {
    constructor(actions, data, already_parsed = false) {
        var _a, _b;
        super(actions, data, already_parsed);
        this.contents =
            ((_a = this.page.on_response_received_actions) === null || _a === void 0 ? void 0 : _a.first()) ||
                ((_b = this.page.on_response_received_endpoints) === null || _b === void 0 ? void 0 : _b.first());
    }
    /**
     * Retrieves list continuation.
     */
    getContinuation() {
        const _super = Object.create(null, {
            getContinuationData: { get: () => super.getContinuationData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield _super.getContinuationData.call(this);
            if (!page)
                throw new InnertubeError('Could not get continuation data');
            return new ChannelListContinuation(this.actions, page, true);
        });
    }
}
export class FilteredChannelList extends FilterableFeed {
    constructor(actions, data, already_parsed = false) {
        super(actions, data, already_parsed);
        this.applied_filter = this.memo.getType(ChipCloudChip).get({ is_selected: true });
        // Removes the filter chipbar from the actions list
        if (this.page.on_response_received_actions &&
            this.page.on_response_received_actions.length > 1) {
            this.page.on_response_received_actions.shift();
        }
        this.contents = this.page.on_response_received_actions.first();
    }
    /**
     * Applies given filter to the list.
     * @param filter - The filter to apply
     */
    applyFilter(filter) {
        const _super = Object.create(null, {
            getFilteredFeed: { get: () => super.getFilteredFeed }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const feed = yield _super.getFilteredFeed.call(this, filter);
            return new FilteredChannelList(this.actions, feed.page, true);
        });
    }
    /**
     * Retrieves list continuation.
     */
    getContinuation() {
        const _super = Object.create(null, {
            getContinuationData: { get: () => super.getContinuationData }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const page = yield _super.getContinuationData.call(this);
            if (!(page === null || page === void 0 ? void 0 : page.on_response_received_actions_memo))
                throw new InnertubeError('Unexpected continuation data', page);
            // Keep the filters
            page.on_response_received_actions_memo.set('FeedFilterChipBar', this.memo.getType(FeedFilterChipBar));
            page.on_response_received_actions_memo.set('ChipCloudChip', this.memo.getType(ChipCloudChip));
            return new FilteredChannelList(this.actions, page, true);
        });
    }
}
//# sourceMappingURL=Channel.js.map