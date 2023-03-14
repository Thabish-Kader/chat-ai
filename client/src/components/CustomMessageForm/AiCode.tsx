import { useState } from "react";
import MessageFormUI from "./MessageFormUI";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import { usePostAiCodeMutation } from "@/state/api";

type AiProps = {
	props: MessageFormProps;
	activeChat: ChatObject | undefined;
};

const AiCode = ({ props, activeChat }: AiProps) => {
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState<File>();
	const [triggerCode] = usePostAiCodeMutation();

	const handleSubmit = async () => {
		const date = new Date()
			.toISOString()
			.replace("T", " ")
			.replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
		const at = attachment
			? [
					{
						id: activeChat!.id,
						blob: attachment,
						file: attachment.name,
						created: attachment.name,
					},
			  ]
			: [];
		const form = {
			attachments: at,
			created: date,
			sender_username: props.username as string,
			text: message,
			activeChatId: activeChat!.id,
			custom_json: {},
		};
		props.onSubmit?.(form);
		triggerCode(form);
		setMessage("");
		setAttachment(undefined);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setMessage(e.target.value);
	return (
		<MessageFormUI
			setAttachment={setAttachment}
			message={message}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
		/>
	);
};

export default AiCode;
