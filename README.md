# How to clone and run this React.js project in your local system

## Prerequisites

Before you start, ensure you have the following installed on your PC:

1.  **Node.js**: Download and install from [Node.js website](https://nodejs.org/).
2.  **Git**: Download and install from [Git website](https://git-scm.com/).

## Step-by-Step Guide

### Step 1: Install Node.js and Git

1.  **Node.js Installation**

*   Go to the [Node.js website](https://nodejs.org/).
*   Click on the LTS (Long Term Support) version and download the installer.
*   Run the installer and follow the prompts to complete the installation.

2.  **Git Installation**

*   Go to the [Git website](https://git-scm.com/).
*   Click on the download link suitable for your operating system.
*   Run the installer and follow the prompts to complete the installation.

### Step 2: Clone the Repository

1.  **Open Command Prompt/Terminal**

*   On Windows: Press `Win + R`, type `cmd`, and press `Enter`.
*   On Mac: Open the Terminal application from the Applications folder.
*   On Linux: Open the Terminal from the system menu.

2.  **Navigate to the Desired Directory**

*   Use the `cd` command to change to the directory where you want to clone the repository. For example:

```
cd path to your directory
```

3.  **Clone the Repository**

*   Copy the repository URL from your Git hosting service (e.g., GitHub).
*   In the command prompt/terminal, type:

```
git clone https://github.com/dhruvac29/webframe_2.git
```

### Step 3: Navigate to the Project Directory

*   After cloning, navigate to the project directory:
```
cd webframe_2
```
### Step 4: Install Project Dependencies

*   Install the necessary dependencies for the project by running:
```
npm install
```
*   This command will read the `package.json` file and install all the dependencies listed.

### Step 5: Install "antd" Dependency

*   Install the "antd" dependencies for the project by running:
```
npm install antd
```

### Step 6: Install "react-router-dom" Dependency

*   Install the "react-router-dom" dependencies for the project by running:
```
npm i react-router-dom
```

### Step 7: Start the Development Server

*   To start the development server and run the project, type:
```
npm run dev
```
*   This will compile the project and open it in your default web browser. If it doesn't open automatically, you can open your browser and go to `http://localhost:3000`.

Enjoy!!!
