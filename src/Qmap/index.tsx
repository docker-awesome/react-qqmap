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

  const loadQmap = useCallback(
    (args: { domId: string; mapOptions?: QmapOptions }) => {
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

      return instance;
    },
    [],
  );

  useEffect(() => {
    (async () => {
      if (!(window as any).TMap) {
        await loadScript(API_GL_KEY);
      }
      loadQmap({ domId: id, mapOptions: options }).then((instance: any) => {
        onInit?.(instance, (window as any).TMap);
      });
    })();

    return () => {};
  }, []);

  return <div id={id} />;
}

export default Qmap;
