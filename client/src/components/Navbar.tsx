import { Link, useLocation } from 'react-router-dom'
import BrandBar from './BrandBar'
import styles from './Navbar.module.css'

type NavbarProps = {  // define all relevant navbar content
  token: string | null //string or empty token.
}

function Navbar({ token }: NavbarProps) {
  const location = useLocation()
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'
  const isLoadPage = location.pathname === '/load'
  const isCreatorPage = Boolean(token) && !isAuthPage && !isLoadPage

  if (isLoadPage) return null

  return (
    isAuthPage ? <BrandBar className={styles.authBrandBar} /> : <header className={`${styles.navbar}${isCreatorPage ? ` ${styles.dashboardNavbar}` : ''}`}>
      <Link className={styles.brand} to="/">
        <BrandBar />
      </Link>
      {isCreatorPage && <Link className={styles.account} to="/profile" aria-label="Open profile"><span className={styles.accountHead} /><span className={styles.accountShoulders} /></Link>}
    </header>
  )
}

export default Navbar
