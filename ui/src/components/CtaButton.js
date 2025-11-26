import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

/**
 * Inline arrow SVG that uses `currentColor` so it inherits the button text color.
 */
const ArrowForwardIcon = (props) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    focusable={false}
    style={{
      display: 'inline-block',
      verticalAlign: 'middle',
      fontSize: 'inherit',
      lineHeight: 1,
    }}
    {...props}
  >
    <path
      d="M5 13H16.17L11.29 17.88C10.9 18.27 10.9 18.91 11.29 19.3C11.68 19.69 12.31 19.69 12.7 19.3L19.29 12.71C19.68 12.32 19.68 11.69 19.29 11.3L12.71 4.7C12.32 4.31 11.69 4.31 11.3 4.7C10.91 5.09 10.91 5.72 11.3 6.11L16.17 11H5C4.45 11 4 11.45 4 12C4 12.55 4.45 13 5 13Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

/**
 * CTA Button - wraps the library Button and forces variant="outline" plus an
 * arrow icon on the right. The component still accepts size, colorScheme and
 * other Button props.
 */
const CtaButton = React.forwardRef(function CtaButton(
  { children, rightIcon, isFullWidth, ...rest },
  ref
) {
  // If the consumer passed a rightIcon override, prefer it; otherwise use the default arrow.
  const icon = rightIcon || <ArrowForwardIcon />;

  return (
    <Button
      ref={ref}
      variant="outline"
      rightIcon={icon}
      isFullWidth={isFullWidth}
      {...rest}
    >
      {children}
    </Button>
  );
});

CtaButton.propTypes = {
  children: PropTypes.node,
  rightIcon: PropTypes.node,
  isFullWidth: PropTypes.bool,
};

export default CtaButton;
