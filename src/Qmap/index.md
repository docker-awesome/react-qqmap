# API

This is an example component.

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
