// import { useState } from 'react'
// import type { FormEvent } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import AuthActions from '../components/AuthActions'
// import AuthField from '../components/AuthField'
// import styles from './Profile.module.css'

// function Profile() {
//   const navigate = useNavigate()
//   const [email, setEmail] = useState('')
//   const [username, setUsername] = useState('')
//   const [showConfirmation, setShowConfirmation] = useState(false)

//   function handleSave(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     navigate('/dashboard?success=profile')
//   }

//   function handleDelete() {
//     localStorage.removeItem('token')
//     navigate('/login')
//   }

//   return (
//     <main className={styles.page}>
//       <section className={styles.content}>
//         <div className={styles.header}>
//           <div className={styles.breadcrumbs}><Link to="/dashboard">Dashboard</Link><span aria-hidden="true">&gt;</span><span>Your Profile</span></div>
//           <div className={styles.profileSection}>
//             <h1>Your Profile</h1>
//             <form className={styles.form} onSubmit={handleSave}>
//               <AuthField id="profile-email" label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
//               <AuthField id="profile-username" label="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
//               <AuthActions primaryLabel="Save changes" primaryBusyLabel="Saving..." secondaryLabel="Cancel" secondaryHref="/dashboard" isSubmitting={false} />
//               <button className={styles.deleteButton} type="button" onClick={() => setShowConfirmation(true)}>Delete account</button>
//             </form>
//           </div>
//         </div>
//       </section>
//       {showConfirmation && <div className={styles.overlay} role="presentation"><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className={styles.modalHeader}><h2 id="delete-title">Delete account?</h2><p>Do you want to delete your account? This action cannot be undone.</p></div><div className={styles.modalActions}><button className={styles.confirmButton} type="button" onClick={handleDelete}>Delete account</button><button className={styles.cancelButton} type="button" onClick={() => setShowConfirmation(false)}>Cancel</button></div></section></div>}
//     </main>
//   )
// }

// export default Profile


import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthField from '../components/AuthField'
import AuthActions from '../components/AuthActions'
import { getAuthErrorMessage, getProfile, updateProfile } from '../api/auth'
import styles from './Profile.module.css'

type ProfileProps = {
  onLogout: () => void
}

// Shown in the password field when a password already exists on the account.
// Never sent to the backend — cleared when the user clicks in to type a new one.
const SENTINEL = '••••••••'

function Profile({ onLogout }: ProfileProps) {
    const navigate = useNavigate()

    // "email" in the DB, "Username" on this page — same field.
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState(SENTINEL)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const [showConfirmation, setShowConfirmation] = useState(false)

    useEffect(() => {
        getProfile()
        .then((profile) => {
            console.log('[Profile] loaded:', profile)
            setEmail(profile.email ?? '')
            // Password hash is always stripped server-side — show sentinel instead.
            setPassword(SENTINEL)
        })
        .catch((err) => {
            console.error('[Profile] fetch failed:', err)
            const status = err?.response?.status
            if (status === 401) {
            // Expired or missing token — eject to login.
            onLogout()
            navigate('/login', { replace: true })
            } else {
            setError('Could not load profile. Please try again.')
            }
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setError('')
        setIsSubmitting(true)
        try {
        // Send a new password only if the user typed something other than
        // the sentinel — blank or untouched both mean "keep existing password".
        const newPassword =
            password && password !== SENTINEL ? password : undefined

        await updateProfile(email.trim().toLowerCase(), newPassword)
        navigate('/dashboard?success=profile')
        } catch (requestError) {
        setError(getAuthErrorMessage(requestError, 'Unable to save changes.'))
        } finally {
        setIsSubmitting(false)
        }
    }

    function handleLogout() {
        onLogout()         // clears localStorage + resets App token state to null
        navigate('/login', { replace: true }) // ProtectedRoute now blocks /profile immediately
    }

    function handleDelete() {
        onLogout()
        navigate('/login', { replace: true })
    }



    return (
        <main className={styles.page}>
        <section className={styles.content}>
            <div className={styles.header}>

            <div className={styles.breadcrumbs}>
                <Link to="/dashboard">Dashboard</Link>
                <span aria-hidden="true">&gt;</span>
                <span>Your Profile</span>
            </div>

            <div className={styles.profileSection}>
                <h1>Your Profile</h1>

                <form className={styles.form} onSubmit={handleSave}>

                {/*
                    Label says "Username" — but this is the email field.
                    type="email" keeps browser autocomplete working correctly.
                */}
                <AuthField
                    id="profile-username"
                    label="Username"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <AuthField
                    id="profile-password"
                    label="Password"
                    type="password"
                    value={password}
                    required={false}
                    onChange={(e) => setPassword(e.target.value)}
                    // Clicking in clears the sentinel so the user types fresh.
                    onFocus={() => {
                    if (password === SENTINEL) setPassword('')
                    }}
                    // Leaving without typing restores the sentinel so it doesn't
                    // appear blank/empty.
                    onBlur={() => {
                    if (password === '') setPassword(SENTINEL)
                    }}
                />

                {error && <p className={styles.formError} role="alert">{error}</p>}

                <AuthActions
                    primaryLabel="Save Changes"
                    primaryBusyLabel="Saving..."
                    isSubmitting={isSubmitting}
                    secondaryLabel="Log out"
                    onSecondaryClick={handleLogout}
                    tertiaryLabel="Delete account"
                    onTertiaryClick={() => setShowConfirmation(true)}
                />

                </form>
            </div>
            </div>
        </section>

        {showConfirmation && (
            <div className={styles.overlay} role="presentation">
            <section
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                aria-labelledby="delete-title"
            >
                <div className={styles.modalHeader}>
                <h2 id="delete-title">Delete account?</h2>
                <p>Do you want to delete your account? This action cannot be undone.</p>
                </div>
                <div className={styles.modalActions}>
                <button
                    className={styles.confirmButton}
                    type="button"
                    onClick={handleDelete}
                >
                    Delete account
                </button>
                <button
                    className={styles.cancelButton}
                    type="button"
                    onClick={() => setShowConfirmation(false)}
                >
                    Cancel
                </button>
                </div>
            </section>
            </div>
        )}
        </main>
    )
}

export default Profile