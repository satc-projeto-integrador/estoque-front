import { GetPageOptions, Page, TipoProduto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type ListTipoProdutoResult = Page<TipoProduto>;
export type ListTipoProdutoParams = GetPageOptions & {
    q?: string;
};

export const listTipoProduto = async (params: ListTipoProdutoParams): Promise<ListTipoProdutoResult> => {
    const result = await apiBackend.get('/api/v1/tipos-produtos', { params });
    return result.data;
};
