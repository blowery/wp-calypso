/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	EDITOR_MEDIA_EDIT_ITEM_SET,
	IMAGE_EDITOR_STATE_CHANGE,
	IMAGE_EDITOR_STATE_RESET
} from 'state/action-types';

export const defaultImageEditorState = {
	rotate: 0,
	scaleX: 1,
	scaleY: 1
};

export function editItem( state = null, action ) {
	switch ( action.type ) {
		case EDITOR_MEDIA_EDIT_ITEM_SET:
			return action.item || null;
	}

	return state;
}

export function imageEditor( state = defaultImageEditorState, action ) {
	switch ( action.type ) {
		case IMAGE_EDITOR_STATE_CHANGE:
			return Object.assign( {}, state, action.state );
		case IMAGE_EDITOR_STATE_RESET:
			return Object.assign( {}, defaultImageEditorState );
	}

	return state;
}

export default combineReducers( {
	editItem,
	imageEditor
} );
