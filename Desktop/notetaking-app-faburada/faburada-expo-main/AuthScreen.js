import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { login, signUp } from "./authFunctions";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.replace("Home"); // Go to main screen
    } catch (e) {
      setError(e.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigation.replace("Home");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}
