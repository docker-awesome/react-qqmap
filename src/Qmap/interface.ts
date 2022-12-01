export type QmapOptions = {
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

export type QmapProps = {
  id?: string;
  API_GL_KEY: string;
  options?: QmapOptions;
  onInit?: (instance: any, constructor: any) => void;
};
