/* eslint-disable wpcalypso/i18n-no-variables */
//disabled no variables rule error on canvas context translate() method

/**
 * External dependencies
 */
import React from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';

/**
 * Internal dependencies
 */
import { getImageEditorState } from 'state/ui/editor/selectors';

const MediaModalImageEditorCanvas = React.createClass( {
	displayName: 'MediaModalImageEditorCanvas',

	propTypes: {
		src: React.PropTypes.string,
		rotate: React.PropTypes.number,
		scaleX: React.PropTypes.number,
		scaleY: React.PropTypes.number
	},

	getDefaultProps() {
		return {
			rotate: 0,
			scaleX: 1,
			scaleY: 1
		};
	},

	getInitialState() {
		return {
			canvasWidth: this.props.item ? this.props.item.width : 0,
			canvasHeight: this.props.item ? this.props.item.height : 0
		};
	},

	componentWillReceiveProps( newProps ) {
		if ( this.props.src !== newProps.src ) {
			this.initImage( newProps.src );
		}
	},

	componentDidMount() {
		if ( ! this.props.src ) {
			return;
		}

		this.initImage( this.props.src );
	},

	initImage( src ) {
		this.image = new Image();
		this.image.src = src;
		this.image.onload = this.onLoadComplete;
		this.image.onerror = this.onLoadComplete;
	},

	onLoadComplete( event ) {
		if ( event.type !== 'load' ) {
			return;
		}

		this.drawImage();
	},

	componentDidUpdate() {
		this.drawImage();
	},

	toBlob( callback ) {
		var canvas = ReactDom.findDOMNode( this.refs.canvas );

		canvas.toBlob( callback, 'image/jpeg', 0.95 ); // JPEG at 95% quality
	},

	drawImage() {
		if ( ! this.image ) {
			return;
		}

		if ( this.state.canvasWidth !== this.image.width ||
			this.state.canvasHeight !== this.image.height ) {
			this.setState( {
				canvasWidth: this.image.width,
				canvasHeight: this.image.height
			} );
		}

		const canvas = ReactDom.findDOMNode( this.refs.canvas ),
			context = canvas.getContext( '2d' );

		context.clearRect( 0, 0, canvas.width, canvas.height );
		context.save();
		context.translate( canvas.width / 2, canvas.height / 2 );
		context.scale( this.props.scaleX, this.props.scaleY );
		context.rotate( this.props.rotate * Math.PI / 180 );
		context.drawImage( this.image, -this.image.width / 2, -this.image.height / 2 );
		context.restore();
	},

	render() {
		const rotatedMod = this.props.rotate % 180,
			width = rotatedMod === 0 ? this.state.canvasWidth : this.state.canvasHeight,
			height = rotatedMod === 0 ? this.state.canvasHeight : this.state.canvasWidth;

		return (
			<div className="editor-media-modal-image-editor__canvas-container">
				<canvas
					ref="canvas"
					className="editor-media-modal-image-editor__canvas"
					width={ width }
					height={ height } />
			</div>
		);
	}
} );

export default connect(
	( state ) => ( getImageEditorState( state ) ),
	null,
	null,
	{ withRef: true }
)( MediaModalImageEditorCanvas );
