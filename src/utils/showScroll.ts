import { isMobileOrTablet } from "src/utils";

// чтобы не двигалась страница при отрытии модального окна
export const hiddenScroll = () => {
  const scrollType = document.body.style.overflowY;
  document.body.style.overflowY = 'hidden';
  if (!isMobileOrTablet() && scrollType === 'scroll') {
    document.body.style.padding = '0 17px 0 0';
  }
  return scrollType;
}

// вернуть скролл на прежнее значение
export const displayScroll = (scrollType: string) => {
  document.body.style.overflowY = scrollType;
  if (!isMobileOrTablet()) {
    document.body.style.padding = '0';
  }
}