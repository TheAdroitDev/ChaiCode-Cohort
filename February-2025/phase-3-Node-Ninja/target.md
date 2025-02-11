## **Phase 3: Node Ninja 🥷**

**Objective:** Master backend development with Node.js, learning how to create powerful server-side applications, handle HTTP requests, and connect with databases.

### 1. **Introduction to Node.js – The Power of JavaScript on the Server**

- What is Node.js and how it differs from traditional server-side languages
- Understanding the Node.js runtime environment
- The event-driven, non-blocking I/O model in Node.js
- Setting up a simple Node.js application
- Installing and using Node.js with npm (Node Package Manager)
- **Key Concepts:** Event-driven architecture, Non-blocking I/O, npm, Modules

### 2. **Understanding the Event Loop – Node.js Architecture**

- What is the event loop and how does Node.js handle concurrency
- How Node.js uses the event loop to process requests asynchronously
- Blocking vs Non-blocking code execution
- The importance of callbacks and promises in managing asynchronous code
- **Key Concepts:** Event loop, Asynchronous processing, Callbacks, Promises

### 3. **Creating a Basic HTTP Server**

- How to create a basic HTTP server with Node.js using the `http` module
- Setting up routes to handle different HTTP requests (GET, POST, PUT, DELETE)
- Sending and receiving data with the server
- Working with request and response objects
- **Key Concepts:** HTTP server, Request/Response objects, Routing

### 4. **Express.js – Simplifying Backend Development**

- Introduction to Express.js and how it simplifies Node.js backend development
- Setting up an Express app and defining routes
- Handling dynamic data with URL parameters and query strings
- Middleware in Express: What is middleware and how to use it
- Built-in Express middleware functions (e.g., body-parser, cookie-parser)
- **Key Concepts:** Express.js, Routing, Middleware, Request handling

### 5. **RESTful API Design – Building APIs with Express**

- What is a RESTful API and how to structure it
- Designing endpoints and handling HTTP methods (GET, POST, PUT, DELETE)
- Using query parameters and request bodies for passing data
- Returning JSON data and handling status codes in API responses
- **Key Concepts:** REST API design, CRUD operations, Status codes, JSON responses

### 6. **Working with Databases – Connecting Node.js to Databases**

- Introduction to databases (SQL vs NoSQL)
- Using MongoDB with Node.js (Setting up MongoDB, connecting via Mongoose)
- Working with CRUD operations in MongoDB (Create, Read, Update, Delete)
- Introduction to SQL databases (using MySQL/PostgreSQL with Node.js)
- Using ORMs (Object Relational Mappers) like Drizzle, Prisma to interact with SQL databases
- **Key Concepts:** MongoDB, SQL, NoSQL, CRUD, Mongoose, Sequelize, ORMs

### 7. **Authentication and Authorization – Securing Your Application**

- Introduction to user authentication and authorization concepts
- Using JWT (JSON Web Tokens) for stateless authentication
- Setting up user login and registration endpoints
- Password hashing with bcrypt.js
- Role-based access control and securing routes with middleware
- **Key Concepts:** Authentication, Authorization, JWT, bcrypt, Role-based access control

### 8. **Working with File Systems – Reading and Writing Files**

- Introduction to the Node.js `fs` module for file system operations
- Reading files asynchronously and synchronously
- Writing files to the server’s file system
- Handling file uploads (e.g., using `multer` for handling multipart forms)
- **Key Concepts:** File system module, File reading/writing, File uploads

### 9. **Building Real-time Applications – WebSockets with Socket.io**

- What are WebSockets and how they enable real-time communication
- Setting up a WebSocket server using the `ws` module or Socket.io
- Sending and receiving real-time data between the client and server
- Use cases for real-time apps (e.g., chat applications, live notifications)
- **Key Concepts:** WebSockets, Real-time communication, Socket.io

### 10. **Deploying Your Node.js Application**

- Introduction to deployment options for Node.js applications
- Deploying Node.js apps on cloud platforms (Heroku, AWS, DigitalOcean, etc.)
- Setting up environment variables for different environments (production, development)
- Configuring reverse proxies with Nginx or Apache
- **Key Concepts:** Deployment, Cloud services, Reverse proxies, Environment variables

### 11. **API Rate Limiting – Protecting Your Endpoints**

- What is API rate limiting and why it's important
- Implementing rate limiting to prevent abuse of your APIs (e.g., using `express-rate-limit`)
- Configuring custom rate limiters for different endpoints
- Handling rate limit exceeded errors and responses
- **Key Concepts:** Rate limiting, Throttling, API protection, express-rate-limit

### 12. **Logging & Monitoring – Tracking Application Health**

- Introduction to logging and monitoring in Node.js applications
- Using logging libraries like Winston and Morgan for structured logging
- Setting up logging levels (info, warn, error) and storing logs in files or external services
- Integrating monitoring tools like PM2 for process management and performance monitoring
- **Key Concepts:** Logging, Winston, Morgan, PM2, Monitoring, Application health

### 13. GraphQL

- **Introduction to GraphQL**
    - What is GraphQL and how it differs from REST
    - GraphQL architecture: schema, queries, mutations, and subscriptions
    - Setting up a GraphQL server with Apollo Server
    - Writing simple GraphQL queries and mutations
- **Writing GraphQL Queries, Mutations, and Subscriptions**
    - Creating complex queries and mutations
    - Understanding resolvers and schema design
    - Subscriptions for real-time data updates
    - Handling errors in GraphQL

### **14. Monitoring with PM2**

- Introduction to PM2 for Node.js process management
- Setting up PM2 for application monitoring
- Auto-restarting Node.js apps on crashes
- Monitoring performance with PM2 logs and stats
- Log rotations