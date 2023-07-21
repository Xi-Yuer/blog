---
title: React
date: 2022-6-5
categories:
  - 前端笔记
tags:
  - React
---

# React：一个专注于UI的javascript前端库
## Redux

> redux 是一个状态管理库，用于对整个 App 组件的共享状态和数据进行集中式管理

### store

```javascript
import { createStore } form 'redux'

const init = {
    value:'defaultValue'
}

const store = createStore((state=init,action) => {
    const { type, data } = action
    switch(type){
        case 'add':
            return {...state,num:data}
        default:
            return state
    }
})
export default store
```

### 派发 action

```javascript
import store form './store'

const actionCreator = (data) => {
	return {
		type:'add'
		data
	}
}

btnClick = () => {
    const action = actionCreator(233)
	store.dispatch(action)
}
```

### 获取 store 值

```javascript
import store from './store'

class Home extends React.component{
    componentDidMount(() => {
        this.unSubscribe = store.subscribe(() => {
            //监听store状态变化更新视图
            this.setState({})
        })
    })
    componentWillUnmount(() => {
        //取消监听
        this.unSubscribe()
    })
    render(){
        return (
        	<>
            <h2> { store.getState().num }</h2>
            </>
        )
    }
}
```

### react-redux

> react-redux 能够使得在组件中更方便的派发 action 和获取 store 中的数据，并且数据更新自动重新渲染组件

- Provider 一个组件用于包裹住最外层根组件，使得其子组件能够共享状态

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './store';

import App from './App';
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```

- 函数式组件中发送 action 和获取 store 中的值

```javascript
import React, { memo } from 'react';
import { useDispatch, useSelecter } from 'react-redux';

export default memo(function Text() {
  const dispatch = useDispatch();
  const num = useSelecter(state => state.num); //获取值

  const btnClick = () => {
    //发送action
    dispatch({
      type: 'add',
      num: 10,
    });
  };
  return (
    <div>
      <h2></h2>
      <button onClick={e => btnClick()}>发送action</button>
    </div>
  );
});
```

- 类组件中获取 store 和发生 action ==> connect

  > connect 可以将组件和 store 进行关联使得数据共享

```javascript
import React from 'react'
import { conenct } from 'react-redux'

class Home extends React.component {
    const btnClick = () => {
        this.props.sendAction()
    }
    <>
       <button onClick={this.btnClick}>分发</button>
    </>
}
export connect(
    //参数一：redux中的state;参数二：组件自己的props
    //返回值：对象，将该返回值传递到组件中的props中去
    (state,ownProps)=>{ //接受

    },
    //参数一：dispatch函数，用于分发action；参数二：自己的props
    //返回值：对象,它会将返回的该对象传递到Home组件中的props中去
    (dispatch，ownProps)=>{ //发送
        return {
            sendAction:() => {
                //利用dispatch发送一个action
                dispatch({
                    type:'add',
                    num:1
                })
            }
        }
    }
	)(Home)
```

### 完善代码

- store

```javascript
import { createStore } from 'redux';

const init = {
  value: '默认值',
  num: 0,
};

function reducer(state = init, action) {
  const { type, data } = action;
  switch (type) {
    case 'add':
      return { ...state, num: data };
    case 'sub':
      return { ...state, num: data };
    default:
      return state;
  }
}

export default createStore(reducer);
```

- 根组件

```javascript
import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import About from './pages/About';
import Home from './pages/Home';
import store from './store';

export default class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Home ownProps={'嘻嘻嘻'} />
        <hr />
        <About />
      </Provider>
    );
  }
}
```

- 类组件

```javascript
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Home extends PureComponent {
  btnClick = () => {
    this.props.addAction();
  };
  render() {
    return (
      <div>
        <h2>Home：类组件</h2>
        <button onClick={this.btnClick}>+</button>
        <h2>当前计数:{this.props.num}</h2>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return state;
};
const mapDispatchToProps = (dispatch, ownProps) => {
  let num = 0;
  return {
    addAction: () => {
      dispatch({
        type: 'add',
        data: ++num,
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
```

- 函数式组件

```javascript
import React, { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default memo(function About() {
  const dispatch = useDispatch();
  const num = useSelector(state => state.num);

  const btnClick = () => {
    let temNum = num;
    dispatch({
      type: 'sub',
      data: --temNum,
    });
  };
  return (
    <div>
      <h2>About：函数式组件</h2>
      <button onClick={btnClick}>-</button>
      <h2>当前计数{num}</h2>
    </div>
  );
});
```

### combineReducers(reducers)

- reducers/todos.js

```js
export default function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text]);
    default:
      return state;
  }
}
```

- reducers/counter.js

```js
export default function counter(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}
```

- reducers/index.js

```js
import { combineReducers } from 'redux';
import todos from './todos';
import counter from './counter';

export default combineReducers({
  todos,
  counter,
});
```

- App.js

```js
import { createStore } from 'redux';
import reducer from './reducers/index';

let store = createStore(reducer);
console.log(store.getState());
// {
//   counter: 0,
//   todos: []
// }

store.dispatch({
  type: 'ADD_TODO',
  text: 'Use Redux',
});
console.log(store.getState());
// {
//   counter: 0,
//   todos: [ 'Use Redux' ]
// }
```

## Mobx

### store

```js
import { action, computed, runInAction, makeAutoObservable, flow } from 'mobx';

export class CounterStore {
  // 定义数据
  count = 0;
  list = [1, 2, 3, 4, 5];
  asyncData = 0;
  flowData = 'default';
  constructor() {
    // 将数据变成响应式
    makeAutoObservable(this, {
      // 可以标记 | 也可以不标记
      incrementCount: action,
      decrementCount: action,
      changeFilterList: action,
      asyncAdd: action,
      asyncFlow: action.bound,
      filterList: computed,
    });
  }
  // 定义 action 函数用于修改数据
  incrementCount = () => {
    this.count++;
  };
  decrementCount = () => {
    this.count--;
  };
  changeFilterList = () => {
    this.list.push(...[5, 4, 3, 2, 1]);
  };

  // 异步action(使用runInAction包裹)
  asyncAdd = async () => {
    await Promise.resolve();
    runInAction(() => {
      this.incrementCount();
      this.asyncData++;
    });
  };
  // 异步action(使用 flow )
  asyncFlow = flow(function* () {
    yield console.log(this); //需要绑定 this
    const data = yield Promise.resolve('Flow');
    this.flowData = data;
  });

  // 定义computed
  get filterList() {
    return this.list.map(item => item * 2);
  }
}
```

### 根 Store

```js
import { CounterStore } from './counter';

class Store {
  constructor() {
    this.counter = new CounterStore();
  }
}
const store = new Store();
export { store };
```

### store 共享

> 使用 context

```js
import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
export const Context = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>
);
```

### 在组件中使用

```js
import React, { memo, useContext } from 'react';

import { observer } from 'mobx-react-lite';
import { Context } from '../..';

const Counter = () => {
  const {
    counter: {
      count,
      changeFilterList,
      asyncData,
      flowData,
      decrementCount,
      filterList,
      incrementCount,
      asyncAdd,
      asyncFlow,
    },
  } = useContext(Context);
  return (
    <div>
      <button onClick={incrementCount}>+</button>
      <span>{count}</span>
      <button onClick={decrementCount}>-</button>
      {filterList.map((i, n) => {
        return <li key={n}>{i}</li>;
      })}
      <button onClick={changeFilterList}>添加数组</button>
      <hr />
      <span>{asyncData}</span>
      <button onClick={asyncAdd}>异步runInAction</button>
      <hr />
      <span>{flowData}</span>
      <button onClick={asyncFlow}>异步flow</button>
    </div>
  );
};

export default memo(observer(Counter));
```
