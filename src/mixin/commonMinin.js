import {EventBus} from "../bus/event-bus";
import * as _ from "lodash";

const commonMixin = {
    data : function() {
        return {
            getHistory: null,
        }
    },

    beforeCreate() {

    },

    created: function() {
        this.$beforeHistory();
        EventBus.$emit("historyTest", this.getHistory);
    },

    methods: {
        scroll: function() {
            console.log("scroll");
        },

        

        history(data, e) {
            //isArray
            const _data = data;
            _.forEach(_data, (value, key) => {
                if( typeof value == "object"  && value != null ) {
                    if(value.nodeType) {
                        delete _data[key];
                    } else {
                        if(typeof value == "object" && value != null ) {    
                            _.find(value, function(ov) {
                                if(typeof ov == "object" && ov.nodeType == 1) {
                                    delete _data[key];
                                } 
                            });
                        };
                    }
                };
            });


            if(!history.state) {
                history.replaceState(_data, null, window.location.href)
            } else {
                history.pushState(_data, null, window.location.href);
            };

            if(e) window.location= e.target.getAttribute("href");
        },

        $beforeHistory(fn) {
            if(!history.state || performance.navigation.type == 1) {
                this.getHistory =  false;
            } else {
                this.getHistory =  true;
            }
        },

        $readyHistory(fn) {
            this.$nextTick(fn);
        },
    }
};

export default commonMixin;