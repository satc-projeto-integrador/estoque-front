import { GetPageOptions, Page, Produto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type listProdutosResult = Page<Produto>;
export type listProdutosParams = GetPageOptions & {
    q?: string;
};

export const listProdutos = async (params: listProdutosParams): Promise<listProdutosResult> => {
    const result = await apiBackend.get('/api/v1/produtos', { params });
    return result.data;
};
