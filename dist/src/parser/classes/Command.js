import { YTNode } from '../helpers.js';
import NavigationEndpoint from './NavigationEndpoint.js';
class Command extends YTNode {
    constructor(data) {
        super();
        this.endpoint = new NavigationEndpoint(data);
    }
}
Command.type = 'Command';
export default Command;
//# sourceMappingURL=Command.js.map