/**
 * External dependencies
 */
import { combineReducers } from 'redux';

/**
 * Internal dependencies
 */
 import {
 	IMAGE_EDITOR_STATE_CHANGE,
 	IMAGE_EDITOR_STATE_RESET
 } from '../action-types';

export const defaultImageEditorState = {
	rotate: 0,
	scaleX: 1,
	scaleY: 1
};

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
	imageEditor
} );
