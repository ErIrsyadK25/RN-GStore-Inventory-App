import URL from './URL'

// const token = window.localStorage.getItem('token');
export const getCategories = () => {
  return {
    type: 'GET_CATEGORIES',
    payload: URL.get(`/categories`),
  };
};

export const deleteCategories = id => {
  return {
    type: 'DELETE_CATEGORY',
    payload: URL.delete(`/categories/${id}`),
  };
};

export const editCategories = (id, data) => {
  return {
    type: 'EDIT_CATEGORY',
    payload: URL.put(`/categories/${id}`, data),
  };
};

export const getCategoryById = id => {
  return {
    type: 'GET_CATEGORY_BY_ID',
    payload: URL.get(`/categories/${id}`),
  };
};

export const addCategory = data => {
  return {
    type: 'ADD_CATEGORY',
    payload: URL.post(`/categories`, data),
  };
};
