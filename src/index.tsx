import React, { useCallback, useEffect } from 'react';
import fetchJsonp from './fetch-jsonp';

type QmapOptions = {
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
  minZoom?: number;
  maxZoom?: number;
  rotation?: number;
  pitch?: number;
  scale?: number;
  offset?: {
    x: number;
    y: number;
  };
  draggable?: boolean;
  scrollable?: boolean;
  pitchable?: boolean;
  rotatable?: boolean;
  doubleClickZoom?: boolean;
  mapZoomType?: any;
  boundary?: any;
  mapStyleId?: string;
  baseMap?: any;
  viewMode?: string;
  showControl?: boolean;
  renderOptions?: Record<string, any>;
  clip?: Record<string, any>;
};

type QmapProps = {
  id?: string;
  API_GL_KEY: string;
  options?: QmapOptions;
  onInit?: (args: { constructor: any; instance: any; marker: any }) => void;
};

class Qmap {
  static state: Record<string, any> = {
    // 开发密钥（Key）
    API_GL_KEY: null,
  };

  static getQuery = (params: Record<string, any>) => {
    return Object.entries(params)
      .map((item) => {
        const [key, value] = item;
        return `${key}=${value}`;
      })
      .join('&');
  };

  static query = async (params: { address?: string; location?: string }) => {
    const { API_GL_KEY } = this.state;
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?${this.getQuery({
      key: API_GL_KEY,
      output: 'jsonp',
      ...params,
    })}`;

    return fetchJsonp(url);
  };

  static queryLocation = async (address: string) => {
    return this.query({ address: encodeURIComponent(address) });
  };

  static queryAddress = () => {};

  static Component = (props: QmapProps) => {
    const { id = 'Qmap', API_GL_KEY, options = {}, onInit } = props;

    const getMarker = useCallback(
      ({ instance, LatLng }: { instance: any; LatLng: any }) => {
        // 创建并初始化 MultiMarker
        const markerLayer = new (window as any).TMap.MultiMarker({
          // 指定地图容器
          map: instance,
          // 样式定义
          styles: {
            // 创建一个 styleId 为 "marker" 的样式（styles 的子属性名即为 styleId）
            marker: new (window as any).TMap.MarkerStyle({
              // 点标记样式宽度（像素）
              width: 20,
              // 点标记样式高度（像素）
              height: 30,
              // 焦点在图片中的像素位置，一般大头针类似形式的图片以针尖位置做为焦点，圆形点以圆心位置为焦点
              anchor: { x: 10, y: 30 },
            }),
          },
          // 点标记数据数组
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

    const getLatLng = useCallback((center: QmapOptions['center']) => {
      // 定义地图中心点坐标（默认坐标为天安门）
      const LatLng = new (window as any).TMap.LatLng(
        center?.lat || 39.908802,
        center?.lng || 116.397502,
      );

      return LatLng;
    }, []);

    const getInstance = useCallback((domId: string, args: QmapOptions) => {
      // 调用 TMap.Map() 构造函数创建地图
      const instance = new (window as any).TMap.Map(
        document.getElementById(domId),
        args,
      );
      return instance;
    }, []);

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
      async (args: { domId: string; mapOptions?: QmapOptions }) => {
        const { domId, mapOptions } = args;
        const { center, ...rest } = mapOptions || {};

        const LatLng = getLatLng(center);

        const instance = getInstance(domId, {
          center: LatLng,
          ...rest,
        });

        const marker = getMarker({ instance, LatLng });

        return {
          instance,
          marker,
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
          this.state = {
            ...this.state,
            API_GL_KEY,
            constructor: (window as any).TMap,
            ...configs,
          };
          onInit?.({
            ...configs,
            constructor: (window as any).TMap,
          });
        });
      })();

      return () => {};
    }, []);

    return <div id={id} />;
  };
}

// 地址解析（地址转坐标）
export const queryLocation = Qmap.queryLocation;

// 逆地址解析（坐标位置描述）
// export const queryAddress = Qmap.queryLocation;

export default Qmap.Component;
