import React from 'react';
import { withRouter } from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localStorageService'

class Home extends React.Component {

    state = {
        saldo: 0,
        mensagemErro: null
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        this.usuarioService.obterSaldoUsuario(usuarioLogado.id)
            .then(response => {
                this.setState({ saldo: response.data })
            }).catch(erro => {
                this.setState({ mensagemErro: erro.response.data })
            })
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead">Seu saldo para o mês atual é de R$ {this.state.saldo}</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/cadastro-usuario" role="button"><i
                            className="fa fa-users"></i>  Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg"
                        href="#/cadastro-lancamentos" role="button"><i
                            className="fa fa-users"></i>  Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

export default withRouter(Home);