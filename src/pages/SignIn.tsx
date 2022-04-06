import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IonCol, IonGrid, IonItem, IonRow, IonText } from "@ionic/react";
import { useDispatch, useSelector } from "react-redux";
import { client } from "../graphql/client";
import { useEffect } from "react";
import { RootState } from "../redux/store";
import { handleSignIn, setIsRequired, setLoginSuccess, setShowPassword } from "../redux/authSlice";
import { Alert, IconButton, InputAdornment } from "@mui/material";
import { useHistory } from "react-router-dom"
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

const SignIn: React.FC = () => {
  const data = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    if (data.loginSuccess === true) {
      console.log("login success");
    }
  }, []);

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
            Sign in
          </Typography>
          <Grid container spacing={2}>
            {data?.isRequired !== "" || data?.loginError ? (
              <Grid item marginTop={1} xs={12} sm={12}>
                <Alert variant="outlined" severity="error">
                  {data?.isRequired || data?.loginError}
                </Alert>
              </Grid>
            ) : null}
          </Grid>

          <Box
            component="form"
            onSubmit={(event: any) => {
              event.preventDefault();
              dispatch(handleSignIn(new FormData(event.currentTarget)));
            }}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={data?.showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem routerLink="/forgotPassword">
                    <IonText color="secondary">Forgot Password?</IonText>
                  </IonItem>
                </IonCol>
                <IonCol>
                  <IonItem routerLink="/SignUp" onClick={() => {dispatch(setShowPassword(false)); dispatch(setIsRequired(""))}}>
                    <IonText color="secondary">
                      {"Don't have an account? Sign Up"}
                    </IonText>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default SignIn;
