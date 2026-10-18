---
id: combinational_circuit___tri_state_gates
type: note
course: CSARCH1
topic: Combinational Circuit - Tri_state gates
status: completed
---


**Tags:** #[[Computer Science]] #[[CSARCH1]] #[[Computer Architecture]] #[[Combinational Circuits]] #[[Combinational Circuit - Tri state gates]]

---

# Combinational Circuit - Tri-state gates

## Overview
This sub-module discusses the concept of tri-state gates.
**Objective:** Learn the concept of tri-state gates.

## Tri-state Gate
- A tri-state gate is a gate with 3 outputs: **0, 1, and high-impedance (z)**.
- **High-impedance (z)** means the output is an open circuit (i.e., the output is disconnected).
- A control input is used to determine the output, whether it is a normal output or high-impedance.
- A tri-state gate is usually a unary-input gate (i.e., a buffer or NOT gate).

## Tri-state Buffer
A tri-state buffer is a buffer with 3 outputs: 0, 1, and high-impedance (z).
- For a buffer, the output normally follows the input.
- **Positive Control:** The output is normal if the control is 1; otherwise, the output is high-impedance.
- **Negative Control:** The output is normal if the control is 0; otherwise, the output is high-impedance.

## Tri-state NOT Gate
A tri-state NOT gate is an inverter gate with 3 outputs: 0, 1, and high-impedance (z).
- For a NOT gate, the output is the complement of the input.
- **Positive Control:** The output is normal (complemented input) if the control is 1; otherwise, the output is high-impedance.
- **Negative Control:** The output is normal (complemented input) if the control is 0; otherwise, the output is high-impedance.

## Multiple Choice Questions

1. What are the three possible outputs of a tri-state gate?
    - **A)** 0, 1, and intermediate-voltage
    - **B)** 0, 1, and high-impedance
    - **C)** Low, High, and Floating-ground
    - **D)** 0, 1, and unknown (x)

2. What does high-impedance state mean in a tri-state gate?
    - **A)** The output is shorted to ground.
    - **B)** The output is connected to Vcc.
    - **C)** The output is disconnected (open circuit).
    - **D)** The output acts as an amplifier.

3. For a tri-state buffer with positive control, when is the output high-impedance?
    - **A)** When the control input is 1
    - **B)** When the control input is 0
    - **C)** When the data input is 0
    - **D)** When the data input is 1

4. How does a negative control tri-state buffer behave when its control input is 0?
    - **A)** The output is high-impedance
    - **B)** The output is the complement of the input
    - **C)** The output follows the input normally
    - **D)** The output is strictly 1

5. A tri-state NOT gate with positive control will output what when control is 1 and input is 0?
    - **A)** 0
    - **B)** 1
    - **C)** High-impedance (Z)
    - **D)** Unknown (X)

### Answer Key & Explanations

1. **B**. A tri-state gate outputs 0, 1, and high-impedance (z).
2. **C**. High-impedance means the output is an open circuit or disconnected.
3. **B**. In positive control, the output is normal when control is 1. If control is 0, the output is high-impedance.
4. **C**. For a negative control buffer, the output is normal (follows the input) if the control is 0.
5. **B**. With positive control at 1, the gate acts normally. As a NOT gate, an input of 0 results in an output of 1.

## References & Navigation

- **Previous Topic:** [[Combinational Circuit - NAND NOR]]
- **Next Topic:** [[Hardware Description Language Structural Modelling]]
