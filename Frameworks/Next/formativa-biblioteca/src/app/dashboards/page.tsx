"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardMembro from "../componentes/dashboards/DashboardMembro";
import DashboardBibliotecario from "../componentes/dashboards/DashboardBibliotecario";

export default function DashboardPage(){
    const router = useRouter();
    const [funcao, setFuncao] = useState<string | null>(null);

    useEffect(()=>{
        // Como o middleware protege, aqui já estamos autenticados
        // Simular função baseada no token (em produção, decodificar do token)
        setFuncao("bibliotecario"); // Para admin
    }, []);

    const handleLogout = async()=>{

        await fetch('/api/logout', { method: 'POST' });
        router.push("/login");
    };

    const renderDashboard = () =>{
        if(funcao?.toLowerCase() === "bibliotecario"){
            return <DashboardBibliotecario/>;
        }else if(funcao === "membro"){
            return <DashboardMembro/>;
        }
        return null;
    };

    return(
        <div>
            <header>
                <h1>Bem-Vindo</h1>
                <button onClick={handleLogout}>Logout</button>
            </header>
            <main>
                {renderDashboard()}
            </main>
        </div>
    );
};
