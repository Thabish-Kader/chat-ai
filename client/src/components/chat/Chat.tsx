import {
	useMultiChatLogic,
	MultiChatSocket,
	MultiChatWindow,
} from "react-chat-engine-advanced";
import CustomHeader from "./CustomHeader";
import StandardMessageForm from "../CustomMessageForm/StandardMessageForm";
import Ai from "../CustomMessageForm/Ai";

const Chat = () => {
	const chatProps = useMultiChatLogic(
		import.meta.env.VITE_PROJECT_ID,
		"testuser",
		"1234"
	);
	return (
		<div style={{ flexBasis: "100%" }}>
			<MultiChatSocket {...chatProps} />
			<MultiChatWindow
				{...chatProps}
				style={{ height: "100vh" }}
				renderChatHeader={(chat) => <CustomHeader props={chat} />}
				renderMessageForm={(props) => {
					if (chatProps.chat?.title.startsWith("Ai")) {
						return <Ai props={props} activeChat={chatProps.chat} />;
					}
					return (
						<StandardMessageForm
							props={props}
							activeChat={chatProps.chat}
						/>
					);
				}}
			/>
		</div>
	);
};

export default Chat;
