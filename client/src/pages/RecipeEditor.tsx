import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import RecipeForm from '../components/RecipeForm'
import { createRecipe, getRecipe, updateRecipe, type Recipe } from '../api/recipes'
import styles from './RecipeEditor.module.css'

function RecipeEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState<Recipe>()
  useEffect(() => { if (id) void getRecipe(id).then(setRecipe).catch(() => navigate('/recipes')) }, [id, navigate])
  async function handleSubmit(data: Omit<Recipe, '_id' | 'createdAt'>) { if (id) { await updateRecipe(id, data); navigate('/dashboard?success=recipe') } else { await createRecipe(data); navigate('/dashboard?success=created') } }
  return <main className={styles.page}><section className={styles.content}><p className={styles.eyebrow}>{id ? 'Edit recipe' : 'New recipe'}</p><h1>{id ? 'Make it better.' : 'Share your recipe.'}</h1>{id && !recipe ? <p>Loading recipe...</p> : <RecipeForm initial={recipe} onSubmit={handleSubmit} submitLabel={id ? 'Save changes' : 'Create recipe'} />}</section></main>
}
export default RecipeEditor
