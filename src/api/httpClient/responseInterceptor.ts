export default (response: any) => {
  const okRequirestStatus = 200;

  switch (response.status) {
    case okRequirestStatus: {
      // ok case
      break;
    }
    default:
      // default case
      break;
  }

  return response;
};
