import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { cadastrar } from "../services/auth";

export default function Cadastro({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] =
    useState("");

  const [carregando, setCarregando] =
    useState(false);

  async function handleCadastro() {
    if (
      !email ||
      !senha ||
      !confirmarSenha
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos."
      );

      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert(
        "Erro",
        "As senhas não são iguais."
      );

      return;
    }

    if (senha.length < 6) {
      Alert.alert(
        "Erro",
        "A senha deve ter pelo menos 6 caracteres."
      );

      return;
    }

    try {
      setCarregando(true);

      await cadastrar(
        email.trim(),
        senha
      );

      // O Firebase autentica automaticamente
      // o usuário após o cadastro.
      //
      // O Navigator detecta a autenticação
      // e mostra a Home.
    } catch (error) {
      console.log(error);

      if (
        error.code ===
        "auth/email-already-in-use"
      ) {
        Alert.alert(
          "Erro",
          "Este e-mail já está cadastrado."
        );
      } else if (
        error.code === "auth/invalid-email"
      ) {
        Alert.alert(
          "Erro",
          "Digite um e-mail válido."
        );
      } else if (
        error.code === "auth/weak-password"
      ) {
        Alert.alert(
          "Erro",
          "A senha é muito fraca."
        );
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível criar a conta."
        );
      }
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Criar conta
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmar senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={[
          styles.button,
          carregando && styles.buttonDisabled,
        ]}
        onPress={handleCadastro}
        disabled={carregando}
      >
        <Text style={styles.buttonText}>
          {carregando
            ? "Criando..."
            : "Criar conta"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Login")
        }
      >
        <Text style={styles.link}>
          Já possui uma conta? Faça login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  link: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 15,
  },
});
