const commonMixin = {
    data : function() {
        return {
            
        }
    },

    beforeCreate() {

    },

    created: function() {
       //this.history();
    },

    methods: {
        scroll: function() {
            console.log("scroll");
        },

        history(target, e) {
            if(!history.state) {
                history.replaceState(target, null, window.location.href)
            } else {
                history.pushState(target, null, window.location.href);
            };
            if(e) window.location= e.target.getAttribute("href");
        }
    }
};

export default commonMixin;