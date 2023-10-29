import { TipoProduto } from '../../../types/interfaces';
import apiBackend from '../../api';

export const getOneTipoProduto = async (id: number): Promise<TipoProduto> => {
    const result = await apiBackend.get(`/api/v1/tipos-produtos/${id}`);
    return result.data;
};
