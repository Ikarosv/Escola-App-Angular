export class Disciplina {
    id: number | null = null;
    nome: string | null;
    descricao: string | null;

    constructor(id: number, nome: string, descricao: string){
        this.nome = nome;
        this.descricao = descricao;
        this.id = id;
    }
}