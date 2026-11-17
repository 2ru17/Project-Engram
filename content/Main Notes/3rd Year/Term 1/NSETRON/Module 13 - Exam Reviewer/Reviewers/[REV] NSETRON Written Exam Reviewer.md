---
id: nsetron_13_rev_written_exam_reviewer
type: reviewer
course: NSETRON
topic: NSETRON Written Exam Reviewer
status: completed
---
# [REV] NSETRON Written Exam Reviewer

> [!info] Document Metadata
> **Course:** `=this.course` | **Topic:** `=this.topic` | **Status:** `=this.status`

**Tags:** #[[Computer Science]] #[[NSETRON]] #[[Electronics]] #[[Written Exam Reviewer]]

---

## Overview

This written-exam reviewer covers all core topics tested in NSETRON (`Practical Electricity and Electronics`): breadboard wiring (`"W"` rail breaks and terminal strips), resistor networks (`Lab 1`--`Lab 2`), RC charge/discharge capacitors (`Lab 3`), semiconductor diodes (`Lab 4`), BJT switching and current gain (`Lab 5`), oscilloscope scaling, noise/SNR, and uniform quantization (`Lab 6`), analog AM/FM modulation in `LabAlive` (`Lab 8`), and single-layer DipTrace PCB design, chemical etching, and trace testing (`Machine Project 2`). Full step-by-step explanations and circuit checks live in [[[ANS] NSETRON Written Exam Reviewer Answer Key]].

---

## 5. Comprehensive Practice Exam

1. A student inserts a tactile push-button switch into holes `f4` and `g4` (same column) on a standard breadboard. When power is connected, the LED stays ON continuously whether the switch is pressed or not. What layout error occurred?
    - **A)** The switch was inserted upside down.
    - **B)** Holes in column `4` (`f4` and `g4`) are internally connected by a continuous metal strip, shorting the switch terminals.
    - **C)** The switch requires a ground connection directly to column `4`.
    - **D)** Breadboard switches only work when placed in columns `1` and `2`.

2. In Experiment #1, a fixed $1\text{ k}\Omega$ resistor is placed in series with a $50\text{ k}\Omega$ potentiometer to control LED brightness. What is the primary purpose of the $1\text{ k}\Omega$ fixed resistor?
    - **A)** It increases maximum brightness when the potentiometer is at maximum resistance.
    - **B)** It prevents the LED from turning off completely when the dial is turned.
    - **C)** It acts as a safety current limiter to prevent LED burnout when the potentiometer is turned to $0\ \Omega$.
    - **D)** It converts the circuit from a series to a parallel configuration.

3. What physical change in current flow occurs when a $100\text{ k}\Omega$ resistor is swapped for a $1\text{ k}\Omega$ resistor in series with an LED?
    - **A)** Electrical resistance increases, slowing down current and dimming the LED.
    - **B)** Electrical resistance decreases, allowing greater current flow and making the LED brighter.
    - **C)** Current drops to zero because the voltage drop across the $1\text{ k}\Omega$ resistor collapses.
    - **D)** Current remains unchanged because brightness depends only on battery voltage.

4. A circuit contains a $3.3\text{ k}\Omega$ resistor and a $100\text{ k}\Omega$ resistor connected in series with an LED. The LED glows very dimly. Replacing the $100\text{ k}\Omega$ resistor with a $10\text{ k}\Omega$ resistor makes the LED visibly brighter. Which concept is demonstrated?
    - **A)** Parallel resistors divide voltage equally regardless of their values.
    - **B)** In a series circuit, total resistance is dominated by the largest resistor, which bottlenecked the total current.
    - **C)** Smaller resistors absorb more power than larger resistors in a series loop.
    - **D)** Replacing any series resistor automatically doubles the supply voltage.

5. A circuit has a $3.3\text{ k}\Omega$ resistor and a $100\text{ k}\Omega$ resistor connected in parallel across a power supply. Why does replacing the $100\text{ k}\Omega$ resistor with a $1\text{ k}\Omega$ resistor cause total current drawn from the battery to increase significantly?
    - **A)** Adding a lower-resistance parallel path reduces overall equivalent circuit resistance, drawing more total current.
    - **B)** The $3.3\text{ k}\Omega$ resistor automatically turns off when a smaller resistor is placed in parallel.
    - **C)** Parallel components force current to flow through only one branch at a time.
    - **D)** The total voltage across the parallel branches increases beyond $9\text{ V}$.

6. In Experiment #2, Branch A has a $3.3\text{ k}\Omega$ resistor in series with LED A, while Branch B has a variable resistor ($0\text{--}50\text{ k}\Omega$) in series with LED B. Turning the variable resistor dial changes the brightness of LED B, but LED A's brightness remains unchanged. Why?
    - **A)** LED A is defective.
    - **B)** Parallel branches connected across a constant voltage source operate independently.
    - **C)** The variable resistor steals voltage from LED A when set to maximum resistance.
    - **D)** Current can only flow through one parallel branch at any given instant.

7. The instructor found out that one wire designed to be connected to the ground was placed in the topmost row of the breadboard. It is on the same horizontal line as the power supply's ground terminal. They are separated by the `"W"` symbol of the DLSU CT laboratory's breadboard. What will happen to the circuit?
    - **A)** The circuit will work; they are on the same horizontal line.
    - **B)** The circuit will work; the breadboard supplied connects all components on the same column, even the topmost and lowermost holes.
    - **C)** The circuit will NOT work; the breadboard supplied connects all components on the same row, even the topmost and lowermost holes.
    - **D)** The circuit will NOT work; the `"W"` symbol separates the left row holes from the right row holes.

8. In Experiment #3, a capacitor charges through a $1\text{ k}\Omega$ resistor when a switch is closed and discharges through a $10\text{ k}\Omega$ resistor when opened. Why does the LED take longer to dim during discharge than it took to reach full brightness during charging?
    - **A)** Charging energy is lost as heat, while discharging energy is amplified by the capacitor.
    - **B)** The RC time constant during discharge is larger because the discharge path has a higher resistance ($10\text{ k}\Omega$ vs. $1\text{ k}\Omega$).
    - **C)** Capacitors can only absorb energy quickly but release it at a constant $0.7\text{ V}$ rate.
    - **D)** The LED increases its internal resistance when powered by a capacitor.

9. If a student wants an indicator light to remain lit for a longer duration after power is disconnected, which circuit modification will achieve this?
    - **A)** Replace the $100\ \mu\text{F}$ capacitor with a $10\ \mu\text{F}$ capacitor.
    - **B)** Replace the discharge path resistor with a lower resistance value.
    - **C)** Replace the capacitor with a larger value (e.g., $220\ \mu\text{F}$) or increase the discharge path resistance.
    - **D)** Reverse the polarity of the electrolytic capacitor.

10. A student claims a $100\ \mu\text{F}$ capacitor functions identically to a $9\text{ V}$ rechargeable battery. What critical physical distinction is highlighted in Experiment #3?
    - **A)** Capacitors store energy electrostatically between physical plates, giving them lower energy density and rapid discharge compared to chemical batteries.
    - **B)** Capacitors store AC voltage, whereas batteries store DC voltage.
    - **C)** Batteries discharge instantly, while capacitors maintain constant voltage indefinitely.
    - **D)** Capacitors generate their own electrons, whereas batteries store protons.

11. The loose-wire activity in Experiment #3 may not work, but the instructor told the group to charge it longer or increase the capacitance to a higher value. What may be the reason why?
    - **A)** It will increase the resistance in the resistor.
    - **B)** The power supply will create a feedback loop that will provide enough energy to the circuit.
    - **C)** The capacitor needs at least $50$ cycles of charge and discharge in order to increase the threshold that it needs to power on the LED.
    - **D)** The instructor thinks that the energy stored might not be enough to turn on the LED, so it needs more time or better capacitance.

12. It is good practice to discharge the capacitor upon getting it from the lab technician. Why and how will it be discharged?
    - **A)** The capacitor might have stored energy from previous use, so it should be discharged by connecting it directly to the LED.
    - **B)** The capacitor might have inductance that would provide radio frequency interference, so it must be discharged by twisting its legs.
    - **C)** The capacitor might have inductance that would provide crosstalk, so it must be discharged by twisting its legs.
    - **D)** The capacitor might have stored energy from previous use, so it should be discharged by connecting it to a resistor.

13. When a standard silicon diode is forward-biased, it conducts current after reaching its threshold ($\approx 0.7\text{ V}$). What occurs when the diode is reverse-biased?
    - **A)** Current increases because the diode becomes a low-resistance conductor.
    - **B)** Current is completely blocked because the diode acts like an open switch.
    - **C)** Current alternates back and forth at $60\text{ Hz}$.
    - **D)** The diode converts DC supply into AC signal.

14. A Light Emitting Diode (LED) made of Gallium Arsenide requires a turn-on voltage of approximately $1.5\text{ V}$. If connected to a $1.0\text{ V}$ power source in forward bias, what will happen?
    - **A)** The LED will light up at full brightness.
    - **B)** The LED will explode due to over-voltage.
    - **C)** The LED will remain OFF because supply voltage is below the forward turn-on threshold.
    - **D)** The LED will emit infrared light instead of visible light.

15. A circuit contains a diode and an LED connected in series. The switch is closed, but the LED does not light. All breadboard connections are verified tight. What is the most logical troubleshooting step?
    - **A)** Replace the power supply with a lower voltage.
    - **B)** Check if either the diode or the LED is inserted in reverse bias.
    - **C)** Add a second switch in series to boost current.
    - **D)** Short-circuit the resistor to bypass current limitations.

16. What do you call the process of converting electrical energy from AC to DC, typically using a diode?
    - **A)** Transformation
    - **B)** Filtering
    - **C)** Voltage Regulation
    - **D)** Rectification

17. In the hydraulic analogy of electronic components, which mechanical device best models the behavior of a semiconductor diode?
    - **A)** A water pump.
    - **B)** A storage tank with a flexible diaphragm.
    - **C)** A one-way check valve that allows fluid to flow in only one direction.
    - **D)** A pipe filled with rocks.

18. In Experiment #5, a BJT transistor is placed in series with an LED and a $9\text{ V}$ supply. With no current applied to the Base lead, the LED remains dark. What role is the transistor playing here?
    - **A)** An open electronic switch blocking collector current because base current is zero.
    - **B)** A short circuit draining the battery instantly.
    - **C)** A variable capacitor storing energy for the LED.
    - **D)** A reverse-biased LED.

19. In Experiment #5 Part 2, a student observes that the LED in the Collector path is significantly brighter than the LED in the Base path. What fundamental property of the transistor does this demonstrate?
    - **A)** Voltage division across parallel branches.
    - **B)** Current amplification (gain), where a small base current controls a much larger collector current.
    - **C)** Negative resistance generation.
    - **D)** Conversion of DC power to AC power.

20. On an oscilloscope display, if you increase the frequency of an input sine wave signal while keeping the time-base scale fixed, what visual change will you observe?
    - **A)** The waveform amplitude stretches vertically.
    - **B)** The cycles compress horizontally, displaying more signal periods across the screen.
    - **C)** The sine wave flattens into a straight DC line.
    - **D)** The trace disappears completely.

21. As environmental noise increases relative to signal power (resulting in a low Signal-to-Noise Ratio or SNR), what happens to the signal waveform on an oscilloscope?
    - **A)** The frequency of the signal automatically increases.
    - **B)** The signal trace becomes fuzzy and distorted, making it difficult to distinguish original information.
    - **C)** The signal turns into a perfect square wave.
    - **D)** The signal amplitude drops strictly to zero.

22. Why does a smooth analog sine wave develop a "staircase" appearance after passing through a uniform quantizer?
    - **A)** High-frequency noise cuts off the tops of the sine wave.
    - **B)** Continuous analog amplitudes are rounded to discrete, finite digital voltage levels.
    - **C)** The oscilloscope screen runs out of pixels.
    - **D)** Quantization converts voltage into magnetic flux.

23. If a digital audio recording system reduces its quantization resolution from $16\text{ bits}$ per sample to $1\text{ bit}$ per sample, what is the effect on the output signal?
    - **A)** The signal quality improves by eliminating unnecessary data.
    - **B)** Severe quantization distortion occurs, reducing the signal to a coarse $2$-level representation.
    - **C)** The audio pitch increases by two octaves.
    - **D)** The signal speed doubles.

24. In Amplitude Modulation (AM), what occurs when the modulation index $m$ is increased beyond $1.0$ ($m = 1.5$)?
    - **A)** The carrier frequency doubles.
    - **B)** Overmodulation occurs, causing envelope distortion and phase reversals that prevent accurate envelope detection.
    - **C)** The message signal is completely eliminated from transmission.
    - **D)** The signal automatically converts to Frequency Modulation.

25. How does the transmitted envelope of a Frequency Modulated (FM) signal differ visually from an Amplitude Modulated (AM) signal on an oscilloscope?
    - **A)** FM signal amplitude remains constant while frequency varies; AM signal amplitude varies while frequency remains constant.
    - **B)** FM signals are always square waves; AM signals are always triangle waves.
    - **C)** AM signal frequency changes constantly while FM amplitude changes constantly.
    - **D)** FM signals have no carrier wave.

26. Why is Frequency Modulation (FM) inherently more resistant to atmospheric noise and electrical interference than Amplitude Modulation (AM)?
    - **A)** FM signals travel faster than the speed of light.
    - **B)** Natural electrical noise primarily alters signal amplitude, which AM relies on, whereas FM receivers remove extra amplitude and extract data strictly from frequency shifts.
    - **C)** FM uses zero power to transmit signals.
    - **D)** AM signals cannot be transmitted through wires.

27. All of these are the kinds of waves that can be produced from LabAlive simulation except:
    - **A)** Triangular waves
    - **B)** Square waves
    - **C)** Sampled audio waves (e.g., Kate Middleton news)
    - **D)** None of these

28. The spectrum analyzer can tap at the same point in the circuit as that of the oscilloscope.
    - **A)** True, they will provide the same screen displays since they work on the same horizontal domain, which is time.
    - **B)** False, it should not measure the same signal, as it will damage the circuit.
    - **C)** True, they will provide different screen displays since they work on different horizontal domains.
    - **D)** False, a circuit should have either an oscilloscope or a spectrum analyzer, but not both.

29. A PCB trace on Machine Project 2 appears thin and may be broken. What is a good way to investigate?
    - **A)** Remake the entire circuit on a breadboard.
    - **B)** Simulate using DipTrace.
    - **C)** Simulate using TinkerCAD as it may have a more thorough analysis of the trace.
    - **D)** Use a multimeter and check resistance between two trace endpoints.

30. Which of the following is a good method of fabricating the PCB trace?
    - **A)** Mix the liquids very hard so the circuit will appear in the least time possible.
    - **B)** Remove the covering and expose the presensitized PCB to the light for twenty minutes before taping the circuit printout and giving to the lab technician.
    - **C)** Use gloves and wear long sleeves/lab gown while mixing chemicals to protect the skin from contact.
    - **D)** Both A and B.

31. What is the correct order of constructing the LED circuit from MP2?
    - **A)** TinkerCAD printing, Developer Mixing, Agua Oxenada + HCl mixing, Drilling, Soldering, ESP32 installation and programming.
    - **B)** UV Exposure, Agua Oxenada + HCl mixing, Developer Mixing, Drilling, Soldering, ESP32 installation and programming.
    - **C)** Layout Printing, Developer Mixing, Agua Oxenada + HCl mixing, Soldering, Drilling, ESP32 installation and programming.
    - **D)** Layout Printing, UV Exposure, Developer Mixing, Agua Oxenada + HCl mixing, Drilling, Soldering, ESP32 installation and programming.

### Answer Key & Explanations

1. **B)** Both pins `f4` and `g4` sit on the same internal 5-hole vertical clip in column `4`, shorting the push-button across itself so current bypasses the switch.
2. **C)** With the potentiometer turned to $0\ \Omega$, the fixed $1\text{ k}\Omega$ resistor limits series current to prevent LED thermal burnout.
3. **B)** Reducing series resistance from $100\text{ k}\Omega$ to $1\text{ k}\Omega$ drops total loop opposition in Ohm's law ($I = V/R$), increasing current and LED brightness.
4. **B)** Total series resistance is $R_T = R_1 + R_2$; reducing the dominant $100\text{ k}\Omega$ bottleneck down to $10\text{ k}\Omega$ cuts $R_T$ nearly eight-fold ($\approx 7.77\times$, from $103.3\text{ k}\Omega$ to $13.3\text{ k}\Omega$) and noticeably increases loop current.
5. **A)** Parallel branches share source voltage while adding another path reduces $R_{\text{eq}}$ ($3.3\text{ k}\Omega \parallel 1\text{ k}\Omega \approx 0.77\text{ k}\Omega$), raising total drawn battery current ($I_T = V/R_{\text{eq}}$).
6. **B)** Parallel branches connected directly across the same voltage source experience independent branch voltage and current ($I_A = (V_s - V_{\text{LED}})/3.3\text{ k}\Omega$ stays fixed while $I_B$ varies).
7. **D)** On DLSU CT laboratory breadboards, the central `"W"` split on the horizontal power rails disconnects the left half (`cols 1--30`) from the right half (`cols 35+`), leaving an open ground path.
8. **B)** Because $\tau = R C$, the $10\text{ k}\Omega$ discharge path yields a time constant $10\times$ larger than the $1\text{ k}\Omega$ charge path ($\tau_{\text{dis}} \approx 1.0\text{ s}$ vs. $\tau_{\text{chg}} \approx 0.1\text{ s}$ for $100\ \mu\text{F}$).
9. **C)** Increasing $C$ or discharge $R$ increases $\tau = RC$ and stored energy $E = \frac{1}{2} C V^2$, keeping voltage above the LED turn-on threshold longer after power-off.
10. **A)** Capacitors store charge electrostatically on plates (lower energy density, rapid exponential decay), whereas batteries store chemical energy to sustain nearly constant voltage over hours.
11. **D)** A partially charged or undersized capacitor holds too little energy ($E = \frac{1}{2}CV^2$) above the LED forward threshold ($\sim 1.5\text{--}2\text{ V}$) once moved by loose wires, so longer charging or higher $C$ is needed.
12. **D)** Residual voltage from prior lab use can spark or damage an LED (`A`), so pre-discharging safely dissipates stored electrostatic energy through an appropriate resistor.
13. **B)** Reverse bias widens the depletion region, blocking majority-carrier conduction so an ideal/normal silicon diode acts as an open switch (up to breakdown).
14. **C)** A $1.0\text{ V}$ forward supply is below the $\approx 1.5\text{ V}$ GaAs forward turn-on voltage, so negligible current flows and the LED remains OFF.
15. **B)** Both regular diodes and LEDs are polarized; with tight wiring and closed switch, reversing either component opens the series loop.
16. **D)** Diodes permit unidirectional conduction, making rectification the process of converting alternating current (AC) to pulsating direct current (DC).
17. **C)** Like a hydraulic one-way check valve that opens only above a cracking pressure ($\approx 0.7\text{ V}$) in one flow direction, a diode passes forward current and blocks reverse flow.
18. **A)** With $I_B = 0$, the BJT operates in cutoff (open switch between Collector and Emitter), keeping collector/LED current essentially zero.
19. **B)** In active forward operation ($I_C = \beta_{\text{DC}} I_B$), a tiny base current controls a proportionally larger collector current, making the collector LED glow much brighter than the base LED.
20. **B)** Increasing frequency shortens period $T = 1/f$, so at fixed time/div more complete waveform cycles pack horizontally across the screen.
21. **B)** Lower SNR adds larger random noise fluctuations onto the trace amplitude, producing a thick, fuzzy, noisy waveform on the oscilloscope.
22. **B)** A uniform quantizer snaps continuous analog amplitudes onto a finite discrete set of step levels, creating visible staircase steps.
23. **B)** Dropping from $2^{16} = 65{,}536$ levels to $2^1 = 2$ levels causes extreme quantization error, reducing the waveform to a harsh two-level signal.
24. **B)** When $m > 1$, the carrier envelope pinches below zero (`phase reversals`), clipping/distorting the recovered message in simple diode envelope detection.
25. **A)** FM encodes information by varying instantaneous carrier frequency around $f_c$ at constant envelope height, whereas AM varies carrier amplitude at constant carrier frequency.
26. **B)** Most natural/man-made interference corrupts amplitude; FM receivers clip off amplitude variations in limiter stages and demodulate strictly from frequency deviations.
27. **D)** `Square`, `Triangular`, and sampled `Speech` waveforms are all supported by standard LabAlive signal-generator modes, leaving `None of these` as the exception.
28. **C)** High-impedance probing allows a scope and spectrum analyzer to sample the same circuit node simultaneously while displaying time domain ($V$ vs. $t$) and frequency domain ($|S(f)|$ vs. $f$) respectively.
29. **D)** Physical hairline breaks or cold spots on an etched PCB cannot be diagnosed in software simulations; measuring continuity/resistance across the copper trace endpoints directly tests electrical integrity.
30. **C)** Etching with HCl and $\text{H}_2\text{O}_2$ requires skin/eye/fume protection (gloves, long sleeves/lab gown); vigorous acid agitation splashes hazardous chemicals, and pre-exposing photoresist ruins the trace mask.
31. **D)** Print DipTrace layout -> UV expose presensitized board -> (Developer Mixing in older flow) -> Etch in Agua Oxenada + HCl -> Drill holes before soldering -> Solder components -> Install & program ESP32.

## References & Navigation

- **Previous Topic:** [[Written Exam Coverage and Formula Sheet]]
- **Next Topic:** [[[ANS] NSETRON Written Exam Reviewer Answer Key]]
- **Related Notes:** [[[QZ] NSETRON Mock Written Exam]], [[Basic Electricity and Electronic Components]], [[Resistors]], [[Capacitors]], [[Diodes]], [[Transistors]], [[Oscilloscope]], [[Principles of Communication]], [[PCB Design and Machine Project 2]]
