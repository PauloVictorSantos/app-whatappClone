import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import b64 from 'base-64';;
import {
    MODIFICA_EMAIL,
    MODIFICA_SENHA,
    MODIFICA_NOME,
    CADASTRO_USUARIO_SUCESSO,
    CADASTRO_USUARIO_ERRO,
    LOGIN_USUARIO_SUCESSO,
    LOGIN_USUARIO_ERRO,

} from './types';

export const modificaEmail = (texto) => {
    console.log(texto);
    return {
        type: MODIFICA_EMAIL,
        payload: texto
    }
}

export const modificaSenha = (texto) => {
    return {
        type: MODIFICA_SENHA,
        payload: texto
    }
}

export const modificaNome = (texto) => {
    return {
        type: MODIFICA_NOME,
        payload: texto
    }
}

export const cadastraUsuario = ({ nome, email, senha }) => {
    return dispatch => {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
            .then(user => {
                let emailb64 = b64.encode(email);

                firebase.database().ref("/contatos/" + emailb64)
                    .push({ nome })
                    .then(value => cadastroUsuarioSucesso(dispatch))

            })
            .catch(erro => cadastroUsuarioErro(erro, dispatch));
    }
}

const cadastroUsuarioSucesso = (dispatch) => {
    dispatch({
        type: CADASTRO_USUARIO_SUCESSO
    });
    Actions.boasVindas();
}

const cadastroUsuarioErro = (erro, dispatch) => {
    dispatch({
        type: CADASTRO_USUARIO_ERRO,
        payload: erro.message
    });
}

export const autenticarUsuario = ({ email, senha }) => {

    return dispatch => {
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then(value => loginUsuarioSucesso(dispatch))
            .catch(erro => loginUsuarioErro(erro, dispatch));
    }

}

const loginUsuarioSucesso = (dispatch) => {
    dispatch({
        type: LOGIN_USUARIO_SUCESSO
    })
    Actions.principal();
}

const loginUsuarioErro = (erro, dispatch) => {
    dispatch({
        type: LOGIN_USUARIO_ERRO,
        payload: erro.message
    })
}
