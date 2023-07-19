# 前端面试

 

## CSS

### **继承（哪些属性可继承）**

```css 
font-family
font-style
font-weight
font-variant
letter-spacing (字母间距)
font-size
line-height
text-align
text-indent
text-transform
color
......
```

### 如何区分 px/em/rem/vw/vh

1. px

   > 像素，网页基本长度单位

2. em

   > 相对长度单位，相对于当前父节点的文本字体尺寸

3. rem

   > `css3` 新增的一个相对长度单位，基于 `html`元素的字体大小决定,通常配合媒体查询解决移动端适配问题

4. `vw` `vh` 

   > 相对于视口的长度单位，`1vw`即视为视口宽度的1%

### **如何实现左边定宽，右边自适应** 

​    `HTML`结构

```html
<div class="wrapper">
    <div class="left"></div>
    <div class="right"></div>
</div>
```

1. 方式一（浮动 + calc）`非严格意义上的`

   ```css
   .wrapper {
       width:600px;
       height:400px;
       border:1px solid grey;
   }
   .left {
       float:left; /* 左浮动 */
       width:200px;
       height:100%;
       background:red;
   }
   .right {
       float:right; /* 右浮动 */
       width:calc( 100% - 200px );  /* 计算 */
       height:100%;
       background:skyblue;
   }
   ```

2. 方式二（flex布局）`严格意义上的`

   ```css
   .wrapper {
      width:600px;
      height:400px;
      border:1px solid grey;
      display:flex;
   }
   .left {
      width:200px;
      height:100%;
      background:red;
   }
   .right {
       flex:1;  /* right盒子占满剩余空间 */
       height:100%;
       background:skyblue;
   }
   ```

3. 方式三（table-cell）`严格意义上的`

   ```css
   .wrapper {
      width:600px;
      height:400px;
      border:1px solid grey;
      display:table;
   }
   .left {
      width:200px;
      height:100%;
      background:red;
      display:tabel-cell;
   }
   .right {
       height:100%;
       background:skyblue;
       display:tabel-cell;
   }
   ```

4. 方式四（grid 栅格布局）`严格意义上的`

   ```css
   .wrapper {
      width:600px;
      height:400px;
      border:1px solid grey;
      display:grid;
   
      /* 声明列的宽度 left宽度为200px,right宽度自动 */
      grid-template-colums:200px auto; 
   }
   .left {
      background:red;
   }
   .right {
       background:skyblue;
   }
   ```

   

### **实现绝对居中**

```HTML结构```

```html
<div class="wrapper">
   <div class="center"></div>
</div>
```

    1. 绝对定位 + 负margin值

```css
.wrapper {
    width:300px;
    height:300px;
    border:1px solid black;
    /* 父元素开启相对定位 */
    positon:relative;
}
.center {
    width:100px;
    hieght:100px;
    background:skyblue;
    position:absolute;
    letf:50%;
    top:50%;
    /* 偏移自身的一半 */
    margin-left:-50px;
    margin-top:-50px;
}
```

    2. 绝对定位 + margin auto

```css
.wrapper {
    width:300px;
    height:300px;
    border:1px solid black;
    /* 父元素开启相对定位 */
    positon:relative;
}
.center {
    width:100px;
    hieght:100px;
    background:skyblue;
    position:absolute;
    letf:0;
    top:0;
    right:0;
    bottom:0;
    margin:auto;
}
```

   ```3.绝对定位 + transform```

```css
.wrapper {
    width:300px;
    height:300px;
    border:1px solid black;
    /* 父元素开启相对定位 */
    positon:relative;
}
.center {
    width:100px;
    hieght:100px;
    background:skyblue;
    position:absolute;
    letf:50%;
    top:50%;
    transform:translate(-50%,-50%)
}
```

   ```4.flex 布局```

```css
.wrapper {
    width:300px;
    height:300px;
    border:1px solid black;
    /* 关键因素 */
    display:flex;
    justify-content:center;
    aligin-items:center;
}
.center {
    width:100px;
    hieght:100px;
    background:skyblue;
}
```

### **清除浮动方法**

​    > 浮动带来的问题 ==> 父元素不定宽高时 ==> 高度塌陷

  1. 方案一：父元素固定宽高

  2. 方案二：添加新元素（添加 `clear:both`）

  3. 方案三：使用伪元素

     ```css
     /* 对父元素添加伪元素   ==> 与添加新元素方案类似 */ 
     .wrapper:after {
         content:"";
         display:block;
         height:0;
         clear:both;
     }
     ```

  4. 方案四：触发父元素`BFC`

           1. `overflow:hidden`
           2. `float:left`
           3. `position:absolute`
           4. `display:inlne-block`

### **如何使用 css 画一个三角形**

```html
<div class="triangle"></div>
```

```css
.triangle {
    width:0;
    border:10px solid transparent;
    /* 箭头向右  */
    border-left:10px solid red;
    /* 箭头向左 */
    border-right:10px solid red;
     /* 箭头向上 */
    border-bottom:10px solid red;
     /* 箭头向下 */
    border-top:10px solid red;
}
```

### **css 性能优化有哪些**

1. 属性设置使用简写（减小包体积）

    ```css
    p {
        margin-top:10px;
        margin-right:20px;
        margin-bottom:30px;
        margin-left:40px;
    }
    /* 采用简写的方式 */
    p {
        /* 方向：上 右 下 左 */
        margin:10px 20px 30px 40px;
    }
    ```

2. 用 css 替换图片（减少 `http` 请求）

3. 删除不必要的 0 和单位（减小包体积）

4. 使用精灵图替代单个文件加载（减少 `http` 请求）




## JavaScript

### **`bind` `call` `apply`**

1. bind 绑定 this 并返回一个新的函数。该函数的 this 被已固定和改变

2. call apply  bind传参 方式不同 

   1. call(thisArg，参数一，参数二，参数三.....)
   2. applay(thisArg，[参数一，参数二，参数三......])
   3. bind(thisArg，参数一，参数二，参数三......)

3. 使用场景

   1. call

      ```js
      const arr = [1,2,3,4]
      //判断数据类型
      Object.prototype.toString.call(arr)
      //类数组转数组
      const sameArry = {
          0:"name",
          1:"age",
          2:"height",
          3:"gender",
          length:4
      }
      Array.prototype.slice.call(sameArry) // ["name", "age", "height", "gender"]
      ```

   2. apply

      ```js
      //给定数组求最大值/最小值
      const arr = [1,2,3,4,5]
      //方式一
      Math.max(...arr) //5
      //方式二
      Math.max.apply(null,arr) //5
      ```

   3. bind

      ```js
      class APP extends React.Componnets {
          constructor(props){
              super(props)
              //绑定函数的this指向当前实例
              this.handelClick = this.handelClick.bind(this)
          }
          // class 默认开启严格模式, 在class中函数中的this指向undifined
          handelClick(){
              consloe.log(this)
          }
          render(){
              return (
              <button onClick={this.handelClick}>点击<button>
              )
          }
      }
      ```

### **如何实现多种方式数组去重**

1. 基本数组去重

```js
const arr = [1,2,3,4,5,4,3,2,1]

//包含2就会返回2在数组中第一次出现位置的下标值，否则返回-1
arr.indexOf(2) 

//返回数组中值为偶数的项
const res = arr.filter((item,index) => item / 2 === 0 ) 

//返回一个从小到大排序的数组
const res = arr.sort((a,b) => a-b ) 

//数组求和
const res = arr.reduce((pre,cur) => pre + cur ,init=0) 

 //向目标数组添加元素，返回值是目标元素的 length
arr.push(1)

//方式一
const  hanldeErr = (arr) => {
    if(!Array.isArry(arr)){
        throw Error('arr不是一个数组')
    }
}
const unique = (arr) => {
    hanldeErr(arr)
    return arr.filter((item,index) => {
        // arr.indexOf(item) 拿到 item 在数组中的下标看是否已存在
        return arr.indexOf(item) === index
    })
}

//方式二(相邻元素排序)
const unique = (arr) => {
    hanldeErr(arr)
     //将原数组排序   
    arr = arr.sort()
    const res = []
    for(let i = 0; i < arr.length; i++){
        // 前后两个元素比较 如果不相等则 push 进去
        if(arr[i] !== arr[i - 1]){
            res.push(arr[i])
        }
    }
    return res
}

//方式三（Set 解构赋值）
const unique = (arr) => {
    hanldeErr(arr)
    // new Set(arr) 返回一个类数组对象，需要将其解构展开为数组
    return [...new Set(arr)] 
}

//方式四(Set Array.from())
const unique = (arr) => {
    hanldeErr(arr)
    return Array.from(new Set(arr)) 
}
```

### 对象数组去重

```js
const arr = [
    {name:'Tom',age:18},
    {name:'sily',age:16},
    {name:'Tom',age:18}
]

// 方式一（临时对象缓存数组key值）
const unique = (arr, key) => {
    hanldeErr(arr)
    const res = []
    const tem = {}
    for(let i = 0; i < arr.length; i++ ){
        const keyName = arr[i][key]
        if(tem[keyName]){
            //跳过当次循环
            continue
        }
        tem[keyName] = true
        res.push(arr[i])
    }
    return res
}
unique(arr,'name')


//方式二
const unipue = (arr, key) => {
    handleErr(arr)
    const cacheObj = {}
    return arr.reduce((pre,cur) => {
        cacheObj[cur[key]] ? "" : cacheObj[cur[key]] = true && pre.push(cur)
        return pre
    },[])
}
```



### **给定数组求最大值**

```js
const arr = [1,2,3,4,,5,6]

//方式一(Math.max())
Math.max(...arr)
//or
Math.max.apply(null,arr)

//方式二（reduce）
const getMax = (arr) => {
    return arr.reduce((pre,cur) => {
        return cur > pre ? cur : pre
    })
}

//方式三
const getMax = (arr) => {
    //将数组从小到大排序
    const res = arr.sort()
    //返回最后一项（最大）
    return res[res.length - 1] 
}
```

### JS**判断数据类型有哪些方法**

```js
//基本数据类型
String Number Boolean Symbol undifined Null
//引用数据类型
Object Array Function Date FormData Set Map ......

//方式一 (不能具体区别 Object)
typeof
//方式二
Object.prototype.toString.call('oderType')
//方式三
instanceOf
```

### **函数节流**

```js
// 单位时间内只触发一次
// 使用场景 window.onresize() mousemove 事件监听等

// 方案一
const throttle = (fn,delay) => {
    let pre = 0
    return (...args) => {
        let now = new Date()
        if(now - time > delay){
            fn,apply(this,args)
        }
        pre = now
    }
}

// 方案二
const throttle = (fn,delay) => {
    let timer
    return (...args) => {
       if(!timer){
            timer = setTimeout(()=>{
            fn.apply(this,args)
            timer = null
        },delay)
       }
    }
}
```

### **函数防抖**

```js
// 事件 N 秒后执行,在 N 秒内又被触发则重新计时
// 使用场景 输入框搜索

const debounce = (fn, delay) => {
    let timer = null
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
```

### **数组的扁平化**

```js
const arr = [
    [1, 2, 3], 4, 5, [6, 7], 8, [9, [10, 11, 12]]
]

// 方式一(reduce)
const flatArr = (arr) => {
    return array.reduce((pre, cur) => {
        return pre.concat(Arry.isAraay(cur) ? flatArr(cur) : cur)
    }, [])
}

// 方式二(flat ES6)
// 参数表示需要展开的层级，Infinity 表示最大层级
arr.flat(Infinity)

// 方式三 (while循环)
const flatArr = (arr) => {
    while(arr.some(Array.isArray) {
        arr = [].concat(...arr)
    }
 return arr
}
```

### **如何实现 new 操作符**

```js
const TMap = (options) => {
    constructor(){
       this.name = options.name
       this.address = options.address
    }
}
const tmap = new TMap({ name:'China', address:'Beijing' })


// 模拟 new
const ObjectFactory = (...args) => {
    const obj = {}
    const Constructor = [].shift.call(args)
    obj.__proto__ = Constructor.prototype
    const ret = Constructor.apply(obj,args)
    return typeof ret === 'object' ? ret : obj
}
const map = ObjectFactory(TMap,{name:'China', address:'Beijing'})
```

### **实现一个 bind 函数**

```js
Function.prototype.bindFn = (thisArg, paload ) => {
    // 获取原函数
    const fn = this
    // 获取 bind 的 this
    const obj = thisArg
    // 获取原来传递的参数
    const args = paload
    // 返回一个函数
    return (...otherArgs) => {
        // 绑定this
        fn.apply(obj,[...otherArgs, ...args])
    }
}
```

### **实现 call apply 函数**

```js
// call
Function.prototype.callFn = (thisArg, ...args) => {
    const fn = this
    // 当传入的 this 参数不是对象时，那么 this 就默认为 window
    thisArg = thisArg ? Object(thisArg) : window
    thisArg.fn = fn
    const result = thisArg.fn(...args)
    // 函数执行完毕之后需要删除掉 thisArg 上的属性
    delete thisArg.fn
    return result
}
// apply
Function.prototype.applyFn = (thisArg, args) => {
    const fn = this
    thisArg = thisArg ? Object(thisArg) : window
    thisArg.fn = fn
    //是否有传入参数
    arrArg ? thisArg.fn(...arrArg) : thisArg.fn()
    delete thisArg.fn
}
```

### **实现 instanceof**

```js
// 使用
function Person(){
    this.name = 'Tom'
}
const p = new Person()
consloe.log(p instanceof Person) // true

// 实现
const instance_of = (obj, Constructor) => {
    // 获取检测对象的隐式原型
    const objPrototype = obj.__proto__
    // 获取实例对象的显示原型
    const ConPrototype = Constructor.prototype
    // 在原型链上进行查找
    while(true) {
        if(objPrototype === null) {
            return false
        }else if(objPrototype === ConPrototype) {
            return true
        }
        objPrototype = objPrototype.__proto__
    }
}

// 版本二
function isPrototypeOf(obj) {
    var proto = this.prototype
    while (obj) {
        if (obj === proto) {
            return true
        }
        obj = Object.getPrototypeOf(obj)
    }
    return false
}
```

### **let const var 区别**

```js
let const 不存在变量提升
let const 存在块级作用域
let const 暂时性死区
const 必须赋值 不可重新赋值一个全新的变量
let const 不会挂载到window上
```

### **箭头函数与普通函数的区别**

```js
1. this 箭头函数的 this 指向当前父级作用域的 this
2. call apply bind 无法改变箭头函数的指向
3. 箭头函数没有 arguments
4. 箭头函数不能 new 因为它没有 this
5. 不能使用 new.target
```

### **ES6 中对象新增的方法**

```js
// 用于判断两个值以及数据类型是否相等
1. Object.is()
    - Object.is({},{}) // false
    - Object.is(1, 1) // true
// 用于合并两个目标对象，返回一个新的对象
2. Object.assign()
    - Object.assign({name:'Tom'},{age:18}) // { name:'Tom', age:18 }
// 用于遍历目标对象的键名
3. Object.keys()
    - Object.keys({ name:'Tom', age:18 }) // ['name', 'age']
// 用于遍历目标对象的键值
4. Object.values()
    - Object.values({name:'Tom', age:18 }) // ['Tom', 18]
// 用于遍历目标对象的键名&键值 返回一个数组
5. Object.entries()
    - Object.entries({name:'Tom', age:18 }) // [[' name', 'age' ], [ 'Tom', 18 ]]
```

### **class 和 function 的区别**

- 相同点

  都可以用作构造函数

- 不同点

  class 不可以使用 call apply bind 改变 this 指向

### **Promise**

> Promise 是异步编程的一种解决方案，相比传统的回调函数更合理

- 基本使用

  ```js
  new Promise((resolve,reject) => {
      // 三个状态： pending | fulfilled | reject
      if(true) {
          resolve('成功')
      }else{
          reject('失败')
      }
  }).then(res => {}).catch(err => {})
     // OR 
    .then(res => {},err => {})
  ```

- promise 原型方法

  ```js
  1. then()      // 成功 支持链式调用，返回一个新的 Promise
  2. catch()     // 失败
  3. all()       // 所有promise完成之后返回结果 [数组]
  3. race()      // 优先返回第一个执行完毕的结果
  4. finally() // 无论失败还是成功都会执行(一般用于关闭 loading)
  ```



## React

### 基础篇



#### **react 生命周期**

- 16.3版本之前

  ```js
  componentWillMount           // 挂载前
  componnetDidMount          // 挂载
  componentWillReceiveProps    // 接收props参数前
  componnetWillupdate          // 更新前
  componnetDidUpdate         // 更新后
  componnetWillUnmount       // 卸载前
  ```

- 16.3版本之后

  ```js
  // 废弃了三个生命周期,若需要使用需要添加前缀 UNSAVE_
  componentWillMount           // 挂载前
  componnetDidMount          // 挂载
  componnetWillupdate          // 更新前
  
  // 新增生命周期
  // 组件初次渲染以及 props 更新 返回值可以用于更新组件 state
  static getDerivedStateFromProps             
  
  // 返回 true 时更新组件 返回 false 不更新组件
  shouldComponentUpdate(nextProps,nextState) 
  
  // 组件初次渲染以及 props 更新 获取组件实例更新前的快照
  getSnapshotBeforeUpdate()                
  
  // 组件发生错误
  static getDerivedStateFromError()        
  
  // 组件发生错误
  componnetDidCatch()             
  ```

#### **react父子组件通信**

1. 父传子

   ```js
   // 1. Props(父传子)
          const Prarent = () => {
              const child = React.creactRef()
              // 获取到子组件，并调用子组件中的方法
              child.curren.fn('value')
              return (
               <children name={'Tom'} ref={ child } />
              )
          }
   
          const children = ({ name }) => {
              const fn = (value) => {
                  console.log(value)
              }
              return (
               <h2>{ name }</h2>
              )
   ```

   

2. 子传父

    ```js
    // 思路实现
    // - 父组件给子组件传递一个函数类型的 Props
    // - 子组件接受到这个函数类型的 Props 并在调用时传递参数
    // - 该函数会在父组件中执行并能够接受到参数
    
    
    // 利用事件冒泡原理(只能传递事件，不能携带参数)
    const Pc = () => {
        const btnClick = () => {
            // dosomething
        }
        return (
         <div onClick = { () => btnClick() }>
             // 当点击子组件时，会冒泡到父组件中，并触发父组件的响应函数
             <child />
            </div>
        )
    }
    ```

#### **setState同步 OR异步**

```js
// 1. 同步事件（宏任务）
 - 原生事件( doucument.getId.click() )
 - setTimeout
// 2. 异步事件
 - react合成事件( onClick() )
 - 生命周期函数
// 本质：
 - 本身执行的代码和过程是同步的，只是合成事件和钩子函数中的逻辑是在视图更新之前，
 - 所以导致了在合成事件和钩子函数无法获得更新之后的值，就形成了所谓的异步
```



#### **setState两次，render执行几次**

```js
// 一次
// setState 机制 合并所有setState 执行完毕之后再 render  ==> 出于对性能的考虑
```



#### class组件和函数式组件区别

- 函数式组件纯函数，输入props，输出jsx
- 没有组件实例，没有生命周期，没有state



#### 受控组件 & 非受控组件

- input 监听数据，绑定vlue值 受控组件
- input  type='file' 非受控组件，其value值不能控制，必须使用DOM操作



#### Portals(传送门)

- 让组件渲染到父组件以外（vue Teleport）

  ```react
  import React from 'react'
  class Protals extends React.component {
      render(){
          return (
              // 将Modal组件渲染到body身上
          	React.createProtal(
              	<div className="modal">
                  	{ this.props.children }
                  </div>,
                  document.body // DO节点
              )
          )
      }
  }
  ```

- 使用场景

  - 父组件太小或是 z-index 优先级不高
  - fixed需要放在body第一层
  - 弹出窗口



#### Context(组件信息共享)

```react
export const ThemeContext = React.createContext('light')
class Root extends React.component {
	// 根组件    
    this.state = {
        theme:{}
    }
    render(){
        <ThemeContext value={ this.state.theme }>
        	<child />
        </ThemeContext>
    }
}

// 函数式组件使用 Hook
import { ThemeContext } from '@/root'
function Child(){
    const theme = useContext(ThemeContext);
    return (
    	<span> { theme } </span>
    )
}
// class组件
import { ThemeContext } from '@/root'
class Child extends React.component {
	// 子孙组件    
    static contextType = ThemeContext;
    render(){
       <span>{ this.context }</span>
    }
}
```



#### 异步组件的加载

- import()

- React.lazy

- React.Suspense

  ```react
  const AsyncCom = React.lazy(() => import('@/componnet'))
  
  render(){
      return (
      	<React.Suspense fallback={<span>Loading...</span>}>
          	<AsyncCom />
          </React.Suspense>
      )
  }
  ```



#### 性能优化

- shouldComponnetUpdate

  ```js
  // 该函数默认返回true
  shouldComponnetUpdate(nextProps,nextState) {
      if(){
          return false
      }
      return true
  }
  ```

  

- PureComponnet 和React.memo(浅比较)

- 不可变值，immutable.js



#### 高阶组件HOC

```js
// 高阶组件不是一种功能，而是一种设计模式
const HOCFactory = (Component) => {
    class HOC extends React.component {
        // 在此定义多个组件的公共逻辑
        render(){
            // 返回一个拼装的结果组件
            return <Component {...this.props} />  
        }
    }
    return HOC
}

const EnhancedComponnet = HOCFactory(COmponnet)
```



#### render Props

> 给子组件传递一个render属性，该属性是一个函数，并且返回一个jsx表达式的组件
>
> 这个组件传递到子组件中进行渲染

```jsx
class Factory extends React.component {
    this.state = {
        // 公共逻辑的数据
    }
	render(){
        return (
        	<div>
            	{
                    // 渲染传进来的组件
                    this.props.render(state)
                }
            </div>
        )
    }
}

const APP = () => {
    // 传入一个rende属性，该属性返回一个jsx组件并能够获取到数据
    <Factory render={ (state) => <p>{ state }</p> }></Factory>
}
```



#### Redux

- 单项数据流

  ![image-20220616132129860](https://s2.loli.net/2022/06/16/HB8csXaqA51wpP7.png)

- react-redux

  - Provider
  - connect
  - mapStateToProps 和 mapDispatchToProps

  ```jsx
  import { Provider } from 'react-redux'
  const store = createStore(TODOReducer)
  export default function(){
      return <Provider store={store}>
          	<App />
      	  </Provider>
  }
  ```

- redux中间件

  ![image-20220616131546295](https://s2.loli.net/2022/06/16/UxityVEqZB3bASh.png)





#### React-router



### 原理篇

#### 函数式编程

- 纯函数
- 不可变值

#### VDOM 和diff

- h函数

- vnode数据结构

  ```js
  const vDOM = {
      tag:'div',
      props:{
          className:'wrapper',
          id:'root'
      },
      children:[
          {
              tag:'p',
              props:null,
              chidlren:'DOM'
          },
          {
              tag:'span',
              props:{
                  style:'font-size: 20px'
              },
              children:'DOM'
          }
          // ......
      ]
  }
  ```

  

- patch函数



#### JSX本质

- vue模板不是html
- JSX不是JS

```js
React.createElement("div",null,[React.createElement('span',{class:'span'},'文本节点')])
```



#### 为什么要有合成事件的机制

- 更好地兼容性和跨平台
- 减少内存消耗，避免频繁解绑
- 方便统一管理



#### setState

![image-20220616160127930](https://s2.loli.net/2022/06/16/8vLTuC3FMc2AaYj.png)





### Hooks

#### useState

```jsx
import { useState } from 'react'
const [ count, setCount ] = useState(0)

const changeCount = () => {
    setState((count) => count++)
}
```



#### useEffect

```jsx
import { useEffect } from 'react'
function APP(){
    useEffect(() => {
     	
        // 组件卸载时执行该函数
        return () => {
            
        }
        
    },[dep])
}
```



#### useRef

```jsx
import { useRef } from 'react'
function APP(){
    // 获取DOM节点
    const spanRef = useRef(null)
    return (
    	<div>
        	<span ref={ spanRef }></span>
        </div>
    )
}
```



#### useContext

```jsx
import { useContext } from 'react'
const ThemeContext = useContext()

const light:{ color:'white',background:'black'}

// 提供组件
function APP(){
    return 
     <ThemeContext.Provider value={ light }>
        <Child />
     </ThemeContext>
}

// 消费组件
function Child(){
    const theme = useContext(ThemeContext)
    return <span>{ theme.color }</span>
}
```



#### useReducer

```jsx
import { useReducer } from 'react'

// 初始值
const initValue = {
    count:0
}

const reducer = (state,action) => {
    switch(action.type){
        case 'increment' :
            return {
                count:state.count++
            }
        case 'decrement' :
            return {
                count:staet.count--
            }
         default :
            return state
        
    }
}

function APP(){
    const [ state, dispatch ] = useReducer(reducer,initValue)
    const increment = () => {
        dispatch({
            type:'increment'
        })
    }
    const decrement = () => {
        dispatch({
            type:'decrement'
        })
    }
    return (
    	<span>{ state.count }</span>
    )
}

```



#### useMemo(缓存数据)

```jsx
// 父组件渲染时，子组件无条件也会跟着渲染
// 1. 使用memo将子组件包裹起来
// 2. 使用useMemo缓存数据
import { memo, useMemo } from 'react'

function APP(){
    // const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
     // 用 useMemo 缓存数据， 有依赖项，当依赖变化时缓存失效
    const userInfo = useMemo(() => {
        return {
            name,
            age
        }
    },[name,age])
    return 
    <div>
    	<Child userInfo={ userInfo } />
    </div>
}

// 使用memo包裹，类似于 class PureComponnet ,对props进行浅层比较，判断是否需要重复渲染
function memo(Child({ name, age }){
    return 
    <span>{ name }</span>
    <span>{ age }</span>
})
```



#### useCallback（缓存函数）

```jsx
// 当父组件更新时，子组件不会跟着一起更新
import { memo, useCallBack } from 'react'

function App(){
    const onChange = useCallBack(() => {
        // 缓存函数
    },[])
    
    return <Child onChange={ onChange } />
}

function memo(Child({ onChange }){
    <button onClick={ onChange }></button>
})
```





#### 自定义Hook

```js
import axios from 'axios'
import { useState, useEffect } from 'react'

const useAxios = (url) => {
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState()
    const [ data, setData ] = useState()
    
    useEffect(()=>{
        setLoading(true)
        axios.get(url)
        	.then(res => setData(res))
		    .catch(err => setError(err))
        	.finally(() => setLoading(false) )
    },[url])
    
    return [ loading, error, data ]
}
```











## Vue2.0



### 基础篇



#### **生命周期**

```js
// 创建阶段
 - beforeCreate
 - created (vue实例初始化)
 - breforeMount
 - mounted (DOM挂载完毕)

// 运行阶段
 - beforeUpdate
 - updated

// 销毁阶段
 - beforeDestroy
 - destroyed

// 生命周期 - 父子组件
// 组件的创建是先从父组件开始
// 组件的渲染是先从子组件开始
// 组件的更新：
// 父组件beforeUpdate ==> 子组件beforeUpdate ==> 子组件updated ==> 父组件updated
// 组件的卸载：子组件 ==> 父组件
```

#### 组件通信

1. props & emit (父子组件)
2. 事件总线，第三方库mitt(兄弟跨组件)
3. vuex

#### 自定义 v-model

```vue
<template>
	<input :value="text" @input="$emit('change', $event.target.value)" />
</template>
<script>
    export default {
        model:{
            prop:'text' //对应props中的text
            event:'change'
        }
        props:{
            text:String,
            default(){
                return ''
            }
        }
    }
</script>

// 使用

<template>
	<Input v-model = "value" />
</template>
```



#### nextTick

```vue
<!--
1. Vue是异步渲染的
2. 当data改变之后，DOM不会立刻渲染，data整合一次性渲染（性能优化）
3. nextTick会在DOM渲染之后被触发，以获取最新的DOM节点
-->
```



#### slot(插槽)

- 基本使用

  ```vue
  <!-- Child组件 -->
  <template>
  	<div>
          <slot>默认类容，当父组件没有设置内容时，这里会显示</slot>
      </div>
  </template>
  
  <!-- 父组件 -->
  <tempalte>
  	<Child>
      	<span>这里设置了类容，会替换掉 slot 中的默认内容</span>
      </Child>
  </tempalte>
  ```

- 作用域插槽

  ```vue
  <!-- 子组件中的数据需要传递给父组件 -->
  
  <!-- Child组件 -->
  <template>
  	<div>
          <!-- 子组件传递数据 -->
          <slot :slot="childrenData">默认类容，当父组件没有设置内容时，这里会显示</slot>
      </div>
  </template>
  
  <script>
  	export defualt {
          data(){
              return {
                  childrenData:{
                      value:'xxxx'
                  }
              }
          }
      }
  </script>
  
  <!-- 父组件 -->
  <tempalte>
      <!-- 父组件中插入的 stolt 需要获取到子组件中的数据-->
  	<Child>
          <!-- 这里获取到子组件传递过来的数据，名字可以随便取 -->
          <template #slotProps>
          	<span>这里设置了类容，会替换掉 slot 中的默认内容</span>
  			<!-- 使用 -->
  			<span>{{slotProps.childrenData}}</span>
          </template>
      </Child>
  </tempalte>
  ```

- 具名插槽

  ```vue
  <!-- Child组件 -->
  <template>
  	<div>
          <slot name="left">left</slot>
          <slot name="center">left</slot>
          <slot name="right">left</slot>
      </div>
  </template>
  
  <!-- 父组件 -->
  <tempalte>
  	<Child>
      	<template #left>
  			<span>这里会替换掉子组件的left插槽</span>
          </template>
          <template #center>
  			<span>这里会替换掉子组件的center插槽</span>
          </template>
          <template #right>
  			<span>这里会替换掉子组件的right插槽</span>
          </template>
      </Child>
  </tempalte>
  ```

  

#### 动态、异步组件

1. 动态组件

```
<!-- 
用法： :is = "components-name"
场景：渲染组件类型不确定，需要根据条件判断渲染哪个组件
-->
<template>
	<component :is="componentName" />
</template>

<script>
    import One from '@/componnets/One'
    import Two from '@/componnets/One'
	export defualt {
        computed:{
            componnetName(){
                const isXXX = true
                return isXXX ? 'One' : 'Two'
            }
        }
    }
</script>
```

2. 异步组件

```vue
<script>
	export defualt {
        components:{
            // 异步加载组件，打包时会单独打包
            AsyncComponent:() => import('@/componets/AsyncComponent')
        }
    }
</script>
```



#### keep-alive

```vue
<!--
	缓存组件
	频繁切换，不需要重复渲染
	keep-alive 中的组件的生命周期不会重复执行
	Vue常见性能优化
-->
<!-- ----------------------------------------------------------------------------------------------------------- -->
<!-- A 组件 -->
<script>
	export default {
        // 这些生命周期只会第一次执行
        beforeCreted(){}
        create(){}
        mounted(){}
        uodate(){}
    	// ......
    }
</script>
<!-- ----------------------------------------------------------------------------------------------------------- -->
<template>
	<keep-alive>
    	<A />
		<B />
    </keep-alive>
</template>
<script>
import A from '@/components/A'
import B from '@/components/B'
export default {
    components:{
        A,
        B
    }
}
</script>
```



#### ~~mixin（废弃）~~

```js
// mixin
export default {
	data(){},
    methods:{},
    mounted(){},
    // ......
}
```

```vue
<script>
    import myMinxin from '@/mixin'
	export default {
        // mixin 会和当前组件进行合并
        mixins:[myMinxin]
    }
</script>
```





### 原理篇

#### 响应式

```js
// 核心API: 
// vue2.0 : Object.defineProperty
// vue3.0 : Proxy

const data = {
    name:'xxx'
}

Object.defineProperty(data, 'name', {
    get(){
        console.log('监听到name数据被访问')
        return data.name
    }
    set(newValue){
    	consloe.log('监听到name数据被设置')
    	data.name = newValue
	}
})

// Object.defineProperty 的不足
// 1. 不能监听新增/删除属性
// 2. 不能监听对数组的操作
// 3. 深层对象递归监听，性能极差
```



#### 虚拟DOM

```html
<div class="wrapper" id="root">
    <p>DOM</p>
    <span style="font-size:20px">DOM</span>
</div>
```

```js
const vDOM = {
    tag:'div',
    props:{
        className:'wrapper',
        id:'root'
    },
    children:[
        {
            tag:'p',
            props:null,
            chidlren:'DOM'
        },
        {
            tag:'span',
            props:{
                style:'font-size: 20px'
            },
            children:'DOM'
        }
        // ......
    ]
}
```

#### diff算法

```js
// - 优化时间复杂度
// 1. 同级比较
// 2. tag不同直接删除重建，不再深度比较
// 3. tag 和 key 两者相同才能被认为相同节点，不再深度比较

// snabbdom 源码解读
```



#### 模板编译

- JS with语法

```js
const obj = {
    a:10
    b:20
}
// 使用with,能改变 {} 内自由变量的查找方式
with(obj){
    console.log(a) // 10
    console.log(b) // 20
    console.log(c) // 会报错
}
```

- compiler

```js
import compiler from 'vue-template-compiler'

// 插值
const template = `<p>{{msg}}</p>`
const result = compiler.compile(template)
console.log(result.render) // with(this){ return _c('p',[_v(_s(msg))]) } 
// 返回一个 h 函数
// _c 表示：createElement 
// _v表示：createTextVNode
// _s表示：toString

// h 函数也就是 _c 返回的是一个VNode
```

#### 渲染过程

- 初次渲染
  1. 解析模板为render函数（或在开发环境已完成，vue-loader）
  2. 触发响应式，监听data属性的 get 和 set
  3. 执行render函数，生成vnode，patch(el, vnode)
- 更新过程
  1. 修改data，触发setter
  2. 重新执行render函数，生成新的vnode
  3. patch(vnode,newvnode)

#### 异步渲染

整合数据修改，一次性渲染视图，减少DOM操作，提升性能

#### 前端路由

- vue-router路由模式
  - hash
  - history
- hash特点：
  - hash的变化会触发网页的跳转，但浏览器不会刷新
  - hash不会提交到server端

```html
<button>修改 Hash</button>	

<script>
	window.onhashchange = (e) => {
        console.log(e.oldURL)
        console.log(e.newURL)
        console.log(location.hash)
    }
    // 改变 hash
    btn.onclick = () => {
        location.hash = '#/user'
    }
    // hash 的变化包括：
    // 手动修改
    // JS控制
    // 浏览器前进 后退按钮
</script>
```

- H5 history
  - history.pushState
  - window.onpopstate



### 面试题目

#### v-if和v-show的区别

- v-show是通过css样式的display属性控制元素的显示和隐藏，vue会渲染该元素
- v-if是组件真正的渲染和销毁，而不是显示和隐藏



#### 为何需要在v-for中使用key

- diff算法中通过tag和key来判断是否是sameNode（相同节点）
- 减少渲染次数，提升渲染性能
- 如果需要对列表数据进行添加删除操作，key能够保证他们的顺序是正确的



#### 组件通讯

- 父子组件 props&emit
- 自定义事件event&mitt
- vuex



#### 描述组件渲染和更新的过程

:package:	:package:





#### 双向绑定v-model的实现原理

- input元素的 vulue = this.value
- 绑定input事件 this.value = $event.target.value



#### 对MVVM的理解

:package:





#### computed特点

- 缓存，依赖不变不会重新计算



#### 为何data必须是一个函数

- 每个实例化的vue使用的data是新的
- 函数每次执行时都会返回一个新的对象
- 每个单独的组件使用自己的data，不会造成共享



#### ajax请求应该放到哪个生命周期

- mounted
- JS是单线程的，ajax异步获取数据
- 放在mounted之前没有用，只会让逻辑更加混乱



#### 如何将组件所有的props传递给子组件

- $props

  ```vue
  <User v-bind="$props" />
  ```

#### 何时使用异步组件

- 加载大组件
- 路由异步加载
- 优化性能



#### 何时使用keepAlive

- 缓存组件，不需要重复渲染
- 多个静态tab页切换
- 优化性能



#### 何时需要使用到beforeDestory

- 解除自定义事件 event.$off
- 清除定时器
- 解绑自定义事件，如window scroll等



#### 什么是作用域插槽

- 子组件中的数据需要传递到父组件中需要使用slot的地方

  ```vue
  <!-- 子组件中的数据需要传递给父组件 -->
  
  <!-- Child组件 -->
  <template>
  	<div>
          <!-- 子组件传递数据 -->
          <slot :slot="childrenData">默认类容，当父组件没有设置内容时，这里会显示</slot>
      </div>
  </template>
  
  <script>
  	export defualt {
          data(){
              return {
                  childrenData:{
                      value:'xxxx'
                  }
              }
          }
      }
  </script>
  
  <!-- 父组件 -->
  <tempalte>
      <!-- 父组件中插入的 stolt 需要获取到子组件中的数据-->
  	<Child>
          <!-- 这里获取到子组件传递过来的数据，名字可以随便取 -->
          <template #slotProps>
          	<span>这里设置了类容，会替换掉 slot 中的默认内容</span>
  			<!-- 使用 -->
  			<span>{{slotProps.childrenData}}</span>
          </template>
      </Child>
  </tempalte>
  ```

#### vuex中action和mutation有何区别

- action处理异步，mutation不可以
- mutation每次只做一个操作
- action可以整合多个mutation



#### 请用VNode描述一个DOM结构

```js
const vDOM = {
    tag:'div',
    props:{
        className:'wrapper',
        id:'root'
    },
    children:[
        {
            tag:'p',
            props:null,
            chidlren:'DOM'
        },
        {
            tag:'span',
            props:{
                style:'font-size: 20px'
            },
            children:'DOM'
        }
        // ......
    ]
}
```



#### vue如何监听数组的变化

- Object.defineproperty不能监听数组的变化
- 重新定义原型，重写push pop等方法实现监听
- proxy可以原生监听数组的变化



#### vue为何异步渲染，nextTick有何用

- 异步渲染（以及合并data修改），提高性能
- nextTick在DOM更新完之后出发的回调



#### vue常见的性能优化

- 合理使用 v-if  | v-show
- 合理使用 computed
- v-for 时添加 key,且唯一key值，避免和v-if同时使用
- 自定义事件和DOM事件需要及时销毁
- 合理使用异步组件
- 合理使用keep-alive
- data层级不要太深
- 使用vue-loader在开发环境做模板编译（预编译）
- webpack层面优化
- 图片懒加载
- 使用SSR（服务端渲染）



## Vue3.0



### 基础篇



	#### Vue3比Vue2有什么优势

- 性能更好
- 体积更小
- 更好的 TS 支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多的新功能

#### Vue3生命周期

- Options API 生命周期

  - beforeDestory 改为 beforeUnmount
  - destoryed 改为 unmounted
  - 其他的沿用Vue2的生命周期

  ```js
  export default {
      // 创建
      beforeCreated(){},
      created(){},
      // 挂载
      beforeMount(){},
      mounted(){},
      // 更新
      beforeUpdate(){},
      updated(){},
      // 销毁
      deforeUnmount(){},
      unmounted(){}
  }
  ```

  

- Composition API 生命周期

  ```js
  import { onBeforeMount, onMounted } from 'vue'
  export default {
      // 相当于 beforecreate & created
      setup(){
          // 挂载前
          onBeforeMount(()=>{
              
          })
          // 挂载
          onMounted(() => {
              
          })
          // ......
      }
  }
  ```



#### 如何理解 ref toRef 和 toRefs

- ref

  - 生成值类型的响应式数据
  - 可用于模板和reactive
  - 通过 .value 修改值
  - 获取DOM元素

  ```vue
  <template>
  	<p ref="elRef">DOM</p>
  	<span>{{name}}</span>
  	<span>{{age}}</span>
  	<span>{{otherInfo.height}}</span>
      <button @click="changeName">修改值</button>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  export default {
      setup(){
          // ref 获取DOM
          const elRef = ref(null)
          onMounted(()=>{
              console.log(elRef.value)
          })
          // 声明 ref 变量
          const name = ref('Tom')
          const age = ref(18)
          
          // 声明 reactive 变量
          const otherInfo = reactive({
              height:1.88
          })
          const changeName = () => {
              name.value = 'sily' // 通过 .value 修改值
              otherInfo.height = 1.70
          }
          return {
              name,
              age,
              changeName
          }
      }
  }
  </script>
  ```

- toRef

  - 针对一个响应式对象(reactive封装)的属性
  - 创建一个 ref ，具有响应式
  - 两者保持引用关系

  ```vue
  <template>
  	<span>{{age}}</span>
  	<span>{{state.name}}</span>
  	<span>{{state.age}}</span>
  </template>
  
  <script>
  import { ref, roRef, reactive } from 'vue'
  export default {
  	setup(){
          const state = reactive({
              name:'Tom',
              age:18
          })
          
          // 当 state 中的 age 发生改变时， 该 age 也会更新， 反之同理
          // 针对 reactive 的单个属性
          const age = toRef(state, 'age')
          
          return {
              state,
              age
          }
      }     
  }
  </script>
  ```

- toRefs

  - 将响应式对象（reactive封装）转换为普通对象
  - 对象的每一个属性都对应一个 ref 
  - 两者保持应用关系

  ```vue
  <template>
  	<span>{{name}}</span>
  	<span>{{age}}</span>
  </template>
  
  <script>
  import { ref, roRefs, reactive } from 'vue'
  export default {
  	setup(){
          const state = reactive({
              name:'Tom',
              age:18
          })
          
          // 将 state 这个响应式对象转化为一个普通对象
          // 该对象的每个属性都是 ref 对象
          // 针对reactive整个对象
          const stateRefs = toRefs(state)
          console.log(stateRefs.name.value) // name
          console.log(stateRefs.age.value) // age
          return {
              ...stateRefs
          }
      }     
  }
  </script>
  ```
  
- 为何需要 ref ?

  - 返回值类型，会丢失响应式
  - 在setup、conputed、合成函数中都有可能返回值类型
  - 简单值不具有响应式

- 为何需要.value ?

  - ref是一个对象（不丢失响应式），value存储值
  - 通过 .value 属性的get和set实现响应式
  - 同于模板和reactive时，不需要.value（解包）

- 为何需要 toRef,roRefs?

  - 初衷：在不丢失响应式的情况下，把对象数据 **分解/扩散（解构）**
  - toRef toRefs 不创造响应式，而是延续响应式




#### Vue3升级了哪些重要的功能

- createApp

  ```js
  // vue2
  const app = new Vue({/* 选项 */})
  Vue.use()
  Vue.mixin() // ......
  
  // vue3
  const app = createAPP({/* 选项 */})
  app.user().mixin().componnet().directive().mount('#app')
  ```

  

- emits属性

  ```vue
  <!-- 父组件 -->
  <template>
  	<Hello @sayHi="hiHandle" />
  </template>
  
  <!-- 子组件 -->
  
  <script>
  	export default {
          emits:['hiHandle']
          // OR setup语法
          const emit = defineEmits(['change', 'delete'])
          
          setup(props, { emit }){
              const btnClick = () => {
              // 触发事件
              emit('hiHandle', paload)
          	}
          }
          
      }
  </script>
  ```

  

- 生命周期

- 多事件

- Fragment

  - 多个根节点

- 移除 .sync

- 异步组件的写法

  ```js
  // vue2 
  componnets:{
      'AsyncCom':() => import('@/componnets/AsyncCom')
  }
  
  // vue3
  import { defineAsyncComponnets } from 'vue'
  componnets:{
      'Async':defineAsyncComponnets(()=> import('@/componnets/AsyncCom'))
  }
  ```

  

- 移除filter

- Teleport

  ```vue
  <buttom @click="modalOpen = true">打开弹出层</buttom>
  
  <!-- 将组件放到 body 里面去 -->
  <telepor to="body">
  	<div v-if="modalOpen">
          <span>弹出窗口</span>
      </div>
  </telepor>
  ```

  

- Suspense

  ```vue
  <Suspense>
  	<tempalate>
      	<span>我是一个异步组件</span>
      </tempalate>
      <template #fallback>
      	Loading
      </template>
  </Suspense>
  ```

  

- Composition API

  - reactive
  - ref相关
  - readonly
  - watch 和 watchEffect
  - setup
  - 生命周期函数的重新定义

#### Comsition API 实现逻辑复用

```js
import { ref,onMounted, onUnmonted } from 'vue'
const useMousePosition = () => {
    const X = ref(0)
    const Y = ref(0)
    
    const update = (e) => {
        X.value = e.pageX
        Y.value = e.pageY
    }
    
    onMounted(() => {
        window.addEventListener('mounsemove', update)
    })
    
    onUnmonted(() => {
        window.removeEventListener('mounsemove', update)
    })
    
    return {
        X,
        Y
    }
}
```



#### v-model双向绑定

```vue
<!--  父组件 -->
<tempate>
	<children v-model:title="title" />
</tempate>

<script>
export default {
    setup(){
        const title = ref('标题')
        chnageTitle(){}
    }
}
</script>

<!--  子组件 -->
<tempate>
	<input @input="chnageTitle" />
</tempate>

<script>
export default {
    setup(props, { emit }){
       const chnageTitle = (e) => {
           emit('@update:title', e.target.value)
       }
    }
}
</script>
```



#### watch 和watchEffect的区别

- 两者都可以监听属性变化
- watch需要明确监听哪个属性
- watchEffect会根据其中的依赖属性，自动收集监变化

```vue
<!-- watch -->
<script>
	setup(){
        const name = ref('')
        watch(
        	() => name, // getter函数
            (newName,preName) => {
                /// dosomething
            },
            {
                immediate:true // 初始化时就开始监听，初始化 preName为undifined 可选项
            }
        )
        
        // 当侦听多个来源时
        watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => { })
    }
</script>


<!-- watchEffect -->
<script setup>
	setup(){
        const age = ref(0)
        // 初始化时会执行一次，无论是否有依赖
        const stop = watchEffect(() => {
            // 自动收集value依赖，当vaule的值发生改变时，会自动执行该回调
            console.log(age.value)
        })

        // 当不再需要此侦听器时:
        stop()
    }
</script>
```



#### setup 中如何获取组件实例

- 在setup和其他Composition API 中没有this
- 可以通过 getCurrentInstance 获取当前实例
- 在 Options API 中照常使用 this

```vue
<script>
    import { getCurrentInstance } from 'vue'
	export default {
        setup(){
            const instance = getCurrentInstance()
        }
    }
</script>
```



#### Vue3 为何比Vue2快

- Proxy响应式
- PatchFlag
  - 编译模板时，动态节点做标记（不同类型节点作不同的数字标记 text, props, class, id）
  - diff算法时，可以区分静态节点，以及不同类型的动态节点
    - 不比较静态节点，因为静态节点不存在变化，所以可以直接不比较静态节点
    - 之比较动态节点，如插值语法，动态属性......
  - diff算法的优化
- hoisStatic
  - 将静态节点的定义，提升到父作用域，缓存起来
  - 多个相邻的静态节点会合并起来
  - 典型的拿空间换时间的优化策略
- cacheHandler
  - 缓存事件
- SRR优化
- tree-shaking



#### Vite为什么快

- 开发环境使用 ES6 Module无需打包---非常快
  - webpack是先将代码打包之后在执行，vite不会，直接使用 ES6的 Module
- 生产环境使用rollup



#### Composition API 和 React Hooks 对比

- 前者 setup 只会被调用一次，而后者函数会被多次执行
- 前者无需顾虑调用顺序，二后者需要保证 hooks 的顺序一致
  - hooks不能放到判断、循环等语句中
- 前者 reactive + ref 比后者 useState 要难理解



### 面试题目

#### Vue3 比Vue2的优势

#### 描述Vue3的生命周期

#### 如何看待Composition API 和 Opsition API

#### 如何理解 ref toRef roRefs

#### Vue3升级了哪些功能

#### Vu3如何实现逻辑代码复用

#### Vue3如何实现响应式

#### watch 和watchEffect 区别

#### setup 中如何获取组件实例

#### Vue3 为什么比Vue2快

#### ......





## 打包工具



### **对webpack的理解**



- webpack是一个用于JavaScript应用程序的静态模块打包工具
- 解决的问题
  - 模块依赖
  - 代码编写（TS - JS）
  - 开发效率（代码热更新）
  - 项目优化

### **webpack 中有哪些 loader 分别用来干什么的**

1. JS相关
   1. babel-loader:处理JavaScript文件，提供语法转化，语法垫片
   2. source-map-loader: 从现有源文件中提取源映射关系
2. CSS相关
   1. style-loader:把编译好的css一style标签格式插入到DOM中
   2. css-loader:处理css中比如url() @import等语法的文件引用路径问题
   3. less-loader:将Less编译为css
3. 文件相关
   1. file-loader:处理文件路径问题
   2. gzip-loader:加载gzip文件
   3. url-loader:允许有条件地将文件转化为内联的base-64 URL

```js
module.exports = {
    module:{
        rules:[
            {
                test:/\.less$/i,
                // loader 的执行顺序是从下到上一次执行
                loader:[
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }
        ]
    }
}
```

### **webpack中有哪些plugin，分别是用来做什么的**



| Name                                                         | Description                                                  |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [`AggressiveSplittingPlugin`](https://www.webpackjs.com/plugins/aggressive-splitting-plugin) | 将原来的 chunk 分成更小的 chunk                              |
| [`BabelMinifyWebpackPlugin`](https://www.webpackjs.com/plugins/babel-minify-webpack-plugin) | 使用 [babel-minify](https://github.com/babel/minify)进行压缩 |
| [`BannerPlugin`](https://www.webpackjs.com/plugins/banner-plugin) | 在每个生成的 chunk 顶部添加 banner                           |
| [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin) | 提取 chunks 之间共享的通用模块                               |
| [`CompressionWebpackPlugin`](https://www.webpackjs.com/plugins/compression-webpack-plugin) | 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务   |
| [`ContextReplacementPlugin`](https://www.webpackjs.com/plugins/context-replacement-plugin) | 重写 `require` 表达式的推断上下文                            |
| [`CopyWebpackPlugin`](https://www.webpackjs.com/plugins/copy-webpack-plugin) | 将单个文件或整个目录复制到构建目录                           |
| [`DefinePlugin`](https://www.webpackjs.com/plugins/define-plugin) | 允许在编译时(compile time)配置的全局常量                     |
| [`DllPlugin`](https://www.webpackjs.com/plugins/dll-plugin)  | 为了极大减少构建时间，进行分离打包                           |
| [`EnvironmentPlugin`](https://www.webpackjs.com/plugins/environment-plugin) | [`DefinePlugin`](https://www.webpackjs.com/plugins/define-plugin) 中 `process.env` 键的简写方式。 |
| [`ExtractTextWebpackPlugin`](https://www.webpackjs.com/plugins/extract-text-webpack-plugin) | 从 bundle 中提取文本（CSS）到单独的文件                      |
| [`HotModuleReplacementPlugin`](https://www.webpackjs.com/plugins/hot-module-replacement-plugin) | 启用模块热替换(Enable Hot Module Replacement - HMR)          |
| [`HtmlWebpackPlugin`](https://www.webpackjs.com/plugins/html-webpack-plugin) | 简单创建 HTML 文件，用于服务器访问                           |
| [`I18nWebpackPlugin`](https://www.webpackjs.com/plugins/i18n-webpack-plugin) | 为 bundle 增加国际化支持                                     |
| [`NormalModuleReplacementPlugin`](https://www.webpackjs.com/plugins/normal-module-replacement-plugin) | 替换与正则表达式匹配的资源                                   |
| [`NpmInstallWebpackPlugin`](https://www.webpackjs.com/plugins/npm-install-webpack-plugin) | 在开发时自动安装缺少的依赖                                   |
| ......                                                       | ......                                                       |

```js
// 插件的执行顺序是底层固定好的，不受书写循序的影响
// 插件的本质是一个构造函数，该构造函数类有一个apply方法，该方法接受一个参数

new MiniCssExtractPlugin({
    filename:devMode ? '[name].css' : '[name].[hash].css',
    chunckFilename:devMode ? '[id].css' : '[id].[hash].css'
}),
new CompressionWebpackPlugin({
    filename:'[path].gz[query]',
    test:new RegExp(
     '\\.(js | css)$'  // 压缩 JS | CSS
    ),
    threshold:10240,
    minRatio:0.8
})
new webpack.DefinePlugin({
    'process.env':{
        NODE_ENV:'"production"' // node提供的常量api
    }
})
```

### **webpack的构建流程**

===>

配置文件 + shell语句 合并参数  

===> 

初始化compiler对象(负责文件的监听和启动编译，包含了完整的webpack配置

===> 

加载所有的插件的 apply 方法，并传入complier对象 

===>

 找到入口文件，建立依赖树 

=== >

 调用所有的loader对源文件进行翻译

 ===>

 输出生产包



## 数据结构与算法

   

### **数组**

```js
 // 连接2个或更多的数组，并返回结果
concat

// 对数组每一项运行给定的函数，如果函数对每一项都返回True,则返回true
// 只要有一项返回false,则返回false
every 

// 对数组每一项运行给定函数，该函数返回true是则返回该项，并组成一个新的数组
filter 

// 对数组每一项运行给定函数，没有返回值
forEach 

 // 将数组所有元素连接成一个字符串
join 

// 返回第一个与给定参数相等的数组元素的索引值，没有找到则返回-1
indexOf 

// 返回数组中搜索到的与给定项值相等的最后一个元素的索引值
lastIndexOf 

// 对数组每一项运行给定函数，返回每次函数调用的结果组成的数组
map 

// 颠倒数组的顺序
reverse 

// 传入索引值，将数组对应的索引范围作为一个新的数组返回
slice 

 // 通过删除或替换现有元素或者原地添加新的元素来修改数组
splice

// 将一个或多个元素添加到数组的末尾，并返回该数组的新长度。
push 

// 从数组中删除最后一个元素，并返回该元素的值 
pop 

 // 从数组中删除第一个元素，并返回该元素的值
shift

// 将一个或多个元素添加到数组的开头，并返回该数组的新长度
unshift 

// 对数组每一项运行给定函数，如果任意一项返回true则返回true
some 

 // 按照字幕顺序对数组进行排序，支持传入指定排序方法作为参数
sort

// 将数组作为字符串返回
toString 

// 判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false
includes 

// 接收一个整数值并返回该索引的项目，允许正数和负数
// 负整数从数组中的最后一个项目开始倒数。 arr.at(0) === arr[0]
at 

// 用一个固定值填充一个数组中从起始索引到终止索引内的全部元素
//  arr.fill(value[, start[, end]])
fill 

// 返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined
find 

// 按照一个可指定的深度递归遍历数组
// 并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
flat 
......
```

### **如何去重数组中指定的元素**

```js
const arr = [{name:'Tom',age:18}, {name:'sily',age16}]

// 去除数组中给定值的一项
const cutArr = (arr,target) => {
    arr.forEach((item,index) => {
        if(item.name === target) {
            arr.splice(index,1)
        }
    })
    return arr
}
```

### **栈**

```js
// 定义
 - 栈遵从先进后出的原则的有序结合，新添加或待删除的元素都保存了在栈的末尾
 - 新元素靠近栈顶，旧元素靠近栈底
 - 子弹夹

const Stack = () => {
    this.item = []
}

// 添加元素
Stack.prototype.push = (i) => {
    this.item.push(i)
}
// 删除元素
Stack.prototype.pop = () => {
    this.item.pop()
}
// 获取第一个元素
Stack.prototype.peek = () => {
    return this.item[this.item.length-1]
}
// 判断是否为空
Stack.prototype.isEmpty = () => {
    return this.item.length === 0 ? true : false
}
// 清除栈
Stack.prototype.clear = () => {
    this.item.length = 0
    // OR
    this.item = []
}

```

### **队列**

```js
// 定义
 - 先进先出的一组有序项，队列在尾部添加新元素，并从顶部移除元素，
 - 最新添加的元素必须排在队列末尾

const Queue = () => {
    this.items = []
}
// 添加元素
Queue.prototype.enqueue = (i) => {
    this.items.push(i)
}
// 删除元素
Queue.prototype.delqueue = () => {
    return this.items.shift()
}
// 返回队列中第一个元素
Queue.prototype.front = () => {
    return this.items[0]
}
// 判断队列是否为空
Queue.prototype.isEmpty = () => {
    return this.items.length === 0
}
// 清空队列
Queue.prototype.clear = () => {
    this.items = []
    // OR
    this.items.length = 0
}
// 获取队列长度
Queue.prototype.size = () => {
    return this.items.length
}
```

### **冒泡排序**

```js
// 冒泡排序 比较任何两个相邻的项，如果第二个比第一个大，则交换他们

const arr = [1,9,2,8,3,7,4,6]

const BubbleSort = (arr) => {
    let len = arr.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}
```



## 设计模式

### **装饰者模式**

```js
// 定义： 在不改变原有函数基础功能上新增功能
const a = () => {
    consloe.log('a')
}

const b = () => {
    // 在这里调用一下 a 函数
    a()
    console.log('b')
}

// 发射普通子弹 发射导弹 发射原子弹
function Plane() {
    
}
Plane.prototype.fire = () => {
    console.log('发射普通子弹')
}
// 加强后的飞机
function ManPlane(plane) {
    this.plane = plane
}
ManPlane.prototype.fire = () => {
    this.plane.fire() // 发射普通导弹
    console.log('发射导弹')
}
function ManMaxPlane(plane) {
    this.plane = plane
}
ManMaxPlane.prototype.fire = () => {
    this.plane.fire()  // 发射普通子弹 | 导弹
    console.log('发射原子弹')
}

// 实例化飞机

const plane = new Plane() // 基础飞机
plane.fire()
const ManPlane = new ManPlane(plane) // 导弹飞机
ManPlane.fire()
const ManMaxPlane = new ManMaxPlane(ManPlane) // 原子弹飞机
ManPlane.fire()
```

### **策略模式**

```js
// a对应1 b对应2 c对应3 d对应4 e对应5
// a => 1
// b => 2
// c => 3
// d => 4
// e => 5
const catulateBonus = (base,grade) => {
    if(grade === 'a'){
        // donsomething
        return base * 1
    }else if(grade === 'b'){
        // donsomething
        return base * 2
    }else if(grade === 'c'){
        // donsomething
        return base * 3
    }else if(grade === 'd'){
        // donsomething
        return base * 4
    }else if(grade === 'e'){
        // donsomething
        return base * 5
    }else{
        // donsomething
        return return base * 1
    }
}
catulateBonus(1000,'a') // 1000
catulateBonus(1000,'b') // 2000
catulateBonus(1000,'c') // 3000


// 代码优化(策略模式):有效解决 if else 大量的代码逻辑不可维护的情况
const strategys = {
    a(base){
        // donsomething
        return base * 1
    }
    b(base){
        // donsomething
        return base * 2
    }
    c(base){
        // donsomething
        return base * 3
        }
    d(base){
        // donsomething
        return base * 4
        }
 e(base){
        // donsomething
        return base * 5
        }
}

// 这部分代码不改变，当需求有新增的时候，只需要更改 strategys
const catulateBonus = (base,grade) => {
    const result = strategys[grade](base)
    return result
}

```

### **代理模式（转发请求）**

```js
// 角色 A 请求角色 B 让角色 C 办事
// 小明将玫瑰🌹给媒婆，并委托媒体替他向小红表白

// 这是一朵花，它有他的主人和自己的名字
const Flower(owner,name){
    this.owner = owner
    this.name = name
}
// 小明
const XMPerson = {
    // 小明需要将花送给 target 目标对象
    sendFlower(target){
        // 实例化一朵鲜花✿
        const flower = new Flower('小明','玫瑰🌹')
        // 目标对象接受鲜花
        target.receiveFlower(flower)
    }
}
// 媒婆
const MPO = {
    // 媒婆接受到鲜花并转交给小红
    receiveFlower(flower){
        // 小红接受鲜花
        XiaoHo.receiveFlower(flower)
    }
}
// 小红
const XiaoHo = {
    // 小红接受鲜花
    receiveFlower(flower){
        // 小红接受到鲜花并看到了送鲜花的人，以及鲜花的名字
        console.log(flower.owner)
        console.log(flower.name)
    }
}

// 开始执行
XMPerson.sendFlower(MPO) // 小明将玫瑰🌹移交给媒婆并委托将其交给小红
```

### **发布订阅者模式(观察者模式)**

```js
// 一种一对多的关系，当一个对象状态发生改变时，所有依赖他的对象都能接受到通知

// 顾客购买 iPhone13

class Apple {
    constructor(){
        // 购买了 iPhone13 的顾客
        this.queue = []
    }
    // 收集
    push(p){
        this.queue.push({
            name:p.name
            fn:p.fn
        })
    }
     // 通知
    notify(){
        // 每一个购买过 iPhone13 的用户
        this.queue.forEach((item) => {
            item.fn(item.name)
        })
    }
}
const apple = new Apple()
// 添加第一位顾客
apple.push({name:'Tom',fn:(name)=>{ console.log(name,'嘿嘿') }})
// 通知每一个顾客
apple.notify()


// 版本二
// 发布订阅模式
function Event() {
    this.handlers = []
}
Event.prototype.addHandler = function (handler) {
    this.handlers.push(handler)
}
Event.prototype.removeHandler = function (handler) {
    this.handlers = this.handlers.filter(item => item !== handler)
}
Event.prototype.fire = function (sender, args) {
    this.handlers.forEach(item => item(sender, args))
}
```

### **迭代器模式**

```js
// 对目标数组进行遍历

const arr = [1,2,3,4,5]

// 迭代器模式最基础的应用
arr.forEach((item,index) => {})


// 倒序迭代器
const reverseEach = (arr,callback) => {
    if(!Array.isArray(arr)){
        throw Error('不是一个数组')
    }
    // 倒序循环
    for(let i = arr.length - 1; i >= 0; i-- ) {
        // call参数： this指向 | item | index
        callback.call(arr[i],arr[i],i)
    }
}
reverseEach(arr,(item,index) => {})
```



## 网络 HTTP

### **网络分层模型**

```js
// 物理层
    - 最底层，包括物理联网媒介，光纤、电缆等
    - 产生接受并鞋底啊数据的信号载体，信号源为 0 | 1 

// 链路层
    - 给电信号分组（以太网帧）并以广播的形式在子网中传播， MAC地址唯一

// 网络层
    - 给主机分配IP地址，判断两个IP是否属于同一个子网，是则通过链路层发送
    - 否则交给网关转发实现了数据从子网A到子网B的传输

// 传输层
    - OIS模型中最重要的一层，传输协议同时进行流量控制
    - 或是基于接受对方可接受数据快慢程度发送速率
    - 同时将较长的包进行数据切割
    - 工作在这一层的协议是 TCP（可靠传输） | UDP（及时通讯传输）  

// 会话层
    - 负责网络中两个节点之间的建立、维持和终止通讯，会话功能包括通信连接
    - 保持会话过程通信连接流畅，同步两个节点之间的对话
    - 决定通信是否被中断和通信中断时决定从何处重新发送

// 表示层
    - 应用程序和网络之间的翻译官，在表示层将数据按照网络能够理解的方案进行格式化
    - 管理数据加密和解密，对图片和文件格式进行解码

// 应用层
    - 由若干个特定应用服务元素和多个共用应用服务元素组成
    - 例如文件传输访问和管理，虚拟终端协议等
```

### **HTTP常见状态码及其含义**

- 200 请求成功
- 301 永久重定向
- 302 临时重定向
- 403 没有权限
- 404 服务器上没有对应的资源
- 500 服务器发生错误

```tex

201 Created
202 Accepted
203 Non-Authoritative Information
204 No Content
205 Reset Content
206 Partial Content
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
305 Use Proxy
307 Temporary Redirect
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Request Entity Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
```

### **HTTP有哪些请求方法，GET 和 POST 有什么区别**

- GET：查询

- POST：提交

- PUT：更新

- DELETE：删除

- HEAD：请求头

- OPTIONS：请求选项

- TRACE：请求轨迹

- CONNECT：请求连接

- PATCH：请求补充

区别：

GET用于获取数据

POST用于提交数据

GET参数有限制（最长2048字节，POST无限制）

GET明文传输 POST放在请求体中

  1. **HTTP协议中的header及含义**

    - Accept-Charset：客户端可以接受的字符集
    
    - Accept-Encoding：客户端可以接受的编码方式
    
    - Accept-Language：客户端可以接受的语言
    
    - Authorization：认证信息
    
    - Cache-Control：缓存控制
    
    - Connection：连接方式
    
    - Cookie：Cookie信息
    
    - Content-Length：内容长度
    
    - Content-Type：内容类型
    
    - Date：日期
    
    - Expect：期望
    
    - From：来源
    
    - Host：主机
    
    - If-Match：如果匹配
    
    - If-Modified-Since：如果修改了
    
    - If-None-Match：如果不匹配
    
    - If-Range：如果范围
    
    - If-Unmodified-Since：如果未修改
    
    - Max-Forwards：最大转发数
    
    - Pragma：简短请求头
    
    - Proxy-Authorization：代理认证
    
    - Range：范围
    
    - Referer：来源
    
    - TE：传输编码
    
    - Upgrade：升级
    
    - User-Agent：用户代理
    
    - Via：通过
    
    - Warning：警告
    
    - X-Requested-With：请求类型
    
    - X-Forwarded-For：转发的客户端IP
    
    - X-Forwarded-Host：转发的客户端主机
    
    - X-Forwarded-Server：转发的服务器
    
    - X-Frame-Options：框架配置
    
    - X-XSS-Protection：XSS防护
    
    - X-Content-Type-Options：内容类型配置
    
    - X-Powered-By：服务器提供
    
    - X-UA-Compatible：浏览器兼容性



## 浏览器相关

### **输入url并按下回车键的时候过程中发生了什么？**

- **大致流程**

  - URL 解析
  - DNS 查询
  - TCP 连接
  - 处理请求
  - 接受响应
  - 渲染页面

- **URL解析**

  **1.地址解析**

  首先判断你输入的是一个合法的 URL 还是一个待搜索的关键词，并且根据你输入的内容进行自动完成、字符编码等操作。

  **2.HSTS**

  由于安全隐患，会使用 HSTS 强制客户端使用 HTTPS 访问页面。

  3.**其他操作**

  浏览器还会进行一些额外的操作，比如安全检查、访问限制。

  **4.检查缓存**

- **DNS查询**

  **1. 浏览器缓存**

  浏览器会先检查是否在缓存中，没有则调用系统库函数进行查询。

  **2. 操作系统缓存**

  操作系统也有自己的 DNS缓存，但在这之前，会向检查域名是否存在本地的 Hosts 文件里，没有则向 DNS 服务器发送查询请求。

  **3. 路由器缓存**

  路由器也有自己的缓存。

  **4. ISP DNS 缓存**

  ISP DNS 就是在客户端电脑上设置的首选 DNS 服务器，它们在大多数情况下都会有缓存。

- **TCP链接**

- **服务器处理请求**

- **浏览器接受响应**

- **渲染页面（构建CSS DOM 树）**

### **浏览器事件传输机制原理**

> 在浏览器中，事件传输机制是通过事件冒泡的方式来实现的，
>
> 事件冒泡是从最近的元素到最远的元素，每个元素都会触发事件，事件的触发是通过事件冒泡的方式来实现的。

1. 事件触发的三个阶段
   - 捕获阶段
   - 目标阶段
   - 冒泡阶段

1. **浏览器的事件循环**

   1. 宏任务微任务都有哪些

      - 宏任务

        setTimeout

        setInterval

        setImmediate

        I/O（网络输出输入）

        UI render

      - 微任务

        process。nextTick

        Promise.then

        Async/Await

        MutationObserver(html5新增api)

   2. 事件循环机制

      先从script(整块代码)开始第一次循环执行，接着对同步任务进行执行，直到调用栈被清空
      然后去执行所有的微任务，当所有微任务执行完毕之后。再次从宏任务开始循环执行，直到执行完毕
      然后再执行所有的微任务，就这样一直循环下去。
      如果在执行微队列任务的过程中，又产生了微任务，那么会加入整个队列的队尾，也会在当前的周期中执行。

### **浏览器的重绘和回流**

1. 浏览器的渲染过程是怎样的

    1. 解析HTML，生成DOM树，解析CSS，生成CSSOM树

    2. 将DOM树和CSSOM树结合，生成渲染树（Render Tree）

    3. Layout(回流)：根据生成的渲染树，进行回流（Layout）,得到节点几何信息（位置、大小）

    4. Painting(重绘)：根据渲染树以及回流得到几何信息，得到节点的绝对像素

    5. 调用GPU触发渲染，将结果展示在页面上

2. 回流（页面布局）

   通过构造渲染树，将可见的节点以及对应的样式结合起来，需要计算他们在设备视口内确切的位置和大小，这个计算的阶段就是回流

3. 重绘（页面样式）

   通过构造渲染树，我们知道了哪些节点是可见的，以及可见节点的样式和具体几何信息（位置，大小）

   那么我们就可以将渲染树的每个节点都转化为屏幕实际像素，这个阶段就叫重绘节点

```js
设计模式起源于建筑学
回流：相当于把房子拆了重建
重绘：相当于重新粉刷
回流必然会导致重绘，重绘不一定伴随回流
```

4. 何时会触发回流和重绘

   1. 添加或删除可见DOM元素
   2. 元素内容、位置、尺寸发生变化
   3. 页面一开始渲染的时候
   4. 浏览器窗口尺寸发生变化

5. 如何避免回流和重绘的次数

   1. css样式采用简写 

      ```css
      p {
          padding:0 0 0 10px;
      }
      ```

      

   2. 使用文档片段

      ```js
      body.appendChild(fragment)
      ```



### **跨域**

1. 什么是同源策略

   两个 URL 的 协议 域名 端口 必须保持一致

2. 什么是跨域

   协议 域名 端口 不一致即为跨域

3. 跨域常见的解决方案

   1. jsonp(可能会造成xss攻击)

   2. postMessage（多窗口数据传递）

   3. nginx反向代理

      ```nginx
      server {
          listen 80;
          server_name www.xxx.com;
          location / {
              proxy_pass http://www.zzz.com:8080 // 将请求转发到这个域名
          }
      }
      ```

### **浏览器的主要组成部分**

1. 用户页面

   地址栏、前进、后退、书签菜单......

2. 浏览器引擎

   用户界面和呈现引擎之间传送指令

3. 渲染引擎

   负责将解析的DOM树呈现到页面上

4. 网络模块

   发送网络请求调用

5. 用户界面后端

   绘制基本的窗口小部件

6. JavaScript解析器

   解析和执行js代码

7. 数据存储模块

   localstorage  cookie 等数据持久化存储

