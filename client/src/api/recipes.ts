import apiClient from './client'

export type Ingredient = { name: string; quantity: string }
export type Instruction = { step: number; description: string }
export type Recipe = {
  _id: string
  title: string
  description?: string
  image?: string
  ingredients: Ingredient[]
  instructions: Instruction[]
  tags: string[]
  createdAt?: string
}

function authConfig() {
  return { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } }
}

export async function getRecipes(query = '') {
  const response = await apiClient.get<Recipe[]>('/api/recipes', { params: query ? { title: query } : undefined })
  return response.data
}

export async function getMyRecipes() {
  const response = await apiClient.get<Recipe[]>('/api/recipes/mine', authConfig())
  return response.data
}

export async function getRecipe(id: string) {
  const response = await apiClient.get<Recipe>(`/api/recipes/${id}`)
  return response.data
}

export async function createRecipe(recipe: Omit<Recipe, '_id' | 'createdAt'>) {
  const response = await apiClient.post<Recipe>('/api/recipes', recipe, authConfig())
  return response.data
}

export async function updateRecipe(id: string, recipe: Partial<Recipe>) {
  const response = await apiClient.put<Recipe>(`/api/recipes/${id}`, recipe, authConfig())
  return response.data
}

export async function deleteRecipe(id: string) {
  await apiClient.delete(`/api/recipes/${id}`, authConfig())
}
