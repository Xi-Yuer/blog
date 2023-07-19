<script setup lang='ts'>

interface Data {
    icon: string
    title: string
    desc: string
    link: string
}
const { data } = defineProps<{ data: Data }>()
</script>

<template>
    <div class='item'>
        <a :href='data.link' target='_blank'>
            <div class='top'>
                <div class="left">
                    <img :src="data.icon" alt="">
                </div>
                <div class="right">{{ data.title }}</div>
            </div>
            <div class="bot">{{ data.desc }}</div>
        </a>
    </div>
</template>

<style scoped lang="scss">
.item {
    width: 300px;
    height: 135px;
    box-shadow: 0 0 5px 5px rgb(241, 241, 241);
    display: flex;
    flex-direction: column;
    padding: 20px;
    margin: 20px;
    border-radius: 5px;
}

a {
    text-decoration: none !important;
}

.top {
    display: flex;
    align-items: center;
    line-height: 30px;

    .left {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 10px;
        background-color: #eee;

        img {
            width: 30px;
            height: 30px;
            border-radius: 10px;
        }
    }

    .right {
        font-size: 20px;
        font-weight: bold;
    }
}

.bot {
    color: #999;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
</style>
