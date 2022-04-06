import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IonItem, IonText } from "@ionic/react";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  handleSignUp,
  setShowPassword,
  setIsRequired,
} from "../redux/authSlice";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        Chronos
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const SignUp: React.FC = () => {
  const data = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={(event: any) => {
              event.preventDefault();
              dispatch(handleSignUp(new FormData(event.currentTarget)));
            }}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {data?.isRequired !== "" ? (
                <Grid item xs={12} sm={12}>
                  <Alert variant="outlined" severity="error">
                    {data?.isRequired}
                  </Alert>
                </Grid>
              ) : null}
              <Grid item xs={6} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={!data?.isValidEmail}
                  helperText={!data?.isValidEmail ? "Invalid Email" : ""}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={data?.isValidPassword?.valid ? true : false}
                  helperText={data?.isValidPassword?.valid}
                  name="password"
                  label="Password"
                  type={data?.showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            dispatch(setShowPassword(!data?.showPassword))
                          }
                          edge="end"
                        >
                          {data?.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type={data?.showPassword ? "text" : "password"}
                  error={
                    data?.isValidPassword?.confirmPasswordValidity == null ||
                    undefined
                      ? false
                      : data?.isValidPassword?.confirmPasswordValidity
                      ? false
                      : true
                  }
                  helperText={
                    data?.isValidPassword?.confirmPasswordValidity === undefined
                      ? null
                      : data?.isValidPassword?.confirmPasswordValidity
                      ? "Passwords Match"
                      : "Passwords Do Not Match"
                  }
                  id="confirmPassword"
                  autoComplete="confirmPassword"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            dispatch(setShowPassword(!data?.showPassword))
                          }
                          edge="end"
                        >
                          {data?.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <IonItem routerLink="/Login" onClick={() => {dispatch(setShowPassword(false)); dispatch(setIsRequired(""))}}>
                <IonText color="secondary">
                  {"Already have an account? Sign in"}
                </IonText>
              </IonItem>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
