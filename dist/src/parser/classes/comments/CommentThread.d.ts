import Comment from './Comment.js';
import CommentView from './CommentView.js';
import CommentReplies from './CommentReplies.js';
import { YTNode } from '../../helpers.js';
import type Actions from '../../../core/Actions.js';
import type { ObservedArray } from '../../helpers.js';
import type { RawNode } from '../../index.js';
export default class CommentThread extends YTNode {
    #private;
    static type: string;
    comment: Comment | CommentView | null;
    replies?: ObservedArray<Comment | CommentView>;
    comment_replies_data: CommentReplies | null;
    is_moderated_elq_comment: boolean;
    has_replies: boolean;
    constructor(data: RawNode);
    /**
     * Retrieves replies to this comment thread.
     */
    getReplies(): Promise<CommentThread>;
    /**
     * Retrieves next batch of replies.
     */
    getContinuation(): Promise<CommentThread>;
    get has_continuation(): boolean;
    setActions(actions: Actions): void;
}
