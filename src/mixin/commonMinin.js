const commonMixin = {
    created: function() {
        console.log("Mixin created");
    },

    methods: {
        scroll: function() {
            console.log("scroll");
        },
    }
};

export default commonMixin;