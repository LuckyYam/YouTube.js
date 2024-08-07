import { YTNode } from '../helpers.js';
import { Parser } from '../index.js';
import Button from './Button.js';
import Dropdown from './Dropdown.js';
import Text from './misc/Text.js';
class CreatePlaylistDialog extends YTNode {
    constructor(data) {
        super();
        this.title = new Text(data.dialogTitle).toString();
        this.title_placeholder = data.titlePlaceholder || '';
        this.privacy_option = Parser.parseItem(data.privacyOption, Dropdown);
        this.create_button = Parser.parseItem(data.cancelButton, Button);
        this.cancel_button = Parser.parseItem(data.cancelButton, Button);
    }
}
CreatePlaylistDialog.type = 'CreatePlaylistDialog';
export default CreatePlaylistDialog;
//# sourceMappingURL=CreatePlaylistDialog.js.map