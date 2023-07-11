import ApiService from '../apiservice'

import ErroValidacao from '../exception/ErroValidacao'


class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais);
    }

    obterSaldoUsuario(id){
        return this.get(`/${id}/saldo`);
    }

    salvar(usuario){
        return this.post(`/cadastrar`, usuario);
    }

    validar(usuario){
        const erros = []

        if (!usuario.nome) {
            erros.push('O campo Nome é obrigatório!')
        }

        if (!usuario.email) {
            erros.push('O campo Email é obrigatório!')
        } else if (!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
            erros.push('Informe um e-mail válido!')
        }

        if (!usuario.senha || !usuario.senhaRepeticao){
            erros.push('Necessário confirmar a senha!')
        } else if (!usuario.senha.match(usuario.senhaRepeticao)){
            erros.push('A confirmação de senha está divergente!')
        }

        if(erros && erros.length > 0){
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService;