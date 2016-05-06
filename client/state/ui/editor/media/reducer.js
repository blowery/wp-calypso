/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
import {
	EDITOR_MEDIA_EDIT_ITEM_SET,
	IMAGE_EDITOR_ROTATE,
	IMAGE_EDITOR_SCALE,
	IMAGE_EDITOR_SET_FILE_INFO,
	IMAGE_EDITOR_STATE_RESET
} from 'state/action-types';

export const defaultImageEditorState = {
	src: '',
	fileName: 'default',
	changed: false,
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
		case IMAGE_EDITOR_ROTATE:
			return Object.assign( {}, state, { changed: true, rotate: action.degrees } );
		case IMAGE_EDITOR_SCALE:
			return Object.assign( {}, state, { changed: true, scaleX: action.scaleX, scaleY: action.scaleY } );
		case IMAGE_EDITOR_SET_FILE_INFO:
			return Object.assign( {}, state, { src: action.src, fileName: action.fileName } );
		case IMAGE_EDITOR_STATE_RESET:
			return Object.assign( {}, state, { changed: false, rotate: 0, scaleX: 1, scaleY: 1 } );
	}

	return state;
}

export default combineReducers( {
	editItem,
	imageEditor
} );
