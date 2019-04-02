import { Button } from '@wordpress/components';
import MediaUpload from '@wordpress/edit-post/src/hooks/components/media-upload';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { pickRelevantMediaFiles } from '../../utils';

/**
 * Returns a media setting field
 *
 * This is a bit wrong. MediaUpload is not a component itself but a hook
 * because Gutenberg uses an empty MediaUpload unless the user has capabilities to upload files
 * So it would be needed to check capabilities and so like Gutenberg does. References:
 *
 * This is the Media Placeholder component that Gutenberg uses: https://github.com/WordPress/gutenberg/tree/fe51bd08684462690988de7ec61a3cdda083710a/packages/editor/src/components/media-placeholder
 * It includes also a DropZone and an UploadCheck that checks capabilities.
 * At some point, Gutenberg uses
 * addFilter(
 *  'editor.MediaUpload',
 *  'core/edit-post/components/media-upload/replace-media-upload',
 *  replaceMediaUpload
 * );
 *
 * To replace that empty MediaUpload for a proper one but it's only available in @wordpress/edit-post/src/hooks/components/
 * which is the one I'm using here
 */
export default class MediaSetting extends Component {
	state = {
		url: null,
		isFetching: false,
	};

	onSelect = ( media ) => {
		// Just pick the fields that we need
		const image = pickRelevantMediaFiles( media );
		this.setState( { url: image.url } );
		this.props.onChange( image.id );
	}

	onRemoveImage = () => {
		this.setState( { url: null } );
		this.props.onChange( 0 );
	}

	componentWillMount() {
		const attachmentID = Number( this.props.value );
		if ( attachmentID ) {
			// There's already an attachment ID saved in Customizer options, let's fetch the object
			this.setState( { isFetching: true } );
			this.props.apiFetch({
				path: `wp/v2/media/${ this.props.value }`,
			})
				.then( ( response ) => {
					const image = pickRelevantMediaFiles( response );
					this.setState( { url: image.url, isFetching: false } );
				});
		}
	}

	render() {
		const { params, value } = this.props;
		return <Fragment>
			{ this.state.isFetching && <div>Loading image...</div>  }
			{ ! this.state.isFetching && this.state.url &&
				<Fragment>
					<img src={ this.state.url } alt="" />
					<Button
						isLarge
						isLink
						isDestructive
						onClick={ this.onRemoveImage }
					>
						{ __( 'Remove image' ) }
					</Button>
				</Fragment>
			}
			<MediaUpload
				gallery={ false }
				multiple={ false }
				onSelect={ this.onSelect }
				allowedTypes={ [ 'image' ] }
				value={ value }
				render={ ( { open } ) => (
					<Button
						isLarge
						className="editor-media-placeholder__button"
						onClick={ open }
					>
						{ __( 'Media Library' ) }
					</Button>
				) }
			/>

		</Fragment>
	}
}
