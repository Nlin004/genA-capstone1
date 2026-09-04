import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'
import AuthActions from '../components/AuthActions'
import AuthField from '../components/AuthField'
import { getAuthErrorMessage, login as loginUser } from '../api/auth'
import styles from './Login.module.css'

type AuthPageProps = {
    onAuthenticated: (token: string) => void
} //define a type Props onAu

function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function Login({ onAuthenticated }: AuthPageProps) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    //inputs controlled as they come from react.
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        // Prevent the browser's normal full-page form submission. React keeps
        // the controlled input values in state and sends those values as JSON.
        event.preventDefault()
        setError('')
        const hasValidEmail = isValidEmail(email)
        const hasValidPassword = password.length >= 8
        setEmailError(hasValidEmail ? '' : 'Enter a valid email address.')
        setPasswordError(hasValidPassword ? '' : 'Password must be at least 8 characters.')
        if (!hasValidEmail || !hasValidPassword) return
        setIsSubmitting(true)

        try {
            const data = await loginUser(email.trim().toLowerCase(), password)

            // The server has authenticated the credentials and returned a signed
            // JWT. Store it for refreshes and update App immediately for routing.
            localStorage.setItem('token', data.token)
            onAuthenticated(data.token)
                // this saves JWT for future page refrhes, updates the App's state, and goes to home page.




            // The protected route will now allow / to render.
            navigate('/dashboard')
        } catch (requestError) {
            setError(getAuthErrorMessage(requestError, 'Unable to log in.'))
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className={styles.page}>
            <section className={styles.wrapper}>
                <div className={styles.header}>
                    <h1>Welcome Back!</h1>
                    <p>Log in to your account to continue</p>
                </div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <AuthField id="login-email" label="Email" type="email" value={email} error={emailError || undefined} onChange={(event) => { setEmail(event.target.value); setEmailError(event.target.value && !isValidEmail(event.target.value) ? 'Enter a valid email address.' : '') }} />
                    <AuthField id="login-password" label="Password" type="password" value={password} error={passwordError || undefined} labelAddon={<a className={styles.passwordLink} href="/login">Forgot password?</a>} onChange={(event) => { setPassword(event.target.value); setPasswordError(event.target.value && event.target.value.length < 8 ? 'Password must be at least 8 characters.' : '') }} />
                    {error && <p className={styles.error} role="alert">{error}</p>}
                    <AuthActions primaryLabel="Log in" primaryBusyLabel="Logging in..." secondaryLabel="Create an account" secondaryHref="/signup" isSubmitting={isSubmitting} showGuest />
                </form>
            </section>
        </main>
    )
}

export default Login
