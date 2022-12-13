# react-qqmap

[![NPM version](https://img.shields.io/npm/v/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)
[![NPM downloads](http://img.shields.io/npm/dm/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)

腾讯地图 JavaScript API GL - React 组件

React Version >= 17.02

<br />

## Install

```bash
yarn add react-qqmap

npm install react-qqmap
```

<br />

## Options

| 参数       | 类型                                                                | 必填 | 默认值 | 说明                                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------- | ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API_GL_KEY | string                                                              | 是   | -      | 地图 api key 开发密钥 [获取方式](https://lbs.qq.com/webApi/javascriptGL/glGuide/glBasic)                                                                              |
| id         | string                                                              | 否   | Qmap   | 地图 DOM 容器的 id                                                                                                                                                    |
| options    | Record<string, any>                                                 | 否   | -      | 地图参数，对象规范详见 [MapOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/docIndexMap#2) <br  /> 重写 center?: { lat: number; lng: number; }; 默认坐标为天安门 |
| onInit     | (args: { <br  />constructor: any; <br  />instance: any; }) => void; | 否   | -      | 地图初始化完成回调: <br  />constructor: [即 TMap](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)、<br  /> instance: 地图的实例、<br  />                     |

<br />

### 更多 API 使用方法请参考 [腾讯地图开发文档](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)

<br />

## Usage

> 基础示例

```jsx
import Qmap from 'react-qqmap';

export default () => <Qmap API_GL_KEY="YOURS_KEY" />;
```

<br />

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
      onInit={({ constructor, instance }) => {
        QmapRef.current = {
          constructor,
          instance,
        };
      }}
    />
  );
};
```

<br />

> 点标记

```jsx
import { useRef, useCallback } from 'react';
import Qmap from 'react-qqmap';

export default () => {
  const QmapRef = useRef();

  const getLatLng = useCallback((location) => {
    // 定义地图中心点坐标（默认坐标为天安门）
    const LatLng = new QmapRef.current.constructor.LatLng(
      location?.lat || 39.908802,
      location?.lng || 116.397502,
    );

    return LatLng;
  }, []);

  const getMarkerStyle = useCallback((options = {}) => {
    const markerStyle = new QmapRef.current.constructor.MarkerStyle({
      // 点标记样式宽度（像素）
      width: 20,
      // 点标记样式高度（像素）
      height: 30,
      // 焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
      anchor: { x: 10, y: 30 },
      ...options,
    });
    return markerStyle;
  }, []);

  const getMarker = useCallback((location) => {
    // 创建并初始化 MultiMarker
    const markerLayer = new QmapRef.current.constructor.MultiMarker({
      // 指定地图容器
      map: QmapRef.current.instance,
      // 样式定义
      styles: {
        // 创建一个 styleId 为 "marker" 的样式（styles 的子属性名即为 styleId）
        marker: getMarkerStyle(),
      },
      // 点标记数据数组
      geometries: [
        {
          // 点标记唯一标识，后续如果有删除、修改位置等操作，都需要此 id
          id: 'marker',
          // 指定样式 id
          styleId: 'marker',
          // 点标记坐标位置
          position: getLatLng(location),
          properties: {
            // 自定义属性
            title: 'marker',
          },
        },
      ],
    });

    return markerLayer;
  }, []);

  return (
    <Qmap
      id="container"
      API_GL_KEY="YOURS_KEY"
      onInit={({ constructor, instance, marker }) => {
        QmapRef.current = {
          constructor,
          instance,
        };

        const marker = getMarker();

        QmapRef.current.marker = marker;
      }}
    />
  );
};
```

<br />

> 地址解析（地址转换坐标）[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder)

| 参数    | 类型   | 必填 | 默认值                 | 说明         |
| ------- | ------ | ---- | ---------------------- | ------------ |
| key     | string | 否   | Qmap 传入的 API_GL_KEY | 开发密钥     |
| address | string | 是   | -                      | 需解析的地址 |

```jsx
import { useEffect } from 'react';
import Qmap, { queryLocation } from 'react-qqmap';

export default () => {
  useEffect(() => {
    // queryLocation: ({ key?: string; address: string; }) => Promise<any>;
    // 请求参数: key、address 同 参考文档-请求参数 - key、address (queryLocation 方法内已对 address 进行 encodeURIComponent URL编码)
    // 不支持传入 output、callback 等参数
    // key 不传则使用的是 Qmap 传入的 API_GL_KEY
    // output 使用的是 JSONP
    queryLocation({ address: '北京市北京市东城区天安门' }).then((res) => {
      // 响应结果: res 同 参考文档-响应结果
      console.log(res);
    });
  }, []);
  return <Qmap API_GL_KEY="YOURS_KEY" />;
};
```

<br />

> 逆地址解析（坐标位置描述）[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder)

| 参数        | 类型                          | 必填 | 默认值                 | 说明                        |
| ----------- | ----------------------------- | ---- | ---------------------- | --------------------------- |
| key         | string                        | 否   | Qmap 传入的 API_GL_KEY | 开发密钥                    |
| location    | { lat: number; lng: number; } | 是   | -                      | 经纬度坐标位置              |
| get_poi     | 0 \| 1                        | 否   | 0                      | 是否返回周边地点（POI）列表 |
| poi_options | string                        | 否   | -                      | 周边 POI 列表控制参数       |

```jsx
import { useEffect } from 'react';
import Qmap, { queryAddress } from 'react-qqmap';

export default () => {
  useEffect(() => {
    // queryAddress: ({ key?: string; location: { lat: number; lng: number; }; get_poi?: 0 | 1; poi_options?: string; }) => Promise<any>;
    // 请求参数: key、get_poi、poi_options 同 参考文档-请求参数 - key、get_poi、poi_options
    // 不支持传入 output、callback 等参数
    // key 不传则使用的是 Qmap 传入的 API_GL_KEY
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

<br />

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

<br />

## LICENSE

MIT
