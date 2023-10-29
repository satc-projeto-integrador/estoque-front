import { Movimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export const createMovimentacao = async (data: Movimentacao): Promise<Movimentacao> => {
    const result = await apiBackend.post(`/api/v1/movimentacoes`, data);
    return result.data;
};
