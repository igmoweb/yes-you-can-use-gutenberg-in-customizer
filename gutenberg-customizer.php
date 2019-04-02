<?php
/**
 * Plugin Name: Gutenberg Customizer
 */


add_action( 'customize_register', function ( $wp_customize ) {
	include __DIR__ . '/inc/class-text-control.php';
	include __DIR__ . '/inc/class-media-control.php';

	// Custom Control 1
	$wp_customize->add_section( 'custom_section', [
		'title'      => __( 'Custom Control' ),
		'priority'   => 160,
		'capability' => 'edit_theme_options',
	] );

	$wp_customize->add_setting( 'test_setting', [
		'type'    => 'theme_mod',
		'default' => '123123',
	] );

	$wp_customize->add_control(
		new My_Text_Control(
			$wp_customize,
			'test_setting',
			[
				'label'   => 'Custom Label',
				'section' => 'custom_section'
			]
		)
	);

	// Custom Control 2
	$wp_customize->add_setting( 'test_setting_2', [
		'type'    => 'theme_mod',
		'default' => 'AAAA',
	] );

	$wp_customize->add_control(
		new My_Text_Control(
			$wp_customize,
			'test_setting_2',
			[
				'label'   => 'Custom Label 2',
				'section' => 'custom_section'
			]
		)
	);

	// MEdia Control
	$wp_customize->add_setting( 'media_setting', [
		'type'    => 'theme_mod',
		'default' => '',
	] );

	$wp_customize->add_control(
		new My_Media_Control(
			$wp_customize,
			'media_setting',
			[
				'label'   => 'Custom Label 2',
				'section' => 'custom_section'
			]
		)
	);
} );

add_action( 'customize_controls_enqueue_scripts', function () {
	wp_enqueue_script( 'gut-customizer-scripts', plugin_dir_url( __FILE__ ) . '_build/js/customizer.js', [
		'wp-i18n',
		'wp-element',
		'wp-components'
	], '', true );
	wp_enqueue_style( 'gut-customizer-styles', plugin_dir_url( __FILE__ ) . '_build/css/style.css' );

	// TODO: I guess this should be handled from somewhere
	wp_localize_script( 'gut-customizer-scripts', 'globalRegisteredSettings',
		[
			[
				'setting'   => 'test_setting',
				'className' => 'my-text-control',
			],
			[
				'setting'   => 'test_setting_2',
				'className' => 'my-text-control',
			],
			[
				// This doesn't exist so you should see an error in the console
				'setting'   => 'test_setting_3',
				'className' => 'my-text-control',
			],
			[
				'setting'   => 'media_setting',
				'className' => 'my-media-control',
			],
		]
	);
}, 1000 );
