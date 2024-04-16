import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom"
import { UserService } from "./../../services/user.services";
import DataProvider, { useDataContext } from "./../../context/DataContext";
import { LoginSchema } from "./../../validationSchemas/userSchema";
import { validateSchema, displayError } from "./../../utils"


const defaultTheme = createTheme();

export default function Login() {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [cookie, setCookie] = useCookies(['token','user']);
  const { setUser } = useDataContext()
  const navigate = useNavigate()


  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isDataValid = validateSchema(LoginSchema, formData)

    if(!isDataValid){
      return;
    }

    try {
       const { data } = await UserService.login(formData);

       setCookie('user', data, { path: '/'})
       setCookie('token',data.token, { path: '/' })
       setUser(data)

       navigate('/',{ replace : true })
    } catch (error) {
      displayError(error);
    }

    setFormData({
      email: '',
      password: '',
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
