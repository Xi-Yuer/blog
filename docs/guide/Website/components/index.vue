<script setup>
import Item from './item.vue'
import { data } from '../data/index'
</script> 

<template>
    <div class="main">
        <div v-for='item in data' style='margin-bottom: 50px;'>
            <a>
                <h2>{{ item.title }}</h2>
            </a>
            <div class="main">
                <template v-for='iten in item.items'>
                    <Item :data='iten' />
                </template>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.main {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    margin: 0 auto;
    padding-left: 150px;
    margin-top: 30px;
}

a {
    text-decoration: none !important;
    cursor: pointer;

    h2 {
        font-size: 25px;
        color: #13ba82;
        margin-left: 170px;
    }
}
</style>
