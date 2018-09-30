import React, { Component } from 'react';
import { View, TextInput, Button, ImageBackground,Text } from 'react-native';
import { connect } from 'react-redux';
import {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
} from '../Actions/AutenticacaoActions';

class formCadastro extends Component {

    _cadastraUsuario() {
        const { nome, email, senha } = this.props;
        this.props.cadastraUsuario({ nome, email, senha });
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1, width: null }} source={require('../imgs/bg.png')}>
                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ flex: 4, justifyContent: 'center' }}>
                        <TextInput
                            value={this.props.nome}
                            onChangeText={texto => this.props.modificaNome(texto)}
                            placeholder="Nome"
                            style={{ fontSize: 20, height: 45 }} />
                        <TextInput
                            value={this.props.email}
                            onChangeText={texto => this.props.modificaEmail(texto)}
                            placeholder="E-mail"
                            style={{ fontSize: 20, height: 45 }} />
                        <TextInput
                            value={this.props.senha}
                            onChangeText={texto => this.props.modificaSenha(texto)}
                            placeholder="Senha"
                            secureTextEntry
                            style={{ fontSize: 20, height: 45 }} 
                            />
                            <Text
                                style={{color: '#ff0000', fontSize:18}}
                            >{this.props.erroCadastro}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Button title="Cadastrar"
                            color="#115E54"
                            onPress={() => this._cadastraUsuario()} />
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    nome: state.AutenticacaoReducers.nome,
    email: state.AutenticacaoReducers.email,
    senha: state.AutenticacaoReducers.senha,
    erroCadastro: state.AutenticacaoReducers.erroCadastro
});

export default connect(
    mapStateToProps,
    { modificaEmail, modificaSenha, modificaNome, cadastraUsuario })
    (formCadastro);