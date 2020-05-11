<template>
    <div id="app">
        JEON!!!
        <button @click="scroll">mixin</button>
        <div>
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
        };
    },
    beforeCreate: function() {
        console.log("beforeCreate");
    },
    created: function() {
        //this.axiosFn();
        this.storeFn();

        EventBus.$on("bus Test", clickedCount => {
            console.log(clickedCount + "eventBus");
        })
    },
    mounted: function() {
        console.log("mounted");
    },
    methods: {
        parents(data) {
            console.log(data + "parents");
            this.count = data;
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
}
</style>
