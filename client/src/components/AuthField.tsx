import type { ChangeEvent, ReactNode } from 'react'
import styles from './AuthField.module.css'

type AuthFieldProps = {
  id: string
  label: string
  type?: 'email' | 'password'
  value: string
  placeholder?: string
  error?: string
  labelAddon?: ReactNode
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function AuthField({ id, label, type = 'email', value, placeholder, error, labelAddon, onChange }: AuthFieldProps) {
  return (
    <div className={styles.field}>
      <div className={styles.labelRow}>
        <label className={error ? styles.errorLabel : ''} htmlFor={id}>{label}</label>
        {labelAddon}
      </div>
      <input
        className={error ? styles.errorInput : ''}
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={onChange}
        required
      />
      {error && <p className={styles.errorText} id={`${id}-error`} role="alert">{error}</p>}
    </div>
  )
}

export default AuthField
