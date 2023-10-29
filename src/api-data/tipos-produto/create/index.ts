import { TipoProduto } from '../../../types/interfaces';
import apiBackend from '../../api';

export const createTipoProduto = async (data: TipoProduto): Promise<TipoProduto> => {
    const result = await apiBackend.post(`/api/v1/tipos-produtos`, data);
    return result.data;
};
