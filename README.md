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

## Options

| 参数       | 类型                                                                                    | 必填 | 默认值 | 说明                                                                                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------- | ---- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| API_GL_KEY | string                                                                                  | 是   | -      | 地图 api key [获取方式](https://lbs.qq.com/webApi/javascriptGL/glGuide/glBasic)                                                                                                                                                                  |
| id         | string                                                                                  | 否   | Qmap   | 地图 DOM 容器的 id                                                                                                                                                                                                                               |
| options    | Record<string, any>                                                                     | 否   | -      | 地图参数，对象规范详见 [MapOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/docIndexMap#2) <br  /> 重写 center?: { lat: number; lng: number; }; 默认坐标为天安门                                                                            |
| onInit     | (args: { <br  />constructor: any; <br  />instance: any; <br  />marker: any; }) => void; | 否   | -      | 地图初始化完成回调: <br  />constructor: [即 TMap](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)、<br  /> instance: 地图的实例、<br  /> marker: [MultiMarker（点标记）](https://lbs.qq.com/webApi/javascriptGL/glGuide/glMarker)的实例 |

更多 API 使用方法请参考 [腾讯地图开发文档](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)

## Usage

> 基础示例

```jsx
import Qmap from 'react-qqmap';

export default () => <Qmap API_GL_KEY="YOURS_KEY" />;
```

> 初始化回调-获取地图实例

```jsx
import { useRef } from 'react';
import Qmap from 'react-qqmap';

export default () => {
  const QmapRef = useRef();

  return (
    <Qmap
      id="container"
      API_GL_KEY="YOURS_KEY"
      onInit={({ constructor, instance, marker }) => {
        QmapRef.current = {
          constructor,
          instance,
          marker,
        };
      }}
    />
  );
};
```

> 地址解析（地址转换坐标）[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder)

```jsx
import { useEffect } from 'react';
import Qmap, { queryLocation } from 'react-qqmap';

export default () => {
  useEffect(() => {
    // queryLocation: ({ address: string; }) => Promise<any>;
    // 请求参数: address 同 参考文档-请求参数-address (queryLocation 方法内已对 address 进行 encodeURIComponent URL编码)
    // 不支持传入 key、output、callback 等参数
    // key 使用的是 Qmap 传入的 API_GL_KEY
    // output 使用的是 JSONP
    queryLocation({ address: '北京市北京市东城区天安门' }).then((res) => {
      // 响应结果: res 同 参考文档-响应结果
      console.log(res);
    });
  }, []);
  return <Qmap API_GL_KEY="YOURS_KEY" />;
};
```

> 逆地址解析（坐标位置描述）[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder)

```jsx
import { useEffect } from 'react';
import Qmap, { queryAddress } from 'react-qqmap';

export default () => {
  useEffect(() => {
    /* queryAddress: ({
        location: {
          lat: number;
          lng: number;
        };
        get_poi?: 0 | 1;
        poi_options?: string;
      }) => Promise<any>; */
    // 请求参数: get_poi、poi_options 同 参考文档-请求参数-get_poi、poi_options
    // 不支持传入 key、output、callback 等参数
    // key 使用的是 Qmap 传入的 API_GL_KEY
    // output 使用的是 JSONP
    queryAddress({
      location: {
        lat: 39.908802,
        lng: 116.397502,
      },
    }).then((res) => {
      // 响应结果: res 同 参考文档-响应结果
      console.log(res);
    });
  }, []);
  return <Qmap API_GL_KEY="YOURS_KEY" />;
};
```

## Development

```bash
# install dependencies
$ yarn package

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
