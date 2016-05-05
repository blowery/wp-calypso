/**
 * External dependencies
 */
import React from 'react';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
import Gridicon from 'components/gridicon';

export default React.createClass( {
	displayName: 'MediaModalDetailEditToolbar',

	propTypes: {
		rotate: React.PropTypes.number,
		scaleX: React.PropTypes.number,
		scaleY: React.PropTypes.number,
		setImageEditorState: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			setImageEditorState: noop
		};
	},

	rotate() {
		const rotate = ( this.props.rotate - 90 ) % 360;
		this.props.setImageEditorState( { rotate } );
	},

	flip() {
		const scaleX = -this.props.scaleX;
		this.props.setImageEditorState( { scaleX } );
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
					className={ 'editor-media-modal-edit__toolbar-button' }
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
			<div className="editor-media-modal-edit__toolbar">
				{ this.renderButtons() }
			</div>
		);
	}
} );
