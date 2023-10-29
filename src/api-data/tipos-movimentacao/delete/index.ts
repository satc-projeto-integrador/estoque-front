import apiBackend from '../../api';

export const deleteTipoMovimentacao = async (id: number): Promise<void> => {
    await apiBackend.delete(`/api/v1/tipos-movimentacao/${id}`);
};
