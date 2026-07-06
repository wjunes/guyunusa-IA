import { api }   from './api.js';

export async function initAuth(store) {
  const token = localStorage.getItem('guyunusa_token');
  if (!token) {
    // Sin token — asegurar que el store esté completamente limpio
    store.update({ user: null, token: null, conversations: [], messages: [], activeConvId: null });
    return;
  }
  try {
    const data = await api.get('/user');
    store.update({
      user:          data.user,
      token,
      conversations: [],
      messages:      [],
      activeConvId:  null,
    });
  } catch {
    localStorage.removeItem('guyunusa_token');
    store.update({ user: null, token: null, conversations: [], messages: [], activeConvId: null });
  }
}

export async function login(email, password, store) {
  const data = await api.post('/auth/login', { email, password });
  localStorage.setItem('guyunusa_token', data.token);
  // Limpiar TODO el estado del usuario anterior antes de cargar el nuevo
  store.update({
    user:          data.user,
    token:         data.token,
    conversations: [],
    messages:      [],
    activeConvId:  null,
    loading:       false,
  });
  return data;
}

export async function register(email, username, password, store) {
  const data = await api.post('/auth/register', { email, username, password });
  localStorage.setItem('guyunusa_token', data.token);
  store.update({
    user:          data.user,
    token:         data.token,
    conversations: [],
    messages:      [],
    activeConvId:  null,
    loading:       false,
  });
  return data;
}

export function logout(store) {
  // Primero eliminar el token para que cualquier request en vuelo falle con 401
  localStorage.removeItem('guyunusa_token');
  // Luego limpiar el store completamente
  store.update({
    user:          null,
    token:         null,
    conversations: [],
    messages:      [],
    activeConvId:  null,
    loading:       false,
  });
}

export async function deleteAccount(password) {
  const data = await api.delete('/user', { password });
  return data;
}
