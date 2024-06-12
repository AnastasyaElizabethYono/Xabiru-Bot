import api from './api';

interface FinanceData {
  id: number;
  year: number;
  q: number;
  file: string;
}

const getFinanceReport = async (year?: number): Promise<FinanceData[] | []> => {
  return (await api.get(`api/finance?${year ? 'year=' + year : ''}`)).data;
};

const postFinanceReport = async (formData: FormData): Promise<void> => {
  await api.post('api/finance/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteFinanceReport = async (id: number) => {
  await api.delete(`api/finance/${id}`);
};

const patchFinanceReport = async (
  id: number,
  formData: FormData
): Promise<void> => {
  await api.patch(`api/finance/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export {
  getFinanceReport,
  postFinanceReport,
  deleteFinanceReport,
  patchFinanceReport,
};
