import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  acceptTerms: boolean;
  image: string | null;
  country: string;
  formType: 'uncontrolled' | 'hookForm';
}

interface FormState {
  submissions: FormData[];
  latestSubmissionId: string | null;
}

const initialState: FormState = {
  submissions: [],
  latestSubmissionId: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      state.submissions.push(action.payload);
      state.latestSubmissionId = action.payload.id;
    },
    clearLatestSubmission: (state) => {
      state.latestSubmissionId = null;
    },
  },
});

export const { addFormData, clearLatestSubmission } = formSlice.actions;
export default formSlice.reducer;
