<template>
    <div id="app">
        JEON!!!
        <div ref="refSwiper"></div>
        <button type="button" @click="pushdom" 
            :style="true ? 'width:100px' : 'width: 200px;'"
        >pushdom</button>
        <button type="button" @click="scroll">mixin</button>
        <div >
            <input type="number" v-model.number="count" />
        </div>
        <common-btn :count="count" @child="parents">
            <div>
                slot
            </div>
        </common-btn>
        <button type="button" @click="axiosFn">axios</button>
        <div>
            <ul>
                <template v-for="(list, index) in list">
                    <li :key="index + list.node_id">
                        {{list.login}}
                    </li>
                </template>
            </ul>
        </div>
        <div>
             {{ $store.state.counter }}
        </div>
        <!-- <router-link to="/">main</router-link> |
        <router-link to="/sub">sub</router-link> | -->
        <a href="/"  @click.prevent="history($data, $event)" >main</a> |
        <a href="/sub"  @click.prevent="history($data, $event)" >sub</a> |
        <a href="/detail"  @click.prevent="history($data, $event)" >detail</a>
        <router-view></router-view>
        <a href="#" @click.prevent="history($data, $event)" >history</a>
    </div>
</template>

<script>
import commonMixin from "./mixin/commonMinin.js";
import commonBtn from "./components/commonBtn.vue";

import {EventBus} from "./bus/event-bus"

export default {
    name: "App",
    mixins: [commonMixin],
    components: {
        "common-btn": commonBtn,
    },
    data: function() {
        return {
            count: 1,
            list: null,
            random: null,
            ov: [],
            ovString: ["A", "B", {}],
            ovNode: document.createElement("div"),
        };
    },
    beforeCreate: function() {
        // window.onpopstate = function(event) { 
        //     console.log(JSON.stringify(event.state))
        //     console.log(this);
        // };
        
        // EventBus.$on("historyTest", clickedCount => {
        //     if(!clickedCount) {
        //         this.randomFn();
        //     } else {
        //         console.log(history.state);
        //     }
        // });

        //, [[], [document.createElement("div")]]
    },
    created: function() {
        this.storeFn();
        EventBus.$on("busTest", clickedCount => {
            console.log(clickedCount + "eventBus");
        });

        if(!this.getHistory) {
            this.randomFn();
        } else {
            console.log(history.state);
        }
        
        
        // this.$readyHistory(() => {
        //     if(!history.state || performance.navigation.type == 1) {
        //         this.randomFn();
        //     } else {
        //         console.log(history.state);
        //     }
        // })
    },
    mounted: function() {
        this.pushdom();
        //console.log("mounted");
    },
    methods: {
        parents(data) {
            console.log(data + "parents");
            this.count = data;
        },

        pushdom() {
            this.ov.push(this.$refs["refSwiper"]);
            this.ovNode = this.$refs["refSwiper"];
        },

        axiosFn() {
            const _this = this;
            this.$axios.get('https://api.github.com/users')
            .then(function (response) {
               _this.list = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        randomFn() {
            this.random = Math.floor(Math.random() * 10) + 1;
            console.log(this.random)
        },

        storeFn() {
            //console.log(this.$store.dispatch('addCounter'))
        }
    },
};
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    li {
        text-align: left;
    }
}
</style>
