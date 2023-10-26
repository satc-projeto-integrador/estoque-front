import apiBackend from '../../api';

export const removeProduto = async (id: number): Promise<void> => {
    await apiBackend.delete(`/api/v1/produtos/${id}`);
};
