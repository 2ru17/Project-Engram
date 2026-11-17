---
id: nsetron_13_ans_mock_written_exam
type: note
course: NSETRON
topic: NSETRON Mock Written Exam Answer Key
status: completed
---
# [ANS] NSETRON Mock Written Exam Answer Key

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSETRON]] #[[Electronics]] #[[Mock Written Exam]]

---

## Quick Summary Matrix

- **Companion Mock Exam:** [[[QZ] NSETRON Mock Written Exam]] (`31` pen-and-paper MCQs covering Modules `01`--`12`, **Labs 1--6 and 8**, and **Machine Project 2**).

| Mock Q# | Answer | Topic / Lab Coverage |
| :---: | :---: | :--- |
| `1` | **C** | [[Basic Electrical Theory]] (Ammeter parallel short hazard) |
| `2` | **B** | [[Basic Electrical Theory]] (Decibel power gain) |
| `3` | **D** | [[Basic Electricity and Electronic Components]] (**Lab 1** + `"W"` rail split) |
| `4` | **A** | [[Basic Electricity and Electronic Components]] (Inductor/Capacitor DC steady state) |
| `5` | **C** | [[Basic Electricity and Electronic Components]] (**Lab 1 Part 2** pot current) |
| `6` | **B** | [[Resistors]] (**Lab 2** 4-band color code & tolerance) |
| `7` | **D** | [[Resistors]] (**Lab 2 Parts 1 & 2** series vs. parallel current) |
| `8` | **A** | [[Resistors]] (**Lab 2 Part 3A** parallel LED branch independence & KCL) |
| `9` | **C** | [[Resistors]] (**Lab 2 Part 3B** combined pot + $10\text{ k}\Omega$ current split) |
| `10` | **B** | [[Capacitors]] (**Lab 3 Part 1** asymmetric RC charge/discharge) |
| `11` | **D** | [[Capacitors]] (**Lab 3 Parts 2 & 3** series vs. parallel capacitance) |
| `12` | **C** | [[Capacitors]] (**Lab 3 Part 4** stored energy & resistor discharge) |
| `13` | **A** | [[Diodes]] (Piecewise-linear diode current calculation) |
| `14` | **B** | [[Diodes]] (**Lab 4 Part 1** combined diode + LED turn-on threshold) |
| `15` | **D** | [[Diodes]] (**Lab 4 Part 2** anti-parallel LED polarity check) |
| `16` | **C** | [[AC Circuits]] (RL impedance triangle & `ELI` phase lag) |
| `17` | **A** | [[AC Circuits]] (Apparent VA, Real Watts & Power Factor) |
| `18` | **B** | [[Transistors]] (**Lab 5 Part 1** NPN Base--Emitter switching rule) |
| `19` | **D** | [[Transistors]] (**Lab 5 Part 2** saturation ceiling vs. $\beta_{\text{DC}}$) |
| `20` | **C** | [[Transistors]] (**Lab 5 Part 3** shorted Base--Collector diode mode) |
| `21` | **A** | [[Oscilloscope]] (**Lab 6** Rigol graticule $T, f, V_{pp}$ reading) |
| `22` | **B** | [[Oscilloscope]] (**Lab 6** `1 kHz` square-wave probe compensation) |
| `23` | **D** | [[Oscilloscope]] (Uniform ADC quantization bit resolution) |
| `24` | **C** | [[Ampacity and Wiring]] (AWG gauge steps, series Hot fuse, Earth ground) |
| `25` | **A** | [[Sensor Controls, Comparator and Voltage Divider]] (Sensor divider shift) |
| `26` | **B** | [[Sensor Controls, Comparator and Voltage Divider]] (Open-loop comparator saturation) |
| `27` | **D** | [[Principles of Communication]] (**Lab 8** AM index, sidebands, bandwidth) |
| `28` | **C** | [[Principles of Communication]] (**Lab 8** FM Bessel carrier null $k_m$) |
| `29` | **A** | [[PCB Design and Machine Project 2]] (**MP2** DipTrace layout compliance) |
| `30` | **B** | [[PCB Design and Machine Project 2]] (**MP2** ESP32 GPIO resistor bounds) |
| `31` | **D** | [[PCB Design and Machine Project 2]] (**MP2** multimeter continuity & safety) |

---

## Worked Solutions (Mock Exam Items 1--31)

### Modules 01--03: DC Theory, Lab 1 & Lab 2 (Items 1--9)

#### Mock Q1 -- Answer: **C**
- **Step-by-Step Solution:** An ammeter uses an extremely low-resistance internal shunt ($R_{\text{shunt}} \approx 0\ \Omega$) so it barely alters series current when inserted inline. Connecting it directly across the $9\text{ V}$ supply (`parallel`) puts $9\text{ V}$ straight across $\sim 0\ \Omega$, causing a dead short that trips/blows the meter fuse or overloads the source.
- **Why Distractors Fail:** High megaohm input impedance characterizes a **voltmeter** (`A`), parallel placement does not divide safely like an open circuit (`B`, `D`).
- **Reference Note:** [[Basic Electrical Theory]] (`Voltmeters vs. Ammeters & Instrument Safety`).

#### Mock Q2 -- Answer: **B**
- **Step-by-Step Solution:**
  $$\frac{P_{\text{out}}}{P_{\text{in}}} = \frac{20.0\text{ W}}{2.0 \times 10^{-3}\text{ W}} = 10{,}000$$
  Convert power ratio to decibels (`10 log` rule):
  $$\text{Gain}_{\text{dB}} = 10 \log_{10}(10{,}000) = 10 \times 4 = 40\text{ dB}$$
- **Why Distractors Fail:** $20\text{ dB}$ corresponds to $100\times$ power (`A`), $100$ confuses linear factors (`C`), and `10 dB` represents only $10\times$ power (`D`).
- **Reference Note:** [[Basic Electrical Theory]] (`Power & Decibels`).

#### Mock Q3 -- Answer: **D**
- **Step-by-Step Solution:** On DLSU-CT laboratory `830`-hole breadboards, both upper and lower horizontal red/blue power buses break physically at mid-board (marked `"W"` between columns `30` and `35`). Placing the battery `-` jumper at col `5` and the LED cathode return at col `42` leaves the cathode floating on the disconnected right half of the blue rail, breaking the closed loop.
- **Why Distractors Fail:** The bus is NOT continuous past `"W"` (`A`), no $10\text{ k}\Omega$ bridge exists inside the gap (`B`), and placing wires in the same broken blue rail cannot short across opposite buses (`C`).
- **Reference Note:** [[Basic Electricity and Electronic Components]] (`DLSU CT Breadboard "W" Divider`).

#### Mock Q4 -- Answer: **A**
- **Step-by-Step Solution:** Under pure constant DC ($f = 0\text{ Hz}$), inductive reactance $X_L = 2\pi f L = 0\ \Omega$ (`ideal closed switch` in steady state once magnetic flux stabilizes), whereas capacitive reactance $X_C = \frac{1}{2\pi f C} \to \infty\ \Omega$ (`open circuit` once charged to source voltage).
- **Why Distractors Fail:** Options `B`, `C`, and `D` invert or equalize steady-state L vs. C DC behavior.
- **Reference Note:** [[Basic Electricity and Electronic Components]] (`Inductors & Capacitors in AC/DC`).

#### Mock Q5 -- Answer: **C**
- **Step-by-Step Solution:** Total series resistance with pot wiper at $6.0\text{ k}\Omega$ and safety resistor $1.0\text{ k}\Omega$:
  $$R_T = 1.0\text{ k}\Omega + 6.0\text{ k}\Omega = 7.0\text{ k}\Omega$$
  Subtracting the LED forward voltage drop from the $9.0\text{ V}$ battery:
  $$I = \frac{V_s - V_{\text{LED}}}{R_T} = \frac{9.0\text{ V} - 2.0\text{ V}}{7000\ \Omega} = \frac{7.0\text{ V}}{7000\ \Omega} = 1.00 \times 10^{-3}\text{ A} = 1.00\text{ mA}$$
- **Why Distractors Fail:** `1.29 mA` (`A`) forgets to subtract $V_{\text{LED}} = 2.0\text{ V}$ ($9/7 = 1.286$); `7.00 mA` (`B`) omits the $6\text{ k}\Omega$ pot; `0.14 mA` (`D`) uses full $51\text{ k}\Omega$ resistance.
- **Reference Note:** [[Basic Electricity and Electronic Components]] (`Lab 1 Part 2`).

#### Mock Q6 -- Answer: **B**
- **Step-by-Step Solution:** Decoding four-band resistor **Yellow -- Violet -- Red -- Gold**:
  - 1st digit (Yellow) = `4`; 2nd digit (Violet) = `7` -> `47`.
  - Multiplier (Red) = $\times 10^2 = 100 \implies 47 \times 100 = 4700\ \Omega = 4.7\text{ k}\Omega$.
  - Tolerance (Gold) = $\pm 5\% = 0.05 \times 4.7\text{ k}\Omega = \pm 0.235\text{ k}\Omega \implies [4.465\text{ k}\Omega,\ 4.935\text{ k}\Omega]$.
- **Why Distractors Fail:** $470\ \Omega$ (`A`) uses Brown ($\times 10^1$) instead of Red; $\pm 10\%$ (`C`) belongs to Silver; $47\text{ k}\Omega$ (`D`) uses Orange ($\times 10^3$).
- **Reference Note:** [[Resistors]] (`Resistor Color Code Table`).

#### Mock Q7 -- Answer: **D**
- **Step-by-Step Solution:**
  - **Series:** $R_T = 3.0\text{ k}\Omega + 6.0\text{ k}\Omega = 9.0\text{ k}\Omega \implies I_{\text{series}} = \frac{9.0\text{ V}}{9.0\text{ k}\Omega} = 1.0\text{ mA}$.
  - **Parallel:** $R_{\text{eq}} = \frac{3.0 \times 6.0}{3.0 + 6.0} = \frac{18.0}{9.0} = 2.0\text{ k}\Omega \implies I_{\text{parallel}} = \frac{9.0\text{ V}}{2.0\text{ k}\Omega} = 4.5\text{ mA}$ (check by branch sum: $9/3\text{ k} + 9/6\text{ k} = 3.0 + 1.5 = 4.5\text{ mA}$).
- **Why Distractors Fail:** `A` swaps series and parallel answers; `B` reads $R_{\text{eq}}$/doubles incorrectly; `C` computes only the $6\text{ k}\Omega$ branch current ($1.5\text{ mA}$) instead of total parallel current.
- **Reference Note:** [[Resistors]] (`Lab 2 Parts 1 & 2`).

#### Mock Q8 -- Answer: **A**
- **Step-by-Step Solution:** Because both LED branches share the fixed $9.0\text{ V}$ battery rails independently:
  - Branch 1 (untouched): $I_1 = \frac{9.0\text{ V} - 2.0\text{ V}}{1.0\text{ k}\Omega} = 7.0\text{ mA}$ (stays unchanged).
  - Branch 2 (swapped to $2.0\text{ k}\Omega$): $I_2 = \frac{9.0\text{ V} - 2.0\text{ V}}{2.0\text{ k}\Omega} = 3.5\text{ mA}$ (up from $7.0/10\text{ k} = 0.7\text{ mA}$).
  - Total supply current (KCL): $I_T = I_1 + I_2 = 7.0 + 3.5 = 10.5\text{ mA}$.
- **Why Distractors Fail:** Branch 1 is not halved when Branch 2's resistance changes (`B`), `0.7 mA` uses the old $10\text{ k}\Omega$ value (`C`), and `9.0 mA` omits the $2.0\text{ V}$ LED forward drop (`D`).
- **Reference Note:** [[Resistors]] (`Lab 2 Part 3A -- Parallel LED Branches`).

#### Mock Q9 -- Answer: **C**
- **Step-by-Step Solution:** In Lab 2 Part 3 (`Combined Configuration`), `Pin 3` (`e16`) is left unconnected so the potentiometer acts as a two-terminal variable resistor (`0--50 kOhm`) in `Branch 1`, placed in parallel with fixed $10\text{ k}\Omega$ in `Branch 2` downstream of the shared $3.3\text{ k}\Omega$ resistor. Raising `VR` from $0\ \Omega$ upward starves `Branch 1` current (`LED 1` dims) and reduces total current drawn through the upstream $3.3\text{ k}\Omega$ resistor; consequently $V_{3.3\text{k}} = I_T \cdot 3.3\text{ k}\Omega$ shrinks, raising shared node voltage at `col 15` and pushing more current into fixed $10\text{ k}\Omega$ `Branch 2` (`LED 2` brightens, balancing when $\text{VR} = 10\text{ k}\Omega$).
- **Why Distractors Fail:** Passive potentiometers neither invert DC polarity (`A`) nor create AC square waves at unconnected `Pin 3` (`B`), nor does `LED 1` short as a Zener (`D`).
- **Reference Note:** [[Resistors]] (`Lab 2 Part 3B -- Combined Configuration`).

### Modules 04--06: Lab 3, Lab 4 & AC Circuits (Items 10--17)

#### Mock Q10 -- Answer: **B**
- **Step-by-Step Solution:** Computing $\tau = R C$ for $C = 100 \times 10^{-6}\text{ F}$:
  $$\tau_{\text{chg}} = (2200\ \Omega)(100 \times 10^{-6}\text{ F}) = 0.22\text{ s}$$
  $$5\tau_{\text{chg}} = 5 \times 0.22\text{ s} = 1.1\text{ s}$$
  $$\tau_{\text{dis}} = (22{,}000\ \Omega)(100 \times 10^{-6}\text{ F}) = 2.2\text{ s}$$
- **Why Distractors Fail:** `A` swaps charge and discharge time constants; `C` misplaces decimal by $10\times$; `D` omits converting $\mu\text{F}$ vs. $\text{k}\Omega$ consistently.
- **Reference Note:** [[Capacitors]] (`Lab 3 Part 1 -- Asymmetric RC Timing`).

#### Mock Q11 -- Answer: **D**
- **Step-by-Step Solution:** Capacitors combine oppositely to resistors:
  - **Series:** $C_{\text{eq}} = \frac{10 \times 100}{10 + 100} = \frac{1000}{110} \approx 9.09\ \mu\text{F}$ (smaller than the smallest capacitor, yielding a short flash).
  - **Parallel:** $C_{\text{eq}} = 10 + 100 = 110\ \mu\text{F}$ (adds plate area directly, yielding $\sim 12\times$ longer $\tau = R C$ and visibly extended glow).
- **Why Distractors Fail:** `A` applies resistor series/parallel rules to capacitors; `B` invents an arithmetic average ($55\ \mu\text{F}$); `C` ignores series division.
- **Reference Note:** [[Capacitors]] (`Lab 3 Parts 2 & 3`).

#### Mock Q12 -- Answer: **C**
- **Step-by-Step Solution:** Stored electrostatic energy scales with voltage **squared**:
  $$E = \frac{1}{2} C V^2 = \frac{1}{2}(100 \times 10^{-6}\text{ F})(10.0\text{ V})^2 = 5.0 \times 10^{-3}\text{ J} = 5.00\text{ mJ}$$
  (Doubling $V$ from $5\text{ V}$ to $10\text{ V}$ quadruples $1.25\text{ mJ} \times 4 = 5.00\text{ mJ}$.) Before returning/handling, bridge a bleeder **resistor** across leads to dissipate charge slowly.
- **Why Distractors Fail:** `2.50 mJ` (`A`, `B`) wrongly assumes linear scaling $E \propto V$; shorting directly across bare fingers or unresisted LEDs (`A`, `B`) risks burns/LED failure, and twisting pins (`D`) does not safely bleed capacitive energy.
- **Reference Note:** [[Capacitors]] (`Stored Energy & Pre-Discharge Handling`).

#### Mock Q13 -- Answer: **A**
- **Step-by-Step Solution:** Under the piecewise-linear silicon diode model ($V_\gamma = 0.7\text{ V}$, dynamic resistance $r_d = 10\ \Omega$):
  $$I_D = \frac{V_s - V_\gamma}{R_L + r_d} = \frac{5.0\text{ V} - 0.7\text{ V}}{420\ \Omega + 10\ \Omega} = \frac{4.3\text{ V}}{430\ \Omega} = 0.0100\text{ A} = 10.0\text{ mA}$$
- **Why Distractors Fail:** `11.9 mA` (`B`) forgets $V_\gamma = 0.7\text{ V}$ ($5.0/420$); `10.2 mA` (`C`) omits $r_d = 10\ \Omega$ ($4.3/420 = 10.24\text{ mA}$); `1.67 mA` (`D`) performs incorrect arithmetic.
- **Reference Note:** [[Diodes]] (`Three Diode Models -- Piecewise Linear`).

#### Mock Q14 -- Answer: **B**
- **Step-by-Step Solution:** Two forward-biased junctions connected in series require overcoming the **sum** of their forward turn-on thresholds:
  $$V_{\text{threshold,total}} = V_{k,\text{Si}} + V_{F,\text{LED}} \approx 0.7\text{ V} + 2.0\text{ V} = 2.7\text{ V}$$
  Because $2.4\text{ V} < 2.7\text{ V}$, negligible current conducts and the green LED stays OFF.
- **Why Distractors Fail:** Passing the Si diode threshold alone (`A`) is insufficient when a $2.0\text{ V}$ LED sits in the same series branch; diodes neither reverse-conduct low voltage nor self-oscillate at $60\text{ Hz}$ (`C`, `D`).
- **Reference Note:** [[Diodes]] (`Lab 4 Part 1 Series Thresholds`).

#### Mock Q15 -- Answer: **D**
- **Step-by-Step Solution:** In `Lab 4 Part 2`, `LED 1` is forward-biased relative to incoming battery charging current, while anti-parallel `LED 2` sits reverse-biased and remains dark during charging. Because the $100\ \mu\text{F}$ capacitor sits in series with the anti-parallel LED pair to ground, removing the $+9\text{ V}$ jumper and touching that loose lead to ground (`-`) closes the discharge loop backward out of the charged capacitor through `LED 2` (`LED 2` flashes briefly while `LED 1` reverse-blocks).
- **Why Distractors Fail:** Polarity reverses only upon grounded discharge (`A` flips stages); anti-parallel LEDs cannot forward-conduct simultaneously in one DC current direction (`B`, `C`).
- **Reference Note:** [[Diodes]] (`Lab 4 Part 2 -- Bidirectional Dual-LED Capacitor Loop`).

#### Mock Q16 -- Answer: **C**
- **Step-by-Step Solution:** For series $R$ and $X_L$, total impedance forms a $3\text{--}4\text{--}5$ right triangle:
  $$Z = \sqrt{R^2 + X_L^2} = \sqrt{30^2 + 40^2} = \sqrt{900 + 1600} = \sqrt{2500} = 50\ \Omega$$
  By **`ELI` the `ICE` man**, in an inductive (`L`) circuit, **EMF/voltage ($E$) leads current ($I$)** ($\theta = +\arccos(30/50) = +53.13^\circ$).
- **Why Distractors Fail:** Scalar sum $70\ \Omega$ (`A`) ignores $90^\circ$ quadrature phase; subtraction $10\ \Omega$ (`B`) mixes capacitive/inductive cancellation; `D` confuses `ELI` with `ICE` (capacitive lead).
- **Reference Note:** [[AC Circuits]] (`Impedance Triangle & ELI/ICE Phase Rules`).

#### Mock Q17 -- Answer: **A**
- **Step-by-Step Solution:**
  $$S = V_{\text{rms}} \cdot I_{\text{rms}} = (230\text{ V})(6.0\text{ A}) = 1380\text{ VA}$$
  $$P = S \cdot \text{PF} = (1380\text{ VA})(0.75) = 1035\text{ W}$$
- **Why Distractors Fail:** `B` swaps $S$ and $P$; `C` wrongly divides by $0.75$; `D` multiplies by $1 - \text{PF} = 0.25$.
- **Reference Note:** [[AC Circuits]] (`Apparent Power, Real Power & Power Factor`).

### Modules 07--10: Lab 5, Lab 6, Ampacity & Sensors/Comparators (Items 18--26)

#### Mock Q18 -- Answer: **B**
- **Step-by-Step Solution:** In an **NPN** BJT (`Lab 5 Part 1`), the Base is P-type and the Emitter is N-type. Applying positive base drive ($V_{BE} \ge 0.7\text{ V}$ relative to grounded Emitter) forward-biases the Base--Emitter diode, allowing $I_B$ to turn ON heavy Collector--Emitter conduction.
- **Why Distractors Fail:** Reverse-biasing Base--Emitter keeps the transistor in cutoff (`A`); floating the Base (`C`) or tying Emitter to $+9\text{ V}$ with open Collector (`D`) fails NPN switch biasing.
- **Reference Note:** [[Transistors]] (`Lab 5 Part 1 & NPN Terminal Biasing`).

#### Mock Q19 -- Answer: **D**
- **Step-by-Step Solution:** In `Lab 5 Part 2`, Base current is fixed through the $100\text{ k}\Omega$ resistor and Base LED ($I_B = (9 - 1.5 - 0.7)/100\text{ k}\Omega \approx 0.068\text{ mA}$). With $\beta_{\text{DC}} \approx 150$, unconstrained active current would reach $150 \times 0.068\text{ mA} \approx 10.2\text{ mA}$, so replacing the $1\text{ k}\Omega$ collector resistor with $33\text{ k}\Omega$ caps collector current at $I_{C,\text{sat}} \approx (9 - 1.5 - 0.2)/33\text{ k}\Omega \approx 0.221\text{ mA}$, forcing the BJT into **saturation** with an apparent circuit ratio $I_C/I_B \approx 0.221/0.068 \approx 3.25 \approx 3$.
- **Why Distractors Fail:** Saturation clamping -- not multimeter AC selection (`A`), permanent $1/3$ attenuation (`B`), or gain reversal (`C`) -- limits $I_C/I_B$.
- **Reference Note:** [[Transistors]] (`Lab 5 Part 2 -- Saturation Limit`).

#### Mock Q20 -- Answer: **C**
- **Step-by-Step Solution:** Shorting Base directly to Collector (`V_BC = 0 V`) eliminates normal collector depletion reverse bias (`Lab 5 Part 3`), leaving only the forward/reverse P-N characteristics of the remaining **Base--Emitter diode junction** (a standard two-terminal rectifier diode).
- **Why Distractors Fail:** Shorting B--C removes transistor amplification (`A`), does not create inductance (`B`), and still conducts forward current when $V_{BE} \ge 0.7\text{ V}$ (`D`).
- **Reference Note:** [[Transistors]] (`Lab 5 Part 3 -- Diode-Connected BJT`).

#### Mock Q21 -- Answer: **A**
- **Step-by-Step Solution:**
  - Period: $T = (4.0\text{ div})(50\ \mu\text{s/div}) = 200\ \mu\text{s} = 2.0 \times 10^{-4}\text{ s}$.
  - Frequency: $f = \frac{1}{T} = \frac{1}{2.0 \times 10^{-4}\text{ s}} = 5000\text{ Hz} = 5.0\text{ kHz}$.
  - Peak-to-peak amplitude: $V_{pp} = (3.5\text{ div})(2.0\text{ V/div}) = 7.0\text{ V}$.
- **Why Distractors Fail:** `B` misstates $\text{MHz}$ vs. $\text{kHz}$ and halves $V_{pp}$; `C` and `D` miscompute $4 \times 50$ or add instead of multiplying vertical divisions.
- **Reference Note:** [[Oscilloscope]] (`Lab 6 Graticule Readings & Waveform Analysis`).

#### Mock Q22 -- Answer: **B**
- **Step-by-Step Solution:** Before measuring quantitative waveforms (`Lab 6` initial setup), a `10x` passive probe's internal RC divider must match the oscilloscope input capacitance using the $1\text{ kHz}$ square-wave test terminal. Rounding (`under-compensation`) or peaking (`over-compensation`) is corrected by rotating the probe compensation trimmer capacitor until corners are crisp $90^\circ$ angles with flat tops.
- **Why Distractors Fail:** DC coupling with unplugged BNC yields zero signal (`A`), trigger level stabilizes trace capture without changing frequency-compensation corners (`C`), and $1\text{ mV/div}$ clips the signal vertically (`D`).
- **Reference Note:** [[Oscilloscope]] (`Lab 6 Probe Compensation Procedure`).

#### Mock Q23 -- Answer: **D**
- **Step-by-Step Solution:** Discrete amplitude levels scale exponentially as $L = 2^n$:
  - $3\text{ bits}$: $L_1 = 2^3 = 8$ levels.
  - $6\text{ bits}$: $L_2 = 2^6 = 64$ levels.
  Because $64 / 8 = 8$, step height $\Delta = V_{\text{FS}}/2^n$ shrinks by $8\times$, visibly smoothing staircase quantization distortion.
- **Why Distractors Fail:** `A` reverses the bit change; `B` assumes linear $2n$ scaling instead of $2^n$; `C` confuses vertical bit resolution with sampling rate / carrier frequency.
- **Reference Note:** [[Oscilloscope]] (`Sampling & Uniform Quantization`).

#### Mock Q24 -- Answer: **C**
- **Step-by-Step Solution:** Using standard solid-copper AWG resistivity values, decreasing gauge by `6` even numbers (`AWG 18` at $21\ \Omega/\text{km}$ down to `AWG 12` at $5.3\ \Omega/\text{km}$) multiplies cross-sectional copper area roughly **four-fold** and **quarters** $\Omega/\text{km}$ resistance (halving every `3` gauge steps), cutting $I^2 R$ wire heating. Safety wiring places circuit breakers/fuses in **series with the ungrounded Hot line** (`breaking live supply upon fault`) while tying accessible chassis metal to the zero-current **Earth Ground** wire.
- **Why Distractors Fail:** Parallel fuses short rails (`A`), larger AWG numbers denote thinner wire with *lower* ampacity (`B`), and earth ground normally carries zero continuous return current (`D`).
- **Reference Note:** [[Ampacity and Wiring]] (`Solid Copper AWG Rules & 3-Wire Ground Safety`).

#### Mock Q25 -- Answer: **A**
- **Step-by-Step Solution:** Applying the unloaded voltage divider formula $V_{\text{out}} = V_{\text{in}} \frac{R_2}{R_1 + R_2}$ with $V_{\text{in}} = 10.0\text{ V}$ and $R_1 = 4.0\text{ k}\Omega$:
  - Initial ($R_2 = 1.0\text{ k}\Omega$): $V_{\text{out}} = 10.0 \cdot \frac{1.0}{4.0 + 1.0} = 10.0 \cdot \frac{1}{5} = 2.0\text{ V}$.
  - Shifted ($R_2 = 6.0\text{ k}\Omega$): $V_{\text{out}} = 10.0 \cdot \frac{6.0}{4.0 + 6.0} = 10.0 \cdot \frac{6}{10} = 6.0\text{ V}$.
- **Why Distractors Fail:** `B` calculates top-resistor drop $V_{R_1}$ instead of bottom sensor drop $V_{R_2}$; `C` and `D` ignore divider proportionality.
- **Reference Note:** [[Sensor Controls, Comparator and Voltage Divider]] (`Resistive Sensor Divider Analysis`).

#### Mock Q26 -- Answer: **B**
- **Step-by-Step Solution:** An open-loop comparator multiplies differential voltage $V_d = V_+ - V_- = 5.5\text{ V} - 4.0\text{ V} = +1.5\text{ V}$ by immense open-loop gain ($A_{OL} \sim 10^5$), driving the output immediately to positive saturation $+V_{\text{sat}} \approx +12\text{ V}$.
- **Why Distractors Fail:** Negative saturation (`A`) triggers only when $V_- > V_+$; open-loop comparators do not output unity $V_+ - V_-$ (`C`) nor stay at $0\text{ V}$ unless inputs match (`D`).
- **Reference Note:** [[Sensor Controls, Comparator and Voltage Divider]] (`Open-Loop Op-Amp Comparators`).

### Modules 11--12: Lab 8 Communication & Machine Project 2 PCB Design (Items 27--31)

#### Mock Q27 -- Answer: **D**
- **Step-by-Step Solution:**
  - AM modulation index:
    $$m = \frac{V_{\max} - V_{\min}}{V_{\max} + V_{\min}} = \frac{8.0 - 2.0}{8.0 + 2.0} = \frac{6.0}{10.0} = 0.60 \quad (60\%)$$
  - Sideband frequencies for $f_c = 1000\text{ kHz}$ and $f_m = 5\text{ kHz}$:
    $$f_{\text{LSB}} = 1000 - 5 = 995\text{ kHz}, \quad f_{\text{USB}} = 1000 + 5 = 1005\text{ kHz}$$
  - Occupied AM bandwidth:
    $$\text{BW} = f_{\text{USB}} - f_{\text{LSB}} = 2 f_m = 2(5\text{ kHz}) = 10\text{ kHz}$$
- **Why Distractors Fail:** `A` miscalculates $m = (8-2)/8 = 0.75$ and doubles $2f_m$; `B` sets $\text{BW} = f_m$ instead of $2f_m$; `C` divides $8/6$ inverted.
- **Reference Note:** [[Principles of Communication]] (`AM Envelope & Sidebands`, `Lab 8 Part I`).

#### Mock Q28 -- Answer: **C**
- **Step-by-Step Solution:** Rearranging $\beta = \frac{k_m \hat{m}}{f_m}$ for $k_m$ at first carrier null ($\beta \approx 2.405$):
  $$k_m = \frac{\beta \cdot f_m}{\hat{m}} = \frac{2.405 \times 4.0\text{ kHz}}{2.0\text{ V}} = 2.405 \times 2.0 = 4.81\text{ kHz/V}$$
- **Why Distractors Fail:** `A` divides $\hat{m}/f_m$ backwards ($2.405 \times 2/4 \approx 1.20$); `B` omits $f_m/\hat{m} = 2$; `D` multiplies by $4$ instead of dividing by $2$.
- **Reference Note:** [[Principles of Communication]] (`Lab 8 Part III -- FM Carrier Null`).

#### Mock Q29 -- Answer: **A**
- **Step-by-Step Solution:** Checking against every strict Machine Project 2 design specification:
  - Board type: **photoresist single-sided PCB** (`A` passes; Universal perfboard `B` and plain copper-only `C` are disallowed).
  - Dimensions: target $5\times 5\text{ cm}$, max $6\times 6\text{ cm}$ (`A` $= 5\times 5\text{ cm}$ passes; `C` $= 7\text{ cm}$ fails).
  - Routing: **manual bottom copper layer only**, minimum trace width **$0.8\text{ mm}$** (`A` uses $0.9\text{ mm}$ manual bottom passes; `B` uses autorouter & $0.5\text{ mm}$, `C` uses top copper & SMD, `D` violates $0.8\text{ mm}$ at $0.4\text{ mm}$).
  - Parts: Red/Green/Orange LEDs, $500\ \Omega\text{--}5\text{ k}\Omega$ resistors (`1 kOhm` inside range), 4-pin header `GPIO1..3, GND`.
- **Reference Note:** [[PCB Design and Machine Project 2]] (`DipTrace Rules & Material Specs`).

#### Mock Q30 -- Answer: **B**
- **Step-by-Step Solution:** Residual voltage dropped across each series resistor equals $V_R = V_{\text{GPIO}} - V_{\text{LED}} = 3.3\text{ V} - 1.8\text{ V} = 1.5\text{ V}$. Evaluating both allowed MP2 bounds:
  $$I_{\max} = \frac{1.5\text{ V}}{500\ \Omega} = 3.00\text{ mA}, \quad I_{\min} = \frac{1.5\text{ V}}{5000\ \Omega} = 0.30\text{ mA}$$
- **Why Distractors Fail:** `A` omits subtracting $V_{\text{LED}} = 1.8\text{ V}$ ($3.3/500 = 6.6\text{ mA}$); `C` halves current artificially; `D` swaps which resistor gives maximum vs. minimum current.
- **Reference Note:** [[PCB Design and Machine Project 2]] (`ESP32 GPIO LED Current Limiting`).

#### Mock Q31 -- Answer: **D**
- **Step-by-Step Solution:** Reading multimeter resistance (`power OFF`) across etched copper nodes directly isolates fabrication defects before powering the ESP32:
  - `GPIO1 -> R1` ($0.3\ \Omega$): negligible copper resistance confirms a continuous intact trace.
  - `GPIO3 -> R3` (`OL`): infinite resistance reveals a broken/over-etched copper trace that must be repaired (bridged cleanly) before soldering/demoing.
  - `GPIO2` signal trace to `GND` ($0.2\ \Omega$): two isolated nets measuring near zero ohms means an unwanted copper/solder **short circuit** that would short `GPIO2` straight to ground if energized and must be cleared first.
- **Why Distractors Fail:** `A` misinterprets normal vs. short vs. open readings; `B` incorrectly claims DipTrace can detect physical etching defects; `C` destroys remaining valid traces via over-etching.
- **Reference Note:** [[PCB Design and Machine Project 2]] (`Testing, Inspection & Example 2`).

## References & Navigation

- **Previous Topic:** [[[QZ] NSETRON Mock Written Exam]]
- **Related Notes:** [[Written Exam Coverage and Formula Sheet]], [[[REV] NSETRON Written Exam Reviewer]], [[[ANS] NSETRON Written Exam Reviewer Answer Key]]
