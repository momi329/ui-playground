import { forwardRef } from "react";
import { IconProps } from "./helper";

// eslint-disable-next-line react/display-name
export const PlusIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, forwardedRef) => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      ref={forwardedRef}
    >
      <path
        d="M13 7.5H8.5V3H7.5V7.5H3V8.5H7.5V13H8.5V8.5H13V7.5Z"
        fill={color}
      />
    </svg>
  )
);

export default PlusIcon;
