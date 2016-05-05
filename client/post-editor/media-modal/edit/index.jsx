/**
 * External dependencies
 */
import React from 'react';
import noop from 'lodash/noop';
import path from 'path';

/**
 * Internal dependencies
 */
import ImageEditorData from 'components/data/image-editor-data';
import EditCanvas from './edit-canvas';
import EditToolbar from './edit-toolbar';
import EditButtons from './edit-buttons';
import DropZone from 'components/drop-zone';
import MediaActions from 'lib/media/actions';
import MediaUtils from 'lib/media/utils';

export default React.createClass( {
	displayName: 'MediaModalDetailEdit',

	propTypes: {
		site: React.PropTypes.object,
		items: React.PropTypes.array,
		selectedIndex: React.PropTypes.number,
		onImageEdited: React.PropTypes.func,
		onImageEditDone: React.PropTypes.func
	},

	getDefaultProps() {
		return {
			selectedIndex: 0,
			onImageEdited: noop,
			onImageEditDone: noop
		};
	},

	getInitialState() {
		let src,
			fileName = 'default';

		if ( this.props.items && this.props.items[ this.props.selectedIndex ] ) {
			src = MediaUtils.url( this.props.items[ this.props.selectedIndex ], {
				photon: this.props.site && ! this.props.site.is_private
			} );

			fileName = path.basename( src );
		}

		return {
			src,
			fileName
		};
	},

	onDone() {
		try {
			const canvasComponent = this.refs.editCanvas;
			canvasComponent.toBlob( this.onImageExtracted );
		} catch ( e ) {
			console.error( e );
		}

		this.props.onImageEditDone();
	},

	onImageExtracted( blob ) {
		let file, fileName = this.state.fileName;

		fileName = fileName.replace( /\.[^.]+$/, '' ) + '.jpg';
		file = new File( [ blob ], fileName );

		MediaActions.add( this.props.site.ID, file );
	},

	//TODO: the drop zone currently exists for presentation purposes,
	//consider implementing the image open functionality fully or removing it
	onFilesDrop: function( files ) {
		const file = files[0];

		this.setState( {
			fileName: file.name,
			src: URL.createObjectURL( file )
		} );
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
			<div className="editor-media-modal-edit">
				<figure>
					<ImageEditorData
						className="editor-media-modal-edit__content editor-media-modal__content"
						src={ this.state.src } >
						<DropZone
							fullScreen={ true }
							onVerifyValidTransfer={ this.isValidTransfer }
							onFilesDrop={ this.onFilesDrop } />
						<EditCanvas ref="editCanvas" />
						<EditToolbar />
						<EditButtons
							onCancel={ this.props.onImageEditDone }
							onDone={ this.onDone } />
					</ImageEditorData>
				</figure>
			</div>
		);
	}
} );
