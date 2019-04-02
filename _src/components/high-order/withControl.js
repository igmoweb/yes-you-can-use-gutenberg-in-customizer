import { Component } from '@wordpress/element';
import { noop } from '../../utils';

import { createHigherOrderComponent } from '@wordpress/compose';

const withControl = ( { setting = '' } ) => {

	const control = wp.customize.control( setting );
	if ( ! control ) {
		console.error( `The setting ${ setting } hasn't been registered.`) ;
		return noop;
	}

	return createHigherOrderComponent( ( OriginalComponent ) => {
		return class extends Component {
			state = {
				value: control.setting.get(),
			};

			constructor( props ) {
				super( props );
				this.control = control;
			}

			onChange = ( newValue ) => {
				this.control.setting.set( newValue );
				this.setState( { value: newValue } );
			}

			render() {
				const additionalProps = {
					onChange: this.onChange,
					value: this.state.value,
					control,
					params: control.params,
				};

				return (
					<OriginalComponent
						{ ...this.props }
						{ ...additionalProps }
					/>
				);
			}
		};
	}, 'withControl' );
}

export default withControl;
