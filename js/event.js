void (function( w, d) {
    w.Observer.domReady(function(){
        var btn = d.getElementById("testButton");

        w.Observer.add(btn, "click", function(){
            console.log("clicked");
        });
    });

    w.Observer.domReady(function(){
        var btn = d.getElementById("testButton2");

        w.Observer.add(btn, "click", function(){
            console.log("clicked");
        });
    });

})( window, document );
