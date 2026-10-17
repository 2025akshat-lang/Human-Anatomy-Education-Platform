import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from "react"

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

export function IconButton({
  label,
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  children: ReactNode
}) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`icon-button ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function SearchInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input className="search-input" type="search" {...props} />
}

export function StatusBadge({
  status,
}: {
  status: "schematic" | "unavailable" | "reviewed" | "pending"
}) {
  const label = status === "unavailable" ? "Model unavailable" : status
  return <span className={`status status--${status}`}>{label}</span>
}
