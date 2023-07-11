import LocalStorageService from './localStorageService'
import ApiService from '../apiservice'

import jwt from 'jsonwebtoken'

export const USUARIO_LOGADO = '_usuario_logado'
export const TOKEN = 'access_token'


export default class AuthService {

    static isUsuarioAutenticado(){
        const token = LocalStorageService.obterItem(TOKEN)
        const decodeToken = jwt.decode(token)

        if(decodeToken == null){
            return false;
        }
        const expiration = decodeToken.exp

        const isTokenInvalido = Date.now() >= (expiration * 1000)

        return isTokenInvalido;
    }

    static removerUsuarioAutenticado(){
        LocalStorageService.removerItem(USUARIO_LOGADO)
        LocalStorageService.removerItem(TOKEN)
    }

    static logar(usuario, token){
        LocalStorageService.addItem(USUARIO_LOGADO, usuario)
        LocalStorageService.addItem(TOKEN, token)
        ApiService.registrarToken(token)
    }

    static obterUsuarioAutentico(){
        return LocalStorageService.obterItem(USUARIO_LOGADO);
    }

    static refreshSession(){
        const token = LocalStorageService.obterItem(TOKEN)
        const usuaio = AuthService.obterUsuarioAutentico()
        AuthService.logar(usuaio,token)
        return usuaio;
    }
}