import { Link } from 'react-router-dom'
import type { Recipe } from '../api/recipes'
import styles from './RecipeCard.module.css'

type RecipeCardProps = { recipe: Recipe; 
    editable?: boolean;
    onDelete?: () => void;
    showViewAction?: boolean 
}

function RecipeCard({ recipe, editable = false, onDelete, showViewAction = false }: RecipeCardProps) {
  return (
    <article className={styles.card}>
      <Link to={`/recipes/${recipe._id}`} className={styles.imageLink}>
        {recipe.image ? <img src={recipe.image} alt="" className={styles.image} /> : <div className={styles.imageFallback}>Spoonful</div>}
      </Link>
      <div className={styles.detail}>
        <div className={styles.content}><h2>{recipe.title}</h2><p>Created on {recipe.createdAt ? new Date(recipe.createdAt).toLocaleDateString() : 'today'}</p><div className={styles.tags}>{recipe.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        {editable && <div className={styles.icons}><Link to={`/recipes/${recipe._id}/edit`} aria-label={`Edit ${recipe.title}`}>Edit</Link><button type="button" onClick={onDelete} aria-label={`Delete ${recipe.title}`}>Delete</button></div>}
        {showViewAction && <Link className={styles.viewAction} to={`/recipes/${recipe._id}`}>View recipe &gt;</Link>}
      </div>
    </article>
  )
}

export default RecipeCard
