import Membro, { IMembro } from "@/models/Membro";
import connectMongo from "@/services/mongodb"

export const getAllMembro = async() => {
    await connectMongo();
    const membros = await Membro.find({});
    return membros;
}

export const getOneMembro = async(id:string) => {
    await connectMongo();
    const membro = await Membro.findById(id);
    return membro;
}

export const createMembro = async (data: Partial<IMembro>) => {
    await connectMongo();
    const novoMembro = new Membro(data);
    const novoMembroId = await novoMembro.save();
    return novoMembroId;
}

export const updateMembro = async (id:string, data:Partial<IMembro>) => {
    await connectMongo();
    const membroAtualizado = await Membro.findByIdAndUpdate(id, data, {new:true} );
    return membroAtualizado;
}

export const deleteMembro = async (id:string) => {
    await connectMongo();
    await Membro.findByIdAndDelete(id);
}