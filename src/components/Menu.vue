<script>
import { Menu, MenuItem, Submenu, Icon } from 'iview'
import Api from '@/api'

let $$path=null
export default {
    name: 'iMenu',
    data() {
        return {
            leaf: null,
            path: []
        }
    },
    props:['menus'],
    beforeUpdate(){
        if($$path===this.$route.path){
            return
        }
        $$path=this.$route.path
        this.initLeaf(this.$route.path)
    },
    watch: {
        '$route': function (v) {
            this.initLeaf(v.path)
        }
    },
    computed:{
        flatMenus(){
            const _menus=[]
            this.iterator(this.menus,_menus)
            return _menus
        }
    },
    methods: {
        initLeaf(path) {
            let _path = []
            for (let menu of this.flatMenus) {
                if (menu.path === path) {
                    this.leaf = menu
                    break
                }
            }
            if (!this.leaf) {
                this.leaf = _.find(this.flatMenus, menu => {
                    return menu.path
                })
                this.$router.push(this.leaf.path)
                return
            }
            let _leaf = this.leaf
            while (_leaf) {
                _path.unshift(_leaf)
                _leaf = _.find(this.flatMenus, r => {
                    return r.id === _leaf.pid
                })
            }
            this.path = _path
            this.$store.dispatch('change_crumb', this.path.map(p => p.title))
            this.$store.dispatch('change_title', this.leaf.title)
        },
        iterator(data, target) {
            data.forEach(d => {
                target.push(d)
                if (d.childs) {
                    this.iterator(d.childs, target)
                }
            })
        },
        generator(menus, icon) {
            return menus.map(menu => {
                if (menu.childs && menu.childs.length) {
                    return (<Submenu name={menu.id}>
                        <template slot="title">
                            {icon ? <Icon class="mr10" type="ios-navigate"></Icon> : ''}
                            {menu.title}
                        </template>
                        {this.generator(menu.childs)}
                    </Submenu>)
                }
                return (<Menu-item name={menu.id}>
                    <router-link class="menu-over" active-class="menu-active" tag='span' to={menu.path}>
                        {icon ? <Icon class="mr10" type="ios-navigate"></Icon> : ''}{menu.title}
                    </router-link>
                </Menu-item>)
            })
        }
    },
    render(h) {
        let menusJSX = this.generator(this.menus, true)
        let activeName = this.leaf ? this.leaf.id : -1
        let openNames = this.path.map(r => r.pid)
        let data = {
            props: {
                activeName,
                openNames,
                theme: 'dark',
                width: 'auto'
            }
        }
        return (
            <Menu {...data}>
                {menusJSX}
            </Menu>
        )
    }
}
</script>
<style lang="scss" scoped>
.ivu-menu-vertical .ivu-menu-item {
    padding: 0 !important;
}

.menu-over {
    display: block;
    padding: 14px 24px;
}
</style>