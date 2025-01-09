# The Blog

**The Blog** is a frontend project built as part of the [RealWorld](https://realworld-docs.netlify.app/) specification. It is implemented using **Angular (standalone API)** and **NgRx** for state management.

## About the Project

The Blog is a platform where users can interact with blog posts and authors. The main features include:

- **For all users**:  
  - Browse and read blog posts.
  
- **For registered users**:  
  - Write, edit, and delete their own posts (Markdown syntax supported).  
  - Like posts.  
  - Follow/unfollow other authors.  
  - Edit their profile.  

This project adheres to the RealWorld specification, which provides API endpoints, markup, styles, and requirements, leaving the implementation to the developer's chosen technologies.

## Technologies Used

- **Angular**: A modern frontend framework leveraging standalone APIs.  
- **NgRx**: A library for reactive state management using the Redux pattern.  
- **Marked** and **ngx-markdown**: For parsing and rendering Markdown content.  
- **Query-string**: For managing URL parameters.

## Installation and Setup

To run the project locally:

1. Clone the repository:
```bash
git clone https://github.com/varlog762/medium-clone-angular.git
cd medium-clone-angular
```
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm start
```
The application will be available at http://localhost:4200.

## Scripts

The project includes the following scripts in the package.json file:

- **start:** Runs the development server.
- **build:** Builds the project for production.
- **watch:** Builds the project in watch mode.

## Project Details

This frontend implementation is part of the RealWorld specification. Learn more about the RealWorld project at [RealWorld Docs](https://realworld-docs.netlify.app/).

## Acknowledgements

Special thanks to the **RealWorld team** for providing a detailed and structured project specification, which serves as an excellent resource for learning and practice.
