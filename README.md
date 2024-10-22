# MD2HTML

中文 | [English](README_EN.md)

MD2HTML 是一个基于 Vue.js 和 Vite 的 Web 应用，用于将 Markdown 文件转换为 HTML 并在浏览器中显示。

**特别说明：** 本项目完全由 Cursor 编辑器和 Claude AI 助手协作完成，展示了 AI 辅助编程的强大能力。

## 功能特点

- 将 Markdown 文件转换为 HTML
- 实时预览 Markdown 内容
- 支持多文件浏览
- 响应式设计，适配各种设备

## 本地开发

### 前提条件

- Node.js (推荐 v14 或更高版本)
- npm (通常随 Node.js 一起安装)

### 安装步骤

1. 克隆仓库：
   ```
   git clone https://github.com/caicongyang/md2html.git
   cd md2html
   ```

2. 安装依赖：
   ```
   npm install
   ```

3. 启动开发服务器：
   ```
   npm run dev
   ```

4. 在浏览器中打开 `http://localhost:5173` 查看应用。

## Docker 部署

### 构建 Docker 镜像

1. 确保您的系统已安装 Docker。

2. 在项目根目录下构建 Docker 镜像：
   ```
   docker build -t md2html .
   ```

### 运行 Docker 容器并映射本地 Markdown 文件

要将本地 Markdown 文件映射到 Docker 容器中，请按照以下步骤操作：

1. 创建一个本地目录用于存放 Markdown 文件，例如 `/path/to/your/markdown/files`。

2. 运行以下命令启动容器，并将本地 Markdown 文件目录挂载到容器中：

   ```
   docker run -d -p 8080:80 -v /path/to/your/markdown/files:/app/markdown md2html
   ```

   这个命令的解释：
   - `-d`: 在后台运行容器
   - `-p 8080:80`: 将容器的 80 端口映射到主机的 8080 端口
   - `-v /path/to/your/markdown/files:/app/markdown`: 将本地 Markdown 文件目录挂载到容器内的 `/app/markdown` 目录

3. 将您的 Markdown 文件放入 `/path/to/your/markdown/files` 目录中。这些文件将自动在容器内的 `/app/markdown` 目录中可用。

4. 在浏览器中打开 `http://localhost:8080` 访问应用。

### 更新 Markdown 文件

当您在本地目录 `/path/to/your/markdown/files` 中添加、修改或删除 Markdown 文件时，这些更改会立即反映在 Docker 容器中，无需重启容器。

### 注意事项

- 确保给予 Docker 足够的权限来读取您的本地 Markdown 文件目录。
- 如果遇到权限问题，可以尝试修改本地目录的权限：
  ```
  chmod -R 755 /path/to/your/markdown/files
  ```

## 自定义 Markdown 文件位置

如果您想更改 Markdown 文件在容器内的默认位置（`/app/markdown`），需要修改 `vite.config.js` 文件和 Docker 运行命令中的相应路径。

## 贡献

欢迎提交 Pull Requests 来改进这个项目。对于重大更改，请先开 issue 讨论您想要改变的内容。

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)

## 致谢

特别感谢：

- [OpenAI](https://openai.com/) 提供的强大 AI 模型，为本项目的开发提供了宝贵的建议和支持。
- [Cursor](https://www.cursor.so/) 编辑器，它的 AI 辅助功能大大提高了我们的开发效率。

这些工具和技术极大地促进了本项目的开发过程，使我们能够更快、更高效地实现我们的目标。
