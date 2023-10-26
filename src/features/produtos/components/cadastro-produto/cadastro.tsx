import { Button, Form, Input, InputNumber, Modal, Select, Skeleton } from 'antd';
import { useEffect } from 'react';
import { useForm } from 'antd/es/form/Form';
import useGetProduto from '../../../../api-data/produtos/get-one/hook';
import useCreateProduto from '../../../../api-data/produtos/create/hook';
import { Produto } from '../../../../types/interfaces';
import useUpdateProduto from '../../../../api-data/produtos/update/hook';
import { useParams } from 'react-router-dom';

// todo carregar do back
enum TipoProduto {
    RACAO = 'Ração',
    REMEDIO = 'Remédio',
    PLANTIO = 'Plantio',
}

const tipoProdutoOptions = Object.values(TipoProduto).map((tipo) => ({
    label: tipo,
    value: tipo,
}));

type Props = {
    title: string;

    open: boolean;
    onClose?: () => void;
    onConfirm?: (produto: Produto) => void;
};

export default function CadastroProduto({ title, open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const createProduto = useCreateProduto();
    const updateProduto = useUpdateProduto();
    const { id } = useParams<{ id?: string }>();

    const { data: produto, isLoading, isFetched } = useGetProduto(Number(id));

    const onSubmit = async (values: any) => {
        const produto = id ? await updateProduto(Number(id), values) : await createProduto(values);
        onConfirm?.(produto);
    };

    const loadForm = (dados: any) => {
        form.setFieldsValue(dados);
    };

    useEffect(() => {
        if (isFetched) {
            loadForm(produto);
        }
    }, [produto]);

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
                        initialValues={{ remember: true }}
                        onFinish={onSubmit}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Descrição"
                            name="descricao"
                            rules={[{ required: true, message: 'Por favor insira a descrição!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Valor unitario"
                            name="valor"
                            rules={[{ required: true, message: 'Por favor insira o valor!' }]}
                        >
                            <InputNumber style={{ width: '100%' }} precision={2} />
                        </Form.Item>

                        <Form.Item
                            label="Tipo de Produto"
                            name="tipo"
                            rules={[{ required: true, message: 'Por favor insira o tipo de produto!' }]}
                        >
                            <Select placeholder="Selecione" options={tipoProdutoOptions} />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
}
