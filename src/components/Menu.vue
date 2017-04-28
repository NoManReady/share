<script>
import menus from '../mock/menu'
import { Menu, MenuItem, Submenu, Icon } from 'iview'
export default {
    name: 'iMenu',
    data() {
        return {
            menus: Object.freeze(menus),
            leaf: null,
            path: []
        }
    },
    created() {
        this.initLeaf(this.$route.path)
    },
    mounted(){
        // console.log(this.menus)
    },
    computed: {
        menuFatten() {
            const menusFlatten = []
            this.iterator(this.menus, menusFlatten)
            return menusFlatten
        }
    },
    watch: {
        '$route': function (v) {
            this.initLeaf(v.path)
        }
    },
    methods: {
        initLeaf(path) {
            let _path = []
            for (let menu of this.menuFatten) {
                if (menu.MENU_PATH === path) {
                    this.leaf = menu
                    break
                }
            }
            if (!this.leaf) {
                this.leaf = _.find(this.menuFatten, menu => {
                    return menu.MENU_PATH
                })
            }
            _path.push(this.leaf)
            if (this.leaf.PARENT_MENU_ID) {
                let parent = _.find(this.menuFatten, r => {
                    return r.MENU_ID === this.leaf.PARENT_MENU_ID
                })
                if (parent) {
                    _path.unshift(parent)
                }
            }
            this.path = _path
            this.$store.dispatch('change_crumb', this.path.map(p => p.MENU_NAME))
            this.$store.dispatch('change_title', this.leaf.MENU_NAME)
        },
        iterator(data, target) {
            data.forEach(d => {
                target.push(d)
                if (d.CHILDS) {
                    this.iterator(d.CHILDS, target)
                }
            })
        },
        generator(menus, icon) {
            return menus.map(menu => {
                if (menu.CHILDS) {
                    return (<Submenu name={menu.MENU_ID}>
                        <template slot="title">
                            {icon ? <Icon class="mr10" type="ios-navigate"></Icon> : ''}
                            {menu.MENU_NAME}
                        </template>
                        {this.generator(menu.CHILDS)}
                    </Submenu>)
                }
                return (<Menu-item name={menu.MENU_ID}>
                    <router-link class="menu-over" active-class="menu-active" tag='span' to={menu.MENU_PATH}>
                        {icon ? <Icon class="mr10" type="ios-navigate"></Icon> : ''}{menu.MENU_NAME}
                    </router-link>
                </Menu-item>)
            })
        }
    },
    render(h) {
        let menusJSX = this.generator(this.menus, true)
        let activeName = this.leaf.MENU_ID
        let openNames = this.path.map(r => r.PARENT_MENU_ID)
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