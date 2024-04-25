export default {
    setCookie: function(name, value, daysToExpire) {
        var expires = "";
        
        if (daysToExpire) {
            var date = new Date();
            date.setTime(date.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    
    getCookie: function(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        
        for(var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) === 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        
        return null;
    },
    
    deleteCookie: function(name) {
        this.setCookie(name, "", -1);
    }
};
