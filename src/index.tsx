import React, { useCallback, useEffect, useRef } from 'react';
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

type QmapMarkerOptions = {
  id?: string;
  zIndex?: number;
  styles?: Record<string, any>;
  enableCollision?: boolean;
  geometries?: {
    id?: string;
    styleId?: string;
    position?: any;
    rank?: number;
    properties?: Record<string, any>;
    content?: string;
  }[];
};

type QmapProps = {
  id?: string;
  API_GL_KEY: string;
  options?: QmapOptions;
  markerOptions?: QmapMarkerOptions;
  onInit?: (args: { constructor: any; instance: any; marker: any }) => void;
};

class Qmap {
  static state: Record<string, any> = {
    // 开发密钥（Key）
    API_GL_KEY: null,
  };

  static getQueryString = (params: Record<string, any>) => {
    return Object.entries(params)
      .map((item) => {
        const [key, value] = item;
        return `${key}=${value}`;
      })
      .join('&');
  };

  static query = async (params: Record<string, any>) => {
    const { API_GL_KEY } = this.state;
    const url = `https://apis.map.qq.com/ws/geocoder/v1/?${this.getQueryString({
      key: API_GL_KEY,
      output: 'jsonp',
      ...params,
    })}`;

    return fetchJsonp(url);
  };

  static queryLocation = async ({
    key,
    address,
  }: {
    key?: string;
    address: string;
  }) => {
    return this.query({
      key: key || this.state.API_GL_KEY,
      address: encodeURIComponent(address),
    });
  };

  static queryAddress = (args: {
    key?: string;
    location: {
      lat: number;
      lng: number;
    };
    get_poi?: 0 | 1;
    poi_options?: string;
  }) => {
    const { key, location, ...rest } = args;
    return this.query({
      key: key || this.state.API_GL_KEY,
      location: `${location.lat},${location.lng}`,
      ...JSON.parse(JSON.stringify(rest)),
    });
  };

  static Component = (props: QmapProps) => {
    const {
      id = 'Qmap',
      API_GL_KEY,
      options = {},
      markerOptions,
      onInit,
    } = props;

    const QmapRef = useRef<{ constructor: any; instance: any; marker: any }>({
      constructor: (window as any).TMap,
      instance: null,
      marker: null,
    });

    const getLatLng = useCallback((center: QmapOptions['center']) => {
      // 定义地图中心点坐标（默认坐标为天安门）
      const LatLng = new (window as any).TMap.LatLng(
        center?.lat || 39.908802,
        center?.lng || 116.397502,
      );

      return LatLng;
    }, []);

    const getMarker = useCallback(({ instance }: { instance: any }) => {
      const { styles = {}, ...rest } = markerOptions || {};
      // 创建并初始化 MultiMarker
      const markerLayer = new (window as any).TMap.MultiMarker({
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
          ...styles,
        },
        // 点标记数据数组
        geometries: [],
        ...rest,
        // 指定地图容器
        map: instance,
      });

      return markerLayer;
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
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://map.qq.com/api/gljs?v=1.exp&key=${apiKey}`;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
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

        const marker = getMarker({ instance });

        return {
          instance,
          marker,
        };
      },
      [],
    );

    useEffect(() => {
      (async () => {
        this.state.API_GL_KEY = API_GL_KEY;
        if (!(window as any).TMap) {
          await loadScript(API_GL_KEY).catch((error) => {
            console.error(error);
          });
        }
        if ((window as any).TMap) {
          loadQmap({ domId: id, mapOptions: options })
            .then((res) => {
              this.state = {
                ...this.state,
                constructor: (window as any).TMap,
              };
              QmapRef.current = {
                constructor: (window as any).TMap,
                ...res,
              };
              onInit?.(QmapRef.current);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })();

      return () => {};
    }, []);

    return <div id={id} />;
  };
}

// 地址解析（地址转坐标）
export const queryLocation = Qmap.queryLocation;

// 逆地址解析（坐标位置描述）
export const queryAddress = Qmap.queryAddress;

export default Qmap.Component;
