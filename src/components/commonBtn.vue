<template>
    <div class="btn">
        <button @click="countUp">{{ countData }}
            <slot></slot>
        </button>
    </div>
</template>

<script>
import {EventBus} from "../bus/event-bus";

export default {
    name: "commonBtn",
    props: {
        count: {
            type: Number,
            default: 100,
        },
    },
    data: function() {
        return {
            countData: this.count,
        };
    },
    watch: {
        count: {
            handler(newValue, oldValue) {
                this.countData = newValue;
            }
        }
    },
    methods: {
        countUp: function() {
            this.countData++;

            this.$emit("child", this.countData);
            EventBus.$emit("busTest", this.countData);
        },
    },
};
</script>
