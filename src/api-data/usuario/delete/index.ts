import apiBackend from '../../api';

export const removeUsuario = async (id: number): Promise<void> => {
    await apiBackend.delete(`/api/v1/usuarios/${id}`);
};
