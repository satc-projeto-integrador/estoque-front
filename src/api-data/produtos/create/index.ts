import { Produto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type CreateProdutoParams = Produto;
export const createProduto = async (data: Produto): Promise<Produto> => {
    const result = await apiBackend.post(`/api/v1/produtos`, data);
    return result.data;
};
