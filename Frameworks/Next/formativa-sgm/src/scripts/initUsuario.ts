//script para criação de um usuário admin para o site

import connectMongo from "@/services/mongodb"
import Usuario from "@/models/Usuario";

export const criarAdmin = async () =>{
    await connectMongo();
    const adminEmail = "admin@admin.com";
    const adminExiste = await Usuario.findOne({email:adminEmail});
    if(!adminExiste){
        const admin = new Usuario({
            nome:"Administrador",
            email: adminEmail,
            senha: "admin123",
            funcao:"admin"
        });
        await admin.save();
        console.log("Usuário Adm Criado!!");
    }else{
        console.log("usuário já existe");
    }
};

criarAdmin().catch(console.error);