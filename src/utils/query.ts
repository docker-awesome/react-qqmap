import fetchJsonp from './fetch-jsonp';

const query = async (params: Record<string, any>) => {
  const query = new URLSearchParams({
    output: 'jsonp',
    ...params,
  }).toString();

  return fetchJsonp(`https://apis.map.qq.com/ws/geocoder/v1/?${query}`);
};

// 地址解析（地址转坐标）
export const queryLocation = async ({
  key,
  address,
}: {
  key: string;
  address: string;
}) => {
  return query({
    key,
    address: encodeURIComponent(address),
  });
};

// 逆地址解析（坐标位置描述）
export const queryAddress = (args: {
  key: string;
  location: {
    lat: number;
    lng: number;
  };
  get_poi?: 0 | 1;
  poi_options?: string;
}) => {
  const { key, location, ...rest } = args;
  return query({
    key,
    location: `${location.lat},${location.lng}`,
    ...JSON.parse(JSON.stringify(rest)),
  });
};
