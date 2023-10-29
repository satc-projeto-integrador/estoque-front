import apiBackend from '../../api';

export const deleteMovimentacao = async (id: number): Promise<void> => {
    await apiBackend.delete(`/api/v1/movimentacoes/${id}`);
};
