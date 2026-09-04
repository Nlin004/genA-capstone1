import { useEffect, useState } from 'react'
import { getRecipes, type Recipe } from '../api/recipes'
import RecipeCard from '../components/RecipeCard'
import styles from './Recipes.module.css'

function Recipes() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => { setLoading(true); void getRecipes(query).then(setRecipes).finally(() => setLoading(false)) }, [query])

  return (
    <main className={styles.page}>
      <section className={styles.heading}><div className={styles.headingContent}><div className={styles.breadcrumbs}><a href="/">Home</a><span aria-hidden="true">&gt;</span><span>Recipe List</span></div><h1>Recipe List</h1></div>
      </section>
      <div className={styles.toolbar}>
        <label className={styles.search}><span aria-hidden="true">/</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search recipes, ingredients..." /></label>
      </div>
      {loading ? <p className={styles.empty}>Loading recipes...</p> : recipes.length ? <div className={styles.grid}>{recipes.map((recipe) => <RecipeCard key={recipe._id} recipe={recipe} showViewAction />)}</div> : <p className={styles.empty}>No recipes match that search yet.</p>}
    </main>
  )
}

export default Recipes