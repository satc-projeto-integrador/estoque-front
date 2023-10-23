import { GetPageOptions, Page, Produto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type ListarProdutosResult = Page<Produto>;
export type ListarProdutosParams = GetPageOptions & {
    q?: string;
};

export const listarProdutos = async (params: ListarProdutosParams): Promise<ListarProdutosResult> => {
    const result = await apiBackend.get('/api/v1/produtos', { params });
    return result.data;
};
