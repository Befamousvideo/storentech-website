import { site } from "@/lib/site";

type SarahContactProps = {
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

export function SarahContact({
  className,
  primaryClassName,
  secondaryClassName,
}: SarahContactProps) {
  return (
    <div className={className}>
      <a className={primaryClassName} href={`tel:${site.phones.sarah.tel}`}>
        {site.contactCopy.primary}
      </a>
      <p className={secondaryClassName}>{site.contactCopy.secondary}</p>
    </div>
  );
}
