# react-qqmap

[![NPM version](https://img.shields.io/npm/v/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)
[![NPM downloads](http://img.shields.io/npm/dm/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)

腾讯地图 JavaScript API GL - React 组件

React Version >= 17.02

## Install

```bash
yarn add react-qqmap

npm install react-qqmap
```

## Usage

```jsx
import Qmap from 'react-qqmap';

export default () => <Qmap API_GL_KEY="YOURS_KEY" />;
```

```jsx
import { useRef, useEffect } from 'react';
import Qmap from 'react-qqmap';

export default () => {
  const QmapRef = useRef();

  return (
    <Qmap
      id="container"
      API_GL_KEY="YOURS_KEY"
      onInit={(instance, constructor) => {
        QmapRef.current = {
          constructor,
          instance,
        };
      }}
    />
  );
};
```

## Options

| 参数       | 类型                                                                    | 必填 | 默认值 | 说明                                                                                                                                                                                                                                                  |
| ---------- | ----------------------------------------------------------------------- | ---- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API_GL_KEY | string                                                                  | 是   | -      | 地图 api key [获取方式](https://lbs.qq.com/webApi/javascriptGL/glGuide/glBasic)                                                                                                                                                                       |
| id         | string                                                                  | 否   | Qmap   | 地图 DOM 容器的 id                                                                                                                                                                                                                                    |
| options    | Record<string, any>                                                     | 否   | -      | 地图参数，对象规范详见 [MapOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/docIndexMap#2) <br  /> 重写了 center?: { lat: number; lng: number; }; 默认坐标为天安门                                                                               |
| onInit     | (args: { constructor: any; instance: any; markerLayer: any; }) => void; | 否   | -      | 地图初始化完成回调: <br  />constructor: [即 TMap](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)、<br  /> instance: 地图的实例、<br  /> markerLayer: [MultiMarker（点标记）](https://lbs.qq.com/webApi/javascriptGL/glGuide/glMarker)的实例 |

[腾讯地图开发文档](https://lbs.qq.com/webApi/javascriptGL/glGuide/glBasic)

## Development

```bash
# install dependencies
$ yarn install

# develop library by docs demo
$ yarn start

# build library source code
$ yarn run build

# build library source code in watch mode
$ yarn run build:watch

# build docs
$ yarn run docs:build

# check your project for potential problems
$ yarn run doctor
```

## LICENSE

MIT
