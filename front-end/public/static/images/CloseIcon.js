import * as React from "react";

const SvgCloseIcon = (props) => (
  <svg
    width={30}
    height={30}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={30} height={30} rx={8} fill="#F4F4F4" />
    <path
      d="m10 11 9 9M19 11l-9 9"
      stroke="#BABABA"
      strokeWidth={3}
      strokeLinecap="round"
    />
  </svg>
);

export default SvgCloseIcon;
