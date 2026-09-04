import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'
import AuthActions from '../components/AuthActions'
import AuthField from '../components/AuthField'
import { getAuthErrorMessage, signup as signupUser } from '../api/auth'
import styles from './Signup.module.css'

type SignupProps = {
  onAuthenticated: (token: string) => void
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function Signup({ onAuthenticated }: SignupProps) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Signup follows the same client flow as login: controlled values are
    // serialized into JSON and the browser waits for the API response.
    event.preventDefault()
    setError('')
    const hasValidEmail = isValidEmail(email)
    const hasValidPassword = password.length >= 8
    setEmailError(hasValidEmail ? '' : 'Enter a valid email address.')
    setPasswordError(hasValidPassword ? '' : 'Password must be at least 8 characters.')
    if (!hasValidEmail || !hasValidPassword) return
    setIsSubmitting(true)

    try {
      const data = await signupUser(email.trim().toLowerCase(), password)



      // Signup logs the new user in immediately by saving and propagating the
      // returned token, then navigating into the protected area.
      localStorage.setItem('token', data.token)
      onAuthenticated(data.token)
      navigate('/dashboard')
    } catch (requestError) {
      setError(getAuthErrorMessage(requestError, 'Unable to create your account.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.wrapper}>
        <div className={styles.header}>
          <h1>Create an Account</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <AuthField id="signup-email" label="Email" type="email" value={email} error={emailError || undefined} onChange={(event) => { setEmail(event.target.value); setEmailError(event.target.value && !isValidEmail(event.target.value) ? 'Enter a valid email address.' : '') }} />
          <AuthField id="signup-password" label="Password" type="password" value={password} error={passwordError || undefined} onChange={(event) => { setPassword(event.target.value); setPasswordError(event.target.value && event.target.value.length < 8 ? 'Password must be at least 8 characters.' : '') }} />
          {error && <p className={styles.error} role="alert">{error}</p>}
          <AuthActions primaryLabel="Create an account" primaryBusyLabel="Creating account..." secondaryLabel="Log in" secondaryHref="/login" isSubmitting={isSubmitting} />
        </form>
      </section>
    </main>
  )
}

export default Signup
