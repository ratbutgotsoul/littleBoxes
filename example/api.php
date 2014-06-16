<?php

    if( !isset( $_REQUEST['search'] ) ) die( json_encode( array( 'status' => 'nok' ) ) );

    $id = ucwords( isset( $_REQUEST['id'] ) ? $_REQUEST[ 'id' ].' ' : '' );

    $search = strip_tags( $_REQUEST['search'] );
    
    for( $i=1; $i<6; $i++ )
    {
        $results[] = array( 'id' => "id-$i", 'suggestion' => $id."Suggestion $search $i" , 'box' => $id."Box $search $i" );
    }

    $json = array( 
        'status' => 'ok',
        'results' => $results,
        'search' => $search,
    );
    $json['count'] = count( $json['results'] );

    die( json_encode( $json ) );
?>
