//색 목록
const colors = {
  deepYellow: "#FFBA42",
  yellow: "#FFD358",
  lightYellow: "#FFE59C",
  grey: "#C4C4C4",
  lightGrey: "#e5e5e5",
  black: "#343434",
};



//반응형 사이즈 정리
const deviceSizes = {
  mobile: "414px",
  tablet: "768px",
  laptop: "1152px"
};

const device = {
  mobile: `only screen and (max-width: ${deviceSizes.mobile})`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet})`,
};


//export를 위한 정의
const theme = {
  colors,
  deviceSizes,
  device,
};

export default theme;