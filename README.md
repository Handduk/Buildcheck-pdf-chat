# Buildcheck pdf-chat

A pdfChat using openAI api.

Upload a pdf document and start the conversation by asking whatever you want about the provided document.

## Built with

- React
- Typescript
- TailwindCss
- OpenAi gpt-4-Turbo


## Getting started

### Prerequisites
To run the chat you will need:
* An openAi key from openAi
* Credits to be able to run gpt-4-Turbo. <br/>
Visit [OpenAi](https://platform.openai.com/api-keys) to generate a key.

* npm
  ```
  npm install npm@latest -g
  ```

### Installation
1. Clone git repo
   ```
   git clone https://github.com/Handduk/Buildcheck-pdf-chat.git
   ```
2. Navigate to the project directory
   ```
   cd Buildcheck-pdf-chat
   ```
3. Install npm packages
   ```
   npm install
   ```
4. enter OpenAi api key in the `.env.example` located in root folder
   ```
   VITE_API_KEY="YourOpenAiKey"
   ```
5. Change the `.env.example` file name to `.env`
6. run the program in the terminal
   ```
   npm run dev
   ```
7. `ctrl + click` The localHost url and you are up and running!
