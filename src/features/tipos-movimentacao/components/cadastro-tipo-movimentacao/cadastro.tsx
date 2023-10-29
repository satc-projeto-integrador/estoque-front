import { Button, Form, Input, Modal, Select, Skeleton } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useParams } from 'react-router-dom';
import { TipoMovimentacao, TipoMovimentacaoEnum } from '../../../../types/interfaces';
import useCreateTipoMovimentacao from '../../../../api-data/tipos-movimentacao/create/hook';
import useUpdateTipoMovimentacao from '../../../../api-data/tipos-movimentacao/update/hook';
import useGetTipoMovimentacao from '../../../../api-data/tipos-movimentacao/get-one/hook';

const tipoMovimentacaoOptions = Object.values(TipoMovimentacaoEnum).map((tipo) => ({
    label: tipo,
    value: tipo,
}));

type Props = {
    title: string;

    open: boolean;
    onClose?: () => void;
    onConfirm?: (produto: TipoMovimentacao) => void;
};

export default function CadastroTipoMovimentacao({ title, open, onClose, onConfirm }: Props) {
    const [form] = useForm();
    const createTipoMovimentacao = useCreateTipoMovimentacao();
    const updateTipoMovimentacao = useUpdateTipoMovimentacao();
    const { id } = useParams<{ id?: string }>();

    const { data: tipoMovimentacao, isLoading } = useGetTipoMovimentacao(Number(id));

    const onSubmit = async (values: any) => {
        console.log({ values });
        const tipo = id ? await updateTipoMovimentacao(Number(id), values) : await createTipoMovimentacao(values);
        onConfirm?.(tipo);
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
                        <Button key="submit" form="form-tipo-movimentacao" type="primary" htmlType="submit">
                            Cadastrar
                        </Button>,
                    ]}
                >
                    <Form
                        form={form}
                        id="form-tipo-movimentacao"
                        name="basic"
                        layout="vertical"
                        initialValues={tipoMovimentacao}
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
                            label="Tipo"
                            name="tipo"
                            rules={[{ required: true, message: 'Por favor insira o tipo de movimentacao!' }]}
                        >
                            <Select options={tipoMovimentacaoOptions} />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    );
}
