import styles from './AuthActions.module.css'

type AuthActionsProps = {
  primaryLabel: string
  primaryBusyLabel: string
  isSubmitting: boolean

  secondaryLabel: string
  secondaryHref?: string
  onSecondaryClick?: () => void

  tertiaryLabel?: string
  onTertiaryClick?: () => void

  showGuest?: boolean
}

// function AuthActions({ primaryLabel, secondaryLabel, primaryBusyLabel, isSubmitting, secondaryHref, showGuest = false }: AuthActionsProps) {
//   return (
//     <div className={styles.actions}>
//       <button className={styles.primary} type="submit" disabled={isSubmitting}>
//         {isSubmitting ? primaryBusyLabel : primaryLabel}
//       </button>
//       <a className={styles.secondary} href={secondaryHref}>{secondaryLabel}</a>
//       {showGuest && <a className={styles.guest} href="/recipes">Continue as a guest</a>}
//     </div>
//   )
// }
function AuthActions({
  primaryLabel,
  primaryBusyLabel,
  isSubmitting,
  secondaryLabel,
  secondaryHref,
  onSecondaryClick,
  tertiaryLabel,
  onTertiaryClick,
  showGuest = false,
}: AuthActionsProps) {
  return (
    <div className={styles.actions}>

        {/* Primary — always a submit button */}
        <button className={styles.primary} type="submit" disabled={isSubmitting}>
            {isSubmitting ? primaryBusyLabel : primaryLabel}
        </button>

        {/*
            Secondary — renders as <button> when onSecondaryClick is provided,
            otherwise falls back to an <a> tag (preserves Login / Signup behaviour).
        */}
        {onSecondaryClick ? (
            <button className={styles.secondaryButton} type="button" onClick={onSecondaryClick}>
            {secondaryLabel}
            </button>
        ) : (
            <a className={styles.secondary} href={secondaryHref}>{secondaryLabel}</a>
        )}

        {/* Tertiary — danger button, only rendered when both props are supplied */}
        {tertiaryLabel && onTertiaryClick && (
            <button className={styles.tertiary} type="button" onClick={onTertiaryClick}>
            {tertiaryLabel}
            </button>
        )}

        {/* Legacy guest link used by Login */}
        {showGuest && (
            <a className={styles.guest} href="/recipes">Continue as a guest</a>
        )}

    </div>
  )
}
export default AuthActions
