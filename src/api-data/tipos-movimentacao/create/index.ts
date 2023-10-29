import { TipoMovimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export const createTipoMovimentacao = async (data: TipoMovimentacao): Promise<TipoMovimentacao> => {
    const result = await apiBackend.post(`/api/v1/tipos-movimentacao`, data);
    return result.data;
};
