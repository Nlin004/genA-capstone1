import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Recipe } from '../api/recipes'
import styles from './RecipeForm.module.css'

type RecipeFormProps = { initial?: Partial<Recipe>; onSubmit: (recipe: Omit<Recipe, '_id' | 'createdAt'>) => Promise<void>; submitLabel: string }

function RecipeForm({ initial, onSubmit, submitLabel }: RecipeFormProps) {
  const [title, setTitle] = useState(initial?.title || '')
  const [description, setDescription] = useState(initial?.description || '')
  const [image, setImage] = useState(initial?.image || '')
  const [ingredients, setIngredients] = useState(initial?.ingredients?.map((item) => `${item.quantity} | ${item.name}`).join('\n') || '')
  const [instructions, setInstructions] = useState(initial?.instructions?.map((item) => item.description).join('\n') || '')
  const [tags, setTags] = useState(initial?.tags?.join(', ') || '')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!title.trim() || !ingredients.trim() || !instructions.trim()) { setError('Title, ingredients, and instructions are required.'); return }
    setIsSubmitting(true); setError('')
    try {
      await onSubmit({ title, description, image, ingredients: ingredients.split('\n').filter(Boolean).map((line) => { const [quantity, name] = line.split('|'); return { quantity: quantity?.trim() || '', name: name?.trim() || quantity?.trim() || '' } }), instructions: instructions.split('\n').filter(Boolean).map((description, index) => ({ step: index + 1, description: description.trim() })), tags: tags.split(',').map((tag) => tag.trim()).filter(Boolean) })
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'Unable to save recipe.') } finally { setIsSubmitting(false) }
  }

  return <form className={styles.form} onSubmit={handleSubmit}><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} required /></label><label>Image URL<input type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://..." /></label><label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} /></label><label>Ingredients <span>one per line: quantity | name</span><textarea value={ingredients} onChange={(event) => setIngredients(event.target.value)} required /></label><label>Instructions <span>one step per line</span><textarea value={instructions} onChange={(event) => setInstructions(event.target.value)} required /></label><label>Tags <span>comma separated</span><input value={tags} onChange={(event) => setTags(event.target.value)} /></label>{error && <p className={styles.error} role="alert">{error}</p>}<button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : submitLabel}</button></form>
}

export default RecipeForm
