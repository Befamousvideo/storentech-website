import { site } from "@/lib/site";

type SarahContactProps = {
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
};

export function SarahPhoneImage({ className }: { className?: string }) {
  return (
    <img
      className={className ?? "sarah-phone"}
      src={site.phones.sarah.image}
      alt="Call Sarah"
      width={720}
      height={96}
    />
  );
}

export function SarahContact({
  className,
  primaryClassName,
  secondaryClassName,
}: SarahContactProps) {
  return (
    <div className={className}>
      <div className={primaryClassName}>
        <span className="sarah-contact-name">{site.contactCopy.primary}</span>
        <SarahPhoneImage />
      </div>
      <p className={secondaryClassName}>{site.contactCopy.secondary}</p>
    </div>
  );
}
