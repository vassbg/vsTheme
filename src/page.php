<?php 

get_header();

if ( have_posts() ) 
    : while ( have_posts() ) 
        : the_post(); 
?>

    <div id="content">
        <h1><?= get_the_title(); ?></h1>
        <?= get_the_content(); ?>
    </div>
     
<?php
    endwhile;
endif;
get_footer();