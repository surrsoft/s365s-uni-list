export const paths = {
    home: {
        base: '/',
        baseSlash: '/'
    },
    about: {
        base: 'about',
        baseSlash: '/about'
    },
    uniList: {
        base: 'uni-list',
        baseSlash: '/uni-list'
    },
    uiDebug: {
        base: 'ui-debug',
        baseSlash: '/ui-debug',
        components: {
            menuPoar: {
                base: 'menu-poar',
                baseSlash: '/ui-debug/menu-poar',
            },
            uniListFilters: {
                base: 'uni-list-filters',
                baseSlash: '/ui-debug/uni-list-filters',
            },
        },
    }
} as const;