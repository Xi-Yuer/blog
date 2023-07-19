import { defineConfig } from 'vitepress';
export default defineConfig({
    lang: 'zh-CN',
    title: '个人博客',
    themeConfig: {
        socialLinks: [{ icon: "github", link: "https://github.com/Xi-Yuer" }],
        search: {
            provider: 'algolia',
            options: {
                locales: {
                    zh: {
                        translations: {
                            button: {
                                buttonText: '搜索文档',
                                buttonAriaLabel: '搜索文档'
                            },
                            modal: {
                                noResultsText: '无法找到相关结果',
                                resetButtonTitle: '清除查询条件',
                                footer: {
                                    selectText: '选择',
                                    navigateText: '切换'
                                }
                            }
                        }
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
                    { text: '小程序', link: '/guide/FrontEnd/小程序/index.md' }
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
                link: '/guide/Other/Interview/index.md'
            },
            {
                text: '其他',
                items: [
                    { text: 'Git', link: '/guide/Other/Git/index.md' },
                    { text: 'Docker', link: '/guide/Other/Docker/index.md' }
                ]
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
                        { text: 'Docker', link: '/guide/Other/Docker/index.md' }
                    ]
                }
            ]
        },
        footer: {
            message: `
            Released under the MIT License | 
            <a style="color:#10b981" href="https://www.beian.gov.cn/">
            蜀ICP备2022015920号
            </a>`,
            copyright: 'Copyright © 2023-present Xi-Yuer'
        }
    }
});