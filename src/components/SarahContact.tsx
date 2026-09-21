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
      <a
        className={primaryClassName}
        href={`tel:${site.phones.sarah.tel}`}
        aria-label="Call Sarah"
      >
        <span className="sarah-contact-name">{site.contactCopy.primary}</span>
        <img
          className="sarah-phone"
          src={site.phones.sarah.image}
          alt="Call Sarah"
          width={720}
          height={96}
        />
      </a>
      <p className={secondaryClassName}>{site.contactCopy.secondary}</p>
    </div>
  );
}
