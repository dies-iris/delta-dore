import React,{useState} from 'react';
import Query from '../tools/Query';
import { AUTH_TOKEN } from '../tools/helper';
import '../styles/Login.scss';


export default function Login(props){

  const [validate, setValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  
  const handleLogin = (event) => {
      event.preventDefault();
      if(username && password){
        setLoading(true);
        setValidate(true);
        setError();
        new Query('login').post({
          username: username,
          password: password
        })
        .then(data => {
          if(data.ok){
            return data.json();
          } else {
            handleLoginFail();
            return "error"
          }
        })
        .then(response => {
          if(response === "error"){
            setError("Login ou mot de passe invalid");
          } else {
            console.log(response);
            handleLoginSuccess(response)}
        })
        .catch(error => handleLoginFail(error))
      } else {
        setError("Veuillez saisir vos identifiants")
      }
    }
  
    const handleLoginSuccess = (user) => {
      localStorage.setItem(AUTH_TOKEN, JSON.stringify(user));
      console.log('user', user)
      setValidate(false);
      setLoading(false);
      setUsername();
      setPassword();
      setError();
      props.setEcran('accueil');
    }
  
    const handleLoginFail = (error) => {
      setValidate(true); 
      setLoading(false);
      setError('Invalid username / password');
    }
    
  const renderError = () => {
    if (error) {
      return <p className="error">{error}</p>
    } else if (loading) {
      return <p>Chargement...</p>
    }
  }

    return (
      <div className="fullwidth back_vert_pr flex_center">          
        <form className="login-form-wrap" method="POST"  noValidate validated={validate} onSubmit={handleLogin}>
          <h2>Connexion</h2>
          <p>
          <input name="username"
              type="text" 
              required 
              placeholder="Login"
              onChange={event => setUsername(event.target.value)}
              value={username} />
              <i className="validation"><span></span><span></span></i>
          </p>
          <p>
          <input type="password" 
              required 
              placeholder="Mot de passe"
              onChange={event => setPassword(event.target.value)}
              value={password} />
              <i className="validation"><span></span><span></span></i>
          </p>
          {renderError()}
          <p>
          <input type="submit" className="login" value="Se connecter" />
          </p>
        </form>
      </div>  
    )
  }

