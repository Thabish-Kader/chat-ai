import { useEffect, useState } from "react";
import MessageFormUI from "./MessageFormUI";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import { usePostAiAssistMutation } from "@/state/api";

type AiProps = {
	props: MessageFormProps;
	activeChat: ChatObject | undefined;
};

const useDebounce = (value: string, delay: number) => {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debounceValue;
};

const AiAssist = ({ props, activeChat }: AiProps) => {
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState<File>();
	const [triggerAssist, resultAssist] = usePostAiAssistMutation();
	const [appendText, setAppendText] = useState("");

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

		setMessage("");
		setAttachment(undefined);
	};

	const debouncedValue = useDebounce(message, 1000);

	useEffect(() => {
		if (debouncedValue) {
			const form = { text: message };
			triggerAssist(form);
		}
	}, [debouncedValue]);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.keyCode === 9 || e.keyCode === 13) {
			e.preventDefault();
			setMessage(`${message} ${appendText}`);
		}
		setAppendText("");
	};

	useEffect(() => {
		if (resultAssist.data?.text) {
			setAppendText(resultAssist.data?.text);
		}
	}, [resultAssist]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setMessage(e.target.value);
	return (
		<MessageFormUI
			setAttachment={setAttachment}
			message={message}
			handleChange={handleChange}
			handleSubmit={handleSubmit}
			appendText={appendText}
			handleKeyDown={handleKeyDown}
		/>
	);
};

export default AiAssist;
