import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import { openai } from "../index";

const getErrorMessage = (error: unknown) => {
	let message = "";
	if (error instanceof Error) {
		message = error.message;
		return console.log(error.message);
	}
	console.log("error", String(error));
	message = String(error);
	return message;
};

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
	try {
		const { text, activeChatId } = req.body;
		console.log(text, activeChatId);
		const response = await openai.createCompletion({
			model: "text-davinci-003",
			prompt: text,
			temperature: 0.5,
			max_tokens: 2048,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		await axios.post(
			`https://api.chatengine.io/chats/${activeChatId}/messages/`,
			{ text: response.data.choices[0].text },
			{
				headers: {
					"Project-ID": "14713b11-5e30-436e-85d5-046c013e98ab",
					"User-Name": "AI_bot",
					"User-Secret": "1234",
				},
			}
		);

		res.status(200).json({ text: response.data.choices[0].text });
	} catch (error: any) {
		console.error("error", error);
		res.status(500).json({ error: error.message });
	}
});

export default router;
