# 腾讯地图 JavaScript API GL - React 组件

[![NPM version](https://img.shields.io/npm/v/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap) [![NPM downloads](http://img.shields.io/npm/dm/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)

## Guide

[安装](#install)

[组件参数](#options)

[基础示例](#basic)

[获取地图实例](#instance)

[点标记](#marker)

[地址解析（地址转换坐标）](#a2l)

[逆地址解析（坐标位置描述）](#l2a)

[提示](#warning)

<br />

## <span id='install'>安装</span> `React Version >= 17.02`

```bash
yarn add react-qqmap

npm install react-qqmap
```

<br />

## <span id='options'>组件参数</span>

| 参数          | 类型                                                                                                          | 必填 | 默认值 | 说明                                                                                                                                                                                                                                                            |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API_GL_KEY    | string                                                                                                        | 是   | -      | 地图 api key 开发密钥 [获取方式](https://lbs.qq.com/webApi/javascriptGL/glGuide/glBasic)                                                                                                                                                                        |
| id            | string                                                                                                        | 否   | Qmap   | 地图 DOM 容器的 id                                                                                                                                                                                                                                              |
| options       | Record<string, any>                                                                                           | 否   | -      | 地图参数，对象规范详见 [MapOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/docIndexMap#2) <br  /> 重写 center?: { lat: number; lng: number; };<br  />默认坐标为天安门                                                                                     |
| markerOptions | Record<string, any>                                                                                           | 否   | -      | MultiMarker 的配置参数。[参考 MultiMarkerOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker)                                                                                                                                                     |
| onInit        | (args: {<br  /> &emsp;constructor: any;<br  />&emsp;instance: any;<br  />&emsp;marker: any;<br  />}) => void; | 否   | -      | 地图初始化完成回调:<br  />&emsp;constructor: [即 TMap](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)、<br  />&emsp;instance: 地图的实例、<br  />&emsp;marker: [MultiMarker（点标记）](https://lbs.qq.com/webApi/javascriptGL/glGuide/glMarker)的实例 |

<br />

```text
注：

默认点标记 styles 的 key 为 marker, 即 styleId 为 'marker';

const marker = new TMap.MultiMarker({
    styles: {
        marker: new TMap.MarkerStyle({
                "width": 20,
                "height": 30,
                "anchor": { x: 10, y: 30 },
            })
    }
});

若需要自定义点标注样式，可以传入新的 styles 自定义 styleId, 在点标注数据数组内使用该 styleId 即可

例子：
<Qmap markerOptions={{
    styles: {
        YOUR_STYLE_ID: new TMap.MarkerStyle(YOUR_STYLE)
    }
}} />

marker.add([{
  "styleId": 'YOUR_STYLE_ID',  // 指定样式id
  "position": new TMap.LatLng(39.954104, 116.357503),  //点标记坐标位置
}])
```

<br />

### 更多 API 使用方法请参考 [腾讯地图开发文档](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)

<br />

## Usage

> <span id='basic'>基础示例</span>

```jsx
import Qmap from 'react-qqmap';

export default () => <Qmap API_GL_KEY="YOURS_KEY" />;
```

<br />

> <span id='instance'>初始化回调-获取地图实例</span>

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
          constructor, // 即 TMap
          instance, // 地图实例
          marker, // 点标记实例
        };
      }}
    />
  );
};
```

<br />

> <span id='marker'>点标记</span>

```jsx
import { useRef, useCallback } from 'react';
import Qmap from 'react-qqmap';

export default () => {
  const QmapRef = useRef();

  // 上海虹桥火车站
  const station = {
    lng: 121.319595,
    lat: 31.194069,
  };

  const addMarker = useCallback(() => {
    QmapRef.current.marker.add([
      {
        id: 'shanghaihongqiao',
        // 指定样式 id
        styleId: 'marker',
        // 点标记坐标位置
        position: new QmapRef.current.constructor.LatLng(station),
      },
    ]);
  }, []);

  const removeMarker = useCallback(() => {
    QmapRef.current.marker.remove(['shanghaihongqiao']);
  }, []);

  return (
    <div>
      <button onClick={addMarker}>标记上海虹桥火车站</button>
      <br />
      <button onClick={removeMarker}>移除上海虹桥火车站标记</button>
      <br />
      <Qmap
        id="container"
        API_GL_KEY="YOURS_KEY"
        options={{
          center: station,
        }}
        onInit={({ constructor, instance, marker }) => {
          QmapRef.current = {
            constructor,
            instance,
            marker,
          };
        }}
      />
    </div>
  );
};
```

<br />

> <span id='a2l'>地址解析（地址转换坐标）</span>[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder)

| 参数    | 类型   | 必填 | 默认值                 | 说明         |
| ------- | ------ | ---- | ---------------------- | ------------ |
| key     | string | 否   | Qmap 传入的 API_GL_KEY | 开发密钥     |
| address | string | 是   | -                      | 需解析的地址 |

```jsx
import { useEffect } from 'react';
import Qmap, { queryLocation } from 'react-qqmap';

export default () => {
  useEffect(() => {
    // queryLocation: ({ key: string; address: string; }) => Promise<any>;
    // 请求参数: key、address 同 参考文档-请求参数 - key、address (queryLocation 方法内已对 address 进行 encodeURIComponent URL编码)
    // 不支持传入 output、callback 等参数
    // key 即地图的 API_GL_KEY
    // output 使用的是 JSONP
    queryLocation({
      key: 'YOURS_KEY',
      address: '北京市北京市东城区天安门',
    }).then((res) => {
      // 响应结果: res 同 参考文档-响应结果
      console.log(res);
    });
  }, []);
  return <Qmap API_GL_KEY="YOURS_KEY" />;
};
```

<br />

> <span id='l2a'>逆地址解析（坐标位置描述）</span>[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder)

| 参数        | 类型                          | 必填 | 默认值 | 说明                        |
| ----------- | ----------------------------- | ---- | ------ | --------------------------- |
| key         | string                        | 是   | -      | 开发密钥                    |
| location    | { lat: number; lng: number; } | 是   | -      | 经纬度坐标位置              |
| get_poi     | 0 \| 1                        | 否   | 0      | 是否返回周边地点（POI）列表 |
| poi_options | string                        | 否   | -      | 周边 POI 列表控制参数       |

```jsx
import { useEffect } from 'react';
import Qmap, { queryAddress } from 'react-qqmap';

export default () => {
  useEffect(() => {
    // queryAddress: ({ key: string; location: { lat: number; lng: number; }; get_poi?: 0 | 1; poi_options?: string; }) => Promise<any>;
    // 请求参数: key、get_poi、poi_options 同 参考文档-请求参数 - key、get_poi、poi_options
    // 不支持传入 output、callback 等参数
    // key 即地图的 API_GL_KEY
    // output 使用的是 JSONP
    queryAddress({
      key: 'YOURS_KEY',
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

## <span id='warning'>提示</span>

<br />

控件-[旋转控件](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocControl)

```css
/* 样式类名：rotate-circle */

.rotate-circle {
  /* 此样式为地图默认样式，可能会被项目写的全局样式覆盖为 border-box, 导致旋转控件位置偏移，只需重写回 content-box 即可修复 */
  box-sizing: content-box;
}
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

<br />

## LICENSE

MIT
