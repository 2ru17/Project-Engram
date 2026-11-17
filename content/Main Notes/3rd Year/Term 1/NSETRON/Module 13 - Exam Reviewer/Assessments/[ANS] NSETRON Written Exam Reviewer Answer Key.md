---
id: nsetron_13_ans_written_exam_reviewer
type: note
course: NSETRON
topic: NSETRON Written Exam Reviewer Answer Key
status: completed
---
# [ANS] NSETRON Written Exam Reviewer Answer Key

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSETRON]] #[[Electronics]] #[[Written Exam Reviewer]]

---

## Quick Summary Matrix

- **Companion Reviewer:** [[[REV] NSETRON Written Exam Reviewer]] (`31` four-option multiple-choice items across breadboards, passive components, semiconductors, oscilloscope measurement, communication systems, and Machine Project 2 PCB fabrication).

| Item # | Answer | Topic / Module |
| :---: | :---: | :--- |
| `1` | **B** | [[Basic Electricity and Electronic Components]] |
| `2` | **C** | [[Basic Electricity and Electronic Components]] |
| `3` | **B** | [[Basic Electricity and Electronic Components]] / [[Resistors]] |
| `4` | **B** | [[Resistors]] |
| `5` | **A** | [[Resistors]] |
| `6` | **B** | [[Resistors]] |
| `7` | **D** | [[Basic Electricity and Electronic Components]] |
| `8` | **B** | [[Capacitors]] |
| `9` | **C** | [[Capacitors]] |
| `10` | **A** | [[Capacitors]] |
| `11` | **D** | [[Capacitors]] |
| `12` | **D** | [[Capacitors]] |
| `13` | **B** | [[Diodes]] |
| `14` | **C** | [[Diodes]] |
| `15` | **B** | [[Diodes]] |
| `16` | **D** | [[Diodes]] / [[AC Circuits]] |
| `17` | **C** | [[Diodes]] |
| `18` | **A** | [[Transistors]] |
| `19` | **B** | [[Transistors]] |
| `20` | **B** | [[Oscilloscope]] |
| `21` | **B** | [[Oscilloscope]] |
| `22` | **B** | [[Oscilloscope]] |
| `23` | **B** | [[Oscilloscope]] |
| `24` | **B** | [[Principles of Communication]] |
| `25` | **A** | [[Principles of Communication]] |
| `26` | **B** | [[Principles of Communication]] |
| `27` | **D** | [[Principles of Communication]] |
| `28` | **C** | [[Principles of Communication]] / [[Oscilloscope]] |
| `29` | **D** | [[PCB Design and Machine Project 2]] |
| `30` | **C** | [[PCB Design and Machine Project 2]] |
| `31` | **D** | [[PCB Design and Machine Project 2]] |

---

## Worked Solutions (Items 1--31)

### Breadboards, Lab 1 & Resistors (Items 1--7)

#### Item 1 -- Answer: **B**
- **Derivation & Reasoning:** On an 830-hole solderless breadboard, terminal rows `f` through `j` in any single numbered column (`col 4` here) share one continuous underlying metal spring clip. Placing both legs of a push-button switch into `f4` and `g4` permanently bridges the two terminals together, creating a permanent short bypass around the switch so current flows to the LED regardless of button actuation.
- **Why Distractors Fail:** Tactile SPST switches do not have diode polarity (`A`), col `4` requires no dedicated ground (`C`), and switches work across any columns (`D`) as long as their separated terminals straddle different columns or the central trench (`e`--`f`).
- **Reference Note:** [[Basic Electricity and Electronic Components]] (`Breadboard Bus Topology & Lab 1`).

#### Item 2 -- Answer: **C**
- **Derivation & Reasoning:** In Lab 1 Part 2, a $50\text{ k}\Omega$ potentiometer varies linearly down to $0\ \Omega$. At $R_{\text{pot}} = 0\ \Omega$ on a $9\text{ V}$ rail with an LED forward drop $V_{\text{LED}} \approx 1.5\text{--}2.0\text{ V}$, removing the fixed series resistor would apply $7\text{ V}$ nearly directly across the LED diode junction, causing destructive current runaway. With the fixed $1\text{ k}\Omega$ safety resistor in series ($R_{\min} = 1\text{ k}\Omega$), maximum LED current is safely bounded to $I_{\max} = \frac{9 - 2}{1000} = 7.0\text{ mA}$ (at $V_{\text{LED}} = 1.5\text{ V}$, $7.5\text{ mA}$), while at $50\text{ k}\Omega$ total $R = 51\text{ k}\Omega$ dims it to $\approx 0.14\text{ mA}$.
- **Why Distractors Fail:** Adding $1\text{ k}\Omega$ slightly lowers (not raises) maximum current at full turn (`A`), does not force the LED to stay bright (`B`), and keeps the elements strictly in series (`D`).
- **Reference Note:** [[Basic Electricity and Electronic Components]] (`Lab 1 Part 2`).

#### Item 3 -- Answer: **B**
- **Derivation & Reasoning:** By Ohm's law ($I = \frac{V_s - V_{\text{LED}}}{R}$), dropping $R$ from $100\text{ k}\Omega$ to $1\text{ k}\Omega$ reduces resistance by $100\times$. Assuming $V_s - V_{\text{LED}} \approx 7.0\text{ V}$, current increases from $0.07\text{ mA}$ (`very dim/barely lit`) to $7.0\text{ mA}$ (`brightly lit`).
- **Why Distractors Fail:** Resistance decreased rather than increased (`A`), voltage across a conducting resistor does not collapse to zero (`C`), and brightness scales with current (`D`).
- **Reference Note:** [[Basic Electricity and Electronic Components]] (`Lab 1 Part 1`); [[Basic Electrical Theory]] (`Ohm's Law`).

#### Item 4 -- Answer: **B**
- **Derivation & Reasoning:** Series resistances add directly: $R_T = R_1 + R_2$. With $3.3\text{ k}\Omega + 100\text{ k}\Omega$, $R_T = 103.3\text{ k}\Omega$ (dominated by the $100\text{ k}\Omega$ resistor, choking loop current to $\approx 0.068\text{ mA}$ at $7\text{ V}$ drop). Replacing $100\text{ k}\Omega$ with $10\text{ k}\Omega$ yields $R_T = 13.3\text{ k}\Omega$, cutting resistance by a factor of $103.3 / 13.3 \approx 7.77\times$ and raising LED current proportionally ($\approx 0.53\text{ mA}$).
- **Why Distractors Fail:** The circuit is series, not parallel (`A`), in series the *larger* resistor drops more voltage and absorbs greater power $P = I^2 R$ (`C`), and passive resistor swaps never multiply battery voltage (`D`).
- **Reference Note:** [[Resistors]] (`Lab 2 Part 1`).

#### Item 5 -- Answer: **A**
- **Derivation & Reasoning:** Computing parallel equivalent resistance $R_{\text{eq}} = \frac{R_1 R_2}{R_1 + R_2}$:
  - Before: $3.3\text{ k}\Omega \parallel 100\text{ k}\Omega = \frac{330}{103.3} \approx 3.195\text{ k}\Omega$, drawing $I_T = \frac{9\text{ V}}{3.195\text{ k}\Omega} \approx 2.82\text{ mA}$.
  - After: $3.3\text{ k}\Omega \parallel 1\text{ k}\Omega = \frac{3.3}{4.3} \approx 0.767\text{ k}\Omega$, drawing $I_T = \frac{9\text{ V}}{0.767\text{ k}\Omega} \approx 11.73\text{ mA}$.
  Because a smaller resistor adds an easier parallel path, $R_{\text{eq}}$ drops well below even the $3.3\text{ k}\Omega$ branch, increasing total drawn current $I_T = I_1 + I_2$.
- **Why Distractors Fail:** The $3.3\text{ k}\Omega$ branch still carries its own constant $9\text{ V}/3.3\text{ k}\Omega$ current (`B`, `C`), and supply voltage stays fixed at $9\text{ V}$ (`D`).
- **Reference Note:** [[Resistors]] (`Lab 2 Part 2`).

#### Item 6 -- Answer: **B**
- **Derivation & Reasoning:** Parallel branches terminate across the same constant-voltage rails ($V_A = V_B = V_s$). Therefore Branch A's current $I_A = \frac{V_s - V_{\text{LED,A}}}{3.3\text{ k}\Omega}$ depends only on Branch A elements and source voltage, remaining independent as $I_B$ changes with the potentiometer.
- **Why Distractors Fail:** Both LEDs operate normally (`A`), an ideal/stiff supply prevents one branch's variable resistor from reducing the rail voltage across another parallel branch (`C`), and currents divide simultaneously across all closed branches (`D`).
- **Reference Note:** [[Resistors]] (`Lab 2 Part 3 -- Parallel LED Branches`).

#### Item 7 -- Answer: **D**
- **Derivation & Reasoning:** On DLSU-CT laboratory 830-hole breadboards, a printed `"W"` mark near the middle of the top/bottom horizontal power rails physically separates the left half (`columns 1--30`) from the right half (`columns 35+`). Placing the ground return wire on the opposite side of the `"W"` leaves the horizontal bus electrically broken (open ground return), so zero circuit current flows.
- **Why Distractors Fail:** The bus is NOT continuous across the `"W"` mark (`A`), outer power rails run horizontally, not vertically (`B`), and while `C` correctly says the circuit fails, its explanation falsely claims all holes on the same row connect continuously.
- **Reference Note:** [[Basic Electricity and Electronic Components]] (`Breadboard Split Rails & DLSU CT "W" Divider`).

### Capacitors & Lab 3 (Items 8--12)

#### Item 8 -- Answer: **B**
- **Derivation & Reasoning:** Using $C = 100\ \mu\text{F}$ from Lab 3:
  - Charging time constant through $1\text{ k}\Omega$: $\tau_{\text{chg}} = (1000\ \Omega)(100 \times 10^{-6}\text{ F}) = 0.1\text{ s}$ ($5\tau \approx 0.5\text{ s}$).
  - Discharging time constant through $10\text{ k}\Omega$: $\tau_{\text{dis}} = (10{,}000\ \Omega)(100 \times 10^{-6}\text{ F}) = 1.0\text{ s}$ ($5\tau \approx 5.0\text{ s}$).
  Higher discharge resistance produces a $10\times$ larger $\tau = RC$, so the capacitor loses voltage and dims the LED much more slowly than it charged.
- **Why Distractors Fail:** Capacitors do not amplify energy (`A`), voltage decays exponentially $v_C(t) = V_0 e^{-t/\tau}$ rather than clamping at a constant $0.7\text{ V}$ (`C`), and time extension is governed primarily by $\tau = RC$ rather than rising LED resistance (`D`).
- **Reference Note:** [[Capacitors]] (`Lab 3 Part 1 -- RC Charging & Discharging`).

#### Item 9 -- Answer: **C**
- **Derivation & Reasoning:** Discharge duration scales directly with $\tau_{\text{dis}} = R_{\text{dis}} C$, and stored energy scales as $E = \frac{1}{2} C V^2$. Increasing $C$ (e.g., from $100\ \mu\text{F}$ to $220\ \mu\text{F}$, multiplying stored energy at $9\text{ V}$ from $4.05\text{ mJ}$ to $8.91\text{ mJ}$ and $\tau$ by $2.2\times$) or raising $R_{\text{dis}}$ slows exponential decay so the LED remains lit longer.
- **Why Distractors Fail:** Dropping to $10\ \mu\text{F}$ cuts runtime by $10\times$ (`A`), lowering $R$ speeds discharge (`B`), and reversing electrolytic capacitor polarity risks dielectric breakdown/rupture (`D`).
- **Reference Note:** [[Capacitors]] (`RC Time Constant & Stored Energy`).

#### Item 10 -- Answer: **A**
- **Derivation & Reasoning:** A capacitor stores energy in an electric field across dielectric plates ($E = \frac{1}{2} C V^2$, only $4.05\text{ mJ}$ at $100\ \mu\text{F}, 9\text{ V}$) whose terminal voltage falls exponentially as charge leaves. Chemical batteries store far greater energy electrochemically at nearly steady terminal voltage during discharge.
- **Why Distractors Fail:** Electrolytic/DC lab capacitors store DC electrostatic charge (`B`), batteries discharge slowly over hours rather than instantly (`C`), and neither device creates net electrons from nothing or relies on free proton storage (`D`).
- **Reference Note:** [[Capacitors]] (`Lab 3 Conclusion & Energy Storage Physics`).

#### Item 11 -- Answer: **D**
- **Derivation & Reasoning:** In Lab 3 Part 4 (loose-wire capacitor transfer), charging a capacitor too briefly leaves $v_C(t) = V_s(1 - e^{-t/\tau})$ short of full voltage, or using a small $C$ stores too little energy $E = \frac{1}{2} C V^2$ to keep the capacitor above the LED's $\approx 1.5\text{--}2\text{ V}$ forward threshold long enough for a visible glow once disconnected. Charging longer or increasing $C$ provides sufficient energy to turn on the LED noticeably.
- **Why Distractors Fail:** Charging time does not alter resistor ohms (`A`), batteries do not create feedback loops across removed wires (`B`), and $50$-cycle conditioning does not exist (`C`).
- **Reference Note:** [[Capacitors]] (`Lab 3 Part 4 -- Loose-Wire Activity`).

#### Item 12 -- Answer: **D**
- **Derivation & Reasoning:** Capacitors retrieved from stock bins may retain residual voltage $V_0$ from earlier experiments, risking unexpected sparks, shocks, or distorted initial RC measurements. Discharging across a bleeder **resistor** dissipates $E = \frac{1}{2}CV_0^2$ safely at controlled current $I = V_0/R$.
- **Why Distractors Fail:** Connecting a charged capacitor directly to an LED without a limiting resistor risks excessive surge current (`A`); RFI/crosstalk inductance from twisting legs (`B`, `C`) does not discharge capacitive charge and is physically irrelevant here.
- **Reference Note:** [[Capacitors]] (`Safe Handling & Pre-Discharge Procedure`).

### Diodes & Transistors: Labs 4 & 5 (Items 13--19)

#### Item 13 -- Answer: **B**
- **Derivation & Reasoning:** Reverse bias (positive terminal to N-type cathode, negative to P-type anode) pulls majority carriers away from the junction, widening the depletion zone. Consequently, conduction is blocked (ideal diode model: open switch) until reverse breakdown voltage is exceeded.
- **Why Distractors Fail:** Low-resistance conduction occurs in forward bias above $0.7\text{ V}$ (`A`), diodes are not oscillators (`C`), and converting DC to AC is inversion, not reverse biasing (`D`).
- **Reference Note:** [[Diodes]] (`P-N Junction Bias Modes`).

#### Item 14 -- Answer: **C**
- **Derivation & Reasoning:** Under the offset/threshold diode model, a forward-biased GaAs LED remains essentially non-conducting until applied voltage reaches its threshold/barrier turn-on voltage ($\approx 1.5\text{ V}$). Because $1.0\text{ V} < 1.5\text{ V}$, the barrier is not overcome and the LED remains OFF.
- **Why Distractors Fail:** Under-voltage never produces full brightness (`A`) or over-voltage destruction (`B`), and supply voltage below turn-on does not shift emission wavelength to IR (`D`).
- **Reference Note:** [[Diodes]] (`Lab 4 & Turn-On Threshold V_F`).

#### Item 15 -- Answer: **B**
- **Derivation & Reasoning:** Both an ordinary rectifier diode and an LED are polarized two-terminal devices placed in series (`Lab 4 Part 1`). If wires and switch are verified intact, reversing either the diode (cathode silver band facing $+V$) or the LED (shorter leg/flat side facing $+V$) breaks forward current across the entire series path.
- **Why Distractors Fail:** Lowering supply voltage worsens threshold shortfall (`A`), adding another series switch cannot push current past a reverse-biased junction (`C`), and shorting the safety resistor risks LED destruction if the circuit later closes (`D`).
- **Reference Note:** [[Diodes]] (`Lab 4 Part 1 Troubleshooting`).

#### Item 16 -- Answer: **D**
- **Derivation & Reasoning:** **Rectification** is the process of converting alternating current (AC, periodic polarity reversal) into unidirectional/pulsating direct current (DC) using diodes.
- **Why Distractors Fail:** Transformation (`A`) steps AC voltage magnitude up or down via magnetic coils while remaining AC; filtering (`B`) smooths pulsating DC ripple with capacitors; regulation (`C`) holds output DC voltage steady against load/line changes.
- **Reference Note:** [[Diodes]] (`Rectification Basics`) / [[AC Circuits]] (`Power Supply Stages`).

#### Item 17 -- Answer: **C**
- **Derivation & Reasoning:** A **one-way check valve** stays sealed against reverse pressure and opens only when forward water pressure exceeds its spring/cracking force ($\leftrightarrow V_k \approx 0.7\text{ V}$), precisely modeling unidirectional diode conduction.
- **Why Distractors Fail:** A pump models a voltage/current source (`A`), a tank with flexible diaphragm models a **capacitor** (`B`), and a pipe filled with rocks models a **resistor** (`D`).
- **Reference Note:** [[Diodes]] (`Mechanical Analogies of Circuit Elements`).

#### Item 18 -- Answer: **A**
- **Derivation & Reasoning:** In `Laboratory Experiment 5 Part 1`, leaving the NPN BJT Base open forces $I_B = 0\text{ mA}$. In the cutoff region, collector current $I_C = \beta_{\text{DC}} I_B \approx 0\text{ mA}$ (aside from negligible leakage), so the Collector--Emitter path behaves as an **open electronic switch** and the collector LED stays OFF.
- **Why Distractors Fail:** Closed/saturated switching corresponds to high $I_B$ (`B`), a BJT is not a capacitor (`C`), and an NPN transistor in cutoff blocks forward-biased collector load current rather than acting as a reversed LED (`D`).
- **Reference Note:** [[Transistors]] (`Lab 5 Part 1 -- Transistor as a Switch`).

#### Item 19 -- Answer: **B**
- **Derivation & Reasoning:** In `Laboratory Experiment 5 Part 2`, passing small base drive through a $100\text{ k}\Omega$ resistor and Base LED produces a tiny control current $I_B \approx (9 - 1.5 - 0.7)/100\text{ k}\Omega \approx 0.068\text{ mA}$, which linearly controls a much larger Collector--Emitter current $I_C = \beta_{\text{DC}} I_B$ limited externally by the $1\text{ k}\Omega$ Collector resistor ($I_{C,\text{sat}} \approx (9 - 1.5 - 0.2)/1\text{ k}\Omega = 7.3\text{ mA}$, making the Collector LED dramatically brighter than the Base LED). Swapping that $1\text{ k}\Omega$ collector resistor up to $33\text{ k}\Omega$ externally clamps collector saturation current down to $I_{C,\text{sat}} \approx 0.221\text{ mA}$, reducing the effective ratio $I_C/I_B$ to $\approx 3.25 \approx 3\times$.
- **Why Distractors Fail:** Base and Collector currents are governed by BJT current gain rather than equal parallel voltage division (`A`), BJTs do not provide negative resistance here (`C`), and Lab 5 uses pure DC (`D`).
- **Reference Note:** [[Transistors]] (`Lab 5 Part 2 -- Current Gain & Brightness`).

### Oscilloscope, Signals & Communication: Labs 6 & 8 + MP2 (Items 20--31)

#### Item 20 -- Answer: **B**
- **Derivation & Reasoning:** With horizontal time-base ($\text{s/div}$) held fixed, raising frequency $f$ decreases period $T = 1/f$. Across a fixed 10-division screen width ($T_{\text{screen}} = 10 \times \text{time/div}$), the number of displayed cycles $N_{\text{cycles}} = T_{\text{screen}} / T = f \cdot T_{\text{screen}}$ rises directly, compressing cycles closer together horizontally.
- **Why Distractors Fail:** Vertical gain ($\text{V/div}$), not frequency, controls height (`A`), higher frequency produces denser oscillations rather than a flat DC trace (`C`), and traces remain visible as long as vertical/trigger limits allow (`D`).
- **Reference Note:** [[Oscilloscope]] (`Time-Base & Frequency Controls`, `Lab 6`).

#### Item 21 -- Answer: **B**
- **Derivation & Reasoning:** In time domain, observed trace voltage equals $v_{\text{obs}}(t) = v_{\text{signal}}(t) + v_{\text{noise}}(t)$. As SNR drops, broadband random noise voltage $v_{\text{noise}}(t)$ adds unpredictable high-frequency fuzz and thickness onto the trace, obscuring the underlying waveform shape and trigger point.
- **Why Distractors Fail:** Adding random noise adds spectral clutter rather than cleanly shifting fundamental frequency (`A`), creating a square wave (`C`), or zeroing amplitude (`D`).
- **Reference Note:** [[Oscilloscope]] (`Noise & SNR Effects`).

#### Item 22 -- Answer: **B**
- **Derivation & Reasoning:** A uniform quantizer maps an infinite continuum of analog voltages onto $2^n$ evenly spaced discrete quantization levels ($\Delta = V_{\text{FS}}/2^n$). Holding each quantized sample level constant across step intervals produces a stepped "staircase" approximation of the smooth sine wave.
- **Why Distractors Fail:** High-frequency noise makes fuzzy traces (`A`), display pixel resolution (`C`) is separate from quantization bit depth, and quantizers act on voltage/digital code rather than magnetic flux (`D`).
- **Reference Note:** [[Oscilloscope]] (`Sampling & Uniform Quantization`).

#### Item 23 -- Answer: **B**
- **Derivation & Reasoning:** Number of representable amplitude levels equals $L = 2^n$:
  - At $n = 16\text{ bits/sample}$: $L = 2^{16} = 65{,}536$ fine voltage steps.
  - At $n = 1\text{ bit/sample}$: $L = 2^1 = 2$ coarse output levels (high/low comparator threshold).
  Replacing smooth audio with $2$ levels introduces extreme quantization noise/distortion (`SQNR` collapses).
- **Why Distractors Fail:** Removing 15 bits destroys waveform fidelity (`A`), bit depth alters amplitude resolution rather than sampling rate/pitch (`C`) or playback speed (`D`).
- **Reference Note:** [[Oscilloscope]] (`Bit Depth & Quantization Levels`).

#### Item 24 -- Answer: **B**
- **Derivation & Reasoning:** Standard AM instantaneous envelope follows $E(t) = V_c(1 + m \sin\omega_m t)$. For $0 \le m \le 1$, $E(t) \ge 0$ everywhere; when $m = 1.5 > 1$, the term $1 + 1.5(-1) = -0.5 < 0$ during negative message peaks. Because carrier envelope cannot maintain negative magnitude cleanly in a simple diode envelope detector, zero crossings reverse carrier phase ($180^\circ$ flips) and clip negative troughs (**overmodulation**), creating harsh audio/sideband splatter and breaking simple envelope recovery (`Lab 8 Part I & II`).
- **Why Distractors Fail:** Carrier frequency $f_c$ remains fixed (`A`), message energy actually increases/distorts rather than disappearing (`C`), and AM does not become FM (`D`).
- **Reference Note:** [[Principles of Communication]] (`AM Modulation Index & Lab 8 Parts I--II`).

#### Item 25 -- Answer: **A**
- **Derivation & Reasoning:** By definition, AM keeps carrier frequency constant while varying peak carrier amplitude along the modulating envelope, whereas FM keeps carrier amplitude constant while varying instantaneous cycle density (frequency deviation $\Delta f$) above and below $f_c$.
- **Why Distractors Fail:** Both standard analog AM and FM modulate sinusoidal carriers rather than square/triangle waves (`B`), option `C` reverses AM and FM behavior, and both carry an RF carrier wave (`D`, except suppressed-carrier DSB-SC/SSB AM modes).
- **Reference Note:** [[Principles of Communication]] (`AM vs. FM Time-Domain Comparison`).

#### Item 26 -- Answer: **B**
- **Derivation & Reasoning:** Electrical noise, lightning, and ignition interference primarily superpose additive **amplitude** spikes onto transmitted waves. Because AM stores message intelligence directly in amplitude height, noise passes straight to the demodulator; FM receivers instead pass the constant-amplitude FM signal through **amplitude limiter** stages that slice off noise spikes without disturbing the frequency-encoded zero crossings.
- **Why Distractors Fail:** Both AM and FM travel at the speed of light ($c$ in vacuum / medium velocity) (`A`), FM radiates active RF power (`C`), and AM transmits easily over coax/wires (`D`).
- **Reference Note:** [[Principles of Communication]] (`FM Noise Immunity & Limiters`).

#### Item 27 -- Answer: **D**
- **Derivation & Reasoning:** Standard `LabAlive` virtual signal-generator modes produce periodic `Sine`, `Square`, `Triangular`, `Sawtooth`, and `DC` waves as well as sampled `Speech` audio clips (such as the LabAlive speech sample). Because all three listed waveform choices (`A`, `B`, `C`) are available in LabAlive, **`D` (None of these)** is the matching answer to the "except" prompt.
- **Reference Note:** [[Principles of Communication]] (`Lab 8 Apparatus & Exam Traps`).

#### Item 28 -- Answer: **C**
- **Derivation & Reasoning:** Both oscilloscopes and spectrum analyzers use high-impedance measurement inputs (`Lab 8` connects both to `s(t)` at the same modulator output node without loading or harming the circuit). However, an **oscilloscope** plots voltage amplitude versus **time** (showing modulated envelopes or cycle compression), whereas a **spectrum analyzer** plots signal magnitude versus **frequency** (showing carrier spike $f_c$ and sidebands $f_c \pm k f_m$).
- **Why Distractors Fail:** Their horizontal domains differ (`A`), high-impedance parallel probing is non-destructive for low-voltage lab signals (`B`), and `Lab 8` runs both instruments concurrently on the same node (`D`).
- **Reference Note:** [[Principles of Communication]] (`Lab 8 Part I`) / [[Oscilloscope]] (`Time vs. Frequency Domain`).

#### Item 29 -- Answer: **D**
- **Derivation & Reasoning:** A suspect hairline break or over-etched spot is a **physical defect** on the fabricated copper PCB. Setting a multimeter to **resistance or continuity mode** (with circuit power OFF) across both copper endpoints of that trace yields near-$0\ \Omega$ (`beep`) if continuous or `OL` / infinite resistance if broken.
- **Why Distractors Fail:** Breadboard rebuilding (`A`), DipTrace (`B`), and TinkerCAD (`C`) only test circuit logic/ideal schematics -- none of them can measure physical copper cracks on an etched board.
- **Reference Note:** [[PCB Design and Machine Project 2]] (`Testing, Inspection & Example 2`).

#### Item 30 -- Answer: **C**
- **Derivation & Reasoning:** Etching uses corrosive **Muriatic Acid ($\text{HCl}$)** + **Agua Oxenada ($\text{H}_2\text{O}_2$)** (`Machine Project 2`), requiring **gloves**, skin-covering clothing (long sleeves/lab gown), ventilation away from fumes, and safe disposal.
- **Why Distractors Fail:** Sloshing/shaking acids violently risks hazardous chemical splashes (`A`), removing protective backing and leaving presensitized photoresist under light for 20 minutes *before* taping the mask ruins the photosensitive coating completely (`B`), making `D` (`Both A and B`) doubly incorrect.
- **Reference Note:** [[PCB Design and Machine Project 2]] (`Safety Rules & Fabrication Mistakes`).

#### Item 31 -- Answer: **D**
- **Derivation & Reasoning:** Tracing causal fabrication dependencies in Machine Project 2:
  1. `Layout Printing` onto acetate/tracing paper happens first (never `TinkerCAD printing`, eliminating `A`).
  2. `UV Exposure` transfers the printed mask onto the presensitized board *before* chemical baths (`C` skips UV exposure, `B` puts UV before printing and etching before developer).
  3. Chemical processing (`Developer Mixing` in traditional presensitized flows, followed by `Agua Oxenada + HCl` copper etching; note the lab technician confirmed a separate developer chemical is no longer required).
  4. `Drilling` component holes MUST come *before* `Soldering` components (`C` swaps soldering before drilling).
  5. `ESP32 installation and programming` connects via the 4-pin header last to test traffic-light operation.
- **Reference Note:** [[PCB Design and Machine Project 2]] (`Exact Project 2 Fabrication Sequence & Lab Update Note`).

## References & Navigation

- **Previous Topic:** [[[REV] NSETRON Written Exam Reviewer]]
- **Next Topic:** [[[QZ] NSETRON Mock Written Exam]]
- **Related Notes:** [[Written Exam Coverage and Formula Sheet]], [[[ANS] NSETRON Mock Written Exam Answer Key]]
