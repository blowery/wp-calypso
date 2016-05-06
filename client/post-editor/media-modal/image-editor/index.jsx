/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import noop from 'lodash/noop';
import path from 'path';

/**
 * Internal dependencies
 */
import EditCanvas from './image-editor-canvas';
import EditToolbar from './image-editor-toolbar';
import EditButtons from './image-editor-buttons';
import DropZone from 'components/drop-zone';
import MediaActions from 'lib/media/actions';
import MediaUtils from 'lib/media/utils';
import { resetImageEditorState, setImageEditorFileInfo } from 'state/ui/editor/media/actions';
import { getImageEditorState } from 'state/ui/editor/selectors';

const MediaModalImageEditor = React.createClass( {
	displayName: 'MediaModalImageEditor',

	propTypes: {
		site: React.PropTypes.object,
		items: React.PropTypes.array,
		selectedIndex: React.PropTypes.number,
		fileName: React.PropTypes.string,
		setImageEditorFileInfo: React.PropTypes.func,
		onImageEditorClose: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onImageEditorClose: noop
		};
	},

	componentDidMount() {
		let src,
			fileName = 'default';

		if ( this.props.items && this.props.items[ this.props.selectedIndex ] ) {
			src = MediaUtils.url( this.props.items[ this.props.selectedIndex ], {
				photon: this.props.site && ! this.props.site.is_private
			} );

			fileName = path.basename( src );
		}

		this.props.resetImageEditorState();
		this.props.setImageEditorFileInfo( src, fileName );
	},

	onDone() {
		//TODO: this exists to handle cross-origin error - at the moment
		//the error prevents editing of the images that have been already
		//uploaded. Consider removing this once the cors headers are added to
		//the image responses
		try {
			const canvasComponent = this.refs.editCanvas.getWrappedInstance();
			canvasComponent.toBlob( this.onImageExtracted );
		} finally {
			this.props.onImageEditorClose();
		}
	},

	onImageExtracted( blob ) {
		let file, fileName = this.props.fileName;

		fileName = fileName.replace( /\.[^.]+$/, '' ) + '.jpg';
		file = new File( [ blob ], fileName );

		MediaActions.add( this.props.site.ID, file );
	},

	//TODO: the drop zone currently exists for presentation purposes,
	//consider implementing the image open functionality fully or removing it
	onFilesDrop: function( files ) {
		const file = files[0];

		this.props.setImageEditorFileInfo( URL.createObjectURL( file ), file.name );
	},

	isValidTransfer: function( transfer ) {
		if ( ! transfer ) {
			return false;
		}

		// Firefox will claim that images dragged from within the same page are
		// files, but will also identify them with a `mozSourceNode` attribute.
		// This value will be `null` for files dragged from outside the page.
		//
		// See: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/mozSourceNode
		if ( transfer.mozSourceNode ) {
			return false;
		}

		// `types` is a DOMStringList, which is treated as an array in Chrome,
		// but as an array-like object in Firefox. Therefore, we call `indexOf`
		// using the Array prototype. Safari may pass types as `null` which
		// makes detection impossible, so we err on allowing the transfer.
		//
		// See: http://www.w3.org/html/wg/drafts/html/master/editing.html#the-datatransfer-interface
		return ! transfer.types || -1 !== Array.prototype.indexOf.call( transfer.types, 'Files' );
	},

	render() {
		return (
			<div className="editor-media-modal-image-editor">
				<figure>
					<div className="editor-media-modal-image-editor__content editor-media-modal__content" >
						<DropZone
							fullScreen={ true }
							onVerifyValidTransfer={ this.isValidTransfer }
							onFilesDrop={ this.onFilesDrop } />
						<EditCanvas ref="editCanvas" />
						<EditToolbar />
						<EditButtons
							onCancel={ this.props.onImageEditorClose }
							onDone={ this.onDone } />
					</div>
				</figure>
			</div>
		);
	}
} );

export default connect(
	( state ) => ( getImageEditorState( state ) ),
	{ resetImageEditorState, setImageEditorFileInfo }
)( MediaModalImageEditor );
