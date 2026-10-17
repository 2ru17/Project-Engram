---
id: nscom02_finals_mock_exam
type: note
course: NSCOM02
topic: "NSCOM02 Finals 50-Item Mock Exam"
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[Computer Science]] #[[NSCOM02]] #[[Conceptual]] #[[Mock Exam]]

## NSCOM02 Finals 50-Item Mock Exam

### Questions

**1. Which routing algorithm relies on routers passing their entire routing table to their directly connected neighbors at regular intervals?**
- **A)** Dijkstra's Algorithm
- **B)** Bellman-Ford Algorithm
- **C)** Spanning Tree Algorithm
- **D)** Shortest Path First

**2. What is the maximum allowable hop count for a valid route in the Routing Information Protocol (RIP)?**
- **A)** 15
- **B)** 16
- **C)** 120
- **D)** 255

**3. Which mechanism prevents a router from advertising a route back onto the same interface from which it was originally learned?**
- **A)** Route Poisoning
- **B)** Hold-down Timers
- **C)** Split Horizon
- **D)** Triggered Updates

**4. A routing table displays the entry: R 192.168.10.0/24 [120/4] via 10.1.1.2. What does the value 4 represent?**
- **A)** The Administrative Distance
- **B)** The number of routers the packet must pass through to reach the destination
- **C)** The amount of time in seconds before the route expires
- **D)** The exit interface ID

**5. Which issue occurs in distance-vector networks when a link fails and routers repeatedly advertise increasing metrics to each other?**
- **A)** The Bouncing Effect (Count-to-Infinity)
- **B)** Link-State Flooding
- **C)** Hot Potato Routing
- **D)** The Broadcast Storm

**6. What is the primary purpose of Route Poisoning?**
- **A)** To safely share routing tables over the Internet
- **B)** To immediately advertise a failed network with an infinite metric (e.g., 16 in RIP)
- **C)** To delay routing updates until the network is stable
- **D)** To encrypt distance-vector routing updates

**7. How do triggered updates improve distance-vector routing?**
- **A)** They increase the bandwidth of the link
- **B)** They force the router to use OSPF instead of RIP
- **C)** They allow a router to advertise a topology change immediately without waiting for the periodic timer
- **D)** They convert hop counts into link costs

**8. Which of the following best describes the "routing by rumor" concept?**
- **A)** A router independently builds a complete map of the network
- **B)** A router makes forwarding decisions based entirely on the routing tables sent by its immediate neighbors
- **C)** A router asks the centralized SDN controller for paths
- **D)** A router queries DNS to find IP routes

**9. What is the default Administrative Distance (AD) for RIP?**
- **A)** 1
- **B)** 90
- **C)** 110
- **D)** 120

**10. If a router has a route marked with a C in its routing table, what is the Administrative Distance of that route?**
- **A)** 0
- **B)** 1
- **C)** 110
- **D)** 120

**11. What is the role of a Hold-down Timer in routing protocols?**
- **A)** To keep the BGP session alive
- **B)** To prevent a router from accepting a potentially bad replacement route for a set period after a failure
- **C)** To measure the delay across a physical cable
- **D)** To schedule when the router will reboot

**12. Poison Reverse goes a step further than Split Horizon by doing what?**
- **A)** Sending the route back out the same interface it was learned, but marked as unreachable
- **B)** Refusing to send the route back out the same interface it was learned
- **C)** Dropping all packets destined for a specific IP
- **D)** Changing the routing protocol to Link-State

**13. Which routing algorithm is utilized by Link-State protocols like OSPF?**
- **A)** Bellman-Ford
- **B)** DUAL
- **C)** Dijkstra's Shortest Path First (SPF)
- **D)** Path-Vector

**14. Instead of hop count, what metric does OSPF use to determine the best path?**
- **A)** Delay
- **B)** Cost (inversely related to bandwidth)
- **C)** Reliability
- **D)** MTU

**15. What structure does every OSPF router in an area build to independently calculate the shortest path to all networks?**
- **A)** The BGP Routing Information Base (RIB)
- **B)** The MAC Address Table
- **C)** The Link-State Database (LSDB)
- **D)** The Distance-Vector Table

**16. Which OSPF packet type is responsible for initially establishing neighbor relationships?**
- **A)** Type 1 - Hello
- **B)** Type 2 - DBD
- **C)** Type 3 - LSR
- **D)** Type 4 - LSU

**17. What information is carried inside a Type 4 Link-State Update (LSU) packet?**
- **A)** Only the router's IP address
- **B)** ICMP Echo Requests
- **C)** Link-State Advertisements (LSAs) detailing topology changes
- **D)** BGP Keepalives

**18. In a multi-area OSPF design, what is Area 0 exclusively known as?**
- **A)** The Stub Area
- **B)** The Backbone Area
- **C)** The Autonomous System Area
- **D)** The Default Area

**19. A router learns about the 172.16.0.0/16 network from both RIP and OSPF. Which route will be installed in the routing table, and why?**
- **A)** RIP, because its AD is 120
- **B)** RIP, because it uses hop count
- **C)** OSPF, because its AD (110) is lower than RIP's (120)
- **D)** OSPF, because it uses cost

**20. What is a primary drawback of using OSPF compared to RIP?**
- **A)** OSPF converges much slower than RIP
- **B)** OSPF is limited to 15 hops
- **C)** OSPF consumes more router CPU and memory resources
- **D)** OSPF cannot support hierarchical design

**21. In an OSPF network, what is the purpose of the Database Description (DBD) packet?**
- **A)** To acknowledge the receipt of an update
- **B)** To provide a summary of the router's LSDB to a neighbor
- **C)** To request a specific missing LSA
- **D)** To terminate the neighbor adjacency

**22. If an OSPF router realizes it is missing a specific link-state entry after reviewing a neighbor's DBD, which packet does it send?**
- **A)** LSAck
- **B)** Hello
- **C)** LSR (Link State Request)
- **D)** LSU (Link State Update)

**23. Which code letter represents an OSPF route in a Cisco routing table?**
- **A)** O
- **B)** S
- **C)** C
- **D)** R

**24. What is the fundamental difference in update behavior between converged Link-State and Distance-Vector networks?**
- **A)** Link-state sends full tables periodically; Distance-vector sends partial tables on change
- **B)** Link-state sends partial, triggered updates only on change; Distance-vector sends full tables periodically
- **C)** Both send full tables every 30 seconds
- **D)** Neither sends updates unless manually triggered by an admin

**25. Why do administrators use hierarchical (multi-area) designs in large OSPF networks?**
- **A)** To increase the administrative distance
- **B)** To convert the protocol to BGP
- **C)** To isolate topology changes and reduce the size of the Link-State Database on individual routers
- **D)** To allow the use of hop count metrics

**26. Which protocol is strictly classified as an Interdomain routing protocol?**
- **A)** OSPF
- **B)** EIGRP
- **C)** RIP
- **D)** BGP

**27. What category of routing protocol does BGP fall under?**
- **A)** Distance-Vector
- **B)** Link-State
- **C)** Path-Vector
- **D)** Autonomous-Vector

**28. Which BGP message type is used to establish the initial connection and authenticate the peer?**
- **A)** UPDATE
- **B)** OPEN
- **C)** NOTIFICATION
- **D)** KEEPALIVE

**29. What transport protocol and port does BGP use to establish peer connections?**
- **A)** UDP 520
- **B)** TCP 179
- **C)** TCP 443
- **D)** UDP 161

**30. Which of the following best defines an eBGP session?**
- **A)** A session between two routers in the same Autonomous System
- **B)** A session between two routers in different Autonomous Systems
- **C)** A session that uses OSPF as a backup
- **D)** A session that requires no authentication

**31. What is the primary function of the BGP AS-PATH attribute?**
- **A)** To determine the internal cost to reach a gateway
- **B)** To act as a loop-prevention mechanism by recording every AS the route passes through
- **C)** To list the MAC addresses of all traversed routers
- **D)** To assign an IP address to the next-hop router

**32. Which BGP attribute is classified as "Well-known mandatory"?**
- **A)** MULTI-EXIT-DISC (MED)
- **B)** LOCAL-PREF
- **C)** AS-PATH
- **D)** COMMUNITY

**33. Hot potato routing refers to a network's attempt to do what?**
- **A)** Pass the packet through as many ASes as possible
- **B)** Drop packets when the CPU is overloaded
- **C)** Hand off the packet to the nearest exit point to minimize internal transit costs
- **D)** Maximize the inter-domain cost of a route

**34. What action does a BGP router take immediately after sending a NOTIFICATION message?**
- **A)** It recalculates the shortest path
- **B)** It closes the BGP TCP connection
- **C)** It requests a new routing table
- **D)** It retransmits the previous UPDATE message

**35. How does a BGP router handle a received route if it sees its own AS number inside the AS-PATH attribute?**
- **A)** It prefers the route and installs it in the routing table
- **B)** It modifies the AS number and forwards it
- **C)** It drops the route because it indicates a routing loop
- **D)** It places the route in a hold-down state

**36. The LOCAL-PREF attribute is used to influence which of the following?**
- **A)** The best entry path into your Autonomous System
- **B)** The best exit path out of your Autonomous System
- **C)** The intra-domain OSPF cost
- **D)** The MTU size of the data plane

**37. Which BGP message type actually carries the Network Layer Reachability Information (NLRI) and path attributes for new routes?**
- **A)** OPEN
- **B)** KEEPALIVE
- **C)** UPDATE
- **D)** NOTIFICATION

**38. Which attribute does an AS use to suggest a preferred entry point for inbound traffic coming from a neighboring AS?**
- **A)** MULTI-EXIT-DISC (MED)
- **B)** LOCAL-PREF
- **C)** ORIGIN
- **D)** NEXT-HOP

**39. In a Software-Defined Network (SDN), what function is completely removed from the individual switches?**
- **A)** The Data Plane
- **B)** The Physical Ports
- **C)** The Control Plane
- **D)** Packet Forwarding

**40. What is the primary role of the Data Plane in a network device?**
- **A)** To calculate the shortest path tree
- **B)** To exchange routing updates with neighbors
- **C)** To forward incoming packets to the correct output port based on local tables
- **D)** To authenticate the SDN controller

**41. Which protocol serves as the standard Southbound API between an SDN controller and the forwarding switches?**
- **A)** BGP
- **B)** OpenFlow
- **C)** OSPF
- **D)** SNMP

**42. What interface does a network administrator or software application use to program network logic into the centralized SDN controller?**
- **A)** The Southbound API
- **B)** The Northbound API
- **C)** The East-West API
- **D)** The Data Plane API

**43. In an OpenFlow switch, what two primary components make up a flow table entry?**
- **A)** IP address and MAC address
- **B)** Match fields and Actions
- **C)** LSA and LSDB
- **D)** AS-PATH and NEXT-HOP

**44. Which ICMP message type does the ping utility rely on to test connectivity?**
- **A)** Time Exceeded
- **B)** Destination Unreachable
- **C)** Echo Request / Echo Reply
- **D)** Redirect

**45. How does the traceroute utility discover the individual router hops along a network path?**
- **A)** By intentionally expiring the TTL (Time-To-Live) field to trigger ICMP Time Exceeded messages
- **B)** By asking the SDN controller for the path
- **C)** By analyzing BGP AS-PATH attributes
- **D)** By sending OpenFlow match rules

**46. What does an ICMP "Destination Unreachable" message indicate?**
- **A)** The packet successfully arrived but the host is sleeping
- **B)** A router along the path did not have a routing table entry for the destination network
- **C)** The packet was too large and the router refused to fragment it
- **D)** The TTL of the packet reached zero

**47. In the SNMP architecture, what is the MIB (Management Information Base)?**
- **A)** The physical server where SNMP runs
- **B)** A virtual database of definitions and managed objects (variables) on a device
- **C)** The UDP port used for traps
- **D)** A routing protocol replacement for OSPF

**48. Which SNMP message is sent spontaneously by an agent device to alert the manager of a critical event, without waiting to be polled?**
- **A)** GetRequest
- **B)** SetRequest
- **C)** Response
- **D)** Trap

**49. If a network administrator wants to proactively change the configuration of a router interface remotely using SNMP, which message type is used?**
- **A)** Trap
- **B)** GetRequest
- **C)** SetRequest
- **D)** Echo Reply

**50. What is a primary advantage of utilizing SDN in a modern enterprise network?**
- **A)** It eliminates the need for IP addressing
- **B)** It allows centralized, programmable, and automated control of network-wide traffic flows
- **C)** It allows routers to physically move data without using electricity
- **D)** It replaces all copper cabling with fiber optics

---

### Answer Key & Explanations

1. **B** - Distance-vector protocols use Bellman-Ford.
2. **A** - RIP permits up to 15 hops; 16 is unreachable.
3. **C** - Split Horizon is the rule to not advertise a route out of the interface it was learned.
4. **B** - The [120/4] bracket denotes AD and hop count.
5. **A** - Count-to-Infinity happens due to metric loops.
6. **B** - Route poisoning manually sets metric to 16 to flush the route.
7. **C** - Triggered updates bypass the 30-second timer.
8. **B** - Distance-vector trusts only neighbors instead of full topology maps.
9. **D** - RIP AD is 120.
10. **A** - Connected routes ('C') have an AD of 0.
11. **B** - Hold-down timers avoid flip-flopping routes.
12. **A** - Poison reverse replies with infinite metric.
13. **C** - Link-State uses SPF (Dijkstra).
14. **B** - Cost is derived from reference bandwidth.
15. **C** - The LSDB is identical for all routers in an area.
16. **A** - Hello packets form adjacencies.
17. **C** - LSUs carry LSA change details.
18. **B** - Area 0 is the Backbone.
19. **C** - OSPF's lower AD (110) beats RIP (120).
20. **C** - Link-state requires more memory and CPU.
21. **B** - DBDs summarize the database during neighbor formation.
22. **C** - LSRs request missing pieces of the LSDB.
23. **A** - 'O' denotes an OSPF route.
24. **B** - OSPF triggers partial updates; RIP sends full tables periodically.
25. **C** - Multi-area OSPF keeps LSDBs small and manageable.
26. **D** - BGP is the EGP for the Internet.
27. **C** - BGP is a path-vector protocol.
28. **B** - The OPEN message starts the BGP peering.
29. **B** - BGP uses TCP Port 179.
30. **B** - eBGP bridges different ASes.
31. **B** - AS-PATH is fundamental for preventing loops.
32. **C** - AS-PATH is well-known mandatory.
33. **C** - Hot potato ejects traffic at the closest exit.
34. **B** - NOTIFICATION drops the TCP connection.
35. **C** - Self-AS in AS-PATH means a loop.
36. **B** - LOCAL-PREF dictates the outbound exit path.
37. **C** - UPDATE messages carry route prefixes.
38. **A** - MED tells other ASes how to enter.
39. **C** - SDN removes the Control Plane from individual switches.
40. **C** - The Data Plane merely forwards according to rules.
41. **B** - OpenFlow is the most prominent Southbound API.
42. **B** - Northbound APIs connect controllers to applications.
43. **B** - OpenFlow entries match fields and execute actions.
44. **C** - Ping relies on ICMP Echo.
45. **A** - Traceroute expires the TTL to map the path.
46. **B** - Unreachable implies a missing routing table entry.
47. **B** - The MIB contains manageable device parameters.
48. **D** - Traps are asynchronous alerts.
49. **C** - SetRequests alter variables on the device.
50. **B** - SDN centralizes network control and configuration.


## References & Navigation

- **Related Notes:** [[Network Communications 2]]
