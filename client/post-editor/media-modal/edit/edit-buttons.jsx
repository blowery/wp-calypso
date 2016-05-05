/**
 * External dependencies
 */
import React from 'react';
import noop from 'lodash/noop';

/**
 * Internal dependencies
 */
 import Button from 'components/button';

export default React.createClass( {
	displayName: 'MediaModalDetailEditButtons',

	propTypes: {
		src: React.PropTypes.string,
		resetImageEditorState: React.PropTypes.func,
		onDone: React.PropTypes.func,
		onCancel: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			resetImageEditorState: noop,
			onDone: noop,
			onCancel: noop
		};
	},

	render() {
		return (
			<div className="editor-media-modal-edit__buttons">
				<Button
					className="editor-media-modal-edit__buttons-cancel"
					onClick={ this.props.onCancel }>
					{ this.translate( 'Cancel' ) }
				</Button>
				<Button
					onClick={ this.props.resetImageEditorState } >
					{ this.translate( 'Reset' ) }
				</Button>
				<Button
					disabled={ ! this.props.src }
					primary
					onClick={ this.props.onDone } >
					{ this.translate( ' Done ' ) }
				</Button>
			</div>
		);
	}
} );
