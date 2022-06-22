import React, { useRef, useState } from "react";
import {
    View,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    LayoutAnimation,
    Platform,
    StyleSheet,
} from "react-native";
import {
    Container,
    Text,
    TextField,
    Button,
    Criteria,
} from "@components/index";
import { useAppSelector, useAppDispatch } from "@hooks/redux";
import { selectAuth, login, logout } from "@state/slices/authSlice";
import { isRejected } from "@reduxjs/toolkit";
import { AUTH_ALERTS } from "@constants/firebase";
import { showAlert } from "@utils/helpers";
import { useFormik } from "formik";
import * as yup from "yup";

export type FormValues = {
    email: string;
    password: string;
};

export const AccountScreen = () => {
    const inputRefs = useRef({});
    const dispatch = useAppDispatch();

    const [passwordInFocus, setPasswordInFocus] = useState(false);
    const { user, loading } = useAppSelector(selectAuth);

    const onSubmit = async (values: FormValues, { resetForm }) => {
        const result = await dispatch(login(values));
        if (isRejected(result)) {
            const alert = AUTH_ALERTS[result.payload];
            showAlert(alert ? alert : AUTH_ALERTS.DEFAULT);
        } else {
            resetForm();
        }
    };

    const onSignOut = () => {
        dispatch(logout());
    };

    const formik = useFormik<FormValues>({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit,
        validateOnMount: true,
        validationSchema: yup.object().shape({
            email: yup
                .string()
                .email("Email must be valid")
                .required("Email is required"),
            password: yup
                .string()
                .required("Password is required")
                .test(
                    "is-valid-password",
                    "Password is invalid",
                    value => value?.length >= 6 && !!value?.match(/[A-Z]/),
                ),
        }),
    });

    const onPasswordFocusToggle = state => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setPasswordInFocus(state);
    };

    return (
        <Container>
            {!user ? (
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={46}
                        style={styles.container}>
                        <View style={styles.header}>
                            <Text type="title">WELCOME!</Text>
                            <Text>Login/signup to save your </Text>
                            <Text>favorite atrwork in the cloud.</Text>
                        </View>

                        <TextField
                            label="Email"
                            placeholder="Enter your email adress"
                            placeholderTextColor="gray"
                            value={formik.values.email}
                            onChangeText={formik.handleChange("email")}
                            onSubmitEditing={() =>
                                inputRefs.current["password"]?.focus()
                            }
                            autoCapitalize="none"
                            keyboardType="email-address"
                            returnKeyType="next"
                            errorMessage={
                                formik.touched.email &&
                                (formik.errors?.email as string)
                            }
                        />
                        <TextField
                            inputRef={ref => {
                                inputRefs.current["password"] = ref;
                            }}
                            label="Password"
                            placeholder="Enter a secure password"
                            placeholderTextColor="gray"
                            value={formik.values.password}
                            onChangeText={formik.handleChange("password")}
                            onSubmitEditing={formik.handleSubmit}
                            autoCapitalize="none"
                            returnKeyType="done"
                            secureTextEntry
                            blurOnSubmit={false}
                            onFocus={() => onPasswordFocusToggle(true)}
                            onBlur={() => onPasswordFocusToggle(false)}
                            errorMessage={
                                formik.touched.password &&
                                (formik.errors?.password as string)
                            }
                        />
                        {passwordInFocus && (
                            <Criteria
                                params={[
                                    {
                                        title: "6 characters",
                                        check: v => v.length >= 6,
                                    },
                                    {
                                        title: "1 upper case letter",
                                        check: v => v.match(/[A-Z]/),
                                    },
                                ]}
                                value={formik.values.password}
                            />
                        )}
                        <View style={{ marginTop: 20 }}>
                            <Button
                                title={"Continue with Email"}
                                onPress={formik.handleSubmit}
                                isLoading={loading}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            ) : (
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text type="title">WELCOME,</Text>
                        <Text>{user.email}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Button title={"Sign Out"} onPress={onSignOut} />
                    </View>
                </View>
            )}
        </Container>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        marginBottom: 26,
    },
    container: {
        width: "100%",
        paddingHorizontal: 16,
    },
});
