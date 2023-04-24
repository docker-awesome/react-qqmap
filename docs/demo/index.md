---
title: 示例
order: 1
nav:
  title: 示例
  order: 1
---

## 基础示例

```jsx
import Qmap from 'react-qqmap';

export default () => <Qmap API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP" />;
```

## 获取地图实例

```jsx
import { useRef, useEffect } from 'react';
import Qmap from 'react-qqmap';

export default () => {
  const QmapRef = useRef();

  return (
    <Qmap
      id="container"
      API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP"
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

## 点标记

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

  const addMarker = useCallback((location) => {
    const position = getLatLng(location);
    QmapRef.current.marker.add([
      {
        id: 'shanghaihongqiao',
        // 指定样式 id
        styleId: 'marker',
        // 点标记坐标位置
        position,
      },
    ]);
  }, []);

  const removeMarker = useCallback((location) => {
    QmapRef.current.marker.remove(['shanghaihongqiao']);
  }, []);

  // 上海虹桥火车站
  const station = {
    lng: 121.319595,
    lat: 31.194069,
  };

  return (
    <div>
      <div>
        <button onClick={() => addMarker(station)}>标记上海虹桥火车站</button>
        <span> | </span>
        <button onClick={removeMarker}>移除上海虹桥火车站标记</button>
      </div>
      <br />
      <Qmap
        id="marker"
        API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP"
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

## 地址解析

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
      key: 'VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP',
      address: '北京市北京市东城区天安门',
    }).then((res) => {
      // 响应结果: res 同 参考文档-响应结果
      console.log(res);
    });
  }, []);

  return (
    <Qmap id="queryLocation" API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP" />
  );
};
```

## 逆地址解析

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
      key: 'VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP',
      location: {
        lat: 39.908802,
        lng: 116.397502,
      },
    }).then((res) => {
      // 响应结果: res 同 参考文档-响应结果
      console.log(res);
    });
  }, []);

  return (
    <Qmap id="queryAddress" API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP" />
  );
};
```
