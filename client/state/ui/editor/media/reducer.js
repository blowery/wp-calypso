/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	EDITOR_MEDIA_EDIT_ITEM_SET,
	IMAGE_EDITOR_ROTATE_COUNTERCLOCKWISE,
	IMAGE_EDITOR_FLIP,
	IMAGE_EDITOR_SET_FILE_INFO,
	IMAGE_EDITOR_STATE_RESET
} from 'state/action-types';

export const defaultImageEditorState = {
	src: '',
	fileName: 'default',
	hasChanges: false,
	degrees: 0,
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
		case IMAGE_EDITOR_ROTATE_COUNTERCLOCKWISE:
			return Object.assign( {}, state, { hasChanges: true, degrees: ( state.degrees - 90 ) % 360 } );
		case IMAGE_EDITOR_FLIP:
			return Object.assign( {}, state, { hasChanges: true, scaleX: -state.scaleX } );
		case IMAGE_EDITOR_SET_FILE_INFO:
			return Object.assign( {}, state, { src: action.src, fileName: action.fileName } );
		case IMAGE_EDITOR_STATE_RESET:
			return Object.assign( {}, state, { hasChanges: false, degrees: 0, scaleX: 1, scaleY: 1 } );
	}

	return state;
}

export default combineReducers( {
	editItem,
	imageEditor
} );
