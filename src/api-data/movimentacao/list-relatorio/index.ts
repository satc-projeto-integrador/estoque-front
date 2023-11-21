import { GetPageOptions, Page, Movimentacao } from '../../../types/interfaces';
import apiBackend from '../../api';

export type RelatorioMovimentacaoFilters = {
    produtoIds?: number[];
    tipoProdutoIds?: number[];
    dataInicio?: Date;
    dataFim?: Date;
};
export type ListMovimentacaoResult = Page<Movimentacao>;
export type ListMovimentacaoParams = GetPageOptions & RelatorioMovimentacaoFilters;

export const listRelatorioMovimentacao = async (params: ListMovimentacaoParams): Promise<ListMovimentacaoResult> => {
    const result = await apiBackend.get('/api/v1/movimentacoes/relatorio', { params });
    return result.data;
};
