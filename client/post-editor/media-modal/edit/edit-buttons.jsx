/**
 * External dependencies
 */
var React = require( 'react' ),
	noop = require( 'lodash/noop' );

/**
 * Internal dependencies
 */

module.exports = React.createClass( {
	displayName: 'MediaModalDetailEditButtons',

	propTypes: {
		resetEditorState: React.PropTypes.func,
		onDone: React.PropTypes.func,
		onCancel: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			resetEditorState: noop,
			onDone: noop,
			onCancel: noop
		};
	},

	render: function() {
		return (
			<div className="editor-media-modal-edit__buttons">
				<button
					className="button cancel"
					onClick={ this.props.onCancel }>
					{ this.translate( 'Cancel' ) }
				</button>
				<button
					className="button"
					onClick={ this.props.resetEditorState } >
					{ this.translate( 'Reset' ) }
				</button>
				<button
					className="button is-primary"
					onClick={ this.props.onDone } >
					{ this.translate(' Done ') }
				</button>
			</div>
		);
	}
} );
