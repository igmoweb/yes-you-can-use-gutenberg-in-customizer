import { TextControl } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

/**
 * Returns a text setting field
 * Component documentation: https://wordpress.org/gutenberg/handbook/designers-developers/developers/components/text-control/
 */
export default class TextSetting extends Component {
	render() {
		const { params, value } = this.props;
		return <Fragment>
			<TextControl
				label={ params.label }
				value={ value }
				onChange={ this.props.onChange }
			/>
		</Fragment>
	}
}
