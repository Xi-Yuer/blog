import { defineConfig } from 'vitepress';

export default defineConfig({
    title: '个人博客',
    themeConfig: {
        socialLinks: [{ icon: "github", link: "https://github.com/Xi-Yuer" }],
        nav: [
            { text: 'Guide', link: '/', activeMatch: '/' },
            {
                text: '前端',
                items: [
                    { text: 'HTML', link: '/guide/HTML/index.md' },
                    { text: 'CSS', link: '/guide/CSS/index.md' },
                    { text: 'JS', link: '/guide/JS/index.md' },
                    { text: 'JQuery', link: '/guide/JQuery/index.md' },
                    { text: 'Vue', link: '/guide/Vue/index.md' },
                    { text: 'React', link: '/guide/React/index.md' },
                    { text: 'Node', link: '/guide/Node/index.md' },
                    { text: '小程序', link: '/guide/小程序/index.md' }
                ],

            },
            {
                text: '后端',
                items: [
                    { text: 'GO', link: '/guide/Go/index.md' },
                    { text: 'Mysql', link: '/guide/Mysql/index.md' },
                    { text: 'NestJS', link: '/guide/NestJS/index.md' },
                ]
            },
            {
                text: '面试整理',
                link: '/guide/Interview/index.md'
            },
            {
                text: '其他',
                items: [
                    {
                        text: 'Git',
                        link: '/guide/Git/index.md'
                    },
                    {
                        text: 'Docker',
                        link: '/guide/Docker/index.md'
                    }
                ]
            }
        ],
        footer: {
            message: 'Released under the MIT License | <a style="color:#10b981" href="https://www.beian.gov.cn/portal/registerSystemInfo?spm=5176.28055625.J_9220772140.52.4774154aXqUOxI">蜀ICP备2022015920号</a>',
            copyright: 'Copyright © 2023-present Xi-Yuer'
        }
    }
});