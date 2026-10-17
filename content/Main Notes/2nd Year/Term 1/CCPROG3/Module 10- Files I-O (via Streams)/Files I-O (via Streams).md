---
id: files_io_via_streams
type: note
course: CCPROG3
topic: Files I/O (via Streams)
status: completed
---

# Files I/O (via Streams)

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CCPROG3]] #[[Files I/O (via Streams)]] #[[Code Snippets]] #[[M10]]

---
## Key Definitions

> **File I/O** (Input/Output) is the process of reading data from and writing data to files. In Java, this is heavily managed through **Streams**, which are sequences of data.

## Theoretical Framework

Java I/O Streams are categorized into: **Byte Streams:** Handle I/O of raw binary data (e.g., `FileInputStream`, `FileOutputStream`). **Character Streams:** Handle I/O of characters, automatically managing character encoding (e.g., `FileReader`, `FileWriter`). **Buffered Streams:** Wrap other streams to provide buffering, improving efficiency by reducing physical I/O operations (e.g., `BufferedReader`, `BufferedWriter`).

## Code Implementation

```java
import java.io.*;

public class FileIOExample {
    public static void main(String[] args) {
        String fileName = "output.txt";
        
        // Writing to a file using Buffered Character Stream
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            writer.write("Hello, Java I/O!");
            writer.newLine();
            writer.write("This is a second line.");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Reading from a file
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## Syntax Breakdown
 `try-with-resources`: The `try (Resource res = ...)` syntax ensures that the resource is automatically closed at the end of the statement, preventing resource leaks. `FileReader` / `FileWriter`: Basic character stream classes. `BufferedReader` / `BufferedWriter`: Enhances basic streams with internal buffers.

## Complexity Analysis

Buffered I/O operations have an amortized time complexity of O(1) per byte/character read or written, as they reduce the number of expensive system calls compared to unbuffered streams. Space complexity is proportional to the buffer size.

## Multiple Choice Questions

1. In Java File I/O, what is a Stream?
- **A)** A graphical interface for viewing file contents.
- **B)** A sequence of data used for reading from and writing to files.
- **C)** A specific type of runtime exception.
- **D)** A collection framework used for sorting data.

2. Which type of stream is best suited for automatically managing character encoding?
- **A)** Byte Streams
- **B)** Buffered Streams
- **C)** Character Streams
- **D)** Network Streams

3. What is the main advantage of using Buffered Streams (e.g., `BufferedReader`)?
- **A)** They completely eliminate the need for Exception Handling.
- **B)** They convert raw binary data into characters automatically.
- **C)** They improve efficiency by reducing the number of expensive physical I/O operations.
- **D)** They allow multiple programs to write to the same file simultaneously.

4. What does the `try-with-resources` syntax ensure when working with file streams?
- **A)** That the program automatically creates missing directories.
- **B)** That the resource (e.g., file stream) is automatically closed at the end of the statement, preventing leaks.
- **C)** That all exceptions are silently ignored.
- **D)** That the file is encrypted before writing.

5. What is the amortized time complexity per byte/character when using Buffered I/O operations?
- **A)** O(n)
- **B)** O(log n)
- **C)** O(1)
- **D)** O(n^2)

### Answer Key & Explanations
1. **B)** Streams act as continuous pipelines that ferry sequences of raw data between a source (like a file) and the application.
2. **C)** Character streams (like `FileReader`) seamlessly translate between raw bytes and human-readable characters based on encoding settings.
3. **C)** By chunking data into memory buffers rather than performing a system call for every single byte, Buffered Streams drastically improve I/O performance.
4. **B)** The `try-with-resources` construct automatically invokes the `close()` method on any object implementing `AutoCloseable`, safely releasing file locks.
5. **C)** Because physical disk access is minimized by memory batching, reading or writing individual bytes averages out to a constant O(1) time complexity.

## References & Navigation

- **Previous Topic:** [[Exception Handling]]
- **Next Topic:** [[Design Principles]]
- **Related Notes:** [[Overview of Programming Languages]]
