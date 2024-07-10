var _CommentView_actions;
import { __awaiter, __classPrivateFieldGet, __classPrivateFieldSet } from "tslib";
import { YTNode } from '../../helpers.js';
import NavigationEndpoint from '../NavigationEndpoint.js';
import Author from '../misc/Author.js';
import Text from '../misc/Text.js';
import CommentReplyDialog from './CommentReplyDialog.js';
import { InnertubeError } from '../../../utils/Utils.js';
import * as Proto from '../../../proto/index.js';
class CommentView extends YTNode {
    constructor(data) {
        super();
        _CommentView_actions.set(this, void 0);
        this.comment_id = data.commentId;
        this.is_pinned = !!data.pinnedText;
        this.keys = {
            comment: data.commentKey,
            comment_surface: data.commentSurfaceKey,
            toolbar_state: data.toolbarStateKey,
            toolbar_surface: data.toolbarSurfaceKey,
            shared: data.sharedKey
        };
    }
    applyMutations(comment, toolbar_state, toolbar_surface) {
        if (comment) {
            this.content = Text.fromAttributed(comment.properties.content);
            this.published_time = comment.properties.publishedTime;
            this.author_is_channel_owner = !!comment.author.isCreator;
            this.like_count = comment.toolbar.likeCountNotliked ? comment.toolbar.likeCountNotliked : '0';
            this.reply_count = comment.toolbar.replyCount ? comment.toolbar.replyCount : '0';
            this.is_member = !!comment.author.sponsorBadgeUrl;
            if (Reflect.has(comment.author, 'sponsorBadgeUrl')) {
                this.member_badge = {
                    url: comment.author.sponsorBadgeUrl,
                    a11y: comment.author.A11y
                };
            }
            this.author = new Author({
                simpleText: comment.author.displayName,
                navigationEndpoint: comment.avatar.endpoint
            }, comment.author, comment.avatar.image, comment.author.channelId);
        }
        if (toolbar_state) {
            this.is_hearted = toolbar_state.heartState === 'TOOLBAR_HEART_STATE_HEARTED';
            this.is_liked = toolbar_state.likeState === 'TOOLBAR_LIKE_STATE_LIKED';
            this.is_disliked = toolbar_state.likeState === 'TOOLBAR_LIKE_STATE_DISLIKED';
        }
        if (toolbar_surface && !Reflect.has(toolbar_surface, 'prepareAccountCommand')) {
            this.like_command = new NavigationEndpoint(toolbar_surface.likeCommand);
            this.dislike_command = new NavigationEndpoint(toolbar_surface.dislikeCommand);
            this.unlike_command = new NavigationEndpoint(toolbar_surface.unlikeCommand);
            this.undislike_command = new NavigationEndpoint(toolbar_surface.undislikeCommand);
            this.reply_command = new NavigationEndpoint(toolbar_surface.replyCommand);
        }
    }
    /**
     * Likes the comment.
     * @returns A promise that resolves to the API response.
     * @throws If the Actions instance is not set for this comment or if the like command is not found.
     */
    like() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _CommentView_actions, "f"))
                throw new InnertubeError('Actions instance not set for this comment.');
            if (!this.like_command)
                throw new InnertubeError('Like command not found.');
            if (this.is_liked)
                throw new InnertubeError('This comment is already liked.', { comment_id: this.comment_id });
            return this.like_command.call(__classPrivateFieldGet(this, _CommentView_actions, "f"));
        });
    }
    /**
     * Dislikes the comment.
     * @returns A promise that resolves to the API response.
     * @throws If the Actions instance is not set for this comment or if the dislike command is not found.
     */
    dislike() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _CommentView_actions, "f"))
                throw new InnertubeError('Actions instance not set for this comment.');
            if (!this.dislike_command)
                throw new InnertubeError('Dislike command not found.');
            if (this.is_disliked)
                throw new InnertubeError('This comment is already disliked.', { comment_id: this.comment_id });
            return this.dislike_command.call(__classPrivateFieldGet(this, _CommentView_actions, "f"));
        });
    }
    /**
     * Unlikes the comment.
     * @returns A promise that resolves to the API response.
     * @throws If the Actions instance is not set for this comment or if the unlike command is not found.
     */
    unlike() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _CommentView_actions, "f"))
                throw new InnertubeError('Actions instance not set for this comment.');
            if (!this.unlike_command)
                throw new InnertubeError('Unlike command not found.');
            if (!this.is_liked)
                throw new InnertubeError('This comment is not liked.', { comment_id: this.comment_id });
            return this.unlike_command.call(__classPrivateFieldGet(this, _CommentView_actions, "f"));
        });
    }
    /**
     * Undislikes the comment.
     * @returns A promise that resolves to the API response.
     * @throws If the Actions instance is not set for this comment or if the undislike command is not found.
     */
    undislike() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!__classPrivateFieldGet(this, _CommentView_actions, "f"))
                throw new InnertubeError('Actions instance not set for this comment.');
            if (!this.undislike_command)
                throw new InnertubeError('Undislike command not found.');
            if (!this.is_disliked)
                throw new InnertubeError('This comment is not disliked.', { comment_id: this.comment_id });
            return this.undislike_command.call(__classPrivateFieldGet(this, _CommentView_actions, "f"));
        });
    }
    /**
     * Replies to the comment.
     * @param comment_text - The text of the reply.
     * @returns A promise that resolves to the API response.
     * @throws If the Actions instance is not set for this comment or if the reply command is not found.
     */
    reply(comment_text) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!__classPrivateFieldGet(this, _CommentView_actions, "f"))
                throw new InnertubeError('Actions instance not set for this comment.');
            if (!this.reply_command)
                throw new InnertubeError('Reply command not found.');
            const dialog = (_a = this.reply_command.dialog) === null || _a === void 0 ? void 0 : _a.as(CommentReplyDialog);
            if (!dialog)
                throw new InnertubeError('Reply dialog not found.');
            const reply_button = dialog.reply_button;
            if (!reply_button)
                throw new InnertubeError('Reply button not found in the dialog.');
            if (!reply_button.endpoint)
                throw new InnertubeError('Reply button endpoint not found.');
            return reply_button.endpoint.call(__classPrivateFieldGet(this, _CommentView_actions, "f"), { commentText: comment_text });
        });
    }
    /**
     * Translates the comment to the specified target language.
     * @param target_language - The target language to translate the comment to, e.g. 'en', 'ja'.
     * @returns A Promise that resolves to an ApiResponse object with the translated content, if available.
     * @throws if the Actions instance is not set for this comment or if the comment content is not found.
     */
    translate(target_language) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            if (!__classPrivateFieldGet(this, _CommentView_actions, "f"))
                throw new InnertubeError('Actions instance not set for this comment.');
            if (!this.content)
                throw new InnertubeError('Comment content not found.', { comment_id: this.comment_id });
            // Emojis must be removed otherwise InnerTube throws a 400 status code at us.
            const text = this.content.toString().replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '');
            const payload = {
                text,
                target_language
            };
            const action = Proto.encodeCommentActionParams(22, payload);
            const response = yield __classPrivateFieldGet(this, _CommentView_actions, "f").execute('comment/perform_comment_action', { action, client: 'ANDROID' });
            // XXX: Should move this to Parser#parseResponse
            const mutations = (_b = (_a = response.data.frameworkUpdates) === null || _a === void 0 ? void 0 : _a.entityBatchUpdate) === null || _b === void 0 ? void 0 : _b.mutations;
            const content = (_f = (_e = (_d = (_c = mutations === null || mutations === void 0 ? void 0 : mutations[0]) === null || _c === void 0 ? void 0 : _c.payload) === null || _d === void 0 ? void 0 : _d.commentEntityPayload) === null || _e === void 0 ? void 0 : _e.translatedContent) === null || _f === void 0 ? void 0 : _f.content;
            return Object.assign(Object.assign({}, response), { content });
        });
    }
    setActions(actions) {
        __classPrivateFieldSet(this, _CommentView_actions, actions, "f");
    }
}
_CommentView_actions = new WeakMap();
CommentView.type = 'CommentView';
export default CommentView;
//# sourceMappingURL=CommentView.js.map