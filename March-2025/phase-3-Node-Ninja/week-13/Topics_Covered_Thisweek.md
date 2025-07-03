eraser [link: https://app.eraser.io/workspace/i17UBRrHNTkhwKLg75J0](https://app.eraser.io/workspace/i17UBRrHNTkhwKLg75J0?origin=share)
# Notes: Node.js Internals & Database Design

## Node.js Internals (2.4 hrs)

### Server Loop
- A server runs as a **while (true) loop**

### libuv
- `libuv`: multi-platform C library.
- Provides support for **asynchronous I/O** based on **event loops**.

---

## Event Loop Phases

1. **Init Project**
2. **Top Level Code Run**
3. **Event Callbacks Register**
4. **Event Loop**

### Main Thread & Event Loop
- Main thread
- Event loop
- Thread pool with workers

---

## Event Loop Steps
- Run expire timers
- I/O pooling / poll
- `setImmediate` run
- Closing callbacks / cleanup callbacks

---

## Databases Design (Examples)
- Library LMS
- Parking lot
- Food delivery app with real-time riders tracking
- Hospital management
- E-commerce (Amazon-like: multi-sellers and buyers with warehouses)
- Learnyst
