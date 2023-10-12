import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@/context/UserContext';
import { login } from '@/services/auth.service';
import COLORS from '../../constants/colors';
import Button from '../../components/Buttons/Button';
import icon from '../../assets/Comandas-icon.png';

function Login() {
  const navigation = useNavigation();
  const { setSigned, setName } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = () => {
    login({
      email,
      password,
    }).then((res) => {
      // console.log(res);

      if (res && res.user) {
        setSigned(true);
        setName(res.user.name);
        AsyncStorage.setItem('@TOKEN_KEY', res.accessToken).then();
      } else {
        Alert.alert('Usuário ou Senha inválidos!');
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View style={{ marginVertical: 1 }}>
          <Text style={styles.textHello}>Hello 🖐️</Text>
          <Text style={styles.textWelcome}>Bem Vindo ao</Text>
          <View style={styles.logoWithText}>
            <Image source={icon} style={styles.imageLogo} />
            <Text style={styles.textLogo}>omandas</Text>
          </View>
        </View>

        <View style={{ marginTop: 30, marginBottom: 20 }}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={COLORS.placeholderText}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              style={{ width: '100%' }}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <View style={styles.textInput}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor={COLORS.placeholderText}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={isPasswordShown}
              style={{ width: '100%' }}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={styles.eye}
            >
              {isPasswordShown === true ? (
                <Ionicons
                  name="eye-off"
                  size={24}
                  color={COLORS.placeholderText}
                />
              ) : (
                <Ionicons name="eye" size={24} color={COLORS.placeholderText} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.checkbox}>
          <Checkbox
            style={{ marginRight: 10 }}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? COLORS.primary : undefined}
          />

          <Text>Salvar dados</Text>
        </View>

        <Button
          title="Login"
          filled
          onPress={handleLogin}
          style={{
            marginTop: 260,
            marginBottom: 4,
          }}
        />

        {/* <SocialLogin /> */}

        <View style={styles.footer}>
          <Text style={styles.textFooter}>Não tem conta? Vamos </Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.textFooterLink}>criar uma conta.</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

Login.navigationOptions = () => ({
  header: null,
});

Login.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  body: {
    flex: 1,
    marginHorizontal: 22,
    marginTop: 1,
  },
  logoWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textHello: {
    fontSize: 16,
    fontWeight: 400,
    color: COLORS.black,
  },
  textWelcome: {
    fontSize: 32,
    fontWeight: 600,
    color: COLORS.black,
  },
  textInput: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.neutralLightGrey,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 22,
  },
  imageLogo: {
    alignSelf: 'center',
    height: 50,
    width: 50,
    aspectRatio: 1 / 1,
    marginRight: -6,
  },
  textLogo: {
    fontSize: 34,
    fontWeight: 600,
    color: COLORS.primary,
  },
  eye: {
    position: 'absolute',
    right: 15,
  },
  checkbox: {
    flexDirection: 'row',
    marginVertical: 9,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 18,
  },
  textFooter: {
    fontSize: 16,
    color: COLORS.black,
  },
  textFooterLink: {
    fontSize: 16,
    color: COLORS.linkTextGreen,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

export default Login;
