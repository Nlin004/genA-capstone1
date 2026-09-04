import styles from './Dashboard.module.css'
import { useSearchParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { deleteRecipe, getMyRecipes, type Recipe } from '../api/recipes'
import RecipeCard from '../components/RecipeCard'

function Dashboard() {
  const [searchParams] = useSearchParams()
  const success = searchParams.get('success')
  const successMessage = success === 'deleted' ? 'Your profile was successfully deleted.' : 'Your profile info was successfully updated.'
  const [recipes, setRecipes] = useState<Recipe[]>([])
  useEffect(() => { void getMyRecipes().then(setRecipes).catch(() => setRecipes([])) }, [])
  async function handleDelete(id: string) { if (window.confirm('Delete this recipe?')) { await deleteRecipe(id); setRecipes((current) => current.filter((recipe) => recipe._id !== id)) } }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.header}>
          {success && <div className={styles.success} role="status">{successMessage}</div>}
          <p className={styles.welcome}>Welcome back! Manage your recipes or add a new one.</p>
          <div className={styles.recipes}>
            <h1>Your Recipes</h1>
            {recipes.length ? <div className={styles.recipeList}>{recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} editable onDelete={() => void handleDelete(recipe._id)} />)}</div> : <div className={styles.empty}>Your recipes will show up here.</div>}
          </div>
        </div>
        <div className={styles.actions}>
          <Link className={styles.primaryButton} to="/recipes/new">Create Recipe</Link>
          <Link className={styles.secondaryButton} to="/recipes">Browse Recipes</Link>
        </div>
      </section>
    </main>
  )
}

export default Dashboard