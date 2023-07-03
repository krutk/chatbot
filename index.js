import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
  console.log(colors.bold.green("Welcome to the Chatbot Program!"));
  console.log(colors.bold.green("You can start chatting with the bot."));

  const chatHistory = [];

  while (true) {
    const userInput = readlineSync.question(
      console.log(colors.yellow("You: "))
    );
    try {
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));
      // Add latest user input
      messages.push({ role: "user", content: userInput });
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      });
      const completionText = completion.data.choices[0].message.content;

      if (userInput.toLowerCase() === "exit") {
        console.log(colors.cyan("Lil chatty: "), completionText);

        return;
      }
      console.log(colors.cyan("Lil chatty: "), completionText);

      // Update history with user input and assistant response
      chatHistory.push(["user", userInput]);
      chatHistory.push(["assistant", completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}
main();
