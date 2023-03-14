import {
	useMultiChatLogic,
	MultiChatSocket,
	MultiChatWindow,
} from "react-chat-engine-advanced";
import CustomHeader from "./CustomHeader";
import StandardMessageForm from "../CustomMessageForm/StandardMessageForm";
import Ai from "../CustomMessageForm/Ai";
import AiCode from "../CustomMessageForm/AiCode";
import AiAssist from "../CustomMessageForm/AiAssist";

const Chat = ({
	user,
	secret,
}: {
	user: string | null;
	secret: string | null;
}) => {
	const chatProps = useMultiChatLogic(
		import.meta.env.VITE_PROJECT_ID,
		user!,
		secret!
	);
	return (
		<div style={{ flexBasis: "100%" }}>
			<MultiChatSocket {...chatProps} />
			<MultiChatWindow
				{...chatProps}
				style={{ height: "100vh" }}
				renderChatHeader={(chat) => <CustomHeader props={chat} />}
				renderMessageForm={(props) => {
					if (chatProps.chat?.title.startsWith("AIChat")) {
						return <Ai props={props} activeChat={chatProps.chat} />;
					}
					if (chatProps.chat?.title.startsWith("AICode")) {
						return (
							<AiCode props={props} activeChat={chatProps.chat} />
						);
					}
					if (chatProps.chat?.title.startsWith("AIAssist")) {
						return (
							<AiAssist
								props={props}
								activeChat={chatProps.chat}
							/>
						);
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
