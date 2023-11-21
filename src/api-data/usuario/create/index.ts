import { Usuario } from '../../../types/interfaces';
import apiBackend from '../../api';

export const createUsuario = async (data: Usuario): Promise<Usuario> => {
    const result = await apiBackend.post(`/api/v1/usuarios`, data);
    return result.data;
};
