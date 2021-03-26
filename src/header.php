<?php
### MAIN HEADER ###

### Current language
# if polylang is installed - get current, elsr set to BG
$lang = function_exists("pll_current_language") ? pll_current_language() : 'bg';

### Get $post for meta content
global $post;

?>
<!DOCTYPE html>
<html lang="<?= $lang ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="<?= is_front_page() ? get_bloginfo('description') : wp_trim_words( $post->post_content, 40 ) ?>" />

    <meta property="og:url" content="<?= is_front_page() ? get_bloginfo('url') : get_permalink($post) ?>" />
    <meta property="og:title" content="<?= is_front_page() ? get_bloginfo('name') : get_the_title() ?>" />
    <meta property="og:description" content="<?= is_front_page() ? get_bloginfo('description') : wp_trim_words( $post->post_content, 40 ) ?>" />
    <meta property="og:image" content="<?= is_front_page() ? get_template_directory_uri()."/img/header.jpg" : get_the_post_thumbnail_url($post, 'full') ?>" />

    <title><?= is_front_page() ? get_bloginfo('name') : get_bloginfo('name') . " | " . get_the_title() ?></title>
    <?php wp_head() ?>
</head>
<body>
<div id="top">

    <div id="logo">
        <a href="<?=get_bloginfo('url')?>">
            <img src="<?= get_template_directory_uri()."/img/logo2021.png" ?>" alt="">
        </a>
    </div>

<?php
wp_nav_menu([
    'theme_location' => 'main',
    'container_id' => 'vs-nav-container',
    'menu_id' => 'vs-nav',
    'item_spacing' => 'discard'
]);
?>
</div>