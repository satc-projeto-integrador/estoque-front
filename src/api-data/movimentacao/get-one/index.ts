import dayjs from 'dayjs';
import { Movimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export const getOneMovimentacao = async (id: number): Promise<Movimentacao> => {
    const result = await apiBackend.get(`/api/v1/movimentacoes/${id}`);
    const movimentacao: Movimentacao = {
        ...result.data,
        dataMovimentacao: result.data.dataMovimentacao ? dayjs(result.data.dataMovimentacao) : null
    }
    return movimentacao;
};
