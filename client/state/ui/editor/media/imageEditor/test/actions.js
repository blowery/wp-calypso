/**
 * External dependencies
 */
import { expect } from 'chai';

/**
 * Internal dependencies
 */
import {
	IMAGE_EDITOR_ROTATE_COUNTERCLOCKWISE,
	IMAGE_EDITOR_FLIP,
	IMAGE_EDITOR_SET_FILE_INFO,
	IMAGE_EDITOR_STATE_RESET
} from 'state/action-types';

import {
	resetImageEditorState,
	imageEditorRotate,
	imageEditorFlip,
	setImageEditorFileInfo
} from '../actions';

describe( 'actions', () => {
	describe( '#resetImageEditorState()', () => {
		it( 'should return an action object', () => {
			const action = resetImageEditorState();

			expect( action ).to.eql( {
				type: IMAGE_EDITOR_STATE_RESET
			} );
		} );
	} );

	describe( '#imageEditorRotate()', () => {
		it( 'should return an action object', () => {
			const action = imageEditorRotate();

			expect( action ).to.eql( {
				type: IMAGE_EDITOR_ROTATE_COUNTERCLOCKWISE
			} );
		} );
	} );

	describe( '#imageEditorFlip()', () => {
		it( 'should return an action object', () => {
			const action = imageEditorFlip();

			expect( action ).to.eql( {
				type: IMAGE_EDITOR_FLIP
			} );
		} );
	} );

	describe( '#setImageEditorFileInfo()', () => {
		it( 'should return an action object', () => {
			const action = setImageEditorFileInfo( 'testSrc', 'testFileName' );

			expect( action ).to.eql( {
				type: IMAGE_EDITOR_SET_FILE_INFO,
				src: 'testSrc',
				fileName: 'testFileName'
			} );
		} );
	} );
} );
