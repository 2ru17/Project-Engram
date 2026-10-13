---
id: sockets_programming
type: note
course: CSNETWK
topic: Sockets Programming
status: completed
---

# Sockets Programming

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[CSNETWK]] #[[Sockets Programming]] #[[Code Snippets]]

---

## Overview

Socket programming is used to build client/server applications that communicate over a network. A **socket** acts as the door between the application process (controlled by the app developer) and the end-to-end transport protocol (controlled by the OS). There are two main socket types corresponding to the two transport services:
**UDP (User Datagram Protocol):** Provides unreliable datagram transfer.
**TCP (Transmission Control Protocol):** Provides reliable, byte stream-oriented transfer.

### Socket Programming with UDP
UDP is connectionless. There is no handshaking between the client and the server before sending data. The sender must explicitly attach the IP destination address and port number to each packet (datagram). The receiver then extracts the sender's IP address and port from the received packet. UDP provides unreliable transfer of groups of bytes, meaning data may be lost or received out of order.

**Client/Server Interaction (UDP):**
1. **Server:** Creates socket (`SOCK_DGRAM`), binds it to a port, and waits to read datagrams.
2. **Client:** Creates socket (`SOCK_DGRAM`), creates a datagram containing the server's IP and port, and sends it.
3. **Server:** Reads datagram, processes it, and writes a reply to the socket specifying the client's address and port.
4. **Client:** Reads the reply and closes the socket.

### Socket Programming with TCP
TCP is connection-oriented. The client must contact the server, which means the server process must already be running and have a socket (welcoming socket) ready to accept the client's contact.
When the client creates a socket (`SOCK_STREAM`), it specifies the IP address and port number of the server and establishes a TCP connection.
When contacted, the server TCP creates a *new* socket specifically for communicating with that particular client. This allows the server to handle multiple clients simultaneously.
TCP provides a reliable, in-order byte-stream transfer (a "pipe") between the client and server processes.

**Client/Server Interaction (TCP):**
1. **Server:** Creates a welcoming socket (`SOCK_STREAM`), binds it, and waits for incoming connections (`listen()`).
2. **Client:** Creates a socket (`SOCK_STREAM`) and connects to the server's IP and port.
3. **Server:** Accepts the connection request and creates a new connection socket (`accept()`).
4. **Client/Server:** Send and receive requests/replies using their respective sockets (without needing to re-attach addresses since the connection is established).
5. **Client/Server:** Close their respective connection sockets.

## Important Formulas

*(No specific formulas were discussed in this module)*

## Worked Examples

**Example 1: UDP Client in Python**
```python
from socket import *
serverName = 'hostname'
serverPort = 12000
# Create UDP socket
clientSocket = socket(AF_INET, SOCK_DGRAM)
message = input('Input lowercase sentence:')
# Attach server name, port to message and send
clientSocket.sendto(message.encode(), (serverName, serverPort))
# Read reply from socket
modifiedMessage, serverAddress = clientSocket.recvfrom(2048)
print(modifiedMessage.decode())
clientSocket.close()
```

**Example 2: TCP Server in Python**
```python
from socket import *
serverPort = 12000
# Create TCP welcoming socket
serverSocket = socket(AF_INET, SOCK_STREAM)
serverSocket.bind(('', serverPort))
# Listen for incoming TCP requests
serverSocket.listen(1)
print('The server is ready to receive')
while True:
    # Accept incoming request, creating a new socket
    connectionSocket, addr = serverSocket.accept()
    # Read bytes from socket
    sentence = connectionSocket.recv(1024).decode()
    capitalizedSentence = sentence.upper()
    connectionSocket.send(capitalizedSentence.encode())
    # Close connection to this specific client
    connectionSocket.close()
```

## Multiple Choice Questions

1. Which transport protocol is known for being connectionless and unreliable?
    - **A)** TCP
    - **B)** HTTP
    - **C)** UDP
    - **D)** FTP

2. What must a client know in order to communicate with a server process?
    - **A)** The server's MAC address and port number
    - **B)** The server's IP address and port number
    - **C)** The server's host name only
    - **D)** The server's IP address and subnet mask

3. What type of socket is created when using UDP?
    - **A)** `SOCK_STREAM`
    - **B)** `SOCK_RAW`
    - **C)** `SOCK_DGRAM`
    - **D)** `SOCK_SEQPACKET`

4. What type of socket is created when using TCP?
    - **A)** `SOCK_DGRAM`
    - **B)** `SOCK_STREAM`
    - **C)** `SOCK_RAW`
    - **D)** `SOCK_RDM`

5. In UDP communication, what must be attached to every message sent?
    - **A)** A sequence number
    - **B)** An acknowledgment number
    - **C)** The destination IP address and port
    - **D)** A SYN flag

6. Why does a TCP server create a *new* socket upon accepting a connection?
    - **A)** To replace the old, corrupted socket
    - **B)** To handle communication with that specific client independently
    - **C)** Because sockets can only send one message
    - **D)** To change the port number for security

7. Which method is used by a TCP server to wait for incoming connections?
    - **A)** `bind()`
    - **B)** `connect()`
    - **C)** `listen()`
    - **D)** `recvfrom()`

8. Which method is used by a TCP server to extract a connection request from the queue?
    - **A)** `accept()`
    - **B)** `listen()`
    - **C)** `receive()`
    - **D)** `connect()`

9. In the provided UDP Python example, what does `recvfrom(2048)` do?
    - **A)** Receives up to 2048 packets
    - **B)** Reads a reply from the socket with a buffer size of 2048 bytes
    - **C)** Sends a message to port 2048
    - **D)** Waits for 2048 milliseconds

10. What kind of transfer does TCP provide between client and server processes?
    - **A)** Unreliable, unordered datagram transfer
    - **B)** Reliable, in-order byte-stream transfer
    - **C)** Best-effort packet delivery
    - **D)** Connectionless block transfer

### Answer Key & Explanations
1. **C)** UDP is a connectionless, unreliable transport protocol.
2. **B)** To contact a server process, the client must specify the server's IP address and port number.
3. **C)** `SOCK_DGRAM` is used for UDP sockets.
4. **B)** `SOCK_STREAM` is used for TCP sockets.
5. **C)** Because UDP is connectionless, each datagram must explicitly contain the destination IP address and port.
6. **B)** The server creates a new socket specifically for communicating with that particular client, allowing it to handle multiple clients simultaneously.
7. **C)** The `listen()` method is used by the server socket to wait for incoming connection requests.
8. **A)** The `accept()` method accepts an incoming connection and creates a new connection socket.
9. **B)** `recvfrom(2048)` reads data from the socket with a maximum buffer size of 2048 bytes.
10. **B)** TCP provides a reliable, in-order byte-stream transfer (a "pipe") between processes.

## References & Navigation

- **Previous Topic:** [[Transport Layer]]
- **Next Topic:** [[Network Layer]]
- **Related Notes:** [[Internetworking]]
