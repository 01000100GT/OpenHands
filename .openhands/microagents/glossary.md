# OpenHands Glossary / OpenHands 术语表

### Agent / 代理
The core AI entity in OpenHands that can perform software development tasks by interacting with tools, browsing the web, and modifying code.
OpenHands中的核心AI实体，能够通过与工具交互、浏览网页和修改代码来执行软件开发任务。

#### Agent Controller / 代理控制器
A component that manages the agent's lifecycle, handles its state, and coordinates interactions between the agent and various tools.
管理代理生命周期、处理其状态，并协调代理与各种工具之间交互的组件。

#### Agent Delegation / 代理委派
The ability of an agent to hand off specific tasks to other specialized agents for better task completion.
代理将特定任务交给其他专门代理处理以更好地完成任务的能力。

#### Agent Hub / 代理中心
A central registry of different agent types and their capabilities, allowing for easy agent selection and instantiation.
不同代理类型及其功能的中央注册表，便于代理选择和实例化。

#### Agent Skill / 代理技能
A specific capability or function that an agent can perform, such as file manipulation, web browsing, or code editing.
代理可以执行的特定能力或功能，如文件操作、网页浏览或代码编辑。

#### Agent State / 代理状态
The current context and status of an agent, including its memory, active tools, and ongoing tasks.
代理的当前上下文和状态，包括其内存、活动工具和正在进行的任务。

#### CodeAct Agent / 编码角色代理
[A generalist agent in OpenHands](https://arxiv.org/abs/2407.16741) designed to perform tasks by editing and executing code.
[OpenHands中的通用代理](https://arxiv.org/abs/2407.16741)，设计用于通过编辑和执行代码来完成任务。

### Browser / 浏览器
A system for web-based interactions and tasks.
用于基于网络的交互和任务的系统。

#### Browser Gym / 浏览器训练环境
A testing and evaluation environment for browser-based agent interactions and tasks.
用于基于浏览器的代理交互和任务的测试和评估环境。

#### Web Browser Tool / 网页浏览工具
A tool that enables agents to interact with web pages and perform web-based tasks.
使代理能够与网页交互并执行基于网络任务的工具。

### Commands / 命令
Terminal and execution related functionality.
终端和执行相关功能。

#### Bash Session / Bash会话
A persistent terminal session that maintains state and history for bash command execution.
This uses tmux under the hood.
维护bash命令执行状态和历史记录的持久终端会话。
底层使用tmux实现。

### Configuration / 配置
System-wide settings and options.
系统级设置和选项。

#### Agent Configuration / 代理配置
Settings that define an agent's behavior, capabilities, and limitations, including available tools and runtime settings.
定义代理行为、功能和限制的设置，包括可用工具和运行时设置。

#### Configuration Options / 配置选项
Settings that control various aspects of OpenHands behavior, including runtime, security, and agent settings.
控制OpenHands各个方面行为的设置，包括运行时、安全性和代理设置。

#### LLM Config / LLM配置
Configuration settings for language models used by agents, including model selection and parameters.
代理使用的语言模型配置设置，包括模型选择和参数。

#### LLM Draft Config / LLM草稿配置
Settings for draft mode operations with language models, typically used for faster, lower-quality responses.
语言模型草稿模式操作的设置，通常用于更快但质量较低的响应。

#### Runtime Configuration / 运行时配置
Settings that define how the runtime environment should be set up and operated.
定义运行时环境如何设置和运行的设置。

#### Security Options / 安全选项
Configuration settings that control security features and restrictions.
控制安全功能和限制的配置设置。

### Conversation / 对话
A sequence of interactions between a user and an agent, including messages, actions, and their results.
用户和代理之间的一系列交互，包括消息、动作及其结果。

#### Conversation Info / 对话信息
Metadata about a conversation, including its status, participants, and timeline.
关于对话的元数据，包括其状态、参与者和时间线。

#### Conversation Manager / 对话管理器
A component that handles the creation, storage, and retrieval of conversations.
处理对话的创建、存储和检索的组件。

#### Conversation Metadata / 对话元数据
Additional information about conversations, such as tags, timestamps, and related resources.
关于对话的附加信息，如标签、时间戳和相关资源。

#### Conversation Status / 对话状态
The current state of a conversation, including whether it's active, completed, or failed.
对话的当前状态，包括是否处于活动、完成或失败状态。

#### Conversation Store / 对话存储
A storage system for maintaining conversation history and related data.
用于维护对话历史和相关数据的存储系统。

### Events / 事件

#### Event / 事件
Every Conversation comprises a series of Events. Each Event is either an Action or an Observation.
每个对话由一系列事件组成。每个事件要么是动作，要么是观察。

#### Event Stream / 事件流
A continuous flow of events that represents the ongoing activities and interactions in the system.
代表系统中持续活动和交互的连续事件流。

#### Action / 动作
A specific operation or command that an agent executes through available tools, such as running a command or editing a file.
代理通过可用工具执行的特定操作或命令，如运行命令或编辑文件。

#### Observation / 观察
The response or result returned by a tool after an agent's action, providing feedback about the action's outcome.
工具在代理执行动作后返回的响应或结果，提供关于动作结果的反馈。

### Interface / 界面
Different ways to interact with OpenHands.
与OpenHands交互的不同方式。

#### CLI Mode / CLI模式
A command-line interface mode for interacting with OpenHands agents without a graphical interface.
通过命令行界面与OpenHands代理交互的模式，无图形界面。

#### GUI Mode / GUI模式
A graphical user interface mode for interacting with OpenHands agents through a web interface.
通过Web界面与OpenHands代理交互的图形用户界面模式。

#### Headless Mode / 无头模式
A mode of operation where OpenHands runs without a user interface, suitable for automation and scripting.
OpenHands在没有用户界面的情况下运行的模式，适用于自动化和脚本编写。

### Agent Memory / 代理记忆
The system that decides which parts of the Event Stream (i.e. the conversation history) should be passed into each LLM prompt.
决定事件流（即对话历史）的哪些部分应该传入每个LLM提示的系统。

#### Memory Store / 记忆存储
A storage system for maintaining agent memory and context across sessions.
用于跨会话维护代理记忆和上下文的存储系统。

#### Condenser / 压缩器
A component that processes and summarizes conversation history to maintain context while staying within token limits.
处理和总结对话历史以在token限制内维持上下文的组件。

#### Truncation / 截断
A very simple Condenser strategy. Reduces conversation history or content to stay within token limits.
一种非常简单的压缩策略。减少对话历史或内容以保持在token限制内。

### Microagent / 微代理
A specialized prompt that enhances OpenHands with domain-specific knowledge, repository-specific context, and task-specific workflows.
增强OpenHands的专门提示，提供领域特定知识、仓库特定上下文和任务特定工作流。

#### Microagent Registry / 微代理注册表
A central repository of available microagents and their configurations.
可用微代理及其配置的中央存储库。

#### Public Microagent / 公共微代理
A general-purpose microagent available to all OpenHands users, triggered by specific keywords.
所有OpenHands用户都可以使用的通用微代理，由特定关键词触发。

#### Repository Microagent / 仓库微代理
A type of microagent that provides repository-specific context and guidelines, stored in the `.openhands/microagents/` directory.
提供仓库特定上下文和指南的微代理类型，存储在`.openhands/microagents/`目录中。

### Prompt / 提示
Components for managing and processing prompts.
管理和处理提示的组件。

#### Prompt Caching / 提示缓存
A system for caching and reusing common prompts to improve performance.
缓存和重用常见提示以提高性能的系统。

#### Prompt Manager / 提示管理器
A component that handles the loading, processing, and management of prompts used by agents, including microagents.
处理代理使用的提示（包括微代理）的加载、处理和管理的组件。

#### Response Parsing / 响应解析
The process of interpreting and structuring responses from language models and tools.
解释和构建来自语言模型和工具的响应的过程。

### Runtime / 运行时
The execution environment where agents perform their tasks, which can be local, remote, or containerized.
代理执行任务的执行环境，可以是本地、远程或容器化的。

#### Action Execution Server / 动作执行服务器
A REST API that receives agent actions (e.g. bash commands, python code, browsing actions), executes them in the runtime environment, and returns the results.
接收代理动作（如bash命令、Python代码、浏览操作）、在运行时环境中执行它们并返回结果的REST API。

#### Action Execution Client / 动作执行客户端
A component that handles the execution of actions in the runtime environment, managing the communication between the agent and the runtime.
处理运行时环境中动作执行的组件，管理代理和运行时之间的通信。

#### Docker Runtime / Docker运行时
A containerized runtime environment that provides isolation and reproducibility for agent operations.
为代理操作提供隔离和可重现性的容器化运行时环境。

#### E2B Runtime / E2B运行时
A specialized runtime environment built on E2B for secure and isolated code execution.
基于E2B构建的专门运行时环境，用于安全和隔离的代码执行。

#### Local Runtime / 本地运行时
A runtime environment that executes on the local machine, suitable for development and testing.
在本地机器上执行的运行时环境，适用于开发和测试。

#### Modal Runtime / Modal运行时
A runtime environment built on Modal for scalable and distributed agent operations.
基于Modal构建的运行时环境，用于可扩展和分布式代理操作。

#### Remote Runtime / 远程运行时
A sandboxed environment that executes code and commands remotely, providing isolation and security for agent operations.
在远程执行代码和命令的沙箱环境，为代理操作提供隔离和安全性。

#### Runtime Builder / 运行时构建器
A component that builds a Docker image for the Action Execution Server based on a user-specified base image.
基于用户指定的基础镜像为动作执行服务器构建Docker镜像的组件。

### Security / 安全
Security-related components and features.
安全相关组件和功能。

#### Security Analyzer / 安全分析器
A component that checks agent actions for potential security risks.
检查代理动作潜在安全风险的组件。
