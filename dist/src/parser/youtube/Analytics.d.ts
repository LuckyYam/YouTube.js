import type { ApiResponse } from '../../core/index.js';
import type { IBrowseResponse } from '../types/index.js';
declare class Analytics {
    #private;
    sections: import("../helpers.js").YTNode[] | undefined;
    constructor(response: ApiResponse);
    get page(): IBrowseResponse;
}
export default Analytics;
