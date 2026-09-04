import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getRecipe, type Recipe } from '../api/recipes'
import styles from './RecipeDetail.module.css'

function RecipeDetail() {
  const { id } = useParams(); const [recipe, setRecipe] = useState<Recipe>(); const [error, setError] = useState('')
  useEffect(() => { if (id) void getRecipe(id).then(setRecipe).catch(() => setError('Recipe not found.')) }, [id])
  if (error) return <main className={styles.page}><p>{error}</p></main>
  if (!recipe) return <main className={styles.page}><p>Loading recipe...</p></main>
  return <main className={styles.page}><article className={styles.content}><Link className={styles.back} to="/recipes">&lt; Back to recipes</Link>{recipe.image && <img className={styles.image} src={recipe.image} alt={recipe.title} />}<p className={styles.eyebrow}>Recipe</p><h1>{recipe.title}</h1><p className={styles.description}>{recipe.description}</p><div className={styles.tags}>{recipe.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div><h2>Ingredients</h2><ul>{recipe.ingredients.map((ingredient) => <li key={`${ingredient.quantity}-${ingredient.name}`}>{ingredient.quantity} {ingredient.name}</li>)}</ul><h2>Instructions</h2><ol>{recipe.instructions.map((instruction) => <li key={instruction.step}>{instruction.description}</li>)}</ol></article></main>
}
export default RecipeDetail
