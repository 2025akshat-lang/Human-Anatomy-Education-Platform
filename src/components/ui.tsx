import type { ButtonHTMLAttributes, ReactNode } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  variant?: "primary" | "ghost" | "quiet"
}

export function Button({
  icon,
  children,
  className = "",
  variant = "ghost",
  ...props
}: ButtonProps) {
  return (
    <button className={`button button--${variant} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  )
}
