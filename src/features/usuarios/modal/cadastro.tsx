import { Button, Form, Input, Modal, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import useCreateUsuario from '../../../api-data/usuario/create/hook';
import useUpdateUsuario from '../../../api-data/usuario/update/hook';
import { useParams } from 'react-router-dom';
import useGetUsuario from '../../../api-data/usuario/get-one/hook';
import { Usuario } from '../../../types/interfaces';

type Props = {
    title: string;

    open: boolean;
    onClose?: () => void;
    onConfirm?: (produto: Usuario) => void;
};

export default function CadastroUsuario({ title, open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const createTipoProduto = useCreateUsuario();
    const updateProduto = useUpdateUsuario();
    const { id } = useParams<{ id?: string }>();

    const { data: tipoProduto, isLoading } = useGetUsuario(Number(id));

    const onSubmit = async (values: any) => {
        const produto = id ? await updateProduto(Number(id), values) : await createTipoProduto(values);
        onConfirm?.(produto);
    };

    return (
        <>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Modal
                    title={title}
                    open={open}
                    onCancel={onClose}
                    footer={[
                        <Button key="cancel" onClick={onClose} type="text">
                            Cancelar
                        </Button>,
                        <Button key="submit" form="form-produto" type="primary" htmlType="submit">
                            Cadastrar
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        id="form-produto"
                        name="basic"
                        layout="vertical"
                        initialValues={tipoProduto}
                        onFinish={onSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Nome"
                            name="nome"
                            rules={[{ required: true, message: 'Por favor insira a descrição!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                { required: true, message: 'Por favor insira o email!' },
                                { type: 'email', message: 'Insira um email valido' },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Senha"
                            name="senha"
                            rules={[{ required: true, message: 'Por favor insira a senha!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
}
