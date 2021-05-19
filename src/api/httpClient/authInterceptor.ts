const getAuthToken = () => localStorage.getItem('token') || '';

export default (config: any) => {
  if (getAuthToken()) {
    config.headers.Authorization =
      'Bearer' + ' ' + (getAuthToken() as string).replace(/['"]+/g, '');
  }

  return config;
};
