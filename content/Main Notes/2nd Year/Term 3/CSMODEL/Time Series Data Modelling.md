---
id: Module-16-Time-Series-Data-Modelling
type: note
course: CSMODEL
topic: Time Series Data Modelling
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[Time Series Data Modelling]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 16: Time Series Data Modelling

---

## 📚 Key Concepts

### 1. What Is Time Series Data?

A **time series** is a set of observations recorded at specified times, usually at **equally spaced intervals**. Each observation is associated with a timestamp.

| Type | Description | Example |
|------|-------------|---------|
| **Univariate** | One variable tracked over time | Daily temperature |
| **Multivariate** | Multiple variables tracked simultaneously | EEG brain-wave channels |

**Why special treatment?**
 Data points are **not independent** — each value is influenced by surrounding values (temporal dependency). Data points are **not identically distributed** — mean/variance can shift over time. **Ordering matters** — shuffling a time series produces a meaningless dataset.

**Goals of time series analysis:**
1. Describe features of the time series
2. Explain interactions between components
3. **Forecast** future values

---

### 2. Time Series Components

Every time series can be decomposed into up to four components:

| Component | Description | Example |
|-----------|-------------|---------|
| **Trend** | Long-term increase or decrease in the data | Rising global temperatures |
| **Seasonality** | Regular, predictable periodic fluctuations | Higher ice cream sales every summer |
| **Cyclical** | Long irregular swings not of fixed period (often economic) | Business/economic cycles |
| **Irregular / Residual** | Random, unpredictable fluctuations | Random noise |

> **Key distinction:** Seasonality has a **fixed, known period** (e.g., 12 months); cyclical variation has **irregular duration** (years, decades).

**Additive decomposition model:**

$$Y_t = T_t + S_t + C_t + I_t$$

**Multiplicative decomposition model:**

$$Y_t = T_t \times S_t \times C_t \times I_t$$

Use **multiplicative** when the magnitude of seasonal swings grows with the trend level.

---

### 3. Stationarity

**Stationarity** means the statistical properties of the series (mean, variance, autocorrelation) remain **constant over time** — no trend, no seasonality.

| Property | Stationary Series | Non-Stationary Series |
|----------|------------------|-----------------------|
| Mean | Constant | Changes over time |
| Variance | Constant | Changes over time |
| Autocorrelation | Constant | Depends on time |
| Long-term pattern | Unpredictable | Has a drift/trend |

> **Why it matters:** Most classical models (AR, MA, ARMA) **require stationarity**. Non-stationary data must be transformed first.

**Visual checks for stationarity:** No visible upward/downward slope No expanding or contracting variance ("funnel" shape) ACF decays quickly to zero

#### Augmented Dickey-Fuller (ADF) Test

The formal statistical test for stationarity.
 **H₀ (Null Hypothesis):** The series has a unit root → **non-stationary** **H₁ (Alternate Hypothesis):** The series has no unit root → **stationary** **Decision rule:** If **p-value < 0.05** → reject H₀ → series is stationary

```python
from statsmodels.tsa.stattools import adfuller

result = adfuller(df['passengers'])
print(f"ADF Statistic : {result[0]:.4f}")
print(f"p-value       : {result[1]:.4f}")
print(f"Critical Values: {result[4]}")

if result[1] < 0.05:
    print("✅ Series is STATIONARY (reject H₀)")
else:
    print("❌ Series is NON-STATIONARY (fail to reject H₀)")
```

---

### 4. Autocorrelation (ACF) and Partial Autocorrelation (PACF)

#### Autocorrelation Function (ACF)

Measures the **linear correlation** between a time series and its **lagged version**.

$$\rho_k = \frac{\text{Cov}(Y_t, Y_{t-k})}{\text{Var}(Y_t)}$$
 ACF at lag k = correlation of the series with itself shifted by k periods. Includes **both direct and indirect** effects of intermediate lags.

#### Partial Autocorrelation Function (PACF)

Measures the correlation between Y_t and Y_{t-k} **after removing** the effects of lags 1, 2, ..., k-1.
 Shows the **direct** relationship only.

#### Reading ACF/PACF to Choose Model Order

The shaded region in ACF/PACF plots represents the **95% confidence interval** (the "significance band"). Spikes **outside** the band are significant.

| Goal | Look at | Pattern | Interpretation |
|------|---------|---------|---------------|
| Determine **q** (MA order) | **ACF** | Cuts off sharply after lag q | Use MA(q) |
| Determine **p** (AR order) | **PACF** | Cuts off sharply after lag p | Use AR(p) |
| ARMA | Both | Both tail off gradually | Use ARMA(p, q) |
| Non-stationary | ACF | Decays very slowly | Apply differencing first |

```text
AR(p) process:  PACF cuts off at lag p,  ACF tails off
MA(q) process:  ACF cuts off at lag q,   PACF tails off
ARMA(p,q):      Both ACF and PACF tail off gradually
```

```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 2, figsize=(14, 4))

plot_acf(df['passengers'], lags=40, ax=axes[0])
axes[0].set_title("ACF Plot — determines q (MA order)")

plot_pacf(df['passengers'], lags=40, ax=axes[1])
axes[1].set_title("PACF Plot — determines p (AR order)")

plt.tight_layout()
plt.show()
```

---

### 5. Pre-Processing Time Series Data

#### 5a. Representation

```python
import pandas as pd

# Load data and parse dates
df = pd.read_csv('airline.csv', parse_dates=['Month'])

# Set the time column as index
df.set_index('Month', inplace=True)

# Verify
print(df.index.dtype)  # datetime64[ns]
```

#### 5b. Resampling

Change the frequency of your time series.

```python
# Resample monthly data to quarterly (take the sum)
df_quarterly = df['passengers'].resample('Q').sum()

# Resample to annual mean
df_annual = df['passengers'].resample('Y').mean()
```

#### 5c. Handling Missing Values (Imputation)

```python
# Forward fill (carry last known value forward)
df.fillna(method='ffill', inplace=True)

# Linear interpolation (smooth estimate between known values)
df.interpolate(method='linear', inplace=True)
```

#### 5d. Handling Outliers

```python
import numpy as np

# Replace outliers with NaN using IQR method
Q1 = df['passengers'].quantile(0.25)
Q3 = df['passengers'].quantile(0.75)
IQR = Q3 - Q1

lower = Q1 - 1.5 * IQR
upper = Q3 + 1.5 * IQR

df['passengers'] = df['passengers'].where(
    (df['passengers'] >= lower) & (df['passengers'] <= upper), other=np.nan
)
# Then interpolate
df.interpolate(method='linear', inplace=True)
```

#### 5e. Making Data Stationary

**Method 1 – Differencing** (most common)

Subtracts each value from the previous one to remove trend.

$$Y_t = Z_t - Z_{t-1}$$

```python
# First-order differencing
df['diff1'] = df['passengers'].diff(1)
df['diff1'].dropna().plot(title='1st Order Differenced Series')

# Second-order differencing (if first is not enough)
df['diff2'] = df['diff1'].diff(1)
```

**Method 2 – Log Transform** (stabilizes variance)

```python
import numpy as np

df['log_passengers'] = np.log(df['passengers'])
# Then apply differencing on the log-transformed series
df['log_diff'] = df['log_passengers'].diff(1)
```

**Method 3 – Residual Modelling**

Fit a trend line (polynomial regression) and use the residuals as the new series. Removes the trend component.

---

### 6. Moving Averages (Smoothing Methods)

These are primarily **smoothing / descriptive** tools — NOT the same as the MA model in ARIMA.

#### Simple Moving Average (SMA)

$$\hat{Y}_t = \frac{1}{n} \sum_{i=0}^{n-1} Y_{t-i}$$

```python
# Rolling window of 12 (12-month moving average)
df['SMA_12'] = df['passengers'].rolling(window=12).mean()

df[['passengers', 'SMA_12]].plot(figsize=(12, 5),
    title='Simple Moving Average (window=12)')
```
 Higher window → **smoother** curve but more lag Lower window → **more reactive**, follows data closely

#### Weighted Moving Average (WMA)

Gives more weight to **recent** observations.

$$\hat{Y}_t = \frac{\sum_{i=0}^{n-1} w_i \cdot Y_{t-i}}{\sum w_i}$$

```python
import numpy as np

weights = np.array([1, 2, 3, 4, 5, 6])  # recent observations get higher weight
weights = weights / weights.sum()

df['WMA_6'] = df['passengers'].rolling(window=6).apply(
    lambda x: np.dot(x, weights), raw=True
)
```

#### Exponential Moving Average (EMA / Exponential Smoothing)

Applies **exponentially decreasing** weights to past observations. Controlled by smoothing factor α (0 < α < 1).

$$\hat{Y}_t = \alpha Y_t + (1 - \alpha)\hat{Y}_{t-1}$$

```python
# span=12 → α = 2/(12+1) ≈ 0.154
df['EMA_12'] = df['passengers'].ewm(span=12, adjust=False).mean()

df[['passengers', 'SMA_12', 'EMA_12]].plot(figsize=(12, 5),
    title='SMA vs EMA')
```

> **EMA vs SMA:** EMA reacts faster to recent changes (less lag), while SMA treats all observations equally.

---

### 7. The AR, MA, and ARMA Models

#### Moving Average (MA) Model

Predicts current value using **past forecast errors** (residuals), not past values of the series.

**MA(q) formula:**

$$y_t = \mu + \phi_1 \epsilon_{t-1} + \phi_2 \epsilon_{t-2} + \cdots + \phi_q \epsilon_{t-q} + \epsilon_t$$

where ε_t is white noise (random error), μ is the mean, and φ_i are the MA coefficients.
 MA(1): y_t = μ + φ₁ε_{t-1} + ε_t MA(2): y_t = μ + φ₁ε_{t-1} + φ₂ε_{t-2} + ε_t **q** = order = how many past errors are used **ACF cuts off** sharply after lag q → guides selection of q

#### Autoregressive (AR) Model

Predicts current value using **past values** of the series itself (regression on its own lags).

**AR(p) formula:**

$$y_t = \beta_0 + \beta_1 y_{t-1} + \beta_2 y_{t-2} + \cdots + \beta_p y_{t-p} + \epsilon_t$$
 AR(1): y_t = β₀ + β₁y_{t-1} + ε_t AR(2): y_t = β₀ + β₁y_{t-1} + β₂y_{t-2} + ε_t **p** = order = how many past values are used **PACF cuts off** sharply after lag p → guides selection of p Requires **stationary** data

#### ARMA Model

Combination of AR and MA: predicts from both **past values** and **past errors**.

$$y_t = \beta_0 + \sum_{i=1}^{p} \beta_i y_{t-i} + \sum_{j=1}^{q} \phi_j \epsilon_{t-j} + \epsilon_t$$
 Requires **stationary** data Both ACF and PACF **tail off gradually**

---

### 8. ARIMA Model

**ARIMA(p, d, q)** = AutoRegressive Integrated Moving Average

The "Integrated" part means applying **d-order differencing** to make the series stationary before fitting ARMA.

| Parameter | Meaning | How to determine |
|-----------|---------|-----------------|
| **p** | AR order — number of lag observations | PACF: count significant spikes |
| **d** | Degree of differencing to achieve stationarity | ADF test; often d=1 suffices |
| **q** | MA order — number of lagged error terms | ACF: count significant spikes |

**ARIMA(1,1,1) step-by-step:**

1. Difference the series once: Z_t = Y_t − Y_{t-1}
2. Fit ARMA(1,1) on Z_t: Z_t = φ₁Z_{t-1} + θ₁ε_{t-1} + ε_t
3. Invert the differencing to forecast in the original scale

```python
from statsmodels.tsa.arima.model import ARIMA

# Fit ARIMA(1,1,1)
model = ARIMA(df['passengers'], order=(1, 1, 1))
result = model.fit()

print(result.summary())
```

**Key special cases:**

| ARIMA notation | Equivalent model |
|----------------|-----------------|
| ARIMA(p, 0, 0) | Pure AR(p) |
| ARIMA(0, 0, q) | Pure MA(q) |
| ARIMA(0, 1, 0) | Random walk |
| ARIMA(p, 0, q) | ARMA(p, q) — already stationary |

#### Complete Step-by-Step ARIMA Workflow

```python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.arima.model import ARIMA

# Step 1: Load and prepare data
df = pd.read_csv('airline.csv', index_col='Month', parse_dates=True)

# Step 2: Check stationarity
result = adfuller(df['passengers'])
print(f"p-value: {result[1]:.4f}")   # if > 0.05, need differencing

# Step 3: Difference if non-stationary (d=1)
df['diff'] = df['passengers'].diff(1)
result2 = adfuller(df['diff'].dropna())
print(f"After differencing p-value: {result2[1]:.4f}")  # should be < 0.05

# Step 4: ACF / PACF plots to determine p and q
fig, axes = plt.subplots(1, 2, figsize=(14, 4))
plot_acf(df['diff'].dropna(), lags=30, ax=axes[0])   # -> q
plot_pacf(df['diff'].dropna(), lags=30, ax=axes[1])  # -> p
plt.show()

# Step 5: Fit ARIMA (e.g., p=2, d=1, q=1 from reading ACF/PACF)
model = ARIMA(df['passengers'], order=(2, 1, 1))
result_fit = model.fit()
print(result_fit.summary())

# Step 6: Diagnose residuals
result_fit.plot_diagnostics(figsize=(14, 8))
plt.show()

# Step 7: Forecast
forecast = result_fit.forecast(steps=12)
print(forecast)
```

> **Important:** When using `ARIMA(series, order=(p, d, q))`, pandas handles the differencing internally. Do NOT manually difference the data AND set d=1 — that would double-difference.

---

### 9. Seasonal ARIMA (SARIMA)

**SARIMA(p, d, q)(P, D, Q)[s]** extends ARIMA to handle **seasonal patterns**.

| Parameter | Meaning |
|-----------|---------|
| p, d, q | Non-seasonal AR order, differencing, MA order |
| **P** | Seasonal AR order |
| **D** | Seasonal differencing order |
| **Q** | Seasonal MA order |
| **s** | Season length (12=monthly, 4=quarterly, 7=daily-weekly) |

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

# Monthly airline data (12-month seasonality)
# SARIMA(1,1,1)(1,1,1)[12]
model = SARIMAX(
    df['passengers'],
    order=(1, 1, 1),
    seasonal_order=(1, 1, 1, 12),
    enforce_stationarity=False,
    enforce_invertibility=False
)
result = model.fit(disp=False)
print(result.summary())

# Forecast next 24 months
forecast = result.forecast(steps=24)
```

**Seasonal ACF/PACF interpretation:** Look for significant spikes at **multiples of s** (e.g., lags 12, 24, 36 for monthly data) These spikes guide **P** and **Q** selection (same ACF→Q, PACF→P logic, but at seasonal lags)

---

### 10. Model Evaluation & Forecasting Metrics

After fitting, evaluate forecast accuracy on a **held-out test set**.

#### Train/Test Split (Time Series — Chronological Only!)

```python
# NEVER shuffle time series! Always split chronologically
train = df['passengers'][:-12]   # all but last 12 months
test  = df['passengers'][-12:]   # last 12 months as holdout

model = ARIMA(train, order=(2, 1, 1))
result = model.fit()

predictions = result.forecast(steps=12)
```

#### Error Metrics

Let y_i = actual, ŷ_i = predicted, n = number of predictions.

| Metric | Formula | Notes |
|--------|---------|-------|
| **MAE** | (1/n) Σ \|y_i − ŷ_i\| | Same unit as data; robust to outliers |
| **MSE** | (1/n) Σ (y_i − ŷ_i)² | Squared units; heavily penalizes large errors |
| **RMSE** | √MSE | Same unit as data; most commonly reported |
| **MAPE** | (100%/n) Σ \|y_i − ŷ_i\| / \|y_i\| | Percentage; scale-independent; breaks if y_i=0 |

```python
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error

y_true = test.values
y_pred = predictions.values

MAE  = mean_absolute_error(y_true, y_pred)
MSE  = mean_squared_error(y_true, y_pred)
RMSE = np.sqrt(MSE)
MAPE = np.mean(np.abs((y_true - y_pred) / y_true)) * 100

print(f"MAE  : {MAE:.2f}")
print(f"MSE  : {MSE:.2f}")
print(f"RMSE : {RMSE:.2f}")
print(f"MAPE : {MAPE:.2f}%")
```

**Choosing a metric:** Use **RMSE** when large errors are especially costly (outlier-sensitive) Use **MAE** when all errors should be treated equally (robust) Use **MAPE** to compare models across datasets with different scales

---

### 11. Model Diagnostics (Residual Analysis)

A well-fitted model should have **white-noise residuals** — no remaining pattern.

```python
residuals = result_fit.resid

# 1. Plot residuals — should look like random noise
residuals.plot(title='Residuals')

# 2. ACF of residuals — should show NO significant spikes
from statsmodels.graphics.tsaplots import plot_acf
plot_acf(residuals, lags=30)

# 3. QQ-plot for normality of residuals
from scipy import stats
import matplotlib.pyplot as plt
stats.probplot(residuals, plot=plt)
plt.show()
```

**Signs of a good fit:** ✅ Residuals look like random noise (no pattern or trend) ✅ ACF of residuals shows no significant spikes beyond lag 0 ✅ Residuals approximately normally distributed (QQ-plot close to diagonal line)

---

## 🐍 Python Snippets

### `pd.DataFrame.resample()`
Aggregates data at a new temporal frequency.

**What it does:** Groups observations into time buckets and applies an aggregation function.

```python
# Frequency aliases: 'D'=daily, 'W'=weekly, 'M'=monthly, 'Q'=quarterly, 'Y'=yearly
monthly_sum    = df['value'].resample('M').sum()
quarterly_mean = df['value'].resample('Q').mean()
annual_max     = df['value'].resample('Y').max()
```

---

### `pd.DataFrame.rolling()`
Computes rolling window statistics.

**What it does:** Slides a window of size `window` across the series, computing a statistic at each step.

```python
# 7-period rolling mean (smoothing / SMA)
df['rolling_mean'] = df['value'].rolling(window=7).mean()

# Rolling std — check if variance is stable
df['rolling_std'] = df['value'].rolling(window=7).std()
```
 First `window-1` values will be `NaN` (not enough data to fill window).

---

### `pd.DataFrame.shift()`
Shifts the time series forward or backward — creates lag/lead features.

**What it does:** `shift(k)` moves data down by k positions; `shift(-k)` moves data up.

```python
# Lag-1 feature (value from 1 period ago)
df['lag_1'] = df['value'].shift(1)

# Lead-1 feature (value 1 period ahead)
df['lead_1'] = df['value'].shift(-1)

# Manual differencing using shift
df['manual_diff'] = df['value'] - df['value'].shift(1)
# Equivalent to: df['value'].diff(1)
```

---

### `pd.DataFrame.ewm()`
Exponential weighted moving average.

**Parameters:** `span` controls the decay; `adjust=False` uses recursive formula.

```python
# span=12 → α = 2/(12+1) ≈ 0.154
df['EMA'] = df['value'].ewm(span=12, adjust=False).mean()

# Larger alpha (smaller span) → faster adaptation to recent values
df['EMA_fast'] = df['value'].ewm(span=3, adjust=False).mean()
```

---

### `adfuller()` — ADF Stationarity Test

**What it returns:** tuple `(adf_statistic, p_value, n_lags, n_obs, critical_values, icbest)`

```python
from statsmodels.tsa.stattools import adfuller

adf_result = adfuller(series)
adf_stat  = adf_result[0]   # test statistic (more negative = more stationary)
p_value   = adf_result[1]   # key value: < 0.05 means stationary
crit_vals = adf_result[4]   # dict: {'1%': ..., '5%': ..., '10%': ...}
```

---

### `acf()` and `pacf()` — Numerical Values

**What they return:** Arrays of autocorrelation coefficients at each lag.

```python
from statsmodels.tsa.stattools import acf, pacf

acf_vals  = acf(series, nlags=40)   # acf_vals[0]=1.0 (lag 0 always = 1)
pacf_vals = pacf(series, nlags=40)  # partial autocorrelation at each lag
```

---

### `plot_acf()` and `plot_pacf()` — Visual Plots

**What they do:** Plot ACF/PACF with confidence bands (shaded region = 95% CI).

```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf

plot_acf(series, lags=40)    # spikes outside band are significant
plot_pacf(series, lags=40)   # use 'ywm' method for better PACF estimates
plt.show()

# How to read: count consecutive significant spikes from lag 1
# ACF: number of consecutive spikes -> q (MA order)
# PACF: number of consecutive spikes -> p (AR order)
```

---

### `ARIMA` — Fitting ARIMA Model

**Parameters:** `order=(p, d, q)` — AR order, differencing degree, MA order.

```python
from statsmodels.tsa.arima.model import ARIMA

model  = ARIMA(series, order=(p, d, q))
result = model.fit()

print(result.summary())         # AIC, BIC, coefficients, p-values
fitted    = result.fittedvalues # in-sample predictions
residuals = result.resid        # residuals (should be white noise)
forecast  = result.forecast(steps=n)  # n-step-ahead forecast
```

---

### `SARIMAX` — Fitting SARIMA Model

**Parameters:** `seasonal_order=(P, D, Q, s)` — seasonal terms.

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX

model = SARIMAX(
    series,
    order=(p, d, q),              # non-seasonal: (AR, diff, MA)
    seasonal_order=(P, D, Q, s)   # seasonal: (AR, diff, MA, period)
)
result = model.fit(disp=False)    # disp=False silences optimizer output

forecast = result.forecast(steps=n)
conf_int = result.get_forecast(steps=n).conf_int()  # confidence intervals
```

---

## 📊 Formulas & Key Equations

### Time Series Decomposition

$$Y_t = T_t + S_t + C_t + I_t \quad \text{(Additive)}$$
$$Y_t = T_t \times S_t \times C_t \times I_t \quad \text{(Multiplicative)}$$

### Differencing

$$\Delta Y_t = Y_t - Y_{t-1} \quad \text{(1st order)}$$
$$\Delta^2 Y_t = \Delta Y_t - \Delta Y_{t-1} \quad \text{(2nd order)}$$

### AR(p) Model

$$y_t = \beta_0 + \beta_1 y_{t-1} + \cdots + \beta_p y_{t-p} + \epsilon_t$$

### MA(q) Model

$$y_t = \mu + \phi_1 \epsilon_{t-1} + \cdots + \phi_q \epsilon_{t-q} + \epsilon_t$$

### ARMA(p,q) Model

$$y_t = \beta_0 + \sum_{i=1}^{p} \beta_i y_{t-i} + \sum_{j=1}^{q} \phi_j \epsilon_{t-j} + \epsilon_t$$

### Exponential Smoothing

$$\hat{Y}_t = \alpha Y_{t-1} + (1 - \alpha)\hat{Y}_{t-1}, \quad 0 < \alpha < 1$$

### Autocorrelation at Lag k

$$\rho_k = \frac{\sum_{t=k+1}^{T}(Y_t - \bar{Y})(Y_{t-k} - \bar{Y})}{\sum_{t=1}^{T}(Y_t - \bar{Y})^2}$$

### Evaluation Metrics

$$\text{MAE}  = \frac{1}{n}\sum_{i=1}^n |y_i - \hat{y}_i|$$

$$\text{MSE}  = \frac{1}{n}\sum_{i=1}^n (y_i - \hat{y}_i)^2$$

$$\text{RMSE} = \sqrt{\frac{1}{n}\sum_{i=1}^n (y_i - \hat{y}_i)^2}$$

$$\text{MAPE} = \frac{100\%}{n}\sum_{i=1}^n \left|\frac{y_i - \hat{y}_i}{y_i}\right|$$

---

## ⚠️ Common Exam Traps

1. **Confusing MA smoothing with the MA model.**
*Moving average smoothing* = rolling window average for trend visualization.
*MA model (in ARIMA)* = regression on **past forecast errors** ε_{t-q}, not past values.

2. **Using ACF for AR order and PACF for MA order (backwards!).**
✅ **ACF** → determines **q** (MA order): cuts off after lag q
✅ **PACF** → determines **p** (AR order): cuts off after lag p

3. **Forgetting to check stationarity before fitting AR or MA models.**
Both AR and MA require stationary data. Always run ADF test first.

4. **Shuffling data before train/test split.**
Time series must be split **chronologically** — never randomly shuffle!

5. **Applying only one difference when the series is still non-stationary.**
After differencing, re-run ADF. If still p ≥ 0.05, apply another difference (d=2).

6. **Forgetting to set the datetime index.**
Pandas resampling and plotting only work correctly if the index is a `DatetimeIndex`.

7. **Confusing p-value interpretation in ADF test.**
**Low p-value (< 0.05)** = stationary ✅
**High p-value (≥ 0.05)** = non-stationary ❌ → needs differencing

8. **Double-differencing by accident.**
Setting `order=(p, 1, q)` in ARIMA automatically applies differencing internally.
Do NOT manually diff the data AND set d=1 simultaneously.

9. **MAPE breaks when actual values are zero.**
Division by zero → infinite error. Use MAE or RMSE instead.

10. **Ignoring seasonality when it exists.**
Fitting ARIMA on seasonal data → poor forecasts.
Use SARIMA `(P, D, Q, s)` for periodic patterns.

11. **Confusing cyclical and seasonal components.**
Seasonal: **fixed** known period (quarterly, monthly, weekly)
Cyclical: **irregular** multi-year swings (economic cycles)

---

## 🧪 Practice Questions

---

**Q1.** A time series of monthly airline passengers shows a steady upward slope over 10 years and a repeating pattern every 12 months. Which components are present?
 A) Trend only B) Seasonality only C) Trend and Seasonality D) Cyclical and Irregular only

---

**Q2.** You run the Augmented Dickey-Fuller test on a series and get a p-value of 0.23. What should you do?
 A) Proceed to fit ARIMA with d=0 since the series is stationary B) Apply differencing and re-test for stationarity C) The series is stationary; no further action needed D) Apply only a log transform — differencing is unnecessary

---

**Q3.** On the ACF plot, spikes are significant at lags 1 and 2 only (then drop inside the band). On the PACF plot, spikes tail off gradually. What model is most appropriate?

```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
plot_acf(series, lags=20)
plot_pacf(series, lags=20)
```
 A) AR(2) B) MA(2) C) ARMA(2, 2) D) Random Walk

---

**Q4.** What does this model effectively represent?

```python
from statsmodels.tsa.arima.model import ARIMA
model = ARIMA(df['sales'], order=(0, 1, 0))
result = model.fit()
```
 A) Pure AR(1) model B) Pure MA(1) model C) Random walk — first-order differencing, no AR or MA terms D) Exponential smoothing

---

**Q5.** What does the following code compute for `SMA_12`?

```python
import pandas as pd
df['SMA_12'] = df['passengers'].rolling(window=12).mean()
```
 A) The mean of the entire series applied to every row B) The 12th lag of the series C) The average of the current and the previous 11 observations at each point D) The 12-step-ahead forecast

---

**Q6.** Which evaluation metric is **scale-independent** and expressed as a percentage, making it useful for comparing forecasts across datasets with different units?
 A) MAE B) MSE C) RMSE D) MAPE

---

**Q7.** You want to fit a SARIMA model to monthly temperature data with 12-month seasonality, using 1 seasonal AR term, 1 seasonal difference, and 1 seasonal MA term. Which `seasonal_order` is correct?

```python
model = SARIMAX(series, order=(1, 1, 1), seasonal_order=???)
```
 A) `(1, 1, 1, 0)` B) `(12, 1, 12, 1)` C) `(1, 1, 1, 12)` D) `(0, 12, 0, 1)`

---

**Q8.** After fitting an ARIMA model, you plot the ACF of the residuals and observe several significant spikes at lags 3 and 4. What does this indicate?
 A) The model is a perfect fit B) The residuals are white noise — model is well-specified C) The model has not captured all temporal patterns; consider revising p or q D) The data must be log-transformed before any modelling

---

**Q9.** What does `df['value'].diff(1)` return at index position 0?

```python
data = {'value': [100, 115, 130, 120]}
df = pd.DataFrame(data)
df['diff'] = df['value'].diff(1)
print(df['diff'].iloc[0])
```
 A) 100 B) 15 C) 0 D) NaN

---

**Q10.** A colleague says: "I'll use MAPE because it works for all datasets." When would MAPE **fail** to give a meaningful result?
 A) When the forecast values are very large B) When the actual values include zeros (division by zero) C) When the time series has a strong trend D) When the series is seasonal

---

### ✅ Answer Key

| Q | Answer | Explanation |
|---|--------|-------------|
| **Q1** | **C** | Upward slope = Trend; repeating 12-month pattern = Seasonality. Both are clearly present. |
| **Q2** | **B** | p-value = 0.23 > 0.05 → fail to reject H₀ (non-stationary null) → apply differencing and re-test. |
| **Q3** | **B** | ACF cuts off sharply after lag 2 (→ q=2); PACF tails off gradually (→ no AR needed). MA(2) signature. |
| **Q4** | **C** | ARIMA(0,1,0): no AR, one difference, no MA = pure random walk (next value = current value + noise). |
| **Q5** | **C** | `rolling(window=12).mean()` = average of the current and previous 11 observations. First 11 rows are NaN. |
| **Q6** | **D** | MAPE (Mean Absolute Percentage Error) is expressed as %, making it scale-independent and comparable across datasets. |
| **Q7** | **C** | `seasonal_order=(P, D, Q, s)` → `(1, 1, 1, 12)`: P=1 seasonal AR, D=1 seasonal diff, Q=1 seasonal MA, s=12 months. |
| **Q8** | **C** | Significant spikes in residual ACF = autocorrelation remains uncaptured → model is under-specified; increase p or q. |
| **Q9** | **D** | `.diff(1)` subtracts the previous value. At position 0, there is no prior value → result is `NaN`. |
| **Q10** | **B** | MAPE = \|y − ŷ\| / \|y\| × 100%. If y_i = 0, this is division by zero → undefined/infinite MAPE. |

---

## 📎 Quick Reference Cheat Sheet

```text
TIME SERIES MODELLING WORKFLOW
══════════════════════════════════════════════════════════════════

1. LOAD & PREPARE
   └─ pd.read_csv(..., parse_dates=True)
   └─ df.set_index('date_column', inplace=True)

2. VISUALIZE
   └─ df.plot()  →  identify trend, seasonality, outliers

3. CHECK STATIONARITY
   └─ adfuller(series)
      p < 0.05   →  stationary ✅  (proceed)
      p >= 0.05  →  non-stationary ❌  (difference first)

4. DIFFERENCE (if needed)
   └─ series.diff(1)  →  re-run ADF
      d = number of differences needed (usually 1)

5. DETERMINE p AND q FROM ACF/PACF
   └─ plot_acf()   →  ACF cuts off at lag q  →  MA order = q
   └─ plot_pacf()  →  PACF cuts off at lag p →  AR order = p
   └─ Both tail off slowly? → ARMA, try small p & q values

6. FIT MODEL
   └─ ARIMA(series, order=(p, d, q)).fit()
   └─ SARIMAX(series, order=(...), seasonal_order=(P,D,Q,s)).fit()

7. DIAGNOSE RESIDUALS
   └─ plot_acf(residuals)  → no significant spikes = good ✅
   └─ QQ-plot              → approximately normal = good ✅

8. FORECAST & EVALUATE
   └─ result.forecast(steps=n)
   └─ Metrics on held-out test set: MAE, RMSE, MAPE

══════════════════════════════════════════════════════════════════
MODEL SELECTION CHEAT SHEET
  PACF cuts off at p, ACF tails off  →  AR(p)
  ACF cuts off at q, PACF tails off  →  MA(q)
  Both tail off                      →  ARMA(p, q)
  Series has trend                   →  increase d in ARIMA
  Series has seasonality             →  use SARIMA(P,D,Q,s)

ADF TEST QUICK RULE
  p-value < 0.05   →  STATIONARY   ✅
  p-value >= 0.05  →  DIFFERENCE   🔄

ARIMA PARAMETER NOTATION
  ARIMA(p, d, q)
    p = AR order   (from PACF)
    d = differencing (from ADF + trial)
    q = MA order   (from ACF)

SARIMA PARAMETER NOTATION
  SARIMA(p,d,q)(P,D,Q)[s]
    s = season length (12=monthly, 4=quarterly)
    P,D,Q = same logic as p,d,q but at seasonal lags

ERROR METRICS (lower = better)
  MAE  = mean|actual - pred|               → robust, same units
  RMSE = sqrt(mean(actual-pred)²)          → penalizes big errors
  MAPE = mean|actual-pred|/|actual| × 100% → %, scale-free
         ⚠️ breaks when actual = 0
```

## Multiple Choice Questions

1. A time series is considered `Stationary` when:
    - **A)** Its mean and variance are constant over time
    - **B)** It contains a strong upward trend
    - **C)** It has obvious seasonal cycles
    - **D)** The observations are randomly shuffled

2. In an ARIMA(p, d, q) model, what does the parameter `d` represent?
    - **A)** The autoregressive order
    - **B)** The degree of differencing required to make the series stationary
    - **C)** The moving average order
    - **D)** The seasonal period length

3. When determining the parameters for an ARIMA model, a sharp cut-off in the ACF plot suggests:
    - **A)** The AR order (p)
    - **B)** The MA order (q)
    - **C)** The differencing order (d)
    - **D)** The seasonality (s)

4. The Augmented Dickey-Fuller (ADF) test is used to:
    - **A)** Determine the optimal learning rate
    - **B)** Test whether a time series is stationary or has a unit root
    - **C)** Detect outliers in the dataset
    - **D)** Impute missing values

5. What is the fundamental difference between an AR model and an MA model?
    - **A)** AR uses past values of the series; MA uses past forecast errors
    - **B)** AR is used for forecasting; MA is used for clustering
    - **C)** AR uses past forecast errors; MA uses past values of the series
    - **D)** AR requires non-stationary data; MA requires stationary data

### Answer Key & Explanations
1. **A)** Stationarity implies statistical properties like mean and variance do not change over time.
2. **B)** `d` stands for Integrated, the number of differencing steps applied.
3. **B)** The Autocorrelation Function (ACF) plot cutting off helps identify the MA order (q). PACF identifies AR (p).
4. **B)** A low p-value (<0.05) in ADF rejects the null hypothesis of a unit root, implying stationarity.
5. **A)** Autoregressive (AR) regresses on its own lags. Moving Average (MA) regresses on past error terms (noise).

## References & Navigation

- **Previous Topic:** [[Text Data Modelling]]
- **Next Topic:** [[Image Data Modelling]]
- **Related Notes:** [[Text Data Modelling]], [[Graph Data Modelling]]
