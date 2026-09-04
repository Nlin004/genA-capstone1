import BrandBar from '../components/BrandBar'
import styles from './Load.module.css'

function Load() {
  return (
    <main className={styles.page} aria-label="Loading Spoonful">
      <section className={styles.wrapper}>
        <span className={styles.spinner} aria-hidden="true" />
        <div className={styles.header}>
          <BrandBar className={styles.brandBar} size="load" />
          <p>Recipe Manager</p>
        </div>
      </section>
    </main>
  )
}

export default Load
