<?php
### Remove emoji ... @#$#@$@
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');

# Thmbnails
add_theme_support('post-thumbnails');
add_image_size('wide', 720, 405, true);
add_image_size('square', 500, 500, true);

# Register menu
function vs_theme_menu_register() {
    register_nav_menu('main', __('Основно меню'));
}
add_action('init', 'vs_theme_menu_register');

# Enqueue scripts and styles
function vs_theme_load_scripts() {
    wp_enqueue_style('animate-css', get_template_directory_uri() . '/css/animate.min.css' );
    wp_enqueue_style('vs-nav-css', get_template_directory_uri() . '/css/vs.nav.css' );
    wp_enqueue_style('vs-theme-css', get_template_directory_uri() . '/css/vs.theme.css' );
    # wp_enqueue_style( 'dashicons' );
    wp_enqueue_script( 'vs-nav-js', get_template_directory_uri() . '/js/vs.nav.js', null, null, true );
    wp_enqueue_script( 'vs-theme-js', get_template_directory_uri() . '/js/vs.theme.js', null, null, true );
}

add_action('wp_enqueue_scripts', 'vs_theme_load_scripts');

# Require external ...
# require_once('inc/.....php');
