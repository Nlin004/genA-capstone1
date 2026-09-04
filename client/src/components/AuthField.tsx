import type { ChangeEvent, FocusEvent, ReactNode } from 'react'
import styles from './AuthField.module.css'

type AuthFieldProps = {
  id: string
  label: string
  type?: 'email' | 'password' | 'text'
  value: string
  placeholder?: string
  error?: string
  labelAddon?: ReactNode
  required?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void  
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void 
}

function AuthField({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  error,
  labelAddon,
  required = true,
  onChange,
  onFocus,
  onBlur, 
}: AuthFieldProps) {
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
        required={required} 
        onChange={onChange}
        onFocus={onFocus}     
        onBlur={onBlur}      
      />
      {error && <p className={styles.errorText} id={`${id}-error`} role="alert">{error}</p>}
    </div>
  )
}

export default AuthField