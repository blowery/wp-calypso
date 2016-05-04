/**
 * Internal dependencies
 */
import {
	EDITOR_MEDIA_EDIT_ITEM_SET,
	IMAGE_EDITOR_STATE_CHANGE,
	IMAGE_EDITOR_STATE_RESET
} from 'state/action-types';

export function setEditorMediaEditItem( item ) {
	return {
		type: EDITOR_MEDIA_EDIT_ITEM_SET,
		item
	};
}

export function setImageEditorState( newState ) {
	return {
		type: IMAGE_EDITOR_STATE_CHANGE,
		state: newState
	}
}

export function resetImageEditorState() {
	return {
		type: IMAGE_EDITOR_STATE_RESET
	}
}
