import { v4 as uuidv4 } from 'uuid';

export class EnderecoAgencia {
        private id_endereco: string
        private id_agencia: string
        private cep: string
        private local: string
        private numero_casa: number
        private bairro: string
        private cidade: string
        private estado: string
        private complemento: string

        constructor(
             id_agencia: string,
             cep: string,
             local: string,
             numero_casa: number,
             bairro: string,
             cidade: string,
             estado: string,
             complemento: string
        ) {
            this.id_endereco = uuidv4()
             this.id_agencia = id_agencia;
             this.cep = cep;
             this.local = local
             this.numero_casa = numero_casa; 
             this.bairro = bairro;
             this.cidade = cidade;
             this.estado = estado;
             this.complemento = complemento
        }
     
        public getIdEndereco() {
          return this.id_endereco;
        }

        public getIdAgencia() {
          return this.id_agencia;
        }

        public getCep(){
          return this.cep;
        }

        public getLocal(){
          return this.local;
        }

        public getNumeroCasa(){
          return this.numero_casa;
        }

        public getBairro(){
          return this.bairro;
        }

        public getCidade(){
          return this.cidade;
        }

        public getEstado(){
          return this.estado;
        }

        public getComplemento(){
          return this.complemento;
        }
}
