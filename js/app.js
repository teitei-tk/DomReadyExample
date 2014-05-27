void (function( w, d ){
    w.Observer = (function(){
        var eventStack = [];
        
        var safeEventType = function( event ) {
            return event.indexOf('on') === 0 ? event.substr(2) : event;
        };

        var handler = function(){
            this.add = function( element, eventType, callback ) {
                var type = safeEventType( eventType );

                if ( element.addEventListener ) {
                    element.addEventListener( type, callback, false );
                } else if ( element.attachEvent ) {
                    element.attachEvent( 'on' + eventType, callback );
                }
                
                eventStack.push({
                    elem    :   element,
                    event   :   type,
                    func    :   callback
                });
            };
            
            this.remove = function( element, eventType ) {
                var remove = false;
                for ( var i in eventStack ) {
                    var stack = eventStack[i];
                    if ( stack["elem"] === element && stack["event"] === eventType ) {
                        remove = stack["func"];
                        break;
                    }
                }

                if ( ! remove ) {
                    throw new DOMException();
                }
                
                if ( element.removeEventListener ) {
                    element.removeEventListener( eventType, remove, false );
                } else {
                    element.detachEvent( eventType, remove );
                }
            };

            this.domReady = function( handler ){
                var called = false;
                this.add( d, "DOMContentLoaded", function() {
                    if ( called ) {
                        return;
                    }

                    called = true;
                    handler();
                });
            };
            
            return this;
        };

        return new handler();
    })();
})( window, document );
