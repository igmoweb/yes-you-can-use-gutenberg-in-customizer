<?php

class My_Text_Control extends WP_Customize_Control {
	public $type = 'custom';
	public $className = 'my-text-control';
	public $component = 'TextSetting';

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
