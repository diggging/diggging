import * as React from "react";

const SvgEditIcon = (props) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={25} height={25} rx={4} fill="#343434" />
    <path
      d="M13.748 7.997 17 11.25a.353.353 0 0 1 0 .498l-3.937 3.938-3.937 3.938-3.346.372a.701.701 0 0 1-.775-.776l.37-3.347 7.875-7.876a.353.353 0 0 1 .498 0Zm5.841-.826-1.76-1.76a1.41 1.41 0 0 0-1.99 0l-1.276 1.277a.353.353 0 0 0 0 .497l3.252 3.253c.137.137.36.137.498 0l1.276-1.276a1.41 1.41 0 0 0 0-1.99Z"
      fill="#fff"
    />
  </svg>
);

export default SvgEditIcon;
