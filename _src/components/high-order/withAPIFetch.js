import { createHigherOrderComponent } from '@wordpress/compose';

const { apiFetch } = wp;

/**
 * Adds the APIFetch object to fetch against the REST API to any component
 * @return {*}
 */
const withAPIFetch = () => {
	return createHigherOrderComponent( ( OriginalComponent ) => {
		return ( props ) => {
			const additionalProps = {
				apiFetch
			};

			return (
				<OriginalComponent
					{ ...props }
					{ ...additionalProps }
				/>
			);
		};
	}, 'withAPIFetch' );
}

export default withAPIFetch;
