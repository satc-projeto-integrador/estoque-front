import apiBackend from '../../api';

export const removeInventario = async (id: number): Promise<void> => {
    await apiBackend.delete(`/api/v1/inventarios/${id}`);
};
