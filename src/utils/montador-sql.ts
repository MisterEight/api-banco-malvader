import { InputsSQL } from "./interfaces/mysql";

export function montarSQL(sql: string, inputs: InputsSQL[]){
    let sqlFinal: string = ''
    for(let item of inputs){


        sqlFinal += `SET @${item.nomeInput} = `

        if(item.tipoInput != 'INT' && item.tipoInput != 'FLOAT'){
            sqlFinal += `'${item.valorInput}'`
        }

        sqlFinal += ';'
    }

    sqlFinal += sql;

    return sqlFinal;
}