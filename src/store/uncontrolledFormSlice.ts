import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {},
  isSubmitting: false,
  submitError: null,
};

const uncontrolledFormSlice = createSlice({
  name: 'uncontrolledForm',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    },
    resetForm: (state) => {
      state.formData = {};
      state.isSubmitting = false;
      state.submitError = null;
    },
  },
});

export const { setFormData, setIsSubmitting, setSubmitError, resetForm } =
  uncontrolledFormSlice.actions;
export default uncontrolledFormSlice.reducer;
