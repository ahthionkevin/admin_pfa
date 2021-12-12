import {
    createTheme,
    CssBaseline,
    Grid,
    ThemeProvider,
    Box,
    TextField,
    Button,
    Typography,
    Avatar,
    Paper,
} from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import validator from "validator";

const theme = createTheme();

async function loginUser(credentials) {
    return fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then((data) => data.json());
}

const SignIn = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("HANDLE SUBMIT");
        if (email && password) {
            const token = await loginUser({
                email,
                password,
            });
            console.log(token);
            sessionStorage.setItem("admin", email);
            setToken(token);
        }
    };

    const validateEmail = (e) => {
        var email = e.target.value;

        if (validator.isEmail(email)) {
            setEmailError("");
        } else {
            setEmailError("email invalid");
        }
    };

    const isEmpty = (e) => {
        var field = e.target.value;

        if (validator.isEmpty(field)) {
            setPasswordError("Enter your password");
        } else {
            setPasswordError("");
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage:
                            "url(https://source.unsplash.com/random)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            {/* <LockOutlinedIcon /> */}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box
                            component="form"
                            method="post"
                            noValidate
                            onSubmit={(e) => {
                                handleSubmit(e);
                                setPassword("");
                            }}
                            sx={{ mt: 1 }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onInput={(e) => setEmail(e.target.value)}
                                onChange={(e) => validateEmail(e)}
                            />
                            <span
                                style={{
                                    fontWeight: "bold",
                                    color: "red",
                                    opacity: 0.7,
                                }}
                            >
                                {emailError}
                            </span>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onInput={(e) => setPassword(e.target.value)}
                                onChange={(e) => isEmpty(e)}
                            />
                            <span
                                style={{
                                    fontWeight: "bold",
                                    color: "red",
                                    opacity: 0.7,
                                }}
                            >
                                {passwordError}
                            </span>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

SignIn.propTypes = {
    setToken: PropTypes.func.isRequired,
};

export default SignIn;
