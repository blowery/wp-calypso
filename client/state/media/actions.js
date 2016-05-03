/**
 * Internal dependencies
 */
import {
	IMAGE_EDITOR_STATE_CHANGE,
	IMAGE_EDITOR_STATE_RESET
} from '../action-types';

export function setEditorState( newState ) {
	return {
		type: IMAGE_EDITOR_STATE_CHANGE,
		state: newState
	}
}

export function resetEditorState() {
	return {
		type: IMAGE_EDITOR_STATE_RESET
	}
}
