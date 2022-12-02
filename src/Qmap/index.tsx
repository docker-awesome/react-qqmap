import React, { useCallback, useEffect } from 'react';
import type { QmapOptions, QmapProps } from './interface';

function Qmap(props: QmapProps) {
  const { id = 'Qmap', API_GL_KEY, options = {}, onInit } = props;

  const loadScript = useCallback((apiKey: string) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${apiKey}`;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  }, []);

  const loadMarker = useCallback(
    ({ instance, LatLng }: { instance: any; LatLng: any }) => {
      // 创建并初始化 MultiMarker
      const markerLayer = new (window as any).TMap.MultiMarker({
        // 指定地图容器
        map: instance,
        //样式定义
        styles: {
          //创建一个 styleId 为 "marker" 的样式（styles 的子属性名即为 styleId）
          marker: new (window as any).TMap.MarkerStyle({
            // 点标记样式宽度（像素）
            width: 20,
            // 点标记样式高度（像素）
            height: 30,
            // 焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
            anchor: { x: 10, y: 30 },
          }),
        },
        //点标记数据数组
        geometries: [
          {
            // 点标记唯一标识，后续如果有删除、修改位置等操作，都需要此 id
            id: 'marker',
            // 指定样式 id
            styleId: 'marker',
            // 点标记坐标位置
            position: LatLng,
            properties: {
              // 自定义属性
              title: 'marker',
            },
          },
        ],
      });

      return markerLayer;
    },
    [],
  );

  const loadQmap = useCallback(
    async (args: { domId: string; mapOptions?: QmapOptions }) => {
      const { domId, mapOptions } = args;
      const { center, ...rest } = mapOptions || {};

      // 定义地图中心点坐标（默认坐标为天安门）
      const LatLng = new (window as any).TMap.LatLng(
        center?.lat || 39.908802,
        center?.lng || 116.397502,
      );

      // 调用 TMap.Map() 构造函数创建地图
      const instance = new (window as any).TMap.Map(
        document.getElementById(domId),
        {
          center: LatLng,
          ...rest,
        },
      );

      const markerLayer = loadMarker({ instance, LatLng });

      return {
        instance,
        markerLayer,
      };
    },
    [],
  );

  useEffect(() => {
    (async () => {
      if (!(window as any).TMap) {
        await loadScript(API_GL_KEY);
      }
      loadQmap({ domId: id, mapOptions: options }).then((configs) => {
        onInit?.({
          ...configs,
          constructor: (window as any).TMap,
        });
      });
    })();

    return () => {};
  }, []);

  return <div id={id} />;
}

export default Qmap;
