import { defineConfig } from 'vitepress';
export default defineConfig({
    lang: 'zh-CN',
    title: '个人笔记',
    head: [
        ['link', { rel: 'icon', href: '../public/logo.png' }]
    ],
    themeConfig: {
        socialLinks: [{ icon: "github", link: "https://github.com/Xi-Yuer" }],
        search: {
            provider: 'algolia',
            options: {
                appId: '89MSEO58RA',
                apiKey: '60b51a88e9387c12447333f93883c0b0',
                indexName: 'xiyuer',
                insights: true,
                placeholder: '搜索文档',
                translations: {
                    button: {
                        buttonText: '搜索',
                        buttonAriaLabel: '搜索文档',
                    },
                    modal: {
                        searchBox: {
                            resetButtonTitle: '清除查询条件',
                            resetButtonAriaLabel: '清除查询条件',
                            cancelButtonText: '取消',
                            cancelButtonAriaLabel: '取消',
                        },
                        startScreen: {
                            recentSearchesTitle: '最近',
                            noRecentSearchesText: '最近没有搜索',
                            saveRecentSearchButtonTitle: '保存此搜索',
                            removeRecentSearchButtonTitle: '从历史上删除此搜索',
                            favoriteSearchesTitle: '喜欢',
                            removeFavoriteSearchButtonTitle: '从收藏夹中删除此搜索',
                        },
                        errorScreen: {
                            titleText: '无法找到相关结果',
                            helpText: '您可能需要检查您的网络连接。',
                        },
                        footer: {
                            selectText: '选择',
                            selectKeyAriaLabel: '选择',
                            navigateText: '导航',
                            navigateUpKeyAriaLabel: '切换↑',
                            navigateDownKeyAriaLabel: '切换↓',
                            closeText: '关闭',
                            closeKeyAriaLabel: 'Esc',
                            searchByText: '搜索',
                        },
                        noResultsScreen: {
                            noResultsText: '暂无搜索结果',
                            suggestedQueryText: '重试',
                            reportMissingResultsText: '确认查询应该返回结果吗？',
                            reportMissingResultsLinkText: '让我们知道。',
                        },
                    }
                }
            }
        },
        nav: [
            {
                text: '前端',
                items: [
                    { text: 'HTML&CSS', link: '/guide/FrontEnd/HTML/index.md' },
                    { text: 'JS', link: '/guide/FrontEnd/JS/index.md' },
                    { text: 'JQuery', link: '/guide/FrontEnd/JQuery/index.md' },
                    { text: 'Vue', link: '/guide/FrontEnd/Vue/index.md' },
                    { text: 'React', link: '/guide/FrontEnd/React/index.md' },
                    { text: '小程序', link: '/guide/FrontEnd/小程序/index.md' },
                    {
                        text: '工具函数封装',
                        items: [
                            {
                                text: 'Request',
                                link: '/guide/FrontEnd/Request/index.md'
                            }
                        ]
                    },
                ],

            },
            {
                text: '后端',
                items: [
                    { text: 'Node', link: '/guide/BackEnd/Node/index.md' },
                    { text: 'GO', link: '/guide/BackEnd/Go/index.md' },
                    { text: 'Mysql', link: '/guide/BackEnd/Mysql/index.md' },
                    { text: 'NestJS', link: '/guide/BackEnd/NestJS/index.md' },
                ]
            },
            {
                text: '面试整理',
                link: '/guide/FrontEnd/Interview/index.md'
            },
            {
                text: '其他',
                items: [
                    { text: 'Git', link: '/guide/Other/Git/index.md' },
                    { text: 'Docker', link: '/guide/Other/Docker/index.md' },
                    { text: 'Cook', link: '/guide/Other/Article/howCook/index.md' },
                ]
            },
            {
                text: '关于我',
                link: '/guide/README/index.md'
            }
        ],
        sidebar: {
            '/guide/FrontEnd': [
                {
                    text: '前端',
                    items: [
                        { text: 'HTML&CSS', link: '/guide/FrontEnd/HTML/index.md' },
                        { text: 'JS', link: '/guide/FrontEnd/JS/index.md' },
                        { text: 'JQuery', link: '/guide/FrontEnd/JQuery/index.md' },
                        { text: 'Vue', link: '/guide/FrontEnd/Vue/index.md' },
                        { text: 'React', link: '/guide/FrontEnd/React/index.md' },
                        { text: '小程序', link: '/guide/FrontEnd/小程序/index.md' },
                        { text: '面试整理', link: '/guide/FrontEnd/Interview/index.md' },
                        {
                            text: '工具函数封装',
                            items: [
                                {
                                    text: 'Request',
                                    link: '/guide/FrontEnd/Request/index.md'
                                }
                            ]
                        },
                    ]
                }
            ],
            '/guide/BackEnd': [
                {
                    text: '后端',
                    items: [
                        { text: 'Node', link: '/guide/BackEnd/Node/index.md' },
                        { text: 'GO', link: '/guide/BackEnd/Go/index.md' },
                        { text: 'Mysql', link: '/guide/BackEnd/Mysql/index.md' },
                        { text: 'NestJS', link: '/guide/BackEnd/NestJS/index.md' },
                    ]
                }
            ],
            '/guide/Other': [
                {
                    text: '其他',
                    items: [
                        { text: 'Git', link: '/guide/Other/Git/index.md' },
                        { text: 'Docker', link: '/guide/Other/Docker/index.md' },
                        { text: 'Cook', link: '/guide/Other/Article/howCook/index.md' },
                    ]
                }
            ],
        },
        docFooter: {
            next: '下一页',
            prev: '上一页',
        },

        footer: {
            message: `
            VitePress Design | 
            <a style="color:#10b981" href="https://www.beian.gov.cn/">
            蜀ICP备2022015920号
            </a>`,
            copyright: 'Copyright © 2023 Xi-Yuer'
        }
    }
});