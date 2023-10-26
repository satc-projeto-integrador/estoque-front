import { Produto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type UpdateProdutoParams = {
    id: number;
    data: Partial<Produto>;
};
export const updateProduto = async ({ id, data }: UpdateProdutoParams): Promise<Produto> => {
    const result = await apiBackend.patch(`/api/v1/produtos/${id}`, data);
    return result.data;
};
