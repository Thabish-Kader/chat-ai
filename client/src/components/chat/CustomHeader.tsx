import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid";
import { ChatHeaderProps } from "react-chat-engine-advanced";

type ChatProps = {
	props: ChatHeaderProps;
};
const CustomHeader = ({ props }: ChatProps) => {
	return (
		<div className="chat-header">
			<div className="flexbetween">
				<ChatBubbleLeftRightIcon className="icon-chat" />
				<h3 className="header-text">{props?.title}</h3>
			</div>
			<div className="flexbetween">
				<PhoneIcon className="icon-phone" />
				{props.description !== "⬅️ ⬅️ ⬅️" ? (
					<p className="herader-text">{props.description}</p>
				) : (
					<p className="herader-text">No chat selected</p>
				)}
			</div>
		</div>
	);
};

export default CustomHeader;
