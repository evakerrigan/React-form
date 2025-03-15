import { configureStore } from '@reduxjs/toolkit';
import uncontrolledFormReducer from './uncontrolledFormSlice';
import reactHookFormReducer from './reactHookFormSlice';

const store = configureStore({
  reducer: {
    uncontrolledForm: uncontrolledFormReducer,
    reactHookForm: reactHookFormReducer,
  },
});

export default store;
