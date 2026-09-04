import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthActions from '../components/AuthActions'
import AuthField from '../components/AuthField'
import styles from './Profile.module.css'

function Profile() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate('/dashboard?success=profile')
  }

  function handleDelete() {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.header}>
          <div className={styles.breadcrumbs}><Link to="/dashboard">Dashboard</Link><span aria-hidden="true">&gt;</span><span>Your Profile</span></div>
          <div className={styles.profileSection}>
            <h1>Your Profile</h1>
            <form className={styles.form} onSubmit={handleSave}>
              <AuthField id="profile-email" label="Email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              <AuthField id="profile-username" label="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
              <AuthActions primaryLabel="Save changes" primaryBusyLabel="Saving..." secondaryLabel="Cancel" secondaryHref="/dashboard" isSubmitting={false} />
              <button className={styles.deleteButton} type="button" onClick={() => setShowConfirmation(true)}>Delete account</button>
            </form>
          </div>
        </div>
      </section>
      {showConfirmation && <div className={styles.overlay} role="presentation"><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="delete-title"><div className={styles.modalHeader}><h2 id="delete-title">Delete account?</h2><p>Do you want to delete your account? This action cannot be undone.</p></div><div className={styles.modalActions}><button className={styles.confirmButton} type="button" onClick={handleDelete}>Delete account</button><button className={styles.cancelButton} type="button" onClick={() => setShowConfirmation(false)}>Cancel</button></div></section></div>}
    </main>
  )
}

export default Profile
