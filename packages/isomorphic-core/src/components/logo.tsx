interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}
import Image from "next/image";

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <Image
      src="/logo/onelogo.svg"
      alt="Logo"
      width={iconOnly ? 48 : 175}
      height={iconOnly ? 26 : 28}
      priority
    />
  );
}
