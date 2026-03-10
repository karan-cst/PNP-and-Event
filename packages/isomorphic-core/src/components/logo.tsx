interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}
import Image from "next/image";

export default function Logo({ iconOnly = false, ...props }: IconProps) {
  return (
    <Image
      src="/logo/onelogohalf.svg"
      alt="Logo"
      width={iconOnly ? 48 : 100}
      height={iconOnly ? 26 : 24}
      priority
    />
  );
}
