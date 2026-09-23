import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

/** Line icons, 24x24, inheriting colour and stroke from the surrounding text. */
function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const HeartIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M12 20.25S3.75 15.5 3.75 9.6A4.35 4.35 0 0 1 12 7.35a4.35 4.35 0 0 1 8.25 2.25c0 5.9-8.25 10.65-8.25 10.65Z" />
  </Icon>
);

export const ArrowRightIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4.5 12h15m0 0-5.5-5.5M19.5 12 14 17.5" />
  </Icon>
);

export const RehabIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="14.5" cy="4.75" r="1.9" />
    <path d="M8 21l2.6-5.1 3-2.1-1.4-4.6-3.4 1.7L7.3 14" />
    <path d="M12.2 9.2 16 10.6l1.4 3.4 2.8 1" />
    <path d="M13.6 13.8 16 17.2V21" />
  </Icon>
);

export const WheelchairIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="11" cy="4.5" r="1.8" />
    <path d="M9.8 8v4.4h4.4l2.6 5.1" />
    <circle cx="12" cy="16.5" r="4.6" />
    <path d="M16.8 17.6h2.9" />
  </Icon>
);

export const HomeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 10.4 12 4l8 6.4V19a1.4 1.4 0 0 1-1.4 1.4H5.4A1.4 1.4 0 0 1 4 19v-8.6Z" />
    <path d="M9.6 20.4v-6h4.8v6" />
  </Icon>
);

export const TargetIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.2" />
    <circle cx="12" cy="12" r="3.6" />
    <path d="M12 3.8v2.6M12 17.6v2.6M3.8 12h2.6M17.6 12h2.6" />
  </Icon>
);

export const CopyIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2.2" />
    <path d="M15.4 5.8A1.8 1.8 0 0 0 13.6 4H6a2 2 0 0 0-2 2v7.6a1.8 1.8 0 0 0 1.8 1.8" />
  </Icon>
);

export const CheckIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="m5 12.8 4.4 4.4L19 7.6" />
  </Icon>
);

export const EyeIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M2.6 12S6.4 5.8 12 5.8 21.4 12 21.4 12 17.6 18.2 12 18.2 2.6 12 2.6 12Z" />
    <circle cx="12" cy="12" r="2.9" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
);

export const InstagramIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
  </Icon>
);

export const FacebookIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M14.8 21v-7.6h2.6l.4-3h-3V8.5c0-.9.3-1.5 1.5-1.5H18V4.3A20 20 0 0 0 15.7 4c-2.3 0-3.9 1.4-3.9 4.1v2.3H9.2v3h2.6V21" />
  </Icon>
);

export const CardIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.4" />
    <path d="M2.8 9.8h18.4M6.4 14.8h3.4" />
  </Icon>
);

export const MailIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="2.8" y="5.2" width="18.4" height="13.6" rx="2.4" />
    <path d="M3.4 6.4 12 12.8l8.6-6.4" />
  </Icon>
);

export const PhoneIcon = (props: IconProps) => (
  <Icon {...props}>
    <rect x="6.6" y="2.6" width="10.8" height="18.8" rx="2.6" />
    <path d="M10.6 18.4h2.8" />
  </Icon>
);

export const CoinIcon = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8.4" />
    <path d="M12 7.4v9.2M14.4 9.6a2.6 2.6 0 0 0-2.4-1.4h-.4a2.1 2.1 0 0 0 0 4.2h1.2a2.1 2.1 0 0 1 0 4.2H12a2.6 2.6 0 0 1-2.4-1.4" />
  </Icon>
);

export const ExternalLinkIcon = (props: IconProps) => (
  <Icon {...props}>
    <path d="M13.4 4.6H19.4v6" />
    <path d="M19.4 4.6 11 13" />
    <path d="M18.2 13.6v4.8a1.8 1.8 0 0 1-1.8 1.8H5.8A1.8 1.8 0 0 1 4 18.4V7.8A1.8 1.8 0 0 1 5.8 6h4.8" />
  </Icon>
);
