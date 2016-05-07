/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';
import {
	imageEditorRotate,
	imageEditorFlip
} from 'state/ui/editor/media/imageEditor/actions';

const MediaModalImageEditorToolbar = React.createClass( {
	displayName: 'MediaModalImageEditorToolbar',

	propTypes: {
		imageEditorRotate: React.PropTypes.func,
		setImageEditorScale: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			imageEditorRotate: noop,
			setImageEditorScale: noop
		};
	},

	rotate() {
		this.props.imageEditorRotate( -90 );
	},

	flip() {
		this.props.imageEditorFlip();
	},

	renderButtons() {
		const buttons = [
			{
				tool: 'rotate',
				icon: 'rotate',
				text: this.translate( 'Rotate' ),
				onClick: this.rotate
			},
			{
				tool: 'flip-vertical',
				icon: 'flip-vertical',
				text: this.translate( 'Flip' ),
				onClick: this.flip
			}
		];

		return buttons.map( function( button ) {
			return (
				<button
					key={ 'edit-toolbar-' + button.tool }
					className={ 'editor-media-modal-image-editor__toolbar-button' }
					onClick={ button.onClick } >
					<Gridicon icon={ button.icon } size={ 36 } />
					<br />
					<span>{ button.text }</span>
				</button>
			);
		}, this );
	},

	render() {
		return (
			<div className="editor-media-modal-image-editor__toolbar">
				{ this.renderButtons() }
			</div>
		);
	}
} );

export default connect(
	null,
	{ imageEditorRotate, imageEditorFlip }
)( MediaModalImageEditorToolbar );
