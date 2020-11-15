const but = document.querySelector('.butts'),
      but2 = document.querySelector( '.hooray' ),
      hooray = () => console.log('YIHAAAA');

function clickMe(){
    console.log('I GOT CLICKED!!');
}
but.addEventListener( 'click', clickMe );
but2.addEventListener( 'click', hooray );

/**
 * REMOVING EVENT LISTENERS
 * An important NOTE = I must pass the reference of the function
 */

 but.removeEventListener( 'click', clickMe );
