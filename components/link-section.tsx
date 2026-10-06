import { ExternalLinkIcon } from "lucide-react";

type LinkSectionProps = {
  title: string;
  link: string;
  source: string;
  description: string;
};

export function LinkSection({
  title,
  link,
  source,
  description,
}: LinkSectionProps) {
  return (
    <section className="flex flex-col gap-1 border-t p-4 hover:bg-muted/50 transition-colors">
      <div className="flex items-center gap-1.5">
        <h2 className="text-body font-medium text-foreground">{title}</h2>
        <ExternalLinkIcon className="size-icon text-brand-text" aria-hidden />
      </div>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-chrome text-brand-text hover:underline"
      >
        {source}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
      <p className="text-chrome text-muted-foreground">{description}</p>
    </section>
  );
}
