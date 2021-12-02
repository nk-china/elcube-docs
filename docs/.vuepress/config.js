module.exports = {
    port: 8200,
    dest: './dist',
    theme: '@vuepress/vue',
    head: [
        ['link', { rel: 'icon', href: `/easis.logo.min.png` }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#3eaf7c' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'EAsis 企业级快速开发模型',
            description: '企业级快速开发模型'
        },
        '/en/': {
            lang: 'en-US',
            title: 'EAsis 企业级快速开发模型',
            description: '企业级快速开发模型'
        }
    },
    themeConfig: {
        logo: '/easis.logo.png',
        repo: 'easis-docs',
        editLinks: true,
        docsDir: 'docs',
        smoothScroll: true,
        displayAllHeaders: true,
        lastUpdated: 'Last Updated', // string | boolean
        locales: {
            '/': {
                label: '简体中文',
                selectText: '选择语言',
                ariaLabel: '选择语言',
                editLinkText: '在 GitHub 上编辑此页',
                lastUpdated: '上次更新',
                nav: [
                    { text: '首页', link: '/' },
                    { text: '指南', link: '/guide/' },
                    { text: '开发', link: '/develop/' },
                    {
                        text: '更多',
                        items: [
                            { text: '服务支持', items: [
                                    {text: '企业定制', link: '/develop/'},
                                    {text: '反馈', link: '/develop/'},
                                ] },
                            { text: 'Group2', items: [
                                    {text: '企业定制', link: '/develop/'},
                                    {text: '反馈', link: '/develop/'},
                                ] }
                        ]
                    },
                    // { text: 'GitHub', link: 'https://github.com/nk-china/easis-backend' },
                    // { text: 'Gitee', link: 'https://gitee.com/newcorenet/easis-backend' },
                ],
                sidebar: {
                    '/guide/':[
                        {
                            title: '指南',   // 必要的
                            collapsable:false,
                            sidebarDepth: 3,
                            children:[
                                "",
                                "1",
                                "2"
                            ]
                        },
                        {
                            title: '深入了解',   // 必要的
                            collapsable:false,
                            sidebarDepth: 3,
                            children:[
                                "",
                                "1",
                                "2"
                            ]
                        }
                    ],
                    '/develop/':[
                        {
                            title: '开发',   // 必要的
                            collapsable:false,
                            sidebarDepth: 3,
                            children:[
                                "",
                                "1",
                                "2"
                            ]
                        },
                    ]
                }
            }
        },
    }
}