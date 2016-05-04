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
		src: React.PropTypes.string,
		resetImageEditorState: React.PropTypes.func,
		onDone: React.PropTypes.func,
		onCancel: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			resetImageEditorState: noop,
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
					onClick={ this.props.resetImageEditorState } >
					{ this.translate( 'Reset' ) }
				</button>
				<button
					disabled={ this.props.src ? false : true }
					className="button is-primary"
					onClick={ this.props.onDone } >
					{ this.translate(' Done ') }
				</button>
			</div>
		);
	}
} );
