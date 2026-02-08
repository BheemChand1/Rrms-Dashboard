import { NavLink as RouterNavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavLink({ to, children, className, activeClassName, ...props }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(className, isActive && activeClassName)
      }
      {...props}
    >
      {children}
    </RouterNavLink>
  );
}
