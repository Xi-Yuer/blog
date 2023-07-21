# JavaScript
## JS语法集合
#### 实现 call 函数

```js
Function.prototype.wxcall = function (thisArg, ...arg) {
  var fn = this;
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fn = fn;
  return thisArg.fn(...arg);
};

console.log(foo.wxcall('abc', 10, 20));
console.log(foo.wxcall({}, 10, 20));
let result = foo.wxcall(null, 10, 20);
console.log(result);
```

#### apply 函数实现

```js
Function.prototype.wxapply = function (thisArg, arrArg) {
  var fn = this;
  thisArg = thisArg ? Object(thisArg) : window;
  thisArg.fn = fn;
  arrArg ? thisArg.fn(...arrArg) : thisArg.fn(); //是否有传入参数
  delete thisArg.fn;
};

function foo(a, b, c) {
  console.log(a + b + c);
}
foo.wxapply({}, [10, 20, 30]);
foo.wxapply({}, [10, 20, 30]);
```

#### 实现 slice 函数

```js
Array.prototype.wxslice = function (start, end) {
  var arr = this;
  let newArr = [];
  for (let i = start; i < end; i++) {
    newArr.push(arr[i]);
  }
  return newArr;
};
console.log([1, 2, 3, 4, 5, 6, 7, 8].wxslice(0, 2));
```

#### defineProperty

```js
const obj = {
  name: 'Tom',
  age: 18,
};

// Object.defineProperty(obj,'name',{
//     get:function(){
//         console.log('监听到name属性被访问到了');
//     },
//     set:function(){
//         console.log('监听到name属性被设置了');
//     }
// })

// console.log(obj.name); //监听到name属性被访问到了
// obj.name = 'Kobe' //监听到name属性被设置了

// 可以获取到对象所有的keys
Object.keys(obj).forEach(key => {
  let value = obj[key];
  console.log(key);
  /*  name
        age
     */
  Object.defineProperty(obj, key, {
    get: function () {
      console.log('监听到属性被访问了');
      return value;
    },
    set: function (newValue) {
      console.log('监听到name属性被设置了');
    },
  });
});
console.log(obj.name); //监听到name属性被访问到了
obj.name = 'Kobe'; //监听到name属性被设置了
```

#### Proxy 代理

```js
const obj = {
  name: 'Tom',
  age: 18,
  height: 1.88,
};

// 创建一个proxy代理

// 参数一：对obj对象进行代理 参数二：捕获器(有13种捕获器)
const objProxy = new Proxy(obj, {
  // 获取值的捕获器(在获取值的时候自动回调该函数)
  get: function (target, key) {
    // target 是被代理的对象; key
    console.log(target); //{ name: 'Tom', age: 18, height: 1.88 }
    console.log(key); // name 获取了谁 key就是谁
    return target[key];
  },

  // 设置值的捕获器(在设置值的时候自动回调该函数)
  set: function (target, key, newValue) {
    target[key] = newValue;
  },
});
// 访问
// console.log(objProxy); // { name: 'Tom', age: 18, height: 1.88 }
// console.log(objProxy.name); // Tom
// console.log(objProxy.age); // 18
// 设置
// objProxy.name = "Kobe"; // 通过代理
console.log(objProxy.name); // Kobe
```

#### 响应式原理

```js
class Depend {
  constructor() {
    this.reactiveFns = [];
  }
  // 收集依赖
  addDepend(reactiveFn) {
    this.reactiveFns.push(reactiveFn);
  }
  // 执行依赖
  notify() {
    // 遍历所有依赖并执行
    this.reactiveFns.forEach(fn => {
      fn();
    });
  }
}

const depend = new Depend();
const obj = {
  name: 'Tom',
  age: 18,
};
// 监听属性的变化(proxy,object.defineProperty)发生改变，执行depend.notify()
const objProxy = new Proxy(obj, {
  get: function (target, key, receiver) {
    // 将获取值返回出去
    return Reflect.get(target, key, receiver);
  },
  // 给代理对象设置值的时候会自动执行该方法
  set: function (target, key, newvalue, receiver) {
    Reflect.set(target, key, newvalue, receiver);
    // 设置值时通知depend执行依赖
    depend.notify();
  },
});
function foo() {
  console.log('执行代码');
}
depend.addDepend(foo); //收集依赖
objProxy.name = 'Lilei';
```

#### 迭代器

```js
//迭代器需要满足以下条件
// 一、是一个对象
// 二、对象有一个next方法
// 三、该方法返回一个对象，且该对象有done和value属性
// const iterator = {
//   next: function () {
//     return { done: true, value: "" };
//   },
// };

// 数组
const arr = ['abc', 'cba', 'nba'];
// 使用迭代器遍历数组
// 创建一个迭代器对象来访问该数组
let index = 0;
const arrIterator = {
  next: function () {
    if (index < arr.length) {
      return { done: false, value: arr[index++] };
    } else {
      return { done: true, value: undefined };
    }
  },
};
console.log(index); //0
console.log(arrIterator.next()); //{ done: false, value: 'abc' }

console.log(index); //1
console.log(arrIterator.next()); //{ done: false, value: 'cba' }

console.log(index); //2
console.log(arrIterator.next()); //{ done: false, value: 'nba' }

console.log(index); //3
console.log(arrIterator.next()); //{ done: true, value: undefined }

console.log(index); //3

// 迭代器优化
```

#### 迭代器生成函数

```js
function createArryIterator(arr) {
  let index = 0;
  return {
    next: function () {
      if (index < arr.length) {
        return { done: false, value: arr[index++] };
      } else {
        return { done: true, value: undefined };
      }
    },
  };
}

const names = ['Tom', 'Sily', 'Lusy'];
const nameIterator = createArryIterator(names);
console.log(nameIterator.next()); //{ done: false, value: 'Tom' }
console.log(nameIterator.next()); //{ done: false, value: 'Sily' }
console.log(nameIterator.next()); //{ done: false, value: 'Lusy' }

const nums = [1, 2, 3, 4, 5];
const numsIterator = createArryIterator(nums);
console.log(numsIterator.next()); //{ done: false, value: 1 }
console.log(numsIterator.next()); //{ done: false, value: 2 }
console.log(numsIterator.next()); //{ done: false, value: 3 }
console.log(numsIterator.next()); //{ done: false, value: 4 }

// 创建一个无限的迭代器
function createNumberIterator() {
  let index = 0;
  return {
    next: function () {
      return {
        done: false,
        value: index++,
      };
    },
  };
}
const numberInterator = createNumberIterator();
console.log(numberInterator.next()); //{ done: false, value: 0 }
console.log(numberInterator.next()); //{ done: false, value: 1 }
console.log(numberInterator.next()); //{ done: false, value: 2 }
console.log(numberInterator.next()); //{ done: false, value: 3 }
console.log(numberInterator.next()); //{ done: false, value: 4 }
console.log(numberInterator.next()); //{ done: false, value: 5 }     ......
```

#### 迭代器对象

```js
// 该对象返回一个迭代器
const iterabalObj = {
  names: ['Tom', 'Sily', 'Lusy'],
  // 可迭代对象需要有 [Symbol.iterator] 这个属性，对应的是一个函数，该函数返回的是一个迭代器
  [Symbol.iterator]: function () {
    let index = 0;
    return {
      next: () => {
        if (index < this.names.length) {
          return { done: false, value: this.names[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  },
};
console.log(iterabalObj[Symbol.iterator]); //[Function: [Symbol.iterator]]

// 调用该函数会为我们生成一个新的迭代器
const iterator = iterabalObj[Symbol.iterator]();
console.log(iterator.next()); //{ done: false, value: 'Tom' }
console.log(iterator.next()); //{ done: false, value: 'Sily' }
console.log(iterator.next()); //{ done: false, value: 'Lusy' }

// 新的迭代器
const iterator1 = iterabalObj[Symbol.iterator]();
console.log(iterator1.next()); //{ done: false, value: 'Tom' }
console.log(iterator1.next()); //{ done: false, value: 'Sily' }
console.log(iterator1.next()); //{ done: false, value: 'Lusy' }

for (const item of iterabalObj) {
  console.log(item);
  //   Tom
  //   Sily
  //   Lusy
}
```

#### 生成器

```js
// 生成器函数(*)
function* foo() {
  console.log(1);
  yield;

  console.log(2);
  // yield 可以控制函数停止
  yield;

  console.log(3);
  yield;

  console.log(4);
}
// 调用生成器函数该函数不会直接执行，而是返回一个生成器对象
// console.log(foo()); // Object [Generator] {}
const Generator = foo();

// 开始执行第一段代码（yield之前的代码）执行next()
Generator.next(); //1

// 开始执行第二段代码
Generator.next(); //2

// 开始执行第三段代码
Generator.next(); //3

// 开始执行第四段代码
Generator.next(); //4
```

#### 生成器函数执行流程

```js
function* foo() {
  console.log(1);
  yield '返回值'; //该段代码的返回值
  console.log(2);
  yield;
  console.log(3);
  yield;
  console.log(4);
}
const Generator = foo();
// 返回值是value ,done:false
console.log(Generator.next()); // { value: { name: 'tom', age: 18 }, done: false }
// Generator.next() // 1

// 生成器函数 function*
// yeild 关键字可以使代码在这里进行暂停
// 执行生成器函数会返回一个生成器对象
// 调用该生成器对象的next方法会依次执行yield之前的代码，
// 再次调用next()会继续执行下一个yield之前的代码
// 每个yield之前的代码若想返回某些值的话，可以将返回值写在yeild后面
```

#### 生成器参数问题

```js
// 每段代码的参数问题
function* foo() {
  console.log(1);
  // 第二次执行next函数传入的参数会赋值给第一次yield的返回值
  const n = yield;

  // 第二段代码是执行第二次next执行的
  console.log(2 * n); // 20
  yield '返回值 :console.log(Generator.next()) // 返回值 ......';

  console.log(3);
  yield;

  console.log(4);
}

const Generator = foo();
Generator.next();
Generator.next(10);

// 执行两次 Generator.next()
// 第二次执行的时候有传入一个参数
// 该参数会作为第一个yield的返回值  const n = yield 使用 n 接受该返回值
```

#### 宏任务&微任务

```js
// await 之后的代码属于微任务
// async function a() {
//     console.log('a')
//     await b()
//     console.log('a end')
// }

// async function b() {
//     console.log('b')
// }

// a()

// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)

// new Promise(function (resolve, reject) {
//     console.log('promise')
//     resolve()
// }).then(function () {
//     console.log('then')
// })

// console.log('main end')

// //
setTimeout(function () {
  console.log('8');
}, 0);
async function async1() {
  console.log('1');
  const data = await async2();
  console.log('6');
  return data;
}
async function async2() {
  return new Promise(resolve => {
    console.log('2');
    resolve('async2的结果');
  }).then(data => {
    console.log('4');
    return data;
  });
}
async1().then(data => {
  console.log('7');
  console.log(data);
});
new Promise(function (resolve) {
  console.log('3');
  resolve();
}).then(function () {
  console.log('5');
});

//

console.log('script start');

async function async1() {
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2 end');
}
async1();

setTimeout(function () {
  console.log('setTimeout');
}, 0);

new Promise(resolve => {
  console.log('Promise');
  resolve();
})
  .then(function () {
    console.log('promise1');
  })
  .then(function () {
    console.log('promise2');
  });

console.log('script end');

//

// console.log('script start')

// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
//     return Promise.resolve().then(()=>{
//         console.log('async2 end1')
//     })
// }
// async1()

// setTimeout(function() {
//     console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//     console.log('Promise')
//     resolve()
// })
// .then(function() {
//     console.log('promise1')
// })
// .then(function() {
//     console.log('promise2')
// })

// console.log('script end')

// async function async1(){
//   await async2()
//   console.log('async1 end')
// }
// async function async2(){}
// async1();
// new Promise(function(resolve){
//   resolve();
// }).then(function(){
//   console.log('promise2')
// }).then(function() {
//   console.log('promise3')
// }).then(function() {
//   console.log('promise4')
// })
```

#### 防抖

```js
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 第一次是否直接执行
function debounce(fn, delay, isImmediately = true) {
  let timer = null;
  let Immediately = isImmediately;
  return (...args) => {
    if (timer) clearTimeout(timer);
    Immediately
      ? fn.apply(this, args)
      : (timer = setTimeout(() => fn.apply(this, args), delay));
    Immediately = !isImmediately;
  };
}
```

#### 节流

```js
function throttle(fn, delay) {
  let pre = 0;
  return (...args) => {
    let now = new Date();
    if (now - pre > delay) {
      fn.apply(this, args);
    }
    pre = now;
  };
}
```

#### 深拷贝

```js
function isObject(value) {
  const valueType = typeof value;
  return (value !== null && valueType === 'object') || valueType === 'function';
}

function deepClone(originValue) {
  // 判断是否是symbol类型，创建一个新的symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description);
  }
  if (typeof originValue === 'function') {
    // 判断是否是函数直接返回
    return originValue;
  }
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }
  if (originValue instanceof Map) {
    return new Map([...originValue]);
  }
  //判断传入的origin是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue;
  }
  //判断传入的对象是数组还是对象
  const newObject = Array.isArray(originValue) ? [] : {};
  //遍历原始对象并将原始对象的属性值克隆到新对象中
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key]); //递归调用
  }
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const skey of symbolKeys) {
    newObject[skey] = deepClone(originValue[skey]);
  }
  return newObject;
}
const obj1 = {
  name: 'Tom',
  fridends: {
    one: {
      name: 'sily',
    },
    tow: {
      name: 'kobe',
    },
  },
};
console.log(deepClone(obj1));
```

#### 事件总线

```js
class EventBus {
  constructor() {
    this.eventBus = {};
  }

  on(eventName, eventCallBack, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({
      eventCallBack,
      thisArg,
    });
  }
  off() {}
  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach(handler => {
      handler.eventCallBack.apply(handler.thisArg, payload);
    });
  }
}
const eventBus = new EventBus();

// mian.js
eventBus.on(
  'a',
  function (payload) {
    console.log(payload);
  },
  this
);
// utill.js
eventBus.emit('a', { name: 'Tom' });
```


## 实现slice函数
    
```js
    
Array.prototype.wxslice = function (start, end) {
    var arr = this
    let newArr = []
    for (let i = start; i < end; i++) {
        newArr.push(arr[i])
    }
    return newArr
}
console.log([1, 2, 3, 4, 5, 6, 7, 8].wxslice(0, 2));
    
```          
                
                
## 实现call函数
    
```js
    
// 给所有函数添加一个wxapply方法
// Function.prototype.wxcall = function (thisArg, ...arg) { //传入this和参数
//     // 在这里需要可以执行调用该方法的那个函数
//     // 问题：那个函数执行了call
//     var fn = this //谁调用了谁就是this
//     // 对thisArg转成对象类型，防止传入的this是数字或者其他非对象类型
//     // 如果传入的是Null或者undifind就将this绑定到window
//     thisArg = thisArg ? Object(thisArg) : window
//     thisArg.fn = fn //执行该函数
//     thisArg.fn(...arg) //绑定this和参数
//     delete thisArg.fn
// }

// function foo(a, b) {
//     console.log('执行');
//     console.log(this);
//     console.log(a + b);
// }
// foo.wxcall({}, 10, 20)



// Function.prototype.wxcall = function (thisArg, ...arg) {
//     var fn = this
//     thisArg = thisArg ? Object(thisArg) : window
//     thisArg.fn = fn
//     thisArg.fn(...arg)
// }

// function foo(a, b) {
//     console.log(a + b);
// }
// foo.wxcall({}, 10, 20)
// foo.wxcall(123, 10, 20)




Function.prototype.wxcall = function (thisArg, ...arg) {
    var fn = this
    thisArg = thisArg ? Object(thisArg) : window
    thisArg.fn = fn
    return thisArg.fn(...arg)
}

function foo(a, b) {
    return a + b
}
console.log(foo.wxcall('abc', 10, 20));
console.log(foo.wxcall({}, 10, 20));
let result = foo.wxcall(null, 10, 20)
console.log(result);
    
```          
                
                
## 生成迭代器的函数
    
```js
    
function createArryIterator(arr){
    let index = 0
    return {
        next:function(){
            if(index < arr.length){
                return { done:false, value:arr[index++]}
            }else{
                return { done:true, value:undefined}
            }
        }
    }
}

const names = ['Tom','Sily','Lusy']
const nameIterator = createArryIterator(names)
console.log(nameIterator.next()); //{ done: false, value: 'Tom' }
console.log(nameIterator.next()); //{ done: false, value: 'Sily' }   
console.log(nameIterator.next()); //{ done: false, value: 'Lusy' }  

const nums = [1,2,3,4,5]
const numsIterator = createArryIterator(nums)
console.log(numsIterator.next()); //{ done: false, value: 1 }   
console.log(numsIterator.next()); //{ done: false, value: 2 }   
console.log(numsIterator.next()); //{ done: false, value: 3 } 
console.log(numsIterator.next()); //{ done: false, value: 4 }   



// 创建一个无限的迭代器
function createNumberIterator(){
    let index = 0
    return {
        next:function(){
            return {
                done:false,
                value:index++
            }
        }
    }
}
const numberInterator = createNumberIterator()
console.log(numberInterator.next()); //{ done: false, value: 0 }  
console.log(numberInterator.next()); //{ done: false, value: 1 } 
console.log(numberInterator.next()); //{ done: false, value: 2 }  
console.log(numberInterator.next()); //{ done: false, value: 3 } 
console.log(numberInterator.next()); //{ done: false, value: 4 }  
console.log(numberInterator.next()); //{ done: false, value: 5 }     ......
    
```          
                
                
## apply函数的实现
    
```js
    
Function.prototype.wxapply = function (thisArg, arrArg) {
    var fn = this
    thisArg = thisArg ? Object(thisArg) : window
    thisArg.fn = fn
    arrArg ? thisArg.fn(...arrArg) : thisArg.fn() //是否有传入参数
    delete thisArg.fn
}

function foo(a, b, c) {
    console.log(a + b + c);
}
foo.wxapply({}, [10, 20, 30])
foo.wxapply({}, [10, 20, 30])


// // 数组扁平化
// function flatten(arr) {
//     return arr.reduce((pre, cur) => {
//         return pre.concat(Array.isArray(cur) ? flatten(cur) : cur)
//     }, [])
// }

// // 冒泡排序
function bubbleSort(arr) {
    var len = arr.length
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
    return arr
}




const arr = [1,9,2,8,3,7,4,6]
function fn(arr) {
    const tem = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < arr[i + 1]) {
            tem.push(arr[i])
        }else{
            let tem = arr[i]
            arr[i] = arr[i + 1]
            arr[i + 1] = tem
        }
    }
    return tem
}
console.log(fn(arr))

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

// **HTTP常见状态码及其含义**
// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information
// 204 No Content
// 205 Reset Content
// 206 Partial Content
// 300 Multiple Choices
// 301 Moved Permanently
// 302 Found
// 303 See Other
// 304 Not Modified
// 305 Use Proxy
// 307 Temporary Redirect
// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 404 Not Found
// 405 Method Not Allowed
// 406 Not Acceptable
// 407 Proxy Authentication Required
// 408 Request Timeout
// 409 Conflict
// 410 Gone
// 411 Length Required
// 412 Precondition Failed
// 413 Request Entity Too Large
// 414 Request-URI Too Long
// 415 Unsupported Media Type
// 416 Requested Range Not Satisfiable
// 417 Expectation Failed
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable
// 504 Gateway Timeout
// 505 HTTP Version Not Supported

// HTTP有哪些请求方法，GET 和 POST 有什么区别
// GET：查询
// POST：提交
// PUT：更新
// DELETE：删除
// HEAD：请求头
// OPTIONS：请求选项
// TRACE：请求轨迹
// CONNECT：请求连接
// PATCH：请求补充


//GET 和 POST 有什么区别


// HTTP协议中的header及含义
// Accept：客户端可以接受的内容类型
// Accept-Charset：客户端可以接受的字符集
// Accept-Encoding：客户端可以接受的编码方式
// Accept-Language：客户端可以接受的语言
// Authorization：认证信息
// Cache-Control：缓存控制
// Connection：连接方式
// Cookie：Cookie信息
// Content-Length：内容长度
// Content-Type：内容类型
// Date：日期
// Expect：期望
// From：来源
// Host：主机
// If-Match：如果匹配
// If-Modified-Since：如果修改了
// If-None-Match：如果不匹配
// If-Range：如果范围
// If-Unmodified-Since：如果未修改
// Max-Forwards：最大转发数
// Pragma：简短请求头
// Proxy-Authorization：代理认证
// Range：范围
// Referer：来源
// TE：传输编码
// Upgrade：升级
// User-Agent：用户代理
// Via：通过
// Warning：警告
// X-Requested-With：请求类型
// X-Forwarded-For：转发的客户端IP
// X-Forwarded-Host：转发的客户端主机
// X-Forwarded-Server：转发的服务器
// X-Frame-Options：框架配置
// X-XSS-Protection：XSS防护
// X-Content-Type-Options：内容类型配置
// X-Powered-By：服务器提供
// X-UA-Compatible：浏览器兼容性

// 输入url并按下回车键的时候过程中发生了什么
// 1. 客户端发送请求
// 2. 服务器接收请求
// 3. 服务器根据请求处理请求
// 4. 服务器返回响应
// 5. 客户端接收响应

// **浏览器事件传输机制原理**
// 在浏览器中，事件传输机制是通过事件冒泡的方式来实现的，事件冒泡是从最近的元素到最远的元素，每个元素都会触发事件，事件的触发是通过事件冒泡的方式来实现的。
    
```          
##  实现 instanceof
```js
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
## 可迭代对象
    
```js
    
// 该对象返回一个迭代器
const iterabalObj = {
    names : ['Tom','Sily','Lusy'],
    // 可迭代对象需要有 [Symbol.iterator] 这个属性，对应的是一个函数，该函数返回的是一个迭代器
    [Symbol.iterator]:function(){
        let index = 0
        return {
            next:()=>{
                if(index < this.names.length){
                    return { done:false, value:this.names[index++]}
                }else{
                    return { done:true, value:undefined}
                }
            }
        }
    }
}
console.log(iterabalObj[Symbol.iterator]); //[Function: [Symbol.iterator]]

// 调用该函数会为我们生成一个新的迭代器
const iterator = iterabalObj[Symbol.iterator]()
console.log(iterator.next()); //{ done: false, value: 'Tom' }   
console.log(iterator.next()); //{ done: false, value: 'Sily' }  
console.log(iterator.next()); //{ done: false, value: 'Lusy' }  

// 新的迭代器
const iterator1 = iterabalObj[Symbol.iterator]()
console.log(iterator1.next()); //{ done: false, value: 'Tom' }    
console.log(iterator1.next()); //{ done: false, value: 'Sily' }  
console.log(iterator1.next()); //{ done: false, value: 'Lusy' }  

for(const item of iterabalObj){
    console.log(item);
            //   Tom
            //   Sily
            //   Lusy
}
    
```          
                
                
## 监听对象操作
    
```js
    
const obj = {
    name:'Tom',
    age:18
}

// Object.defineProperty(obj,'name',{
//     get:function(){
//         console.log('监听到name属性被访问到了');
//     },
//     set:function(){
//         console.log('监听到name属性被设置了');
//     }
// })

// console.log(obj.name); //监听到name属性被访问到了
// obj.name = 'Kobe' //监听到name属性被设置了

// 可以获取到对象所有的keys
Object.keys(obj).forEach(key=>{
    let value = obj[key]
    console.log(key); 
    /*  name
        age
     */
    Object.defineProperty(obj,key,{
        get:function(){
            console.log('监听到属性被访问了');
            return value
        },
        set:function(newValue){
            console.log('监听到name属性被设置了');
        }
    })
})
console.log(obj.name); //监听到name属性被访问到了
obj.name = 'Kobe' //监听到name属性被设置了
    
```          
                
                
## 响应式原理
    
```js
    
class Depend {
    constructor(){
        this.reactiveFns = []
    }
    // 收集依赖
    addDepend(reactiveFn){
        this.reactiveFns.push(reactiveFn)
    }
    // 执行依赖
    notify(){
        // 遍历所有依赖并执行
        this.reactiveFns.forEach(fn => {
            fn()
        })
    }
}

const depend = new Depend()
const obj = {
    name:'Tom',
    age:18
}
// 监听属性的变化(proxy,object.defineProperty)发生改变，执行depend.notify()
const objProxy = new Proxy(obj,{
    get:function(target,key,receiver){
        // 将获取值返回出去
        return Reflect.get(target,key,receiver)
    },
    // 给代理对象设置值的时候会自动执行该方法
    set:function(target,key,newvalue,receiver){
        Reflect.set(target,key,newvalue,receiver)
        // 设置值时通知depend执行依赖
        depend.notify()
    }
})
function foo(){
    console.log('执行代码');
}
depend.addDepend(foo) //收集依赖
objProxy.name = 'Lilei'


    
```          
                
                
## 迭代器
    
```js
    
//迭代器需要满足以下条件
// 一、是一个对象
// 二、对象有一个next方法
// 三、该方法返回一个对象，且该对象有done和value属性
// const iterator = {
//   next: function () {
//     return { done: true, value: "" };
//   },
// };


// 数组
const arr = ['abc','cba','nba']
// 使用迭代器遍历数组
// 创建一个迭代器对象来访问该数组
let index = 0
const arrIterator = {
    next:function(){
        if(index < arr.length){
            return { done:false, value:arr[index++]}
        }else{
            return { done:true, value:undefined }
        }
    }
}
console.log(index); //0
console.log(arrIterator.next()); //{ done: false, value: 'abc' }

console.log(index); //1
console.log(arrIterator.next()); //{ done: false, value: 'cba' } 

console.log(index); //2
console.log(arrIterator.next()); //{ done: false, value: 'nba' }   

console.log(index); //3
console.log(arrIterator.next()); //{ done: true, value: undefined } 

console.log(index); //3  

// 迭代器优化

    
```          
                
                
## 自定义类的可迭代性
    
```js
    
// 自定义迭代类
class Clasroom {
  constructor(address, name, students) {
    this.address = address;
    this.name = name;
    this.students = students;
  }
  entry(newStudents) {
    this.students.push(newStudents);
  }
  [Symbol.iterator]() {
    //   该函数返回一个迭代器
    let index = 0;
    return {
      next: () => {
        if (index < this.students.length) {
          return { done: false, value: this.students[index++] };
        } else {
          return { done: true, value: undefined };
        }
      },
    };
  }
}

const classroom = new Clasroom("北京市", "一小", ["tom", "sily", "kobe"]);
for (item of classroom) {
    console.log(item);
            // tom
            // sily
            // kobe
}

    
```          
                
                
## 内置创建可迭代对象
    
```js
    
const names = ['abc','cba','nba']
console.log(names[Symbol.iterator]); //[Function: values]

const iterator = names[Symbol.iterator]() //执行该函数会返回一个迭代器

console.log(iterator.next()); //{ value: 'abc', done: false }
console.log(iterator.next()); //{ value: 'cba', done: false }  
console.log(iterator.next()); //{ value: 'nba', done: false }    
console.log(iterator.next()); //{ value: undefined, done: true }    
    
```          
                
                
## 生成器参数问题
    
```js
    
// 每段代码的参数问题
function* foo() {
    console.log(1);
    // 第二次执行next函数传入的参数会赋值给第一次yield的返回值
    const n = yield

    // 第二段代码是执行第二次next执行的
    console.log(2 * n);     // 20
    yield '返回值 :console.log(Generator.next()) // 返回值 ......'

    console.log(3);
    yield

    console.log(4);
}

const Generator = foo()
Generator.next()
Generator.next(10) 


// 执行两次 Generator.next()
// 第二次执行的时候有传入一个参数
// 该参数会作为第一个yield的返回值  const n = yield 使用 n 接受该返回值
    
```          
                
                
## 生成器函数的执行流程
    
```js
    
function* foo() {
    console.log(1);
    yield '返回值' //该段代码的返回值
    console.log(2);
    yield
    console.log(3);
    yield
    console.log(4);
}
const Generator = foo()
                                // 返回值是value ,done:false
console.log(Generator.next()); // { value: { name: 'tom', age: 18 }, done: false }
// Generator.next() // 1




// 生成器函数 function*
// yeild 关键字可以使代码在这里进行暂停
// 执行生成器函数会返回一个生成器对象
// 调用该生成器对象的next方法会依次执行yield之前的代码，再次调用next()会继续执行下一个yield之前的代码
// 每个yield之前的代码若想返回某些值的话，可以将返回值写在yeild后面
    
```          
                
                
## Proxy代理的使用
    
```js
    
const obj = {
  name: "Tom",
  age: 18,
  height: 1.88,
};


// 创建一个proxy代理

                // 参数一：对obj对象进行代理 参数二：捕获器(有13种捕获器)
const objProxy = new Proxy(obj, {



    // 获取值的捕获器(在获取值的时候自动回调该函数)
    get:function(target,key){
        // target 是被代理的对象; key
        console.log(target); //{ name: 'Tom', age: 18, height: 1.88 }
        console.log(key); // name 获取了谁 key就是谁
        return target[key]

    },




    // 设置值的捕获器(在设置值的时候自动回调该函数)
    set:function(target,key,newValue){
        target[key] = newValue
    }
}); 
// 访问
// console.log(objProxy); // { name: 'Tom', age: 18, height: 1.88 }
// console.log(objProxy.name); // Tom
// console.log(objProxy.age); // 18
// 设置
// objProxy.name = "Kobe"; // 通过代理
console.log(objProxy.name); // Kobe

```          

## 事件循环
::: tip
event loop是一个循环，每当有事件发生时，就会触发事件循环，事件循环会调用所有的事件处理函数，然后把事件处理函数的执行结果返回给事件循环，事件循环会把返回的结果再次传递给事件循环，以此类推，直到没有事件发生为止。
:::

### 宏任务
- script
- setTimeout
- setInterval
- setImmediate
- I/O
- macrotask
- UI render
- 浏览器的渲染
### 微任务
- microtask
- task
- idle
- promise
- event loop
                
## 事件循环面试题
    
```js
    
// await 之后的代码属于微任务
// async function a() {
//     console.log('a')
//     await b()
//     console.log('a end')
// }

// async function b() {
//     console.log('b')
// }

// a()

// setTimeout(function () {
//     console.log('setTimeout')
// }, 0)

// new Promise(function (resolve, reject) {
//     console.log('promise')
//     resolve()
// }).then(function () {
//     console.log('then')
// })

// console.log('main end')

// // 
setTimeout(function () {
    console.log('8')
  }, 0) 
  async function async1() {
    console.log('1')
    const data = await async2()
    console.log('6')
    return data
  }
  async function async2() {
     return new Promise(resolve => {
      console.log('2')
      resolve('async2的结果')
    }).then(data => {
      console.log('4')
      return data
    })
  }
  async1().then(data => {
    console.log('7')
    console.log(data)
  })
  new Promise(function (resolve) {
    console.log('3')
    resolve()
  }).then(function () {
    console.log('5')
  })

//   


console.log('script start')
 
async function async1() {
await async2()
console.log('async1 end')
}
async function async2() {
console.log('async2 end')
}
async1()
 
setTimeout(function() {
console.log('setTimeout')
}, 0)
 
new Promise(resolve => {
console.log('Promise')
resolve()
})
.then(function() {
console.log('promise1')
})
.then(function() {
console.log('promise2')
})
 
console.log('script end')

// 

// console.log('script start')
 
// async function async1() {
//     await async2()
//     console.log('async1 end')
// }
// async function async2() {
//     console.log('async2 end')
//     return Promise.resolve().then(()=>{
//         console.log('async2 end1')
//     })
// }
// async1()
 
// setTimeout(function() {
//     console.log('setTimeout')
// }, 0)
 
// new Promise(resolve => {
//     console.log('Promise')
//     resolve()
// })
// .then(function() {
//     console.log('promise1')
// })
// .then(function() {
//     console.log('promise2')
// })
 
// console.log('script end')



// async function async1(){
//   await async2()
//   console.log('async1 end')
// }
// async function async2(){} 
// async1();
// new Promise(function(resolve){
//   resolve();
// }).then(function(){
//   console.log('promise2')
// }).then(function() {
//   console.log('promise3')
// }).then(function() {
//   console.log('promise4')
// })
    
```          
                
                
## 生成器
    
```js
    
// 生成器函数(*)
function* foo() {
  console.log(1);
  yield;

  console.log(2);
  // yield 可以控制函数停止
  yield;

  console.log(3);
  yield;
  
  console.log(4);
}
// 调用生成器函数该函数不会直接执行，而是返回一个生成器对象
// console.log(foo()); // Object [Generator] {}
const Generator = foo();

// 开始执行第一段代码（yield之前的代码）执行next()
Generator.next(); //1

// 开始执行第二段代码
Generator.next(); //2

// 开始执行第三段代码
Generator.next(); //3

// 开始执行第四段代码
Generator.next(); //4

    
```          
                
                
## 事件总线
    
```js
    
class EventBus {
  constructor() {
    this.eventBus = {};
  }

  on(eventName, eventCallBack, thisArg) {
    let handlers = this.eventBus[eventName];
    if (!handlers) {
      handlers = [];
      this.eventBus[eventName] = handlers;
    }
    handlers.push({
      eventCallBack,
      thisArg,
    });
  }
  off() {}
  emit(eventName, ...payload) {
    const handlers = this.eventBus[eventName];
    if (!handlers) return;
    handlers.forEach(handler => {
      handler.eventCallBack.apply(handler.thisArg, payload);
    });
  }
}
const eventBus = new EventBus();

// mian.js
eventBus.on(
  'a',
  function (payload) {
    console.log(payload);
  },
  this
);
// utill.js
eventBus.emit('a', { name: 'Tom' });

    
```          
                
                
## 深拷贝
    
```js
    
function isObject(value) {
  const valueType = typeof value;
  return (value !== null && valueType === 'object') || valueType === 'function';
}

function deepClone(originValue) {
  // 判断是否是symbol类型，创建一个新的symbol
  if (typeof originValue === 'symbol') {
    return Symbol(originValue.description);
  }
  if (typeof originValue === 'function') {
    // 判断是否是函数直接返回
    return originValue;
  }
  if (originValue instanceof Set) {
    return new Set([...originValue]);
  }
  if (originValue instanceof Map) {
      return new Map([...originValue])
  }
  //判断传入的origin是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue;
  }
  //判断传入的对象是数组还是对象
  const newObject = Array.isArray(originValue) ? [] : {};
  //遍历原始对象并将原始对象的属性值克隆到新对象中
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key]); //递归调用
  }
  const symbolKeys = Object.getOwnPropertySymbols(originValue);
  for (const skey of symbolKeys) {
    newObject[skey] = deepClone(originValue[skey]);
  }
  return newObject;
}
const obj1 = {
  name:'Tom',
  fridends:{
    one:{
      name:'sily'
    },
    tow:{
      name:'kobe'
    }
  }
}
console.log(deepClone(obj1));

    
```          
                
                
## 防抖函数
    
```js
    
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 第一次是否直接执行
function debounce(fn, delay, isImmediately = true) {
  let timer = null;
  let Immediately = isImmediately;
  return (...args) => {
    if (timer) clearTimeout(timer);
    Immediately
      ? fn.apply(this, args)
      : (timer = setTimeout(() => fn.apply(this, args), delay));
    Immediately = !isImmediately;
  };
}

    
```          
                
                
## 节流函数
    
```js
    
function throttle(fn, delay) {
  let pre = 0;
  return (...args) => {
    let now = new Date();
    if (now - pre > delay) {
      fn.apply(this,args);
    }
    pre = now;
  };
}

    
```          
                
                
## Proxy其他捕获器
    
```js
    
const obj = {
  name: "Tom",
  age: 18,
  height: 1.88,
};



const objProxy = new Proxy(obj, {
    // 获取值的捕获器回调
    get:function(target,key){
        console.log(target);
        console.log(key);
        return target[key]

    },
    // 设置值的捕获器回调
    set:function(target,key,newValue){
        target[key] = newValue
    },

    // 监听 in 捕获器
    has:function(target,key){
        console.log('使用了 in 操作符');
        return key in target
    },    

    // 监听 delete 捕获器
    deleteProperty:function(target,key){
        console.log('监听到属性被删除了');
        delete target[key]
    }
}); 
// console.log(objProxy.name); // Kobe
// console.log('name' in objProxy); // true

delete objProxy.name

    
```          
                
                
## 原型
    
```js
    
function Fn() {

}
Fn.prototype = {
    name: 'Tom',
    age: 18
}
const p1 = new Fn()
const p2 = new Fn()

console.log(p1.name);
console.log(p2.name);
console.log(p2.toString());
    
```          
                
                
## 数组去重
    
```js
    
const unique = (arr) => {

    if(!Array.isArray(arr)){
       return console.error('参数必须是数组')
    }

    const temArr = []

    for(let i = 0; i < arr.length; i++){
        if(temArr.indexOf(arr[i]) === -1){
            temArr.push(arr[i])
        }
        // OR
        // if(temArr.includes(arr[i])){
        //     temArr.push(arr[i])
        // }
    }
    return temArr.sort()
}


const result = unique([1,1,1,2,3,2,3,4,5,6,4,2,9,8,7,8,7,6])

console.log(result);

console.log(typeof 3..toString());
// 3 ===> 0000 0011  ===> 0000 1100
console.log(3 << 2);
    
```          
                
                
