import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "@/components/chat/Chat";
import { useState } from "react";
import Login from "./components/Login";

function App() {
	const [user, setUser] = useState<string>("");
	const [secret, setSecret] = useState<string>("");
	const isAuth = Boolean(user) && Boolean(secret);

	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							isAuth ? (
								<Navigate to={"/chat"} />
							) : (
								<Login
									setUser={setUser}
									setSecret={setSecret}
								/>
							)
						}
					/>
					<Route
						path="/chat"
						element={
							isAuth ? (
								<Chat user={user} secret={secret} />
							) : (
								<Navigate to={"/"} />
							)
						}
					/>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
