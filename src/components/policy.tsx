import { Children } from "react";
import type { PolicyComponents } from "@policystack/react/policy";

// The Table slot receives the header row (a <thead>) followed by bare body
// rows, so keep the header and wrap the rest in an explicit <tbody>.
export const policyComponents: PolicyComponents = {
  Link: ({ node }) => {
    const external = node.href.startsWith("http");
    return (
      <a
        href={node.href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {node.value}
      </a>
    );
  },
  Table: ({ children }) => {
    const [header, ...rows] = Children.toArray(children);
    return (
      <table>
        {header}
        <tbody>{rows}</tbody>
      </table>
    );
  },
};
