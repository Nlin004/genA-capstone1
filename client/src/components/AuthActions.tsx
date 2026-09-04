import styles from './AuthActions.module.css'

type AuthActionsProps = {
  primaryLabel: string
  secondaryLabel: string
  primaryBusyLabel: string
  isSubmitting: boolean
  secondaryHref: string
  showGuest?: boolean
}

function AuthActions({ primaryLabel, secondaryLabel, primaryBusyLabel, isSubmitting, secondaryHref, showGuest = false }: AuthActionsProps) {
  return (
    <div className={styles.actions}>
      <button className={styles.primary} type="submit" disabled={isSubmitting}>
        {isSubmitting ? primaryBusyLabel : primaryLabel}
      </button>
      <a className={styles.secondary} href={secondaryHref}>{secondaryLabel}</a>
      {showGuest && <a className={styles.guest} href="/recipes">Continue as a guest</a>}
    </div>
  )
}

export default AuthActions
