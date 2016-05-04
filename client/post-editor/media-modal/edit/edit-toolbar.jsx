/**
 * External dependencies
 */
var React = require( 'react' ),
	noop = require( 'lodash/noop' );

/**
 * Internal dependencies
 */
var Gridicon = require( 'components/gridicon' );

module.exports = React.createClass( {
	displayName: 'MediaModalDetailEditToolbar',

	propTypes: {
		rotate: React.PropTypes.number,
		scaleX: React.PropTypes.number,
		scaleY: React.PropTypes.number,
		setImageEditorState: React.PropTypes.func
	},

	getDefaultProps: function () {
		return {
			setImageEditorState: noop
		};
	},

	rotate: function () {
		var rotate = ( this.props.rotate - 90 ) % 360;
		this.props.setImageEditorState( { rotate } );
	},

	flip: function () {
		var scaleX = -this.props.scaleX;
		this.props.setImageEditorState( { scaleX } );
	},

	renderButtons: function () {
		const buttons = [ {
			tool: 'rotate',
			icon: 'rotate',
			text: this.translate( 'Rotate' ),
			onClick: this.rotate
		},/* {
			tool: 'layout',
			icon: 'layout',
			text: this.translate( 'Aspect' ),
			onClick: noop
		}, */{
			tool: 'flip-vertical',
			icon: 'flip-vertical',
			text: this.translate( 'Flip' ),
			onClick: this.flip
		} ];

		return buttons.map( function ( button ) {
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
		}, this )
	},

	render: function() {
		return (
			<div className="editor-media-modal-edit__toolbar">
				{ this.renderButtons() }
			</div>
		);
	}
} );
