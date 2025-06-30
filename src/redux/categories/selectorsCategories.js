export const selectCategoriesState = state => state.categories;

export const selectCategoriesLoading = state => state.categories.loading;
export const selectCategoriesError = state => state.categories.error;

export const selectAllCategories = state => state.categories.allCategories;

export const selectSelectedCategoryData = state =>
  state.categories.selectedCategoryData;

export const selectSelectedCategoryQuestions = state =>
  state.categories.selectedCategoryQuestions;
