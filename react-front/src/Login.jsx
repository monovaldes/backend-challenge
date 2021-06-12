import React, {useState} from 'react';
import axios from 'axios'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import { useHistory } from "react-router-dom";


const Login = () => {
    const isAuthenticated = useIsAuthenticated()
    const signIn = useSignIn()
    const history = useHistory();
    const [formData, setFormData] = useState({email: '', password: ''})
    const [FormType, setFormType] = useState('login')

    const onSubmit = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:3000/users${FormType === 'login' ? '/sign_in' : ''}`, {user: formData})
            .then((res)=>{
                if(res.status === 200){
                    if(signIn({
                            token: res.data.token,
                            expiresIn: res.data.expiresIn,
                            tokenType: "Bearer"
                    })){ 
                        history.push('/')
                    }else {
                        console.error(res)
                    }
                }
            }).catch((e) => {
                console.error(e.message)
            })
    }

    if(isAuthenticated()) {
        return ( <h1> Already logged in! </h1>)
    } else {
        return (
            <div className="loginpage text-center">
                <main className="form-signin">
                    <form onSubmit={onSubmit}>
                        <img className="mb-4" src="https://origin.xtlo.net/type=creativeArchive:clientId=510321846:creativeArchiveId=6777306372201515771:version=4:coreAssetsVersion=1544591110328/img/LOGO_1300_1574237215420.png" alt="" height="57" />
                        <div className="form-floating">
                            <input type={"email"} className="form-control" id="floatingInput" placeholder="name@example.com" onChange={(e)=>setFormData({...formData, email: e.target.value})}/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating">
                            <input type={"password"} className="form-control" id="floatingPassword" placeholder="Password" onChange={(e)=>setFormData({...formData, password: e.target.value})}/>
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary mb-4" type="submit">Sign in</button>
                        <button className="w-100 btn btn-lg btn-secondary" type="submit" onClick={() => setFormType('register')}>Register</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
                    </form>
                </main>
            </div>
        )
    }

    
}

export default Login;