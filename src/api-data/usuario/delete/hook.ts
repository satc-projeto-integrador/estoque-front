import { notification } from 'antd';
import { useMutation, useQueryClient } from 'react-query';
import { removeUsuario } from '.';

const useDeleteUsuario = (options?: Record<string, unknown>) => {
    const queryClient = useQueryClient();
    const mutation = useMutation(async (id: number) => removeUsuario(id), {
        ...options,
        onSuccess: async () => {
            await queryClient.invalidateQueries('usuarios');
            notification.success({ message: 'Usuario excluído com sucesso' });
        },
    });
    return (id: number) => mutation.mutateAsync(id);
};

export default useDeleteUsuario;
