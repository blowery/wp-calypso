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

export function setEditorMediaEditItem( item ) {
	return {
		type: EDITOR_MEDIA_EDIT_ITEM_SET,
		item
	};
}

export function resetImageEditorState() {
	return {
		type: IMAGE_EDITOR_STATE_RESET
	};
}

export function imageEditorRotate( degrees ) {
	return ( dispatch, getState ) => {
		const state = getState(),
			imageEditorState = state.ui.editor.media.imageEditor;

		dispatch( {
			type: IMAGE_EDITOR_ROTATE,
			degrees: ( imageEditorState.rotate + degrees ) % 360
		} );
	};
}

export function imageEditorFlip() {
	return ( dispatch, getState ) => {
		const state = getState(),
			imageEditorState = state.ui.editor.media.imageEditor;

		dispatch( {
			type: IMAGE_EDITOR_SCALE,
			scaleX: -imageEditorState.scaleX,
			scaleY: imageEditorState.scaleY
		} );
	};
}

export function setImageEditorFileInfo( src, fileName ) {
	return {
		type: IMAGE_EDITOR_SET_FILE_INFO,
		src,
		fileName
	};
}
