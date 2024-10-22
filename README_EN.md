# MD2HTML

[中文](README.md) | English

MD2HTML is a web application based on Vue.js and Vite, designed to convert Markdown files to HTML and display them in a browser.

**Special Note:** This project was entirely developed through collaboration between the Cursor editor and Claude AI assistant, showcasing the powerful capabilities of AI-assisted programming.

## Features

- Convert Markdown files to HTML
- Real-time preview of Markdown content
- Support for browsing multiple files
- Responsive design, suitable for various devices

## Local Development

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (usually installed with Node.js)

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/caicongyang/md2html.git
   cd md2html
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser to view the application.

## Docker Deployment

### Building the Docker Image

1. Ensure Docker is installed on your system.

2. Build the Docker image in the project root directory:
   ```
   docker build -t md2html .
   ```

### Running the Docker Container and Mapping Local Markdown Files

To map local Markdown files to the Docker container, follow these steps:

1. Create a local directory for your Markdown files, e.g., `/path/to/your/markdown/files`.

2. Run the following command to start the container and mount the local Markdown file directory:
   ```
   docker run -d -p 8080:80 -v /path/to/your/markdown/files:/app/markdown md2html
   ```

   Command explanation:
   - `-d`: Run the container in the background
   - `-p 8080:80`: Map container's port 80 to host's port 8080
   - `-v /path/to/your/markdown/files:/app/markdown`: Mount the local Markdown file directory to `/app/markdown` in the container

3. Place your Markdown files in the `/path/to/your/markdown/files` directory. These files will be automatically available in the `/app/markdown` directory inside the container.

4. Open `http://localhost:8080` in your browser to access the application.

### Updating Markdown Files

When you add, modify, or delete Markdown files in the local `/path/to/your/markdown/files` directory, these changes will be immediately reflected in the Docker container without needing to restart it.

### Notes

- Ensure Docker has sufficient permissions to read your local Markdown file directory.
- If you encounter permission issues, try modifying the permissions of the local directory:
  ```
  chmod -R 755 /path/to/your/markdown/files
  ```

## Customizing Markdown File Location

If you want to change the default location of Markdown files in the container (`/app/markdown`), you need to modify the `vite.config.js` file and the corresponding path in the Docker run command.

## Contributing

Pull Requests are welcome to improve this project. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgements

Special thanks to:

- [OpenAI](https://openai.com/) for providing powerful AI models that offered valuable suggestions and support during the development of this project.
- [Cursor](https://www.cursor.so/) editor, whose AI-assisted features greatly improved our development efficiency.

These tools and technologies significantly facilitated our development process, enabling us to achieve our goals faster and more efficiently.
