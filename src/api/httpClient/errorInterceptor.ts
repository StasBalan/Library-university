export default (error: any) => {
  const badRequestStatus = 400;
  const notFoundStatus = 404;

  if (error && error.response && error.response.status) {
    switch (error.response.status) {
      case badRequestStatus:
        console.error('Nothing to display. Data Not Found');
        return Promise.reject(error);

      case notFoundStatus:
        console.error('notFoundStatus');
        return Promise.reject(error);

      default:
        console.error('Server Error');
        return Promise.reject(error);
    }
  }

  return Promise.reject(error);
};
