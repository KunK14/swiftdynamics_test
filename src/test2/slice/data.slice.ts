import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FormData {
  title: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationality: string;
  citizenID: string;
  gender: string;
  mobileCountry: string;
  mobilePhone: string;
  passportNo: string;
  expectedSalary: string;
}

const loadFromLocalStorage = (): FormData[] => {
  const data = localStorage.getItem("formData");
  return data ? JSON.parse(data) : []
};

const initialState: FormData[] = loadFromLocalStorage()

const saveToLocalStorage = (state: FormData[]) => {
  localStorage.setItem("formData", JSON.stringify(state));
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    addFormData: (state, action: PayloadAction<FormData>) => {
      const newState = [...state, action.payload];
      saveToLocalStorage(newState);
      return newState;
    },
    editFormData: (
      state,
      action: PayloadAction<{ index: number; newData: FormData }>
    ) => {
      const { index, newData } = action.payload;
      const newState = state.map((item, i) => (i === index ? newData : item));
      saveToLocalStorage(newState);
      return newState;
    },
    deleteFormData: (state, action: PayloadAction<number>) => {
      const newState = state.filter((_, index) => index !== action.payload);
      saveToLocalStorage(newState);
      return newState;
    },
    selectDeleteFormData: (state, action: PayloadAction<number[]>) => {
      const indicesToDelete = action.payload;
      const newState = state.filter(
        (_, index) => !indicesToDelete.includes(index)
      );
      saveToLocalStorage(newState);
      return newState;
    },
    clearFormData: () => {
      localStorage.removeItem("formData");
      return [];
    },
  },
});

export const {
  addFormData,
  deleteFormData,
  editFormData,
  selectDeleteFormData,
  clearFormData,
} = formSlice.actions;
export default formSlice.reducer;
