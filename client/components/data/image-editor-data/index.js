/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';

/**
 * Internal dependencies
 */
import { setEditorState, resetEditorState } from 'state/media/actions';
import { getEditorState } from 'state/media/selectors';

/**
 * Fetches the currently active theme of the supplied site
 * and passes it to the supplied child component.
 */
const ImageEditorData = React.createClass( {

	propTypes: {
		rotate: React.PropTypes.number,
		scaleX: React.PropTypes.number,
		scaleY: React.PropTypes.number,
		setEditorState: React.PropTypes.func.isRequired,
		resetEditorState: React.PropTypes.func.isRequired
	},

	componentDidMount() {
		this.props.resetEditorState();
	},

	componentWillReceiveProps( nextProps ) {
		if ( ! nextProps.src || nextProps.src != this.props.src ) {
			this.props.resetEditorState();
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
	( state, props ) => ( getEditorState( state ) ),
	{ setEditorState, resetEditorState }
)( ImageEditorData );
