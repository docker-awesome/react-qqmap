# 注意事项

- ## 地图控件-[旋转控件](https://lbs.qq.com/webApi/javascriptGL/glDoc/glDocControl)

  ```css
  /* 样式类名：rotate-circle */

  .rotate-circle {
    /* 此样式为地图默认样式，
       可能会被项目写的全局样式覆盖为 border-box,
       导致旋转控件位置偏移，
       只需重写回 content-box 即可修复 */
    box-sizing: content-box;
  }
  ```

- ## 点标记

  ```js
  // 默认点标记 styles 的 key 为 marker, 即 styleId 为 'marker';
  const marker = new TMap.MultiMarker({
    styles: {
      marker: new TMap.MarkerStyle({
        width: 20,
        height: 30,
        anchor: { x: 10, y: 30 },
      }),
    },
  });

  // 若需要自定义点标注样式，可以传入新的 styles 自定义 styleId, 在点标注数据数组内使用该 styleId 即可, 注意替换示例中的 YOUR_STYLE_ID、YOUR_STYLE, 例：
  export default () => (
    <Qmap
      markerOptions={{
        styles: {
          // 自定义点标记样式
          YOUR_STYLE_ID: new TMap.MarkerStyle(YOUR_STYLE),
        },
      }}
    />
  );

  // 添加自定义样式点标记
  marker.add([
    {
      // 指定样式id
      styleId: 'YOUR_STYLE_ID',
      //点标记坐标位置
      position: new TMap.LatLng(39.954104, 116.357503),
    },
  ]);
  ```
