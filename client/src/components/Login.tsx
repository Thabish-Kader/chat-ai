import React from "react";

type LoginProps = {
	setUser: React.Dispatch<React.SetStateAction<null>>;
	setSecret: React.Dispatch<React.SetStateAction<null>>;
};
const Login = ({ setUser, setSecret }: LoginProps) => {
	return <div>Login</div>;
};

export default Login;
