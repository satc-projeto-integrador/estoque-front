import { TipoMovimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export const getOneTipoMovimentacao = async (id: number): Promise<TipoMovimentacao> => {
    const result = await apiBackend.get(`/api/v1/tipos-movimentacao/${id}`);
    return result.data;
};
