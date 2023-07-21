<script setup>
import Item from './item.vue'
import { data } from '../data/index'
</script> 

<template>
    <div class="main">
        <div class='container'>
            <template v-for='item in data'>
                <div style='margin-bottom: 50px;'>
                    <a>
                        <h2>{{ item.title }}</h2>
                    </a>
                    <div class="main2">
                        <template v-for='iten in item.items'>
                            <Item :data='iten' />
                        </template>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang='scss' scoped>
.main {
    width: 100%;
}

.main2 {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

@media screen and (max-width: 768px) {
    .main2 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0;
    }
}

@media screen and (min-width: 768px) and (max-width: 1000px) {
    .main2 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
}

.container {
    width: 100%;
    margin: 0 auto;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
}

a {
    text-decoration: none !important;
    cursor: pointer;

    h2 {
        font-size: 25px;
        color: #13ba82;
    }
}
</style>
