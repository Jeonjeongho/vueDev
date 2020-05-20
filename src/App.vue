<template>
    <div id="app">
        <h1>dev</h1>
         <!-- <router-link to="/">main</router-link> |
        <router-link to="/sub">sub</router-link> | -->
        <a href="/"  @click.prevent="history($data, $event)" >main</a> |
        <a href="/sub"  @click.prevent="history($data, $event)" >sub</a> |
        <a href="/detail"  @click.prevent="history($data, $event)" >detail</a>
        <router-view></router-view>

         <section>
            <h2>history Test</h2>
            <div>
                <strong>{{random}}</strong>random
            </div>
        </section>
        
        <section>
            <h2>무한스크롤링 페이징 테스트</h2>
            <div class="infiniti">
                <div v-for="(item, $index) in listInfiniti" :key="$index">
                    {{item.author}}
                </div>
                <infinite-loading @infinite="infiniteHandler"></infinite-loading>
            </div>
        </section>

        <section>
            <h2>js-image-zoom</h2>
            <div ref="img-container" style="width: 400px; margin: 0 auto;">
                <img src="http://malaman.github.io/js-image-zoom/example/1.jpg" width="100%"/>
            </div>
        </section>

        <section>
            <h2>nouislider</h2>
            <div style="width: 400px; margin: 0 auto; border: 1px solid #ccc;">
                <input type="text" v-model="price.min" /> ~ 
                <input type="text" v-model="price.max" />
                <div ref="slider"></div>
            </div>
        </section>

        <section>
             <h2>단어강조</h2>
            <span v-html="searchStart ? getSearchContents( '카드종류 현대 현대카드' , '현대', 'title') : search.TITLE"></span>
        </section>

        <section>
            <h2>부모, 자식 이벤트 전달 테스트</h2>
            <button type="button" @click="parentFn">
                <span>parent</span>
                <button type="button" @click.stop="childFn">
                    child
                </button>
            </button>
        </section>

        <section>
            <div>
                 <h2>1개일때 true, false 로 return value 값 미선언시</h2>
                <label>
                    <input type="checkbox" id="checkbox" v-model="checked">
                    <span>{{ checked }}</span>
                </label>
            </div>
            <div>
                <h2>여러개일때 return value 값 선언</h2>
                <input type="checkbox" id="jack" value="Jack" v-model="checkeds">
                <input type="checkbox" id="john" value="John" v-model="checkeds">
                <input type="checkbox" id="mike" value="Mike" v-model="checkeds">
                 <span>{{ checkeds.length == 0 ? "" :  checkeds}}</span>
            </div>
        </section>

        <section>
            <h2>.exact 수식어 테스트 ctrl + c</h2>
            <input type="text" @keyup.ctrl.67="copy">
        </section>

        <section>
            <h2>ref 로딩 선택시 mounted</h2>
            <div ref="refSwiper">refSwiper</div>
        </section>

        <section>
            <h2>line style 테스트</h2>
            <button type="button" @click="pushdom" 
                :style="true ? 'width:100px' : 'width: 200px;'"
            >pushdom</button> 
        </section>

        <section>
            <h2>mixin event 테스트</h2>
            <button type="button" @click="scroll">mixin</button>
        </section>


        <section>
            <h2>복수 라디오 테스트</h2>
            <input type="radio" value="A" v-model="random" >
            <input type="radio" value="B" v-model="random">
            <input type="radio" value="C" v-model="random">
            <input type="radio" value="D" v-model="random">
        </section>
        <a href="#" @click.prevent="history($data, $event)" >history</a>
        <section>
            <h2>컴포넌트 이벤트 전달 및 slot 테스트</h2>
            <div >
                <input type="number" v-model.number="count" />
            </div>
            <common-btn :count="count" @child="parents">
                <div slot="header">여기에 페이지 제목이 위치합니다</div>
                <div slot-scope="props">
                    {{ props.text }} footer slot
                </div>
            </common-btn>
        </section>

        <section>
             <h2>axios 테스트</h2>
            <button type="button" @click="axiosFn">axios</button>
            <div v-if="list">
                <ul>
                    <template v-for="(list, index) in list">
                        <li :key="index">
                            {{list.author}}
                        </li>
                    </template>
                </ul>
            </div>
        </section>

        <section>
             <h2>vuex store Test</h2>
            <div>
                {{ $store.state.counter }}
            </div>
        </section>

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
       
       
    </div>
</template>

<script>
import Swiper from "swiper";
import ImageZoom from "js-image-zoom";
import noUiSlider from "nouislider";
import wNumb from "wnumb";
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
            checked: false,
            checkeds: [],
            searchStart: true,
            search: {
                TITLE : "list TITLE"
            },
            
            defaultPrice: {
                min: "0",
                max: "10,000",
            },

            price: {
                min: "0",
                max: "10,000",
            }
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
            //immediate: true
        }
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

            this.$nextTick(function() {
                //this.noUiSliderFn();
            });
            
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
        this.zoom();
        this.noUiSliderFn();
        
        // this.$nextTick(function() {
        //     this.getHistory = false;
        // });
       
        //console.log("mounted");
    },
    methods: {

        getSearchContents(word, filter, type) {
            const regex = new RegExp(filter,'gi');

            if (type == 'title') {
                return word.replace(regex, `<strong class='font-point'>${filter}</strong>`);
                
            } else {
                const findIndex = word.indexOf(filter);
                const startIndex = findIndex - 20 < 0 ? 0 : findIndex - 20;
                const endIndex = findIndex + 20;
                const cutWord = word.substring(startIndex, endIndex);
                return cutWord.replace(regex, `<span class='font-point'>${filter}</span>`);
            }
        },

        noUiSliderFn() {
            const $target = this.$refs["slider"];
            const  moneyFormat = wNumb({
                thousand: ',',
            });


            noUiSlider.create($target, {
                start: [moneyFormat.from(this.price.min), moneyFormat.from(this.price.max)],
                range: {
                    'min': [moneyFormat.from(this.defaultPrice.min)],
                    'max': [moneyFormat.from(this.defaultPrice.max)]
                },
                format: wNumb({
                    decimals: 3,
                    thousand: ',',
                })
            });

            $target.noUiSlider.on('update', (values, handle) => {
                this.price.min = values[0].split(".")[0];
                this.price.max = values[1].split(".")[0];
                //console.log(handle == "0" ? "min" : "max");
            });
        },

        zoom() {
            const options = {
                width: 400,
                zoomWidth: 400,
                offset: {vertical: 0, horizontal: 10}
            };
            new ImageZoom(this.$refs["img-container"], options);
        },
        

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
            this.$axios.get('https://hn.algolia.com/api/v1/search_by_date?tags=story', {
                page: 1
            })
            .then(function (response) {
               _this.list = response.data.hits;
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

        parentFn() {
            console.log("parentFn")
        },

        childFn() {
            console.log("childFn")
        },

        copy() {
            console.log("copy")
        },
        infiniteHandler($state) {
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
@import '../node_modules/nouislider/distribute/nouislider.min.css';
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

    h1 {
        font: {
            size: 18px;
        }
    }

    section {
        margin-bottom: 30px;
        padding: 30px 0;
        background: #cdcdcd;

        h2{
            font: {
                size: 16px;
            }
        }
    }
}
</style>
