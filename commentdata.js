var commentData = (function(){
    
    var getAllComments = function(context) {
        
            var ret = [],
                node = context.firstChild;
            
            if (!node) { return ret; }
            
            do {
                if (node.nodeType === 8) {
                    ret[ret.length] = node;
                }
                if (node.nodeType === 1) {
                    ret = ret.concat( getAllComments(node) );
                }
            } while( node = node.nextSibling );
            
            return ret;
            
        },
        cache = [0],
        expando = 'data' + +new Date(),
        data = function(node) {
            
            var cacheIndex = node[expando],
                nextCacheIndex = cache.length;
     
            if(!cacheIndex) {
                cacheIndex = node[expando] = nextCacheIndex;
                cache[cacheIndex] = {};
            }
     
            return cache[cacheIndex];
        
        };
    
    return function(context) {
        
        context = context || document.documentElement;
            
        if ( data(context) && data(context).commentJSON ) {
            return data(context).commentJSON;
        }
    
        var comments = getAllComments(context),
            len = comments.length,
            comment, cData;
            
        while (len--) {
            comment = comments[len];
            cData = comment.data.replace(/\n|\r\n/g, '');
            if ( /^\s*?\{.+\}\s*?$/.test(cData) ) {
                try {
                    data(comment.parentNode).commentJSON = (new Function('return ' + cData + ';'))();
                } catch(e) {}
            }
        }
        
        return data(context).commentJSON || true;
        
    };
    
})();