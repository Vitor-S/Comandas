import {
    View,
    Text,
    Image,
    Pressable,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { register } from '@/services/auth.service';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';
import Button from '../../components/Buttons/Button';
import icon from '../../assets/Comandas-icon.png';

function Signup() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [isPasswordHide, setIsPasswordHide] = useState(true);

    function handleRegister() {
        register({
            userInfo: {
                name,
                email,
                password,
            },
        })
            .then(() => {
                navigation.navigate('CheckinRegister');
            })
            .catch(() => {
                Alert.alert(
                    'Usuário não cadastrado!',
                    'Tente novamente ou faça Login',
                );
            });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View>
                    <Image source={icon} style={styles.imageStyle} />
                </View>

                <View>
                    <Text style={styles.textLableInput}>Nome</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Seu Nome"
                            placeholderTextColor={COLORS.placeholderText}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{ width: '100%' }}
                            value={name}
                            setValue={setName}
                            onChangeText={(text) => setName(text)}
                        />
                    </View>
                </View>

                <View>
                    <Text style={styles.textLableInput}>Email</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={COLORS.placeholderText}
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={{ width: '100%' }}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                    </View>
                </View>
            </View>

            <View>
                <View>
                    <Text style={styles.textLableInput}>Senha</Text>

                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Sua senha"
                            placeholderTextColor={COLORS.placeholderText}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={isPasswordHide}
                            style={{ width: '85%' }}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordHide(!isPasswordHide)}
                            style={styles.eye}
                        >
                            {isPasswordHide === true ? (
                                <Ionicons
                                    name="eye"
                                    size={24}
                                    color={COLORS.placeholderText}
                                />
                            ) : (
                                <Ionicons
                                    name="eye-off"
                                    size={24}
                                    color={COLORS.placeholderText}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>

                <View>
                    <Text style={styles.textLableInput}>Confirmar Senha</Text>

                    <View style={styles.textInput}>
                        <TextInput
                            placeholder="Confirmar a senha"
                            placeholderTextColor={COLORS.placeholderText}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={isPasswordHide}
                            style={{ width: '85%' }}
                            value={passwordRepeat}
                            onChangeText={(text) => setPasswordRepeat(text)}
                        />

                        <TouchableOpacity
                            onPress={() => setIsPasswordHide(!isPasswordHide)}
                            style={styles.eye}
                        >
                            {isPasswordHide === true ? (
                                <Ionicons
                                    name="eye"
                                    size={24}
                                    color={COLORS.placeholderText}
                                />
                            ) : (
                                <Ionicons
                                    name="eye-off"
                                    size={24}
                                    color={COLORS.placeholderText}
                                />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={styles.checkbox}>
                <Text style={{ width: '100%' }}>
                    Registrando-se você concordo com os termos e condições.
                </Text>
            </View>

            <Button
                title="Criar Conta"
                filled
                onPress={() => handleRegister()}
                style={{
                    marginTop: '35%',
                }}
            />
            {/* <SocialLogin /> */}

            <View style={styles.footer}>
                <Text style={styles.textFooter}>Já tem uma conta? Então </Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.textFooterLink}>faça login.</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
        gap: 15,
    },
    imageStyle: {
        alignSelf: 'center',
        height: 75,
        width: 75,
        aspectRatio: 1 / 1,
    },
    textInput: {
        width: '100%',
        height: 48,
        backgroundColor: COLORS.neutralLightGrey,
        borderRadius: 8,
        justifyContent: 'center',
        paddingLeft: 22,
    },
    textLableInput: {
        fontSize: 16,
        fontWeight: '400',
        marginVertical: 8,
    },
    eye: {
        position: 'absolute',
        right: 15,
    },
    checkbox: {
        flexDirection: 'row',
        marginVertical: 10,
        marginHorizontal: 22,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textFooter: {
        fontSize: 16,
        color: COLORS.black,
    },
    textFooterLink: {
        fontSize: 16,
        color: COLORS.linkTextGreen,
        fontWeight: 'bold',
    },
});

export default Signup;
