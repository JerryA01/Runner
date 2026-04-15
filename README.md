# Adaptive Java Runner 🚀
A lightweight, container‑friendly Java execution service designed for adaptive learning platforms.  
This runner safely compiles and executes user‑submitted Java code inside an isolated environment, making it suitable for cloud deployment (Docker, Kubernetes, serverless runners, etc).

---

## ✨ Features

- **Secure Execution Sandbox**  
  Runs Java code in an isolated process with strict timeouts to prevent abuse or infinite loops.

- **On‑Demand Compilation**  
  Accepts raw Java source, compiles it using `javac`, and executes the resulting class.

- **Clean, Minimal API**  
  Designed to be consumed by my adaptive learning backend hosted via render.

- **Cloud‑Ready**  
  Stateless, containerised, and horizontally scalable.

- **Error Handling**  
  Returns structured output for:
  - Compilation errors  
  - Runtime errors  
  - Successful execution  

---

## 🧱 Architecture Overview

The runner follows a simple pipeline:

1. **Receive Java source code** via HTTP POST  
2. **Write to a temporary directory**  
3. **Compile using `javac`**  
4. **Execute using `java`** with:
   - Timeouts  
   - Stream capture  
   - Process isolation  
5. **Return JSON response** containing:
   - `stdout`
   - `stderr`
   - `exitCode`
   - `compileErrors` (if any)

This makes it ideal for adaptive learning systems that need to:
- Run student code  
- Validate exercises  
- Provide automated feedback  

---

## 📡 API Endpoints

### `POST /run`
Submit Java code for compilation + execution.

#### Request Body
```json 
{
  "code": "public class Main { public static void main(String[] args) { System.out.println(\"Hello\"); }}"
}
```
---

## 🔐 Security Notes

- Code is executed in an isolated environment
- Execution timeouts prevent infinite loops
- No persistent state between executions
- Designed for educational use only

---

## 🔗 Used In

This runner powers the backend of the:

👉 Adaptive Java Learning Platform  
https://adaptive-learning-platform-23f1.vercel.app/

---

## ⚠️ Limitations

- Not designed for untrusted production-grade execution at scale
- No container-level sandboxing (future improvement)
- No resource quotas (CPU/memory limits)

---

## 🚀 Future Improvements

- Docker-based sandboxing
- Per-execution resource limits
- Queue-based execution system
- Multi-language support (Python, JS)

