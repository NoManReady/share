<template>
    <div class="not-find">
        <h1>404</h1>
        <p>页面找不到</p>
    </div>
</template>
<script>
// import area from '@/mock/area'
export default {
    name: 'NotFind',
    created() {
        // console.log(this.cascader(0))
    },
    methods: {
        cascader(pid) {
            // const target = []
            // area.forEach(a => {
            //     if (a.PARENT_CODE == pid) {
            //         target.push(a)
            //         a.children = this.cascader(a.code)
            //     }
            // });
            // return target
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../scss/mixins';
.not-find {
    @include absolute;
    margin: auto;
    margin-top: 20%;
    color: #999;
    width: 200px;
    height: 100px;
    text-align: center;
    h1 {
        font-size: 50px;
    }
    p {
        font-size: 20px;
        margin-top: 20px;
    }
}
</style>