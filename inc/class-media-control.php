<?php

class My_Media_Control extends WP_Customize_Control {
	public $type = 'custom';
	public $className = 'my-media-control';
	public $component = 'MediaSetting';

	/**
	 * Render the control's content.
	 */
	public function render_content() {
		?>
		<div
			class="<?php echo esc_attr( $this->className ); ?>"
			data-id="<?php echo esc_attr( $this->id ); ?>"
			data-component="<?php echo esc_attr( $this->component ); ?>"
		>
		</div>
		<?php
	}
}
