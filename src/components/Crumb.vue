<template>
    <Breadcrumb class="crumb">
        <Breadcrumb-item v-for="(path,index) in paths" :key="index">{{path}}</Breadcrumb-item>
    </Breadcrumb>
</template>
<script>
export default {
    name: 'crumb',
    props: ['crumbs'],
    computed: {
        paths() {
            let _paths = this.crumbs.slice()
            _paths.unshift('首页')
            return _paths
        }
    }
}
</script>
<style lang="scss">
.crumb {
    padding: 10px;
    border-bottom: 1px solid #d4dada;
}
</style>