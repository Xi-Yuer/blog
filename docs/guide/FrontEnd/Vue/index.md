
# Vue3常见API

## reactive# Vue Guide

## 数据属性Data

组件的 `data` 选项是一个函数。Vue 在创建新组件实例的过程中调用此函数。它应该返回一个对象，然后 Vue 会通过响应性系统将其包裹起来，并以 `$data` 的形式存储在组件实例中。为方便起见，该对象的任何顶级 property 也直接通过组件实例暴露出来：

1. 本质上，组件的 `data` 选项只是一个函数
2. 这个函数会在 Vue 创建组件实例时被调用
3. 这个函数会返回一个对象
4. 返回的这个对象会被 Vue 包装成响应式数据
5. 包装后的响应式数据，以 `$data` 的形式存储在组件实例中
6. 为方便，`data` 返回的对象的任何顶级属性可以直接通过组件实例直接拿到，前提是需要确保它们都在 `data` 函数返回的对象中
7. 如果直接在组件实例上添加新属性，虽然可以添加成功，但是由于它没有在响应式对象 `$data` 中，所以该属性不具有响应式
8. 在 `data` 返回的对象的属性，应避免使用 `$` 和 `_` 开头



### 原理分析

> 为什么 `data` 属性是一个函数而不是一个对象？

- **结论**：`data` 定义可是函数也可以是对象，但是根组件实例化时可以是对象或函数，组件实例化只能是函数
- **原理**：根实例是单例，不会产生数据污染；组件实例不是单例，为防止多个组件实例之间共用一个 `data`，产生数据污染，采用函数形式，初始化 `data` 时会将其作为工厂函数都会返回全新 `data` 对象





## 计算属性Computed

应用场景：

1. 模版中，较长的表达式会让模版变得复杂和难以维护，为了解决这个问题 `computed` 孕育而生
2. 具有缓存效果，提示了性能，当依赖数据未发生变化，调用的是缓存的数据

对于任何包含响应式数据的 **复杂逻辑**，都应该使用 **计算属性**



### 计算属性和函数方法

计算属性是基于它们的反应依赖滚系缓存的。计算属性只在相关响应式依赖发生改变时它们才会重新求值。

相比之下，每当触发重新渲染时，调用方法将总会再次执行函数。

> 我们为什么需要缓存？

假设我们有一个性能开销比较大的计算属性 `list`，它需要遍历一个巨大的数组并做大量的计算。然后我们可能有其他的计算属性依赖于 `list`。如果没有缓存，我们将不可避免的多次执行 `list` 的 `getter`！如果你不希望有缓存，请用 `method` 来替代。



## 侦听器 Watch



###  Options API 实现 Watch

#### 普通的watch

```js
export default {
    props:['dataList'],
    data(){
        return {
            sourceData:[],
            total:0
        }
    },
    // 当props的dataList发生变化时，data中的值也会重新被计算并赋值
    watch:{
        dataList(newVal,oldVal){
            this.total = newVal.length
            this.sourceData = newVal
        }
    }
}
```



#### 对象的watch

```js
export default {
    data(){
        return {
           	firstName:'Li',
            lasteName:'Huan'
        }
    },
    // 当props的dataList发生变化时，data中的值也会重新被计算并赋值
    watch:{
        dataList:{
           // getter
            get:function(){
                return this.firstName + this.lasteName
            },
            set:function(val){
                // this.dataList = 'Wang Feng'
                const [ firstName,lasteName ] = val.spilt(' ')
                this.firstName = firstName
                this.lasteName = lasteName
            },
            {
            // 对象和数组都是引用类型，引用类型变量存的是地址，地址没有变
            // 所以不会触发 watch。这时我们需要进行深度监听，需要加上属性 deep: true
            deep:true,
            // watch 有一个特点，当值第一次绑定的时候，不会执行监听函数，
            // 只有值发生变化时才会执行，如果想要最初绑定值的时候页执行函数，需要加 immediate 属性
            immediate:true
        }
        }
    }
}
```



### Reactive API 实现 watch

[watch](https://vue3js.cn/docs/zh/api/computed-watch-api.html#watch) 函数用来侦听特定的数据源，并在回调函数中执行副作用。默认情况时 **惰性** 的，也就是说仅在侦听的源数据变更时才执行回调。

```js
watch(source, callback, [options]);
```

参数说明：

- `source`：可以支持 String、Object、Function 和 Array 用于指定要侦听的响应式变量
- `callback`：执行的回调函数
- `options`：支持 `deep`、`immediate` 和 `flush` 选项



#### 侦听reactive

```js
import { defineComponent,reactive,watch } from 'vue'
export default defineComponent({
    setup(){
        const state = reactive({
            firstName:'Li',
            lastName:'Wang'
        })
        
        // 当修改 firstName时会自动触发 watch 的回调该函数
        watch(
            ()=>state.firstName,
            (newVal,oldVal)=>{
            	console.log(`新值：${newVal}`,`旧值：${oldVal}`)
        	},
        	{deep:true})
    }
})
```



#### 侦听多个数据

```js
const stop = watch([() => state.firstName, () => state.lastName], ([curAge, newVal], [preAge, oldVal]) => {
  console.log('新值:', curAge, '老值:', preAge);
  console.log('新值:', newVal, '老值:', oldVal);
});

unmounted(()=>{
    // 停止侦听
    stop()
})
```



## watchEffect

`watchEffect` 不需要项`watch`那样需要先传入依赖，`watchEffect` 会自动收集依赖, 只要指定一个回调函数。在组件初始化时，会先执行一次来收集依赖，然后当收集到的依赖中数据发生变化时，就会再次执行回调函数。

```js
watchEffect(()=>{
    // 自动搜集依赖，初始化执行一次
    console.log(firstName);
    console.log(lastName)
})
```





## 样式设置

### 对象语法

```vue
<template>
    <div class='static' :class="{active:isActive,danger:hasError}"></div>
</template>
<script>
	export default {
        data(){
            return {
                isActive:true,
                hasError:true
            }
        }
    }
</script>
```

```vue
<!-- 渲染后 -->
<div class="static active danger"></div>
```



### 直接传入对象

```vue
<template>
    <div class='static' :class="classObj"></div>
</template>
<script>
	export default {
        data(){
            return {
               classObj:{
                   active:true,
                   hasError:true
               }
            }
        }
    }
</script>
```

### computed传入

```vue
<template>
	<div class="static" :class="clsObject"></div>
</template>
<script>
	export default {
        data(){
            return {
                isActive:true,
                hasError:true
            }
        },
        computed:{
            classObj(){
                return {
                    active:this.active,
                    hasError:this.hasError
                }
            }
        }
    }
</script>
```





## 条件渲染

```vue
<template>
	<div v-if='show'></div>
	 <div v-else></div>
	<div v-show='show'></div>
</template>

<script>
	export default {
        data(){
            return {
                show:true
            }
        }
    }
</script>
```

`v-if`  vs  `v-show`:

- `v-show`只是单纯的修改元素的`css`属性，它将元素的`disable`设置为了`none`
- `v-if`是将元素从组件树中移除，当元素是一个组件时，修改`show`值，会触发组件元素的生命周期函数





## 内置组件

### component

动态组件

```vue
// 动态组件
<template>
	<!-- currentTab 改变时组件也改变 -->
	<component :is="tabs[currentTab]"></component>
</template>
```

在上面的例子中，被传给 `:is` 的值可以是以下几种：

- 被注册的组件名
- 导入的组件对象



### transition

动画组件

```vue
<!-- 模板 -->
<template>
	<Transition name="silde-fade">

	</Transition>
</template>
```

```css
/*
  进入和离开动画可以使用不同
  持续时间和速度曲线。
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
```


![image-20230726165423050](https://typropicgo.oss-cn-chengdu.aliyuncs.com/image-20230726165423050.png)


- 过渡钩子函数

```vue
<template>
	<Transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @enter-cancelled="onEnterCancelled"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
      @leave-cancelled="onLeaveCancelled"
  >
  </Transition>
</template>
```

```js
// 在元素被插入到 DOM 之前被调用
// 用这个来设置元素的 "enter-from" 状态
function onBeforeEnter(el) {}

// 在元素被插入到 DOM 之后的下一帧被调用
// 用这个来开始进入动画
function onEnter(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 当进入过渡完成时调用。
function onAfterEnter(el) {}
function onEnterCancelled(el) {}

// 在 leave 钩子之前调用
// 大多数时候，你应该只会用到 leave 钩子
function onBeforeLeave(el) {}

// 在离开过渡开始时调用
// 用这个来开始离开动画
function onLeave(el, done) {
  // 调用回调函数 done 表示过渡结束
  // 如果与 CSS 结合使用，则这个回调是可选参数
  done()
}

// 在离开过渡完成、
// 且元素已从 DOM 中移除时调用
function onAfterLeave(el) {}

// 仅在 v-show 过渡中可用
function onLeaveCancelled(el) {}
```





### keep-alive

用于缓存组件状态，避免组件重复渲染

`keep-alive`有以下三个属性

- `include`：字符串或正则表达式，只有名称匹配的组件会被缓存，组件的name；
- `exclude`：字符串或正则表达式，任何名称匹配的组件都不会被缓存；
- `max`：数字，最多可以缓存多少组件实例。



### slot

默认插槽

```vue
<template>
	<!-- 父组件 -->
    <Child>
      <div>默认插槽</div>
    </Child>

    <!-- 子组件 -->
    <template>
      <slot>
        <p>插槽后备的内容</p>
      </slot>
    </template>
</template>
```

#### 具名插槽

```html
<!-- 组件内部 -->
<div class="container">
  <header>
    <!-- 我们希望把页头放这里 -->
  </header>
  <main>
    <!-- 我们希望把主要内容放这里 -->
  </main>
  <footer>
    <!-- 我们希望把页脚放这里 -->
  </footer>
</div>
```

```html
<!-- 组件内部 -->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```



#### 作用域插槽

父组件在自定义子组件中的插槽内容时，需要获取到子组件中的组件数据

```vue
<template>
	<!-- Child -->
    <ul>
      <li v-for="(item, index) in items">
        <slot :item="item"></slot>
      </li>
    </ul>

    <!-- Parent -->
    <todo-list>
      <template #default="{slotProps}">
        <span class="green">{{ slotProps.item }}</span>
      </template>
    </todo-list>
</template>
```



### Teleport

eleport 是 Vue3.x 新推出的功能，提供了一种干净的方法，允许我们控制在 DOM 中哪个父节点下渲染了 HTML

```vue
<template>
	<Teleport to="body">
      <div> teleport to body </div>
	</Teleport>
</template>
```


```js
import { reactive } from 'vue';
export default {
  // `setup` 是一个专门用于组合式API 的特殊钩子
  setup() {
    const state = reactive({ count: 0 }); // 暴露 state到模板

    return { state };
  },
};
```

## ref

```js
import { ref } from 'vue';

const count = ref(0);

console.log(count); // { value: 0 }
console.log(count.value); // 0

count.value++;
console.log(count.value); // 1
```

## computed

```Vue
<script setup>
import { reactive, computed } from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

// 一个计算属性 ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
</template>
```

## watch

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})
</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>
```

## watchEffect

> watchEffect() 会立即执行一遍回调函数，如果这时函数产生了副作用，
> Vue 会自动追踪副作用的依赖关系，自动分析出响应源。

```js
watchEffect(async () => {
  const response = await fetch(url.value);
  data.value = await response.json();
});
```

## watch vs. watchEffect

> `watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：`watch` 只追踪明确侦听的源。它不会追踪任何在回调中访问到的东西。另外，仅在响应源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
> `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，自动追踪所有能访问到的响应式 property。这更方便，而且代码往往更简洁，但其响应性依赖关系不那么明确。

## 状态管理 pinia

### store

```js
// stores/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    },
  },
  getters(){
      finishedTodos(store){
          return store.count++
      }
  }
});
```

### action

```js
import { useCounterStore } from '@/stores/counter';

export default {
  setup() {
    const counter = useCounterStore();

    counter.count++;
    // with autocompletion ✨
    counter.$patch({ count: counter.count + 1 });
    // or using an action instead
    counter.increment();
  },
};
```

## vue-router 路由

> router.js

```js
const Home = { template: '<div>Home</div>' };
const About = { template: '<div>About</div>' };

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];
const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({});

app.use(router);

app.mount('#app');
```

> 渲染

```vue
<template>
  <router-view />
</template>
```

## setup 语法

### defineProps defineEmits

> Ts 语法支持

```js
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```

## defineExpose

:::tip
setup 组件是默认关闭
:::

```vue
<script setup>
  import {ref} from 'vue' const a = 1 const b = ref(2) defineExpose({(a, b)})
</script>
```
