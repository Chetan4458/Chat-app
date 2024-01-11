import {createContext, useState, useEffect} from "react";
import jwt_decode from "jwt-decode";
import {useHistory} from "react-router-dom";
const swal = require('sweetalert2')

const AuthContext = createContext();

export default AuthContext

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwt_decode(localStorage.getItem("authTokens"))
            : null
    );


    const [loading, setLoading] = useState(true);

    const history = useHistory();

    const loginUser = async (email, password) => {
        const response = await fetch("http://127.0.0.1:8000/api/token/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });
        console.log("Login Response:", response);

        try {
            const data = await response.json();
    
            if (response.status === 200) {
                console.log("Logged In");
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem("authTokens", JSON.stringify(data));
                history.push("/");
                swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: "top-right",
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: true,
                });
            }
            else if (response.status === 401) {
                // Log the response body for debugging purposes
                const errorData = await response.text();
                console.log("Authentication Error:", errorData);
            } 
            else {
                console.log("Other error:",response.status);
                console.log("there was a server issue");
                swal.fire({
                    title: "Username or password does not exist",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: "top-right",
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCancelButton: true,
                });
            }
        } catch (error) {
            console.error("Error reading response body:", error);
        }
    };
    

    const registerUser = async (email, username, password, password2) => {
        const response = await fetch("http://127.0.0.1:8000/api/register/", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email, username, password, password2
            })
        })
        console.log(JSON.stringify({ email, username, password, password2 }));
        if (response.status === 400) {
            const errorData = await response.json();
            console.log("Validation Error:", errorData);
        }
        
        else if(response.status === 201){
            history.push("/login")
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCancelButton: true,

            })
        }
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        history.push("/login")
        swal.fire({
            title: "YOu have been logged out...",
            icon: "success",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            showCancelButton: true,

        })
    }

    const contextData = {
        user, 
        setUser,
        authTokens,
        setAuthTokens,
        registerUser,
        loginUser,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}