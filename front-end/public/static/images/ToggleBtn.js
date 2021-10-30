import * as React from "react";

function SvgToggleBtn(props) {
  return (
    <svg
      width={12}
      height={9}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M6 9L.804 0h10.392L6 9z" fill="#C4C4C4" />
    </svg>
  );
}

export default SvgToggleBtn;
