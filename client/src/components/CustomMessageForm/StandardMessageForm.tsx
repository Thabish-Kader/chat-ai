import {
	PaperAirplaneIcon,
	PaperClipIcon,
	XMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { ChatObject, MessageFormProps } from "react-chat-engine-advanced";
import Dropzone from "react-dropzone";

type StandardMessageFormProps = {
	props: MessageFormProps;
	activeChat: ChatObject | undefined;
};
const StandardMessageForm = ({
	props,
	activeChat,
}: StandardMessageFormProps) => {
	const [message, setMessage] = useState("");
	const [attachment, setAttachment] = useState<File>();
	const [preview, setPreview] = useState("");

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
			activeChatId: activeChat?.id,
			custom_json: {},
		};
		props.onSubmit?.(form);
		setMessage("");
		setAttachment(undefined);
	};

	return (
		<div className="message-form-container">
			{preview && (
				<div className="message-form-preview">
					<img
						className="message-form-preview-image"
						src={preview}
						alt="mesg-img"
						onLoad={() => URL.revokeObjectURL(preview)}
					/>
					<XMarkIcon
						className="message-form-icon-x"
						onClick={() => {
							setPreview("");
							setAttachment(undefined);
						}}
					/>
				</div>
			)}
			<div className="message-form">
				<div className="message-form-input-container">
					<input
						type="text"
						className="message-form-input"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						placeholder="Send a message..."
					/>
				</div>
				<div className="message-form-icons">
					<Dropzone
						multiple={false}
						noClick={true}
						onDrop={(acceptedFiles) => {
							setAttachment(acceptedFiles[0]);
							setPreview(URL.createObjectURL(acceptedFiles[0]));
						}}
					>
						{({ getRootProps, getInputProps, open }) => (
							<div {...getRootProps()}>
								<input {...getInputProps()} />
								<PaperClipIcon
									className="message-form-icon-clip"
									onClick={open}
								/>
							</div>
						)}
					</Dropzone>
					<hr className="vertical-line" />
					<PaperAirplaneIcon
						className="message-form-icon-airplane"
						onClick={() => {
							setPreview("");
							handleSubmit();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default StandardMessageForm;
