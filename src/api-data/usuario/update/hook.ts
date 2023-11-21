import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';

import { TipoProduto, Usuario } from '../../../types/interfaces';
import { UpdateParams, updateUsuario } from '.';

const useUpdateUsuario = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (params: UpdateParams) => updateUsuario(params), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('usuarios');
            notification.success({ message: 'Usuario atualizado com sucesso' });
        },
    });
    return (id: number, data: Partial<Usuario>) => mutation.mutateAsync({ id, data });
};

export default useUpdateUsuario;
