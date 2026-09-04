import soupKitchen from '../assets/soup_kitchen.svg'
import soupKitchenDark from '../assets/soup_kitchen_dark.svg'
import styles from './BrandBar.module.css'

type BrandBarProps = {
  className?: string
  size?: 'nav' | 'load'
  tone?: 'light' | 'dark'
}

function BrandBar({ className = '', size = 'nav', tone = 'light' }: BrandBarProps) {
  const icon = tone === 'dark' ? soupKitchenDark : soupKitchen
  return (
    <div className={`${styles.bar} ${styles[size]} ${className}`}>
      <img className={styles.icon} src={icon} alt="" aria-hidden="true" />
      <span className={styles.wordmark}>poonful</span>
    </div>
  )
}

export default BrandBar
