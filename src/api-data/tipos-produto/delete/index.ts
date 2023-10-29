import apiBackend from '../../api';

export const removeTipoProduto = async (id: number): Promise<void> => {
    await apiBackend.delete(`/api/v1/tipos-produtos/${id}`);
};
