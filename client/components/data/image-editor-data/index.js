/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import { setImageEditorState, resetImageEditorState } from 'state/ui/editor/media/actions';
import { getImageEditorState } from 'state/ui/editor/selectors';

/**
 * Fetches the currently active theme of the supplied site
 * and passes it to the supplied child component.
 */
const ImageEditorData = React.createClass( {

	propTypes: {
		src: React.PropTypes.string,
		rotate: React.PropTypes.number,
		scaleX: React.PropTypes.number,
		scaleY: React.PropTypes.number,
		setImageEditorState: React.PropTypes.func.isRequired,
		resetImageEditorState: React.PropTypes.func.isRequired
	},

	componentDidMount() {
		this.props.resetImageEditorState();
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! nextProps.src || nextProps.src !== this.props.src ) {
			this.props.resetImageEditorState();
		}
	},

	render() {
		const childProps = omit( this.props, 'children', 'className' );
		const childrenWithProps = React.Children.map(this.props.children,
			( child ) => React.cloneElement( child, childProps ) );

		return <div className={ this.props.className }>{ childrenWithProps }</div>
	}
} );

export default connect(
	( state, props ) => ( getImageEditorState( state ) ),
	{ setImageEditorState, resetImageEditorState }
)( ImageEditorData );
