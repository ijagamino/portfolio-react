import type { ComponentProps } from "react";
import type { SocialLink } from "../model/types";

interface SocialLinkProps extends ComponentProps<"a"> {
  socialLink: SocialLink
}

export default function SocialLink({ socialLink }: SocialLinkProps) {
  return (
    <a
      className="flex items-center gap-2"
      href={socialLink.link}
    >
      <socialLink.icon className="size-16" />
      <span className="hidden text-lg font-bold md:block">
        {socialLink.label}
      </span>
    </a>
  )
}
