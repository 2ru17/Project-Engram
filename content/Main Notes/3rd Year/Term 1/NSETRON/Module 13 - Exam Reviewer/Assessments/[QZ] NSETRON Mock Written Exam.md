---
id: nsetron_13_qz_mock_written_exam
type: note
course: NSETRON
topic: NSETRON Mock Written Exam
status: completed
---
# [QZ] NSETRON Mock Written Exam

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSETRON]] #[[Electronics]] #[[Mock Written Exam]]

---

## Exam Instructions & Coverage Matrix

- **Format:** `31` four-option multiple-choice questions for individual **pen-and-paper** NSETRON practice covering Modules `01`--`12`, **Laboratory Activities 1--6 and 8**, and **Machine Project 2**.
- **Worked Solutions:** Step-by-step derivations and distractor analyses live in [[[ANS] NSETRON Mock Written Exam Answer Key]].

| Mock Q# | Assigned Module | Lab / Project / Theory Focus | Target Skill |
| :---: | :--- | :--- | :--- |
| `1`--`2` | Module 01 | Meter placement safety, decibel power gain computation | DC Circuits & Instrumentation |
| `3`--`5` | Module 02 | **Lab 1** + Breadboards (`"W"` split, L/C DC steady state, pot current) | Breadboard Debugging & Ohm's Law |
| `6`--`9` | Module 03 | **Lab 2** (`4`-band color code, series vs. parallel, Parts 1--3 LED networks) | Equivalent Resistance & Current Splitting |
| `10`--`12` | Module 04 | **Lab 3** (asymmetric RC $\tau$, series/parallel C, stored energy & bleed safety) | RC Time Constants & Capacitors |
| `13`--`15` | Module 05 | **Lab 4** (piecewise Si diode $r_d$, series diode+LED threshold, dual anti-parallel LEDs) | Diodes & Polarity Diagnostics |
| `16`--`17` | Module 06 | RL impedance triangle ($Z, \text{ELI}$), AC apparent vs. real power & $\text{PF}$ | AC Phasors & Power Factor |
| `18`--`20` | Module 07 | **Lab 5** (NPN switching, Base vs. Collector saturation gain, shorted B--C diode mode) | BJT Operating Regions |
| `21`--`23` | Module 08 | **Lab 6** (Rigol graticule $f$ & $V_{pp}$, $1\text{ kHz}$ probe calibration, quantization bits) | Oscilloscope & Signal Digitization |
| `24` | Module 09 | AWG sizing, $I^2 R$ conductor heating, 3-wire earth ground & series fuse | Conductor Ampacity & Safety |
| `25`--`26` | Module 10 | Resistive sensor voltage divider & open-loop op-amp comparator switching | Sensors & Analog Comparators |
| `27`--`28` | Module 11 | **Lab 8** (AM scope $m$ & bandwidth, FM Bessel first carrier null $k_m$) | AM/FM Modulation Math |
| `29`--`31` | Module 12 | **Machine Project 2** (DipTrace rules, ESP32 branch limits, multimeter trace audit) | Single-Layer PCB Design & Fabrication |

---

## Multiple Choice Questions

1. While troubleshooting a $9\text{ V}$ breadboard DC circuit, a student wants to measure total current leaving the positive terminal. Instead of opening the wire to bridge the meter into the loop, the student places an ammeter directly in parallel across the $9\text{ V}$ power supply rails. What immediately occurs and why?
    - **A)** The ammeter reads $9.0\text{ V}$ accurately because ammeters have megaohm input impedance.
    - **B)** The circuit operates normally, though current splits evenly between the meter and the load.
    - **C)** A severe short circuit occurs through the meter's near-zero internal shunt resistance, likely blowing the ammeter's fuse or damaging the supply.
    - **D)** No current flows through the meter because an ammeter behaves like an infinite open switch in DC circuits.

2. An audio power amplifier stage boosts an input signal power from $P_{\text{in}} = 2.0\text{ mW}$ up to $P_{\text{out}} = 20.0\text{ W}$. What is the power gain expressed in decibels ($\text{dB}$)?
    - **A)** $20\text{ dB}$
    - **B)** $40\text{ dB}$
    - **C)** $100\text{ dB}$
    - **D)** $10\text{ dB}$

3. A student constructs Lab 1 (`The Light Bulb`) on a DLSU CT `830`-hole breadboard. Every resistor and LED leg sits in separate columns, the LED anode faces the positive rail, and the battery ground jumper connects into the bottom blue horizontal rail at column `5`. However, the return jumper from the LED cathode is plugged into the same bottom blue row at column `42` (past the central `"W"` mark). What happens when power is switched ON?
    - **A)** The LED lights up brightly because bottom power rails run continuously from column `1` to `63`.
    - **B)** The LED turns ON dimly because the `"W"` divider adds an internal $10\text{ k}\Omega$ bridge resistor.
    - **C)** The power supply shorts immediately between top and bottom blue rails.
    - **D)** The LED remains OFF because the `"W"` divider electrically separates the left half of the power rail from the right half, leaving an open return path.

4. A DC circuit powered by a steady $12\text{ V}$ battery contains an ideal inductor in series with one lamp branch and a charged capacitor in parallel across a second open terminal pair. After the circuit reaches DC steady state, how do those two reactive components behave?
    - **A)** The inductor acts like a closed short circuit while the capacitor acts like an open circuit blocking steady DC.
    - **B)** Both the inductor and the capacitor act as open switches blocking all steady DC current.
    - **C)** Both the inductor and the capacitor act as zero-ohm dead shorts across the battery.
    - **D)** The capacitor acts as a closed short circuit while the inductor blocks steady DC completely.

5. In Lab 1 Part 2, a $9.0\text{ V}$ supply drives a fixed $1.0\text{ k}\Omega$ safety resistor in series with a $50\text{ k}\Omega$ potentiometer and an LED ($V_{\text{LED}} = 2.0\text{ V}$). If the potentiometer wiper is adjusted to $6.0\text{ k}\Omega$, what is the approximate loop current?
    - **A)** $1.29\text{ mA}$
    - **B)** $7.00\text{ mA}$
    - **C)** $1.00\text{ mA}$
    - **D)** $0.14\text{ mA}$

6. A four-band axial resistor used in Lab 2 displays color bands **Yellow -- Violet -- Red -- Gold**. What are its nominal resistance and rated tolerance range?
    - **A)** $470\ \Omega \pm 5\%$ ($446.5\ \Omega$ to $493.5\ \Omega$)
    - **B)** $4.7\text{ k}\Omega \pm 5\%$ ($4.465\text{ k}\Omega$ to $4.935\text{ k}\Omega$)
    - **C)** $4.7\text{ k}\Omega \pm 10\%$ ($4.23\text{ k}\Omega$ to $5.17\text{ k}\Omega$)
    - **D)** $47\text{ k}\Omega \pm 5\%$ ($44.65\text{ k}\Omega$ to $49.35\text{ k}\Omega$)

7. Two fixed resistors of $3.0\text{ k}\Omega$ and $6.0\text{ k}\Omega$ are connected first in **series** and then rewired in **parallel** across a $9.0\text{ V}$ DC source. Neglecting wire resistance, what total current does the battery supply in the two configurations (Series vs. Parallel)?
    - **A)** Series: $4.5\text{ mA}$; Parallel: $1.0\text{ mA}$
    - **B)** Series: $2.0\text{ mA}$; Parallel: $9.0\text{ mA}$
    - **C)** Series: $1.0\text{ mA}$; Parallel: $1.5\text{ mA}$
    - **D)** Series: $1.0\text{ mA}$; Parallel: $4.5\text{ mA}$

8. In the dual-branch parallel circuit of Lab 2 (`Part 3`, two parallel LED branches wired across a fixed $9.0\text{ V}$ battery, where each LED drops $V_{\text{LED}} = 2.0\text{ V}$), Branch 1 uses $R_1 = 1.0\text{ k}\Omega$ and Branch 2 initially uses $R_2 = 10\text{ k}\Omega$. If Branch 2's resistor is swapped down from $10\text{ k}\Omega$ to $2.0\text{ k}\Omega$ while Branch 1 stays untouched, what are $I_1$, $I_2$, and total battery current ($I_T$)?
    - **A)** $I_1 = 7.0\text{ mA}$ (unchanged), $I_2 = 3.5\text{ mA}$, $I_T = 10.5\text{ mA}$
    - **B)** $I_1 = 3.5\text{ mA}$ (halved), $I_2 = 3.5\text{ mA}$, $I_T = 7.0\text{ mA}$
    - **C)** $I_1 = 7.0\text{ mA}$, $I_2 = 0.7\text{ mA}$, $I_T = 7.7\text{ mA}$
    - **D)** $I_1 = 9.0\text{ mA}$, $I_2 = 4.5\text{ mA}$, $I_T = 13.5\text{ mA}$

9. In Lab 2 Part 3 (`Combined Configuration`), an upstream fixed $3.3\text{ k}\Omega$ resistor feeds a shared breadboard node (`col 15`) that splits into two parallel LED branches to ground: `Branch 1` runs through a $50\text{ k}\Omega$ potentiometer wired as a two-terminal variable resistor (`Pin 1` + center wiper `Pin 2`, `Pin 3` unconnected) in series with `LED 1`, while `Branch 2` runs through a fixed $10\text{ k}\Omega$ resistor in series with `LED 2`. As the student turns the potentiometer from $0\ \Omega$ up toward $50\text{ k}\Omega$, `LED 1` dims while `LED 2` brightens (passing equal brightness at $10\text{ k}\Omega$). Why do the two LEDs move in opposite directions?
    - **A)** Turning the potentiometer reverses DC battery polarity across `LED 1`.
    - **B)** The unconnected `Pin 3` lug induces an alternating AC square wave across `Branch 2`.
    - **C)** Raising variable resistance chokes current in `Branch 1` (`LED 1` dims) and lowers total current through the upstream $3.3\text{ k}\Omega$ resistor, causing the shared node voltage to rise and push more current through fixed `Branch 2` (`LED 2` brightens).
    - **D)** `LED 1` behaves as an open Zener short circuit until `VR` exceeds $50\text{ k}\Omega$.

10. In a Lab 3 asymmetric RC test using $C = 100\ \mu\text{F}$, the capacitor charges through $R_{\text{chg}} = 2.2\text{ k}\Omega$ when the switch is closed and discharges through $R_{\text{dis}} = 22\text{ k}\Omega$ when opened. What are the charging time constant ($\tau_{\text{chg}}$), full-charge time ($5\tau_{\text{chg}}$), and discharging time constant ($\tau_{\text{dis}}$)?
    - **A)** $\tau_{\text{chg}} = 2.2\text{ s}$, $5\tau_{\text{chg}} = 11.0\text{ s}$, $\tau_{\text{dis}} = 0.22\text{ s}$
    - **B)** $\tau_{\text{chg}} = 0.22\text{ s}$, $5\tau_{\text{chg}} = 1.1\text{ s}$, $\tau_{\text{dis}} = 2.2\text{ s}$
    - **C)** $\tau_{\text{chg}} = 0.022\text{ s}$, $5\tau_{\text{chg}} = 0.11\text{ s}$, $\tau_{\text{dis}} = 0.22\text{ s}$
    - **D)** $\tau_{\text{chg}} = 22\text{ s}$, $5\tau_{\text{chg}} = 110\text{ s}$, $\tau_{\text{dis}} = 2.2\text{ s}$

11. In Lab 3 Parts 2 and 3, a student pairs a $10\ \mu\text{F}$ electrolytic capacitor and a $100\ \mu\text{F}$ electrolytic capacitor, first in **series** and then in **parallel**, discharging each bank into the same LED indicator loop. How do the equivalent capacitances and observed discharge glow times compare?
    - **A)** Series gives $110\ \mu\text{F}$ (longer glow); parallel gives $9.09\ \mu\text{F}$ (shorter glow).
    - **B)** Series gives $55\ \mu\text{F}$ (longer glow); parallel gives $9.09\ \mu\text{F}$ (shorter glow).
    - **C)** Both series and parallel yield $110\ \mu\text{F}$ with identical flash duration.
    - **D)** Series gives $9.09\ \mu\text{F}$ (much shorter glow); parallel gives $110\ \mu\text{F}$ (much longer glow).

12. During Lab 3 Part 4 (`Loose-Wire Storage`), a $100\ \mu\text{F}$ capacitor charged to $5.0\text{ V}$ stores $1.25\text{ mJ}$ of electrostatic energy. If the student instead charges the same $100\ \mu\text{F}$ capacitor safely up to $10.0\text{ V}$ (still below its voltage rating), how much energy does it now store, and how should any leftover charge be cleared before returning it to the lab kit?
    - **A)** $2.50\text{ mJ}$; discharge by shorting both legs directly with bare fingers.
    - **B)** $2.50\text{ mJ}$; discharge through an LED without any resistor.
    - **C)** $5.00\text{ mJ}$; discharge by bridging its leads across an appropriate bleeder resistor.
    - **D)** $10.0\text{ mJ}$; store it with a wire wrapped tightly around both pins to induce inductance.

13. Using the piecewise-linear diode model ($V_\gamma = 0.7\text{ V}$, forward bulk resistance $r_d = 10\ \Omega$), calculate the forward DC current $I_D$ in a series circuit containing a $5.0\text{ V}$ source, one silicon diode, and a $420\ \Omega$ load resistor.
    - **A)** $10.0\text{ mA}$
    - **B)** $11.9\text{ mA}$
    - **C)** $10.2\text{ mA}$
    - **D)** $1.67\text{ mA}$

14. In Lab 4 Part 1, a student places a silicon diode ($V_k \approx 0.7\text{ V}$) in series with a green LED ($V_F \approx 2.0\text{ V}$) and a $1\text{ k}\Omega$ current-limiting resistor, both oriented in forward bias toward ground. If an adjustable bench supply is set to $2.4\text{ V}$, what is the expected LED state?
    - **A)** It glows at normal brightness because $2.4\text{ V} > 0.7\text{ V}$.
    - **B)** It remains OFF because the combined series forward threshold ($0.7\text{ V} + 2.0\text{ V} = 2.7\text{ V}$) exceeds the $2.4\text{ V}$ supply voltage.
    - **C)** It glows dimly while reverse-conducting $2.4\text{ V}$ across the silicon diode.
    - **D)** It flashes continuously at $60\text{ Hz}$ due to junction oscillation.

15. In Lab 4 Part 2, a $100\ \mu\text{F}$ capacitor sits in series with an anti-parallel pair of LEDs (`LED 1` oriented forward during charging from the $+9\text{ V}$ rail, and `LED 2` oriented opposite to pass discharge current when the loose supply lead is removed from $+9\text{ V}$ and touched to ground `-`). What happens during **charging** versus **grounded discharge**?
    - **A)** `LED 2` lights during charging; `LED 1` lights during discharge.
    - **B)** Both `LED 1` and `LED 2` remain continuously lit in both stages.
    - **C)** Neither LED lights because anti-parallel diodes short out the capacitor completely.
    - **D)** `LED 1` pulses ON while the capacitor charges from $+9\text{ V}$, then turns OFF and `LED 2` flashes briefly as stored charge reverses out to ground (`-`).

16. An AC series circuit contains a resistor $R = 30\ \Omega$ in series with an inductive reactance $X_L = 40\ \Omega$. What is the total circuit impedance $Z$, and what is the phase relationship between total voltage and current (using the `ELI the ICE man` mnemonic)?
    - **A)** $Z = 70\ \Omega$; current leads voltage.
    - **B)** $Z = 10\ \Omega$; voltage and current stay strictly in phase.
    - **C)** $Z = 50\ \Omega$; voltage ($E$) leads current ($I$).
    - **D)** $Z = 50\ \Omega$; current ($I$) leads voltage ($E$).

17. A workshop AC load connected to a $230\text{ V}_{\text{rms}}$ line draws $6.0\text{ A}_{\text{rms}}$ at a lagging power factor of $\text{PF} = 0.75$. Calculate its apparent power ($S$) and real useful power ($P$).
    - **A)** $S = 1380\text{ VA}$, $P = 1035\text{ W}$
    - **B)** $S = 1035\text{ VA}$, $P = 1380\text{ W}$
    - **C)** $S = 1840\text{ VA}$, $P = 1380\text{ W}$
    - **D)** $S = 1380\text{ VA}$, $P = 345\text{ W}$

18. In Lab 5 Part 1 (`Transistor as a Switch`), an NPN transistor controls a collector LED from a $9\text{ V}$ supply. Pressing the push-button delivers forward current into the Base pin. Under proper NPN operation (`Collector`, `Base`, `Emitter`), which pin bias rule turns the transistor ON like a closed switch?
    - **A)** Reverse-bias the Base--Emitter junction (`Base` negative relative to `Emitter`) while disconnecting the `Collector`.
    - **B)** Forward-bias the Base--Emitter junction (`Base` positive by $\ge 0.7\text{ V}$ relative to grounded `Emitter`) so base current $I_B$ drives heavy collector current $I_C$.
    - **C)** Apply AC directly across the Collector--Emitter pins while leaving the `Base` floating.
    - **D)** Connect the `Emitter` directly to $+9\text{ V}$ and leave `Collector` disconnected.

19. In Lab 5 Part 2 (`Current Gain`), an NPN BJT on a $9\text{ V}$ rail uses a $100\text{ k}\Omega$ Base resistor in series with `LED_left` and a $1\text{ k}\Omega$ Collector resistor in series with `LED_right`. When a student swaps the $1\text{ k}\Omega$ Collector resistor up to $33\text{ k}\Omega$, the measured ratio $I_C / I_B$ drops to roughly $3$ even though the transistor datasheet lists $\beta_{\text{DC}} \approx 150$. Why does the measured gain fall far below $\beta_{\text{DC}}$?
    - **A)** The multimeter was accidentally set to AC volts instead of DC ohms.
    - **B)** An NPN transistor always permanently divides collector current down to $1/3$ of base current.
    - **C)** Turning on a Base LED reverses current amplification inside the silicon crystal.
    - **D)** The high $33\text{ k}\Omega$ collector load pushes the BJT into **saturation**, externally limiting $I_C$ near $(9 - V_{\text{LED}} - V_{CE(\text{sat})})/33\text{ k}\Omega$ ($\approx 0.22\text{ mA}$ vs. $I_B \approx 0.068\text{ mA}$) instead of unconstrained active gain.

20. In Lab 5 Part 3, the student shorts the **Base** pin directly to the **Collector** pin on the NPN BJT (`Base--Collector tie`) and tests conduction from Base/Collector to Emitter. How does the modified BJT behave?
    - **A)** It operates as a high-gain RF amplifier with infinite current amplification.
    - **B)** It acts as a variable inductor whose reactance depends on supply frequency.
    - **C)** With $V_{BC} = 0\text{ V}$, the remaining Base--Emitter junction behaves as an ordinary unidirectional **two-terminal P-N diode**.
    - **D)** Both current paths remain permanently open in all bias directions.

21. While reading a periodic signal on a Rigol digital oscilloscope in Lab 6, the horizontal time-base is set to $50\ \mu\text{s/div}$ and one complete cycle spans exactly $4.0$ horizontal divisions. Vertically, the scale is $2.0\text{ V/div}$ and the waveform spans $3.5$ divisions from negative trough to positive peak. What are the signal's period ($T$), frequency ($f$), and peak-to-peak voltage ($V_{pp}$)?
    - **A)** $T = 200\ \mu\text{s}$, $f = 5.0\text{ kHz}$, $V_{pp} = 7.0\text{ V}$
    - **B)** $T = 200\ \mu\text{s}$, $f = 5.0\text{ MHz}$, $V_{pp} = 3.5\text{ V}$
    - **C)** $T = 80\ \mu\text{s}$, $f = 12.5\text{ kHz}$, $V_{pp} = 7.0\text{ V}$
    - **D)** $T = 20\ \mu\text{s}$, $f = 50.0\text{ kHz}$, $V_{pp} = 5.5\text{ V}$

22. At the start of Lab 6 (`Oscilloscope Calibration`), a group clips the `10x` oscilloscope probe onto the Rigol front-panel `1 kHz` square-wave calibration terminal and sees rounded leading edges instead of crisp vertical rises and flat tops. What adjustment fixes this distortion before taking measurements?
    - **A)** Switching the probe hook to DC coupling while leaving the BNC unplugged.
    - **B)** Adjusting the small probe compensation capacitor trimmer screw until the square wave shows sharp $90^\circ$ corners with flat horizontal tops.
    - **C)** Turning the horizontal trigger level knob to $-10\text{ V}$.
    - **D)** Increasing vertical sensitivity to $1\text{ mV/div}$ to stretch the rounding out of view.

23. A uniform Analog-to-Digital Converter (ADC) quantizer is upgraded from $3$-bit resolution to $6$-bit resolution over the exact same full-scale voltage range. How do the number of discrete voltage levels and the quantization step size change?
    - **A)** Levels decrease from $64$ to $8$, making the staircase waveform coarser.
    - **B)** Levels double from $6$ to $12$ while step size increases by $2\times$.
    - **C)** Quantization resolution stays unchanged because bit depth only shifts carrier frequency.
    - **D)** Discrete voltage levels increase from $8$ ($2^3$) to $64$ ($2^6$), shrinking each quantization step by $8\times$ and reducing staircase error.

24. For residential $120\text{ V}/240\text{ V}$ appliance wiring safety and ampacity management, which statement accurately describes conductor gauge and fuse placement?
    - **A)** Connecting a fuse in **parallel** with the Neutral wire trips the breaker without interrupting Hot voltage.
    - **B)** Increasing the AWG gauge number (e.g., AWG `10` to AWG `18`) thickens wire diameter and raises safe ampacity.
    - **C)** Dropping $6$ AWG numbers for solid copper wire (e.g., AWG `18` at $21\ \Omega/\text{km}$ down to AWG `12` at $5.3\ \Omega/\text{km}$) multiplies cross-sectional area roughly four-fold and quarters $\Omega/\text{km}$ resistance, while safety fuses/breakers must be placed in **series with the Hot wire** and appliance metal frames tied to earth **Ground**.
    - **D)** Earth ground wires are meant to carry continuous return load current identically to the Neutral conductor.

25. A resistive sensor voltage divider uses $V_{\text{in}} = 10.0\text{ V}$ across a top fixed resistor $R_1 = 4.0\text{ k}\Omega$ and a bottom resistive photo/thermistor sensor $R_2$ connected to ground, with $V_{\text{out}}$ tapped between $R_1$ and $R_2$. As environmental changes raise $R_2$ from $1.0\text{ k}\Omega$ to $6.0\text{ k}\Omega$, how does the unloaded divider output $V_{\text{out}}$ change?
    - **A)** Increases from $2.0\text{ V}$ to $6.0\text{ V}$.
    - **B)** Decreases from $8.0\text{ V}$ to $4.0\text{ V}$.
    - **C)** Stays fixed at $5.0\text{ V}$ regardless of $R_2$.
    - **D)** Increases from $4.0\text{ V}$ to $9.0\text{ V}$.

26. An open-loop op-amp comparator powered by $\pm 12\text{ V}$ dual rails has a fixed reference $V_{\text{ref}} = 4.0\text{ V}$ connected to its **inverting (`-`) input** and a sensor divider output $V_{\text{sens}}$ connected to its **non-inverting (`+`) input**. Ignoring minor rail saturation loss, what is $V_{\text{out}}$ when $V_{\text{sens}} = 5.5\text{ V}$?
    - **A)** $-12\text{ V}$ (negative saturation) because $V_- < V_+$ pulls the output low.
    - **B)** $+12\text{ V}$ (positive saturation) because $V_+ > V_-$ drives open-loop gain straight to the positive supply rail.
    - **C)** $+1.5\text{ V}$ because open-loop comparators output $V_+ - V_-$ directly.
    - **D)** $0\text{ V}$ because no feedback resistor is connected.

27. In Lab 8 (`LabAlive AM Modulation`), an oscilloscope measures a clean AM signal whose carrier envelope peaks at $V_{\max} = 8.0\text{ V}$ and troughs at $V_{\min} = 2.0\text{ V}$. Given carrier frequency $f_c = 1000\text{ kHz}$ and modulating sine tone $f_m = 5\text{ kHz}$, what are the modulation index ($m$), sideband frequencies ($f_{\text{LSB}}, f_{\text{USB}}$), and occupied AM bandwidth ($\text{BW}$)?
    - **A)** $m = 0.75$, sidebands $990\text{ kHz}$ and $1010\text{ kHz}$, $\text{BW} = 20\text{ kHz}$
    - **B)** $m = 0.60$, sidebands $995\text{ kHz}$ and $1005\text{ kHz}$, $\text{BW} = 5\text{ kHz}$
    - **C)** $m = 1.33$, overmodulated carrier with DSB-SC suppression
    - **D)** $m = 0.60$, sidebands $995\text{ kHz}$ and $1005\text{ kHz}$, $\text{BW} = 10\text{ kHz}$

28. Using the Lab 8 FM modulation index relation $\beta = \frac{k_m \hat{m}}{f_m}$, what modulator sensitivity constant $k_m$ (in $\text{kHz/V}$) produces the first Bessel carrier null ($\beta \approx 2.405$, where carrier amplitude $J_0(\beta) = 0$) when message peak amplitude is $\hat{m} = 2.0\text{ V}$ and modulating frequency is $f_m = 4.0\text{ kHz}$?
    - **A)** $1.20\text{ kHz/V}$
    - **B)** $2.41\text{ kHz/V}$
    - **C)** $4.81\text{ kHz/V}$
    - **D)** $9.62\text{ kHz/V}$

29. Which proposed Machine Project 2 DipTrace design **passes** every project rule?
    - **A)** $5.0\text{ cm} \times 5.0\text{ cm}$ presensitized photoresist single-sided PCB, bottom copper layer only, manual traces at $0.9\text{ mm}$ width, through-hole Red/Green/Orange LEDs + $1\text{ k}\Omega$ resistors + `GPIO1, GPIO2, GPIO3, GND` 4-pin header.
    - **B)** $5.0\text{ cm} \times 5.0\text{ cm}$ Universal perfboard layout using DipTrace autorouter with $0.5\text{ mm}$ bottom traces.
    - **C)** $7.0\text{ cm} \times 5.0\text{ cm}$ plain copper-only board with SMD LEDs routed manually on top and bottom layers at $1.0\text{ mm}$ trace width.
    - **D)** $5.5\text{ cm} \times 5.5\text{ cm}$ photoresist single-sided PCB with manual bottom traces at $0.4\text{ mm}$ width and `GPIO1..GPIO3, GND` header.

30. In Machine Project 2, an ESP32 GPIO pin outputs $3.3\text{ V}$ to drive one traffic-light branch (`GPIO -> R -> LED -> GND`) containing an LED with forward voltage $V_{\text{LED}} = 1.8\text{ V}$. Using the two allowed project resistor limits ($R_{\min} = 500\ \Omega$ and $R_{\max} = 5.0\text{ k}\Omega$), calculate the maximum and minimum possible branch currents.
    - **A)** $6.60\text{ mA}$ at $500\ \Omega$; $0.66\text{ mA}$ at $5\text{ k}\Omega$
    - **B)** $3.00\text{ mA}$ at $500\ \Omega$; $0.30\text{ mA}$ at $5\text{ k}\Omega$
    - **C)** $1.50\text{ mA}$ at $500\ \Omega$; $0.15\text{ mA}$ at $5\text{ k}\Omega$
    - **D)** $3.00\text{ mA}$ at $5\text{ k}\Omega$; $0.30\text{ mA}$ at $500\ \Omega$

31. After chemical etching in Agua Oxenada ($\text{H}_2\text{O}_2$) + Muriatic Acid ($\text{HCl}$) and drilling holes for Machine Project 2 (following the lab-technician update where no separate developer is needed), a student checks resistance with a multimeter (`power OFF`) before connecting the ESP32 and records:
    - `GPIO1` header pad to `R1` pad: $0.3\ \Omega$
    - `GPIO3` header pad to `R3` pad: `OL` (infinite resistance)
    - `GPIO2` trace to adjacent `GND` copper pad: $0.2\ \Omega$

    Which diagnosis accurately interprets all three readings?
    - **A)** `GPIO1` is open, `GPIO3` is intact, and `GPIO2` is normal because `GPIO2` connects straight to `GND`.
    - **B)** Re-simulate the board in DipTrace because multimeter continuity cannot detect physical copper breaks.
    - **C)** Etch the board for twenty more minutes until `GPIO1` also reads `OL`.
    - **D)** `GPIO1` trace is continuous and intact, `GPIO3` has an open/broken trace requiring bridging before soldering, and `GPIO2` has an accidental copper/solder short to `GND` that must be cleared before powering the ESP32.

### Answer Key & Explanations

1. **C)** Ammeters have near-zero internal resistance and must sit in **series**; placing one in parallel across a voltage source shorts the rails directly through the shunt, blowing the fuse.
2. **B)** Power gain ratio $P_{\text{out}}/P_{\text{in}} = \frac{20.0\text{ W}}{0.0020\text{ W}} = 10{,}000$. In decibels, $10\log_{10}(10{,}000) = 10 \times 4 = 40\text{ dB}$.
3. **D)** On DLSU CT `830`-hole breadboards, the central `"W"` mark divides the horizontal power rail at mid-board (`cols 1--30` vs. `cols 35+`), breaking the ground return at column `42`.
4. **A)** Under steady DC ($f = 0$), $X_L = 2\pi f L = 0\ \Omega$ (ideal short) while $X_C = \frac{1}{2\pi f C} \to \infty$ (open circuit).
5. **C)** $R_T = 1.0\text{ k}\Omega + 6.0\text{ k}\Omega = 7.0\text{ k}\Omega$; $I = \frac{9.0\text{ V} - 2.0\text{ V}}{7000\ \Omega} = \frac{7.0\text{ V}}{7000\ \Omega} = 1.00\text{ mA}$.
6. **B)** Yellow = `4`, Violet = `7`, Red = $\times 10^2 = 4700\ \Omega = 4.7\text{ k}\Omega$; Gold = $\pm 5\%$ ($4.465\text{ k}\Omega$ to $4.935\text{ k}\Omega$).
7. **D)** Series $R_T = 3 + 6 = 9.0\text{ k}\Omega \implies I = 9/9\text{ k} = 1.0\text{ mA}$. Parallel $R_{\text{eq}} = \frac{3 \times 6}{3 + 6} = 2.0\text{ k}\Omega \implies I = 9/2\text{ k} = 4.5\text{ mA}$.
8. **A)** Parallel branches see the full $9.0\text{ V}$ source independently: $I_1 = (9.0 - 2.0)/1.0\text{ k}\Omega = 7.0\text{ mA}$ (unchanged), $I_2 = (9.0 - 2.0)/2.0\text{ k}\Omega = 3.5\text{ mA}$, and total battery current $I_T = 7.0 + 3.5 = 10.5\text{ mA}$.
9. **C)** Increasing the 2-terminal variable resistor starves `Branch 1`, shrinking drop across the upstream $3.3\text{ k}\Omega$ resistor so shared node voltage rises and drives more current into fixed `Branch 2`.
10. **B)** $\tau_{\text{chg}} = (2.2\text{ k}\Omega)(100\ \mu\text{F}) = 0.22\text{ s}$, full charge $5\tau_{\text{chg}} = 1.1\text{ s}$, $\tau_{\text{dis}} = (22\text{ k}\Omega)(100\ \mu\text{F}) = 2.2\text{ s}$.
11. **D)** Series capacitance combines inversely ($10 \parallel_{\text{inv}} 100 \approx 9.09\ \mu\text{F}$, brief glow), whereas parallel capacitors add ($10 + 100 = 110\ \mu\text{F}$, extended glow).
12. **C)** Since $E = \frac{1}{2}CV^2$, doubling $V$ quadruples energy ($4 \times 1.25\text{ mJ} = 5.00\text{ mJ}$); safe handling discharges residual charge through a bleeder resistor.
13. **A)** Piecewise-linear model: $I_D = \frac{V_s - V_\gamma}{R_L + r_d} = \frac{5.0 - 0.7}{420 + 10} = \frac{4.3}{430} = 10.0\text{ mA}$.
14. **B)** Series forward-biased thresholds add: $0.7\text{ V} + 2.0\text{ V} = 2.7\text{ V}$. Because $2.4\text{ V} < 2.7\text{ V}$, neither forward barrier conducts appreciably and the LED stays OFF.
15. **D)** Charging current pulses `LED 1` ON; when the supply lead is moved to ground (`-`), capacitor discharge reverses back through anti-parallel `LED 2` (`ON` briefly).
16. **C)** $Z = \sqrt{R^2 + X_L^2} = \sqrt{30^2 + 40^2} = 50\ \Omega$; in an inductive circuit (`ELI`), voltage ($E$) leads current ($I$).
17. **A)** Apparent power $S = V_{\text{rms}} I_{\text{rms}} = 230 \times 6.0 = 1380\text{ VA}$; real power $P = S \cdot \text{PF} = 1380 \times 0.75 = 1035\text{ W}$.
18. **B)** An NPN BJT conducts Collector-to-Emitter when the Base--Emitter P-N junction is forward-biased ($\ge 0.7\text{ V}$) to supply $I_B$.
19. **D)** In saturation, collector load resistance ($33\text{ k}\Omega$) caps $I_C \approx 0.22\text{ mA}$ against $I_B \approx 0.068\text{ mA}$, so measured $I_C/I_B \approx 3.25$ falls far below unconstrained active datasheet $\beta_{\text{DC}}$.
20. **C)** Connecting Base directly to Collector sets $V_{BC} = 0$, leaving only the forward/reverse P-N behavior of a two-terminal diode (`B-E` junction).
21. **A)** $T = 4.0 \times 50\ \mu\text{s} = 200\ \mu\text{s} \implies f = 1/T = 5.0\text{ kHz}$; $V_{pp} = 3.5 \times 2.0\text{ V} = 7.0\text{ V}$.
22. **B)** Rounded or peaked corners on the `1 kHz` calibration lug indicate probe capacitive mismatch, corrected by trimming the probe's compensation screw.
23. **D)** Quantization levels equal $2^n$: going from $n=3$ ($8$ steps) to $n=6$ ($64$ steps) increases resolution by $8\times$ and reduces quantization step size by $8\times$.
24. **C)** Lowering gauge by `6` AWG steps (e.g., `18 -> 12`) cuts $\Omega/\text{km}$ roughly four-fold ($21 \to 5.3\ \Omega/\text{km}$); fuses protect circuits only when in series on the Hot wire while chassis ground prevents shock.
25. **A)** Voltage divider $V_{\text{out}} = V_{\text{in}} \frac{R_2}{R_1+R_2}$: at $1\text{ k}\Omega$, $10(1/5) = 2.0\text{ V}$; at $6\text{ k}\Omega$, $10(6/10) = 6.0\text{ V}$.
26. **B)** Here $V_+ = 5.5\text{ V} > V_- = 4.0\text{ V}$, so an open-loop comparator saturates immediately toward the positive rail ($+12\text{ V}$).
27. **D)** $m = \frac{8.0 - 2.0}{8.0 + 2.0} = 0.60$; sidebands are $1000 \pm 5\text{ kHz}$ ($995$ & $1005\text{ kHz}$), giving $\text{BW} = 2 f_m = 10\text{ kHz}$.
28. **C)** $k_m = \frac{\beta f_m}{\hat{m}} = \frac{2.405 \times 4.0\text{ kHz}}{2.0\text{ V}} = 4.81\text{ kHz/V}$.
29. **A)** Project 2 requires $\le 6\times 6\text{ cm}$ ($5\times 5\text{ cm}$ target) photoresist PCB, bottom copper only, manual routing (no autorouter), traces $\ge 0.8\text{ mm}$, and through-hole parts (`A` passes all; `B` uses Universal/autorouter/`0.5 mm`, `C` exceeds $6\text{ cm}$/copper-only/SMD/top layer, `D` violates $0.8\text{ mm}$ min trace).
30. **B)** $V_R = 3.3 - 1.8 = 1.5\text{ V}$. At $500\ \Omega$, $I = 1.5/500 = 3.00\text{ mA}$; at $5\text{ k}\Omega$, $I = 1.5/5000 = 0.30\text{ mA}$.
31. **D)** Near-zero resistance along `GPIO1->R1` ($0.3\ \Omega$) proves continuity; `OL` along `GPIO3->R3` reveals a broken trace; $0.2\ \Omega$ from signal `GPIO2` to `GND` detects an unintended short bridge.

## References & Navigation

- **Previous Topic:** [[[ANS] NSETRON Written Exam Reviewer Answer Key]]
- **Next Topic:** [[[ANS] NSETRON Mock Written Exam Answer Key]]
- **Related Notes:** [[Written Exam Coverage and Formula Sheet]], [[[REV] NSETRON Written Exam Reviewer]]
