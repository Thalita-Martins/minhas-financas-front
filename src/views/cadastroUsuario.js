import React from 'react';

import { withRouter } from 'react-router-dom';
import Card from '../components/card'
import FormGroup from '../components/form-group';

import UsuarioService from '../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar() {

    }


    cadastrar = () => {

        const { nome, email, senha, senhaRepeticao } = this.state
        const usuario = { nome, email, senha, senhaRepeticao }

        try {
            this.service.validar(usuario);
        } catch (error) {
            const msgs = error.mensagens;
            msgs.forEach(msg => mensagemErro(msg));
        };

        this.service.salvar(usuario)
            .then(response => {
                mensagemSucesso('Usuário cadastrado com sucesso!')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro Usuario">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">
                            <FormGroup label="Nome: " htmlFor="inputNome">
                                <input type="texte"
                                    value={this.setState.nome}
                                    id='inputNome'
                                    className='form-control'
                                    name='nome'
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="E-mail: " htmlFor="inputEmail">
                                <input type="email"
                                    value={this.setState.email}
                                    id='inputEmail'
                                    className='form-control'
                                    name='e-mail'
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Senha: " htmlFor="inputSenha">
                                <input type="password"
                                    value={this.setState.senha}
                                    id='inputSenha'
                                    className='form-control'
                                    name='senha'
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Confirmar Senha: " htmlFor="inputConfirmarSenha">
                                <input type="password"
                                    value={this.setState.senhaRepeticao}
                                    id='inputConfirmarSenha'
                                    className='form-control'
                                    name='confirmar senha'
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>
                            <br />
                            <button onClick={this.cadastrar} type="button" className='btn btn-success'>
                            <i className="pi pi-check" style={{ color: '#FFFFFF' }}></i> Salvar</button>
                            <button onClick={this.cancelar} type="button" className='btn btn-danger'>
                            <i className="pi pi-ban" style={{ color: '#FFFFFF' }}></i> Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)