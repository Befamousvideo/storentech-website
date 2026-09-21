import { site } from "@/lib/site";

type IntakeLinkProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export function IntakeLink({ className, children, onClick }: IntakeLinkProps) {
  return (
    <a
      className={className}
      href={site.intakeUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
