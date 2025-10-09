"use-cliente";

import { IEquipamento } from "@/models/Equipamento";
import { IOrdemServico } from "@/models/OrdemServico";
import { useEffect, useState } from "react";

export default function DashboardGerente(){
    const [ordens, setOrdens] = useState<IOrdemServico[]>([]);
    const [equipamentos, setEquipamentos] = useState<IEquipamento[]>([]);

    useEffect(()=> {
        fetchOrdens();
        fetchEquipamentos();
    }, []);

    const fetchOrdens = async () =>{
        try {
            const resposta = await fetch("/api/ordemservico");
            const data = await resposta.json();
            if(data.success){
                setOrdens(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const fetchEquipamentos = async () =>{
        try {
            const resposta = await fetch("/api/equipamentos");
            const data = await resposta.json();
            if(data.success){
                setEquipamentos(data.data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <div>
            <h3>Ordens de Serviço</h3>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Tipo de Manutenção</th>
                        <th>Data Solicitação</th>
                        <th>Data Finalização</th>
                        <th>Id Equipamento</th>
                    </tr>
                </thead>
                <tbody>
                    {ordens.map((ordem)=>(
                        <tr key={ordem._id}>
                            <td>{ordem.titulo}</td>
                            <td>{ordem.descricao}</td>
                            <td>{ordem.status}</td>
                            <td>{ordem.tipoManutencao}</td>
                            <td>{new Date(ordem.dataSolicitada).toLocaleDateString()}</td>
                            <td>{ordem.dataFinalizada ? new Date(ordem.dataFinalizada).toLocaleDateString() : 'N/A'}</td>
                            <td>{ordem.idEquipamento}</td>
                            <td><button>Finalizar Serviço</button></td>
                        </tr> 
                    ))}
                </tbody>
            </table>

            <h3>Equipamentos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Modelo</th>
                        <th>Marca</th>
                        <th>Localização</th>
                        <th>Número de Série</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {equipamentos.map((equipamento)=>(
                        <tr key={equipamento._id}>
                            <td>{equipamento.modelo}</td>
                            <td>{equipamento.marca}</td>
                            <td>{equipamento.localizacao}</td>
                            <td>{equipamento.numSerie}</td>
                            <td>{equipamento.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}