import { YTNode } from '../helpers.js';
import type { RawNode } from '../index.js';
import NavigationEndpoint from './NavigationEndpoint.js';
export default class Command extends YTNode {
    static type: string;
    endpoint: NavigationEndpoint;
    constructor(data: RawNode);
}
