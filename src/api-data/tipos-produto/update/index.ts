import { Produto, TipoProduto } from '../../../types/interfaces';
import apiBackend from '../../api';

export type UpdateTipoProdutoParams = {
    id: number;
    data: Partial<Produto>;
};

export const updateTipoProduto = async ({ id, data }: UpdateTipoProdutoParams): Promise<TipoProduto> => {
    const result = await apiBackend.patch(`/api/v1/tipos-produtos/${id}`, data);
    return result.data;
};
