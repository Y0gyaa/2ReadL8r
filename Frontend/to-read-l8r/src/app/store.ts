import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

// form state
interface FormState {
  id: number;
  title: string;
  author: string;
  country: string;
  language: string;
  link: string;
  pages: number;
  year: number;
}

const initialState: FormState = {
  id: 0,
  title: "",
  author: "",
  country: "",
  language: "",
  link: "",
  pages: 0,
  year: 0,
};

// Redux
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<Partial<FormState>>) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
  },
});

export const { setFormData, resetForm } = formSlice.actions;

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
