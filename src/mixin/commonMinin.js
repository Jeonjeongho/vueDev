import {EventBus} from "../bus/event-bus";
import * as _ from "lodash";

const commonMixin = {
    data : function() {
        return {
            _history: null,
            getHistory: null,
            historyIgnore: ["Swiper"],
        }
    },

    beforeCreate() {

    },

    created: function() {
        this.$beforeHistory();
        EventBus.$emit("historyTest", this.getHistory);
    },

    mounted: function() {
        this.$nextTick(function() {
            this.getHistory = false;
        });
    },

    methods: {
        scroll: function() {
            console.log("scroll");
        },

        

        history(data, e) {
            //isArray
            const _data = data;

            const arrayFn = (arrLength, _value, _key) => {
                if(arrLength == 0) return;
                const _indexCk= arrLength - 1;
                const _index= _value.length - arrLength;

                if(Array.isArray(_value[_index])) {
                    return arrayFn(_value[_index].length, _value[_index], _key);
                } else {
                    if(_value[_value.length - arrLength].nodeType == 1 || this.historyIgnore.indexOf(_value[_value.length - arrLength].constructor.name) >= 0) {
                        delete _data[_key];
                    } else {
                        //console.log(_value[_index]);
                        return arrayFn(_indexCk, _value, _key);
                    };
                }
            };

            _.forEach(_data, (value, key) => {
                if( typeof value == "object"  && value != null ) {
                    if(value.nodeType) {
                        delete _data[key];
                    } else if(Array.isArray(value) && value.length) {
                        //console.log(value)
                        arrayFn(value.length, value, key);
                    } else if (this.historyIgnore.indexOf(value.constructor.name) >= 0) {
                        delete _data[key];
                    } else {
                        console.log(value);
                        console.log(key);
                    }
                };
            });

            console.log(_data)



            if(!history.state) {
                history.replaceState(_data, null, window.location.href)
            } else {
                history.pushState(_data, null, window.location.href);
            };

            if(e) window.location= e.target.getAttribute("href");
        },

        $beforeHistory(fn) {
            this._history = history.state;
            if(!history.state || performance.navigation.type == 1) {
                this.getHistory =  false; //console.log("nohistory");
            } else {
                Object.assign(this.$data, this._history);
                this.getHistory =  true; // history 
                
            }
        },

        $readyHistory(fn) {
            this.$nextTick(fn);
        },
    }
};

export default commonMixin;