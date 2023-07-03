import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../../components/card';
import FormGroup from '../../components/form-group';
import SelectMenu from '../../components/selectMenu';
import LancamentosTable from './lancamentosTable';
import LancamentoService from '../../app/service/lancamentoService';
import LocalStorageService from '../../app/service/localStorageService';
import * as messages from '../../components/toastr'

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamentos extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        deletarLancamento: {},
        lancamentos: [],
    }

    constructor() {
        super();
        this.service = new LancamentoService();
    }

    listar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo Ano é obrigatório.')
        }
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.findAll(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }
    editar = (id) => {
        this.props.history.push(`/cadastro-lancamentos/${id}`)
    }

    cadastrarLancamento = () => {
        this.props.history.push('/cadastro-lancamentos')
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoDeletar: lancamento })
    }

    cancelarDelecao = () => {
        this.setState({ showConfirmDialog: false, lancamentoDeletar: {} })
    }

    deletar = () => {
        this.service
            .deletar(this.state.lancamentoDeletar.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = lancamentos.indexOf(this.state.lancamentoDeletar);
                lancamentos.splice(index, 1);
                this.setState({ lancamentos: lancamentos, showConfirmDialog: false })
                messages.mensagemSucesso('Lancamento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o Lançamento')
            })
    }

    render() {

        const meses = this.service.obterListaMeses();
        const tipos = this.service.obterListaTipos();

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" severity="success" onClick={this.deletar} />
                <Button label="Cancelar" icon="pi pi-times" severity="danger" onClick={this.cancelarDelecao} className="p-button-secondary" />
            </div>
        );

        return (
            <Card title="Consulta de Lançamento">
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                className="form-control"
                                id="inputAno"
                                value={this.state.ano}
                                onChange={e => this.setState({ ano: e.target.value })}
                                placeholder="Digite o Ano" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: " >
                            <SelectMenu id="inputMes"
                                value={this.state.mes}
                                onChange={e => this.setState({ mes: e.target.value })}
                                className="form-control"
                                lista={meses} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputDescricao" label="Descrição: ">
                            <input type="text"
                                className="form-control"
                                id="inputDescricao"
                                value={this.state.descricao}
                                onChange={e => this.setState({ descricao: e.target.value })}
                                placeholder="Digite a Descrição" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputTipo" label="Tipo: " >
                            <SelectMenu id="inputTipo"
                                value={this.state.tipo}
                                onChange={e => this.setState({ tipo: e.target.value })}
                                className="form-control"
                                lista={tipos} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div>
                        <button onClick={this.listar} type="button" className="btn btn-success">Buscar</button>
                        <button onClick={this.cadastrarLancamento} type="button" className='btn btn-danger'>Cadastrar</button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                deletar={this.abrirConfirmacao}
                                editar={this.editar} />
                        </div>
                    </div>
                </div>

                <div>
                    <Dialog header="Confirmar"
                        visible={this.state.showConfirmDialog}
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter}
                        onHide={() => this.setState({ showConfirmDialog: false })}>
                        <p className="m-0">
                            <b>Confirma a exclusão deste lançamento?</b>
                        </p>
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaLancamentos);