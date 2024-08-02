const fetcher = async (src) => {
  return new Promise((resolve, reject) => {
    let i = 0;
    while (window[`__JSONP_CALLBACK_${i}__`]) i++;

    const callback = `__JSONP_CALLBACK_${i}__`;

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `${src}&callback=${callback}`;
    script.onerror = (error) => {
      reset();
      reject(error);
    };

    const reset = () => {
      script.remove();
      delete window[callback];
    };

    window[callback] = (res) => {
      reset();
      resolve(res);
    };

    document.head.appendChild(script);
  });
};

export default fetcher;
