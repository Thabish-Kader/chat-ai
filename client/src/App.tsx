import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route path="/chat" element={<Chat />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
