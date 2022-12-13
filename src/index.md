# 示例

```jsx
import Qmap from 'react-qqmap';

export default () => (
  <div>
    <p>基础示例:</p>
    <Qmap API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP" />
  </div>
);
```

```jsx
import { useRef, useEffect } from 'react';
import Qmap from 'react-qqmap';

export default () => {
  const QmapRef = useRef();

  return (
    <div>
      <p>初始化地图，获取地图实例:</p>
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
    </div>
  );
};
```

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

  // 上海虹桥机场
  const airport = {
    lng: 121.339752,
    lat: 31.196955,
  };

  return (
    <div>
      <div>
        <p>点标记:</p>
        <button onClick={() => addMarker(station)}>标记上海虹桥火车站</button>
        <span> | </span>
        <button onClick={removeMarker}>移除上海虹桥火车站标记</button>
      </div>
      <br />
      <Qmap
        id="marker"
        API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP"
        options={{
          center: airport,
        }}
        onInit={({ constructor, instance }) => {
          QmapRef.current = {
            constructor,
            instance,
          };

          const marker = getMarker(airport);

          QmapRef.current.marker = marker;
        }}
      />
    </div>
  );
};
```
