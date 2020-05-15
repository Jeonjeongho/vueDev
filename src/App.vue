<template>
    <div id="app">
        JEON!!!
        <div ref="refSwiper"></div>
        <button type="button" @click="pushdom" 
            :style="true ? 'width:100px' : 'width: 200px;'"
        >pushdom</button>
        <button type="button" @click="scroll">mixin</button>
        <input type="radio" value="A" v-model="random" >
        <input type="radio" value="B" v-model="random">
        <input type="radio" value="C" v-model="random">
        <input type="radio" value="D" v-model="random">
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
        <div>
            <strong>{{random}}</strong>random
        </div>
        <a href="#" @click.prevent="history($data, $event)" >history</a>

         <div class="infiniti">
            <div v-for="(item, $index) in listInfiniti" :key="$index">
                {{item.author}}
            </div>
            <infinite-loading @infinite="infiniteHandler"></infinite-loading>
        </div>

        <div class="swiper-container">
            <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
            <div class="swiper-slide">Slide 5</div>
            <div class="swiper-slide">Slide 6</div>
            <div class="swiper-slide">Slide 7</div>
            <div class="swiper-slide">Slide 8</div>
            <div class="swiper-slide">Slide 9</div>
            <div class="swiper-slide">Slide 10</div>
            </div>
        </div>
       
        <!-- <router-link to="/">main</router-link> |
        <router-link to="/sub">sub</router-link> | -->
        <a href="/"  @click.prevent="history($data, $event)" >main</a> |
        <a href="/sub"  @click.prevent="history($data, $event)" >sub</a> |
        <a href="/detail"  @click.prevent="history($data, $event)" >detail</a>
        <router-view></router-view>
    </div>
</template>

<script>
import Swiper from "swiper"
import commonMixin from "./mixin/commonMinin.js";
import commonBtn from "./components/commonBtn.vue";
import InfiniteLoading from 'vue-infinite-loading';
import {EventBus} from "./bus/event-bus"

export default {
    name: "App",
    mixins: [commonMixin],
    components: {
        "common-btn": commonBtn,
        "infinite-loading" : InfiniteLoading,
    },
    data: function() {
        return {
            count: 1,
            list: null,
            random: "A",
            ovVm: [],
            ov: [],
            ovString: ["A", "B", {},[["C",document.createElement("a")]]],
            ovNode: document.createElement("div"),
            mainSwiper: null,
            page: 1,
            listInfiniti: [],
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
    watch: {
        random: {
            handler(newValue, oldValue) {
                if(!this.getHistory) {
                    console.log("watch");
                }
                //this.randomFn();
            },
        }
    },
    created: function() {
        this.storeFn();
        EventBus.$on("busTest", clickedCount => {
            console.log(clickedCount + "eventBus");
        });

        if(!this.getHistory) {
            //this.randomFn();
        } else {
            console.log(history.state);
            // console.log("history");
        };
        this.$readyHistory(this.$next);
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
        this.swiper();

        // this.$nextTick(function() {
        //     this.getHistory = false;
        // });
       
        //console.log("mounted");
    },
    methods: {
        parents(data) {
            console.log(data + "parents");
            this.count = data;
        },

        $next() {
            console.log("next");
        },

        pushdom() {
            this.ov.push(this.$refs["refSwiper"], "push");
            this.ovNode = this.$refs["refSwiper"];
        },

        swiper() {
            this.mainSwiper = new Swiper('.swiper-container');
        },

        axiosFn() {
            const _this = this;
            this.$axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story&page=1')
            .then(function (response) {
               _this.list = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        randomFn() {
            //this.getHistory = false;
            this.random = Math.floor(Math.random() * 10) + 1;
            console.log(this.random)
        },

        storeFn() {
            //console.log(this.$store.dispatch('addCounter'))
        },
        infiniteHandler($state) {
            console.log("infiniteHandler");
            const _this = this;
            this.$axios.get('//hn.algolia.com/api/v1/search_by_date?tags=story', {
                params: {
                    page: this.page,
                },
            })
            .then(({ data }) => {
                    if (data.hits.length) {
                        this.page += 1;
                        this.listInfiniti.push(...data.hits);
                        $state.loaded();
                        
                              
                    } else {
                        $state.complete();
                    }
            })
            .catch(function (error) {
                console.log(error);
            });
        },
    },
};
</script>

<style lang="scss">
@import '../node_modules/swiper/css/swiper.css';
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

    .infiniti {
        overflow-y: scroll;
        height: 250px;
        border: 1px solid blue;

        div {
            line-height: 30px;
        }
    }
}
</style>
