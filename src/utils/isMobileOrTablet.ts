export const isMobileOrTablet = () => {
  const userAgent = navigator.userAgent;
  const isMobile = /Mobi/i.test(userAgent);
  const isTablet = /Tablet/i.test(userAgent);
  return isMobile || isTablet;
}