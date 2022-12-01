# react-qqmap

[![NPM version](https://img.shields.io/npm/v/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)
[![NPM downloads](http://img.shields.io/npm/dm/react-qqmap.svg?style=flat)](https://npmjs.org/package/react-qqmap)

腾讯地图-React 组件

## Usage

```jsx
import Qmap from 'react-qqmap';

export default () => <Qmap API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP" />;
```

```jsx
import { useRef, useEffect } from 'react';
import Qmap from 'react-qqmap';

export default () => {
  const QmapRef = useRef();

  return (
    <Qmap
      id="container"
      API_GL_KEY="VFCBZ-ZJGLJ-XS4F2-FC26Y-DD5XO-42BUP"
      onInit={(instance, constructor) => {
        QmapRef.current = {
          constructor,
          instance,
        };
      }}
    />
  );
};
```

## Options

TODO

## Development

```bash
# install dependencies
$ yarn install

# develop library by docs demo
$ yarn start

# build library source code
$ yarn run build

# build library source code in watch mode
$ yarn run build:watch

# build docs
$ yarn run docs:build

# check your project for potential problems
$ yarn run doctor
```

## LICENSE

MIT
