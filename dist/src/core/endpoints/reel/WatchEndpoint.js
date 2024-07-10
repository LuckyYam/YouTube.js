export const PATH = '/reel/reel_item_watch';
/**
 * Builds a `/reel/reel_watch_sequence` request payload.
 * @param opts - The options to use.
 * @returns The payload.
 */
export function build(opts) {
    var _a, _b;
    return {
        playerRequest: {
            videoId: opts.short_id,
            params: (_a = opts.params) !== null && _a !== void 0 ? _a : 'CAUwAg%3D%3D'
        },
        params: (_b = opts.params) !== null && _b !== void 0 ? _b : 'CAUwAg%3D%3D'
    };
}
//# sourceMappingURL=WatchEndpoint.js.map