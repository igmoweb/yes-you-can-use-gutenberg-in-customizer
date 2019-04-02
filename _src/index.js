import './style.scss';

import _get from 'lodash/get';

// High Order Component that adds the control object among a state and
// some other things to the child component
import withControl from './components/high-order/withControl';
import withAPIFetch from './components/high-order/withAPIFetch';

// List of all React Settings Components
import settingsComponents from './components/settings';

// Helps to compose different High Order Components
import { compose } from '@wordpress/compose';

// Renders a React component
import { render } from '@wordpress/element';

// Import registered settings from a global variable
import registeredSettings from './config/registeredSettings';

wp.customize.bind('ready', () => {
	// Customizer is ready
	// Loop over every registered setting and try to render them with React
	registeredSettings.forEach( ( registeredSetting ) => {
		// First find the element in the DOM
		const element = document.querySelector( `.${registeredSetting.className}[data-id="${ registeredSetting.setting }"]` );
		if ( ! element ) {
			console.error( `The setting with ID ${registeredSetting.setting} hasn't been found in the DOM.` );
			return;
		}

		// Now check if the setting has a linked component
		const CustomizerComponentString = _get( element, 'dataset.component', false );
		const CustomizerComponent = _get( settingsComponents, CustomizerComponentString, false );
		if ( ! CustomizerComponent ) {
			console.error( `The component ${registeredSetting.component} linked to setting ${registeredSetting.setting} does not exist.` );
			return;
		}

		// Generate the component.
		// withControl is mandatory but this could be done in another way by using something like compose.apply( null, [ HO-components list ]] )
		const WrappedCustomizerComponent = compose(
			withControl( { setting: registeredSetting.setting } ),
			withAPIFetch()
		)( CustomizerComponent );

		render(
			<WrappedCustomizerComponent />,
			element
		);
	});
});
