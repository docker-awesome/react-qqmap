class FetchJsonp {
  static state: Record<string, string> = {
    id: 'QmapFetchJsonpScript',
    callback: 'QmapFetchJsonpCallback',
  };

  static add = async (src: string) => {
    return new Promise((resolve, reject) => {
      const { id, callback } = this.state;
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `${src}&callback=${callback}`;
      script.id = id;
      script.onerror = reject;
      (window as any)[callback] = resolve;
      document.head.appendChild(script);
    });
  };

  static remove = () => {
    const { id, callback } = this.state;
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
