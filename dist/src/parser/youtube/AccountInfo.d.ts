import type { ApiResponse } from '../../core/index.js';
import type { IParsedResponse } from '../types/index.js';
import type AccountItemSection from '../classes/AccountItemSection.js';
import type AccountChannel from '../classes/AccountChannel.js';
declare class AccountInfo {
    #private;
    contents: AccountItemSection | null;
    footers: AccountChannel | null;
    constructor(response: ApiResponse);
    get page(): IParsedResponse;
}
export default AccountInfo;
