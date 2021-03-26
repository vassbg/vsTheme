<?php 
/**
 *  Template Name: Full width without title 
 **/ 

get_header();

if ( have_posts() ) 
    : while ( have_posts() ) 
        : the_post(); 
?>

    <div id="content-full">
        <?= get_the_content(); ?>
    </div>
     
<?php
    endwhile;
endif;
get_footer();