import { GetPageOptions, Page, Movimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export type ListMovimentacaoResult = Page<Movimentacao>;
export type ListMovimentacaoParams = GetPageOptions;

export const listMovimentacao = async (params: ListMovimentacaoParams): Promise<ListMovimentacaoResult> => {
    const result = await apiBackend.get('/api/v1/movimentacoes', { params });
    return result.data;
};
