const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const RestService = {

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_BASE_URL}/images/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Error en el servidor');
    return await response.json();
  },
  
  async deleteImage(id) {
    const response = await fetch(`${API_BASE_URL}/images/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Error al eliminar la imagen');
    return await response.json();
  },

  async getHistory() {
    const response = await fetch(`${API_BASE_URL}/images`);
    return await response.json();
  }
};