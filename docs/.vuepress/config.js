module.exports = {
    theme: '@vuepress/vue',
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '企业级快速开发模型',
            description: '企业级快速开发模型'
        },
        '/en/': {
            lang: 'en-US',
            title: '企业级快速开发模型',
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