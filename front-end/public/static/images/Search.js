import * as React from "react";

function SvgSearch(props) {
  return (
    <svg
      width={props.width}
      height={props.height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      margin-top={props.marginTop}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.516 14.898c2.908 0 5.516-2.521 5.516-5.949C14.032 5.522 11.424 3 8.516 3S3 5.522 3 8.95c0 3.427 2.608 5.948 5.516 5.948zm0 3c4.704 0 8.516-4.006 8.516-8.949C17.032 4.007 13.22 0 8.516 0 3.813 0 0 4.007 0 8.95c0 4.942 3.813 8.948 8.516 8.948z"
        fill="#C4C4C4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.01 22.492l-7.097-7.458 2.174-2.068 7.096 7.458-2.173 2.068z"
        fill="#C4C4C4"
      />
    </svg>
  );
}

export default SvgSearch;
