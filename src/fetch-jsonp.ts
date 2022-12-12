class FetchJsonp {
  static state: Record<string, any> = {
    prefix: {
      id: 'QmapFetchJsonpScript',
      callback: 'QmapFetchJsonpCallback',
    },
  };

  static add = async (src: string) => {
    return new Promise((resolve, reject) => {
      const { prefix } = this.state;
      const current = Date.now();
      const id = `${prefix.id}_${current}`;
      const callback = `${prefix.callback}_${current}`;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${src}&callback=${callback}`;
      script.id = id;
      script.onerror = (error) => {
        this.remove({ id, callback });
        reject(error);
      };
      (window as any)[callback] = (res: any) => {
        this.remove({ id, callback });
        resolve(res);
      };
      document.head.appendChild(script);
    });
  };

  static remove = ({ id, callback }: { id: string; callback: any }) => {
    const script = document.querySelector(`#${id}`);
    if (script) {
      (window as any)[callback] = () => {};
      document.head.removeChild(script);
    }
  };

  static ajax = async (url: string) => {
    return this.add(url);
  };
}

export default FetchJsonp.ajax;
