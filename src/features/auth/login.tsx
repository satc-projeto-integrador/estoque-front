import { Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';
import { Cargo, useAuthContext } from './providers/auth-context';
import { Link, useNavigate } from 'react-router-dom';
import apiBackend from '../../api-data/api';
const { Text } = Typography;

interface LoginForm {
    email: string;
    senha: string;
}

export type LoginResponse = {
    accessToken: string;
    usuario: any;
};

export default function Login() {
    const [loginIncorreto, setLoginIncorreto] = useState<boolean>(false);
    const { setAuthContext } = useAuthContext();
    const navigate = useNavigate();

    const onSubmit = async (payload: LoginForm) => {
        try {
            const { data } = await apiBackend.post<LoginResponse>('/api/v1/auth/login', payload);
            localStorage.setItem('token', JSON.stringify(data.accessToken));
            setAuthContext({ usuario: data.usuario, cargo: Cargo.Administrador });
            navigate('/home');
        } catch (e) {
            setLoginIncorreto(true);
        }
    };

    return (
        <Form layout="vertical" onFinish={onSubmit}>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, type: 'email', message: 'Insira um email válido' }]}
            >
                <Input placeholder="Digite seu email" />
            </Form.Item>

            <Form.Item name="senha" label="Senha" rules={[{ required: true, message: 'Insira sua senha' }]}>
                <Input.Password placeholder="Digite sua senha" />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit" size="large">
                    Entrar
                </Button>
                {loginIncorreto && (
                    <Text type="danger">
                        Usuário ou senha incorretos <br />
                    </Text>
                )}
                <Link to={'/cadastro'}>Não possui conta? Cadastre-se</Link>
            </Form.Item>
        </Form>
    );
}
