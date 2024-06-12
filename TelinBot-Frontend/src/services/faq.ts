import api from './api';
import { PaginatedResponse } from '@/types/api/PaginatedResponse';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  is_active: boolean;
}

const getFaqs = async (page?: number): Promise<PaginatedResponse<FAQ[]>> => {
  return (await api.get(`api/faq/${page ? '?page=' + page : ''}`)).data;
};

const postFaq = async (formData: FormData) => {
  await api.post('api/faq/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const patchFaq = async (id: number, formData: FormData) => {
  await api.patch(`api/faq/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

const deleteFaq = async (id: number) => {
  await api.delete(`api/faq/${id}/`);
};

export { getFaqs, postFaq, patchFaq, deleteFaq };
