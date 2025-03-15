// reactHookFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formValues: {},
  isSubmitting: false,
  submitError: null,
};

const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setFormValues: (state, action) => {
      state.formValues = action.payload;
    },
    setIsSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setSubmitError: (state, action) => {
      state.submitError = action.payload;
    },
    resetForm: (state) => {
      state.formValues = {};
      state.isSubmitting = false;
      state.submitError = null;
    },
  },
});

export const { setFormValues, setIsSubmitting, setSubmitError, resetForm } =
  reactHookFormSlice.actions;
export default reactHookFormSlice.reducer;
