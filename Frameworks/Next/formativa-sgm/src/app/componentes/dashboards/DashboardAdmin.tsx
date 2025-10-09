"use-client";

import { useEffect, useState } from "react";
import { IUsuario } from "@/models/Usuario";

export default function DashboardAdmin() {
    const [usuarios, setUsuarios] = useState<IUsuario[]>([]);

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = async () => {
        try {
            const resposta = await fetch("/api/usuarios");
            const data = await resposta.json();
            if (data.success) {
                setUsuarios(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Painel de Administrador</h3>
            <h4>Lista de Usuários</h4>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Função</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario._id}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.email}</td>
                            <td>{usuario.funcao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}