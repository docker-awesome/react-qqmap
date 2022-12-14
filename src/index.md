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
