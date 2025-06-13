export class Disciplina {
    nome: string | null;
    descricao: string | null;

    constructor(nome: string | null, descricao: string | null){
        this.nome = nome;
        this.descricao = descricao;
    }
}