import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { TipoProduto, Usuario } from '../../../types/interfaces';
import { createUsuario } from '.';

const useCreateUsuario = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: Usuario) => createUsuario(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('usuarios');
            notification.success({ message: 'Usuario cadastrado com sucesso' });
        },
    });
    return (data: Usuario) => mutation.mutateAsync(data);
};

export default useCreateUsuario;
