module.exports = {
    // theme: 'vuepress-theme-reco',
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/medium-zoom',
        '@vuepress/plugin-register-components',
        'vuepress-plugin-container',
    ],
    markdown: {
        lineNumbers: true
    },
    port: 8200,
    dest: './dist',
    head: [
        ['link', { rel: 'icon', href: `/assets/img/elcube_ico.png` }],
        // ['link', { rel: 'manifest', href: '/manifest.json' }],
        ['meta', { name: 'theme-color', content: '#fff' }],
        ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
        ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
        ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
        ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#fff' }],
        ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
        ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
    ],
    locales: {
        '/': {
            lang: 'zh-CN',
            title: 'ELCube 企业级快速开发模型',
            description: '企业级快速开发模型'
        },
        '/en/': {
            lang: 'en-US',
            title: 'ELCube',
            description: 'Enterprise class development model'
        }
    },
    themeConfig: {
        logo: '/assets/img/elcube_logo_100x100.png',
        repo: 'nk-china/elcube-docs',
        //type: 'EasisHome',

        editLinks: true,
        docsDir: 'docs',
        smoothScroll: true,
        displayAllHeaders: false,
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
                    { text: 'ELCube Pro', link: '/easis-pro.md'},
                    {
                        text: '更多',
                        items: [
                            { text: '服务支持', items: [
                                    {text: '企业定制', link: '/customize.md'},
                                    {text: '反馈交流', link: '/feedback.md'},
                                ] },
                            { text: '联系我们', items: [
                                    {text: '联系我们', link: '/contact.md'},
                                    {text: '关于ELCube', link: '/about.md'},
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
                            collapsable:true,
                            sidebarDepth: 3,
                            children:[
                                "",
                                "def-el.md",
                                "def-doc-type.md",
                                "def-card.md",
                                "def-component.md",
                                "def-doc-logic.md",
                                "def-bpm.md",
                                "def-dmn.md",
                                "def-base.md"
                            ]
                        },
                        {
                            title: '设置',   // 必要的
                            collapsable:true,
                            sidebarDepth: 3,
                            children:[
                                "settings-menu.md",
                                "settings-auth.md"
                            ]
                        },
                        {
                            title: '深入了解',   // 必要的
                            collapsable:true,
                            sidebarDepth: 3,
                            children:[
                                "advanced-data.md",
                                "advanced-debug.md",
                                "advanced-auto-process.md",
                                "advanced-open-api.md",
                                "advanced-deploy.md"
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
                            ]
                        },
                    ]
                }
            }
        },
    }
}