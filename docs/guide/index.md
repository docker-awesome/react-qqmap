---
title: 指南
order: 0
nav:
  title: 指南
  order: 0
---

## 腾讯地图 JavaScript API GL - React 组件

[![NPM version](https://img.shields.io/npm/v/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap) [![NPM downloads](http://img.shields.io/npm/dm/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)

## 安装 (`React Version >= 17.02`)

```bash
yarn add react-qqmap
```

<br>

```bash
npm install react-qqmap
```

## 使用 ([示例](../demo))

```javascript
import Qmap, { queryLocation, queryAddress } from 'react-qqmap';

export default () => <Qmap API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP" />;
```

## 组件参数 ([腾讯地图开发文档](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex))

<style>
  table tr th:first-of-type, table tr td:first-of-type {
      width: 15%;
  }
  table tr th:nth-of-type(2), table tr td:nth-of-type(2) {
      width: 20%;
  }
  table tr th:nth-of-type(3), table tr td:nth-of-type(3) {
      width: 10%;
      text-align: center;
  }
  table tr th:nth-of-type(4), table tr td:nth-of-type(4) {
      width: 10%;
      text-align: center;
  }
  table tr th:last-of-type, table tr td:last-of-type {
      width: 45%;
  }
</style>

| 参数          | 类型                                                                                                          | 必填 | 默认值 | 说明                                                                                                                                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ---- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| API_GL_KEY    | string                                                                                                        | 是   | -      | 地图 api key 开发密钥 [获取方式](https://lbs.qq.com/webApi/javascriptGL/glGuide/glBasic)                                                                                                                                                      |
| id            | string                                                                                                        | 否   | Qmap   | 地图 DOM 容器的 id                                                                                                                                                                                                                            |
| options       | Record<string, any>                                                                                           | 否   | -      | 地图参数，对象规范详见 [MapOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/docIndexMap#2) <br  /> 重写 center?: { lat: number; lng: number; };<br  />默认坐标为天安门                                                                   |
| markerOptions | Record<string, any>                                                                                           | 否   | -      | MultiMarker 的配置参数。([备注](./tips#点标记))<br >[参考 MultiMarkerOptions](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocMarker)                                                                                                       |
| onInit        | (args: {<br  /> &emsp;constructor: any;<br  />&emsp;instance: any;<br  />&emsp;marker: any;<br  />}) => void; | 否   | -      | 地图初始化完成回调:<br  />constructor: [即 TMap](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocIndex)、<br  />instance: 地图的实例、<br  />marker: [MultiMarker（点标记）](https://lbs.qq.com/webApi/javascriptGL/glGuide/glMarker)的实例 |

## 地址解析（地址转换坐标）[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGeocoder)、 [示例](../demo#地址解析)

| 参数    | 类型   | 必填 | 默认值 | 说明         |
| ------- | ------ | ---- | ------ | ------------ |
| key     | string | 是   | -      | 开发密钥     |
| address | string | 是   | -      | 需解析的地址 |

## 逆地址解析（坐标位置描述）[参考文档](https://lbs.qq.com/service/webService/webServiceGuide/webServiceGcoder)、 [示例](../demo#逆地址解析)

| 参数        | 类型                                                         | 必填 | 默认值 | 说明                        |
| ----------- | ------------------------------------------------------------ | ---- | ------ | --------------------------- |
| key         | string                                                       | 是   | -      | 开发密钥                    |
| location    | {<br  />&emsp;lat: number;<br  />&emsp;lng: number; <br  />} | 是   | -      | 经纬度坐标位置              |
| get_poi     | 0 \| 1                                                       | 否   | 0      | 是否返回周边地点（POI）列表 |
| poi_options | string                                                       | 否   | -      | 周边 POI 列表控制参数       |
