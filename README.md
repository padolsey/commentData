commentData.js
===

commentData allows you to specify JSON metadata for your HTML elements. Data can be retrieved through the commentData function. Example usage:

    <div id="something">
        <!--{ someData: 123, other: 'foo' }-->
        <p>... Other content...</p>
    </div>
    
    var something = document.getElementById('something');
    var data = commentData( something ); // <= { someData: 123, other: 'foo' }
    data.someData; // <= 123