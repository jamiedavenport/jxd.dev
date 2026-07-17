import type { ComponentType } from "react";
import { Logo as AuviaLogo } from "./auvia";
import { Logo as MurielLogo } from "./muriel";

export type ClientSlug = "auvia" | "muriel-marketing";

type LogoProps = {
  className?: string;
};

const logos: Record<ClientSlug, ComponentType<LogoProps>> = {
  auvia: AuviaLogo,
  "muriel-marketing": MurielLogo,
};

/** Renders a client's wordmark by case study slug, colored via `fill-current`. */
export function ClientLogo({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const Logo = logos[slug as ClientSlug];
  if (!Logo) return null;
  return <Logo className={className} />;
}
