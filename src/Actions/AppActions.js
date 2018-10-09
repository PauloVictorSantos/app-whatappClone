import firebase from 'firebase';
import b64 from 'base-64';

import { MODIFICA_ADICIONA_CONTATO_EMAIL } from './types';

export const modificaAdicionarContatoEmail = (texto) => {
    return {
        type: MODIFICA_ADICIONA_CONTATO_EMAIL,
        payload: texto
    }
}


export const adicionaContato = email => {
    console.log(email);

    let emailB64 = b64.encode(email);

    firebase.database().ref(`/contatos/${emailB64}`)
        .once('value')
        .then(snapshot => {
            if (snapshot.val()) {
                console.log("usuário existe");
            } else {
                console.log("usuário não existe");
            }
        })

    return {
        type: ''
    }
}