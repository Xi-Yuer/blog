# JQuery
## 选择器
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul id="list">
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>

    <script>
        console.log($('li'));
        console.log($('.li-1'));
        console.log($('#list'));
        console.log($('ul li:nth-child(2)'));


        // jquery格外扩展的选择器

        console.log($('ul li:eq(0)')); // 索引为0的元素
        console.log($('ul li:nth-child(1)'))
        console.log($('ul li:first-child'));
        console.log($('ul li:last-child'));

        // 过滤器
        console.log($('ul li:first'));
        console.log($('ul li:last'));

        console.log($('ul li:odd')); // 偶数的li
        console.log($('ul li:even')); // 奇数的li
    </script>
</body>

</html>
    
```          
                
                
## 认识jQuery对象
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <div class="parent">
        <span>div元素</span>
    </div>
    <span>div元素</span>
    <span>div元素</span>
    <span>div元素</span>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</body>
<script>
    // 创建一个空的jquery对象
    // console.log($());

    // 创建一个匹配到 document 元素的集合
    // console.log($(document));

    // 创建匹配到多个 div 元素的集合 $(selector: string, context?: Element | JQuery) => JQuery

    console.log($('span', $('.parent'))); // 有上下文（父元素之内的元素，默认是document）
    console.log($('span')); // 上下文是document 默认


    // 将 jquery 对象转换成原生 dom 对象
    console.log('%O', $('span', $('.parent')).get(0)); // 获取第一个元素


    // 将原生 dom 对象转换成 jquery 对象（目的：调用jquery对象身上的方法）
    const spanEl = document.querySelectorAll('span') // 原生 dom 对象
    console.log($(spanEl));


</script>

</html>
    
```          
                
                
## 初体验
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- integrity : 防止资源被篡改 -->
    <!-- crossorigin : 跨域资源 -->
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
</head>

<body>
    <button class="add">加一</button>
    <span class="counter">0</span>
    <button class="sub">减一</button>
    <script>
        // 文档完全加载完毕 $(()=>{})
        $(() => {
            console.log('document ready')

            let counter = 0
            const addEl = $('.add')
            const counterEl = $('.counter')
            const subEl = $('.sub')

            addEl.on('click', () => {
                counterEl.text(++counter)
            })
            subEl.on('click', () => {
                counterEl.text(--counter)
            })
        })

        // window load 事件
        $(window).on('load', () => {
            console.log('window load')
        })
    </script>
</body>

</html>
    
```          
                
                
## css操作
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul id="list" class="panel">
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // 获取 ul 的宽度
            console.log($('ul').width()) // number  => 200
            console.log($('ul').css('width')) // string => '157px'

            // 获取宽度和高度
            console.log($('ul').css(['width', 'height'])) // object => {width: '157px', height: '100px'}

            // 设置
            $('ul').width('300px') //OR $('ul').width('300')

            // 设置样式
            $('ul li').odd().css({
                color: 'red',
                backgroundColor: 'yellow'
            })

            // 添加 class
            $('ul').addClass('ulRef')
        })
    </script>
</body>

</html>
    
```          
                
                
## 获取input的值
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>

    <input type="text" id="user">
    <br>
    <input type="password" id="password">
    <br>
    <button class="login">登录</button>
    <br>
    <button class="init">设置</button>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // 获取
            $('.login').click(() => {
                console.log($('#user').val())
                console.log($('#password').val())
            })

            // 设置
            $('.init').click(() => {
                $('#user').val('admin')
                $('#password').val('123456')
            })
        })
    </script>
</body>

</html>
    
```          
                
                
## property操作
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul class="panel" id="list" name="tom" age="18">
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // 获取 property 属性(只能获取到标准的 property 属性)
            console.log($('ul').prop('id')) // list

            // 修改 property
            $('ul').prop('id', 'list-2') // (key,value)
            // 修改多个
            $('ul').prop({
                id: 'list-3',
                class: 'ww',
                jq: '添加自定义属性'
            })

            // 删除 property 属性(不能删除标准的 property 属性)

            $('ul').removeProp('jq') // 删除 id 属性
        })
    </script>
</body>

</html>
    
```          
                
                
## dom操作
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul class="panel" id="list">
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <li class="li-10">10</li>

    <div class="container">
        <span>默认内容</span>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // (method) JQuery.append(content1: string | any[] | JQuery | Element | DocumentFragment | Text, ...content2: any[]): JQuery

            //  append() 方法将内容插入到匹配元素内部的末尾。
            $('ul').append('<li class="li-6">6</li>')
            $('ul').append('文本')

            // prepend() 方法将内容插入到匹配元素内部的开头。
            $('ul').prepend('<li class="li-7">7</li>')

            // after() 方法将内容插入到匹配元素后面。
            $('ul').after('<li class="li-8">8</li>')

            // before() 方法将内容插入到匹配元素前面。
            $('ul').before('<li class="li-9">9</li>')

            // 移动元素到指定位置
            $('#list').append($('.li-10'))



            // appendTo() 将匹配的内容或元素插入到目标内部的末尾。
            $('#list').appendTo('.container') // span 元素之后

            // prependTo() 将匹配的内容或元素插入到目标内部的开头。
            $('#list').prependTo('.container') // span 元素之前

            // insertAfter() 将匹配的内容或元素插入到目标内部的外部的后面。
            $('#list').insertAfter('.container') // container 元素之后

            // insertBefore() 将匹配的内容或元素插入到目标内部的外部的前面。
            $('#list').insertBefore('.container') // container 元素之前



            // 删除匹配元素的所有子节点
            $('ul').empty() // 自身不会删除
            // (method) JQuery.remove(selector?: string): JQuery
            $('ul').remove() // 自身会删除


            // replaceAll(target) 将目标元素替换为匹配元素。 
            // (method) JQuery.replaceWith(newContent: string | any[] | JQuery | Element | Text): JQuery
            $('<span>')
                .addClass('span-1')
                .css('color', 'red')
                .replaceAll($('li'))

            // replaceWith(newContent) 将匹配元素替换为指定内容。 
            // (method) JQuery.replaceWith(newContent: string | any[] | JQuery | Element | Text): JQuery
            $('span')
                .replaceWith($('span').addClass('span-2').text('1'))


            // 元素克隆 (method) JQuery.clone(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean): JQuery
            // 对匹配元素进行克隆 参数为 true 时，将会复制元素的数据和事件。
            $('.container').click(()=>{
                alert('click')
            })
            $('.container').clone(true).appendTo($('body'))
        })
    </script>
</body>

</html>
    
```          
                
                
## attribute操作
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!-- 标准的 attribute 和非标准的 attribute -->
    <ul class="panel" id="list" name="tom" age="18">
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // 获取attribute 属性
            console.log($('ul').attr('id')); // list
            console.log($('ul').attr('name')); // tom

            // 设置attribute 属性

            $('ul').attr('id', 'list-2'); // (key,value)
            // 设置多个
            $('ul').attr({
                id: 'list-3',
                address: 'beijing'
            });

            // 删除attribute 属性
            $('ul').removeAttr('id'); // (key)
            // 不能同时删除多个
        })
    </script>
</body>

</html>
    
```          
                
                
## 文本操作
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul id="list" class="panel">
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // 获取到 ul 中的所有文本
            console.log($('ul').text())

            // 设置 li 中的文本
            $('ul li').text('文本')

            // 获取 ul 中的所有 html
            console.log($('ul').html())
        })
    </script>
</body>

</html>
    
```          
                
                
## data-xxx属性
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul class="panel" id="list" name="tom" age="18" data-name="tom">
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            //  设置 data-xxx 属性
            $('ul').data('id', '1') // (key,value)

            //  获取 data-xxx 属性(从缓存里面获取 data-xxx 属性)
            console.log($('ul').data()) // 获取所有的data-xxx属性 {id: '1', name: 'tom'}
            console.log($('ul').data('name')) // 获取单个 tom

            // 修改 data-xxx 属性(注意：修改的是缓存里面的 data-name)
            $('ul').data('name', 'sily') // (key,value)
            console.log($('ul').data('name')) // sily


            // 删除 data-xxx 属性(注意：删除的是缓存里面的 data-name)
            $('ul').removeData('name') // (key)
            console.log($('ul').data('name')) // tom



            console.log("%O", $('ul'))

            /*
            data-xxx 属性的设置和获取都是针对缓存里面进行的
            设置和修改不会影响到原来的 data-xxx
            获取 data-xxx 先从缓存中获取，如果缓存中不存在则从原来的 data-xxx 中获取，并将获取到的 data-xxx 存取到缓存中
            */
        })
    </script>
</body>

</html>
    
```          
                
                
## jquery解决变量名冲突
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 解决变量名冲突，返回新的变量名
        var newJQuery = jQuery.noConflict(true);

        /**
         * 源码实现
        */

        // 先将第三方库的 $ | JQuery 变量保存下来
        const _$ = window.$
        const _jQuery = window.jQuery

        // 调用该方法几个解决变量名冲突
        function noConflict(deep) {
            // 如果变量 $ 冲突
            if (window.$ === jQuery) {
                // 将之前的 $ | JQuery 变量替换为新的 $ | JQuery 变量
                window.$ = _$
            }
            // 解决 jQuery 变量也存在冲突
            if (deep && window.jQuery === jQuery) {
                window.jQuery = _jQuery
            }

            // 返回新的 JQuery 对象 (这个对象是原始的 JQuery 对象(自己库的对象))
            return jQuery
        }
    </script>
</body>

</html>
    
```          
                
                
## class操作
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul>
        <li class="li-1">1</li>
        <li class="li-2">2</li>
        <li class="li-3">3</li>
        <li class="li-4">4</li>
        <li class="li-5">5</li>
    </ul>
    <button class="btn">切换 class</button>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            $('ul').addClass('ulRef') // OR $('ul').addClass(['ulRef', 'ulRef-2'])

            // 判断是否存在摸个 class
            console.log($('ul').hasClass('ulRef')) // true

            // 删除 class
            $('ul').removeClass('ulRef') // 指定
            $('li').removeClass() // 删除全部 class


            // 切换 class
            $('.btn').click(() => {
                // 添加和删除 class 直接来回切换
                $('ul').toggleClass('toggleClass')
            })
        })
    </script>
</body>

</html>
    
```          
                
                
## 事件
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button class="btn1">btn1</button>
    <button class="btn2">btn2</button>
    <button class="btn3">btn3</button>
    <button class="btn4">btn4</button>
    <button class="btn5">btn5</button>

    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // click 和 on 的区别
            // on：可以绑定多个事件，还可以传递参数，用于筛选触发事件的后代元素，给事件添加命名空间
            // JQuery.on(events: string, handler: (eventObject: JQueryEventObject, ...args: any[]) => any): JQuery
            // 单击事件
            $('.btn1').click(() => {
                alert('bnt1Click')
            })
            // 命名空间
            $('.btn2').on('click.namespace', () => {
                alert('bnt2Click')
            })

            // mouseEnter 事件 ... mouseLeave 事件 ... mouseMove 事件 ... mouseOver 事件 ... mouseOut 事件
            $('.btn3').mouseenter(() => {
                alert('bnt3MouseEnter')
            })
            $('.btn3').on('mouseenter', () => {
                alert('bnt3MouseEnter')
            })

            // 取消事件监听
            // JQuery.off(events: string, selector?: string, handler?: (eventObject: JQueryEventObject) => any): JQuery
            $('.btn1').off('click.namespace') // 取消单击事件
            $('.btn2').off() // 取消所有事件

            // 程序自动触发事件
            $(document).click(()=>{console.log('bodyClick')})
            // 阻止事件冒泡 
            $('.btn4').click((e) => { e.stopPropagation(), console.log('bnt4Click', e) })
            $('.btn4').trigger('click') // 自动触发触发单击事件

        })
    </script>
</body>

</html>
    
```          
                
                
## 事件委托
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="div">
        <ul class="ul">
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
            <li>1</li>
        </ul>
        <span>2</span>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // $('.ul').css('background-color', 'red').click((event) => {
            //     console.log("%O", event.target)
            // })


            // 筛选触发事件的后代元素
            $('.div').css('background-color', 'red').on('click', 'span', (event) => {
                console.log("%O", event.target)
            })
        })
    </script>
</body>

</html>
    
```          
                
                
## 动画案例
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 250px;
        height: 300px;
        background-color: aqua;
    }

    .close {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>

<body>
    <div class="box">
        <button class="close">关闭</button>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            $('.close').click(() => {
                $('.box').animate({
                    bottom: -100
                }, 550)
                $('.box').animate({
                    right: -250
                }, 550, () => {
                    // 动画执行完毕，移除 DOM 
                    $('.box').remove()
                })
            })
        })
    </script>
</body>

</html>
    
```          
                
                
## 动画
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    body {
        user-select: none;
    }

    .box {
        width: 200px;
        height: 200px;
        background-color: aquamarine;
    }
</style>

<body>
    <div class="box"></div>
    <button class="btnShow">显示</button>
    <button class="btnHidden">隐藏</button>
    <button class="btnShowAnimate">animate显示</button>
    <button class="btnHiddenAnimate">animate隐藏</button>
    <button class="btnToggle">隐藏/显示</button>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            $('.btnShow').click(() => {
                $('.box').show(250, () => {
                    console.log('显示完成')
                });
            })
            $('.btnHidden').click(() => {
                $('.box').hide(250, () => {
                    console.log('隐藏完成')
                });
            })

            $('.btnShowAnimate').click(() => {
                $('.box').animate({
                    width: '200px',
                    height: '200px',
                    opacity: 1,
                }, 250, () => {
                    console.log('动画完成')
                });
            })

            $('.d').click(() => {
                $('.box').animate({
                    width: 0,
                    height: 0,
                    opacity: 0
                }, 250, () => {
                    console.log('隐藏完成')
                });
            })
            //  OR
            $('.btnHiddenAnimate').click(() => {
                $('.box').animate({
                    width: 0,
                    height: 0,
                    opacity: 0
                },
                    {
                        duration: 250,
                        complete: function () { }
                    }
                )
            })

            $('.btnToggle').click(() => {
                $('.box').toggle(250, () => {
                    console.log('完成')
                })
            })
        })
    </script>
</body>

</html>
    
```          
                
                
## 选项卡切换案例
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .nav{
        background-color: #43240c;
        color: white;
    }
    .nav-bar {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        width: 1200px;
        line-height: 50px;
        margin: 0 auto;
    }
    .item {
        width: 160px;
        text-align: center;
        cursor: pointer;
    }
    .active {
        background-color: #fee44e;
        color: #43240c;
    }
</style>
<body>
    <div class="nav">
        <div class="nav-bar">
            <div class="item active">首页</div>
            <div class="item">页面一</div>
            <div class="item">页面二</div>
            <div class="item">页面三</div>
            <div class="item">页面四</div>
        </div>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            $('div.nav-bar').on('click', 'div.item', function() {
                // 过滤器 siblings() 可以获取兄弟节点
                $(this).addClass('active').siblings().removeClass('active');
            });
        })
    </script>
</body>

</html>
    
```          
                
                
## ajax
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <button>取消请求</button>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>

        // 文档完全解析完成
        $(() => {
            $.ajax({
                url: 'http://httpbin.org/get',
                method: 'GET',
                timeout: 5000,
                dataType: 'json',
            }).then(data => {
                console.log(data);
            });
            // 取消请求
            var jqajax = $.ajax('http://httpbin.org/delay/7', {
                method: 'GET',
                timeout: 10000,
                success: function (data) {
                    console.log(data);
                },
            })
            // 手动取消请求(不能使用 promise.then,不然返回的不是一个ajax对象)
            $('button').click(() => {
                jqajax.abort();
            })

            $.get('http://httpbin.org/get').then(data => {
                console.log(data);
            });

            $.post('http://httpbin.org/post', {
                name: 'jquery',
                age: 18
            }
            ).then(data => {
                console.log(data);
            });

            $.ajax({
                url: 'http://httpbin.org/post',
                method: 'POST',
                data: {
                    name: 'jquery',
                    age: 18
                },
                contentType: 'application/x-www-form-urlencoded', // 默认
            }).then(data => {
                console.log(data);
            });

            $.ajax({
                url: 'http://httpbin.org/post',
                method: 'POST',
                data: JSON.stringify({
                    name: 'jquery',
                    age: 18
                }),
                contentType: 'application/text', // 默认
            }).then(data => {
                console.log(data);
            });
        })
    </script>
</body>

</html>
    
```          
                
                
## 遍历
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <ul class="list">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            // 对象的 each 
            // JQuery.each(func: (index: number, elem: Element) => any): JQuery
            $('ul li').each((index,elment) => {
                console.log(index,elment)
            })

            // 函数的 each 
            // JQueryStatic.each(collection: any, callback: (indexInArray: any, valueOfElement: any) => any): any
            $.each($('ul li'),(index,elment) => {
                console.log(index,elment)
            })
        })
    </script>
</body>

</html>
    
```          
                
                
## 动画队列
    
```html
    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<style>
    .box {
        position: relative;
        width: 100px;
        height: 100px;
        background-color: aqua;
    }
</style>

<body>
    <div class="box"></div>
    <button class="start">开始动画</button>
    <button class="stop">停止动画</button>
    <button class="queue">查看动画队列</button>
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script>
        // 文档完全解析完成
        $(() => {
            $('.start').click(() => {
                // 动画队列 依次执行
                $('.box').animate({
                    top: 100,
                }, 2000)

                $('.box').animate({
                    left: 100,
                }, 2000)

                $('.box').animate({
                    top: 0,
                }, 2000)

                $('.box').animate({
                    left: 0,
                }, 2000)
            })

            $('.stop').click(() => {
                // JQuery.stop(clearQueue?: boolean, jumpToEnd?: boolean): JQuery
                // $('.box').stop() // 停止当前正在执行的动画，剩下的动画仍然会依次执行

                // $('.box').stop(true) // 停止所有动画

                $('.box').stop(true, true) // 停止所有动画，并且清除动画队列, 并立即执行完当前动画
            })

            $('.queue').click(() => {
                // 查看动画队列  JQuery.queue(queueName?: string): any[]
                console.log($('.box').queue())  // 返回动画队列
            })
        })
    </script>
</body>

</html>
    
```          
                
                