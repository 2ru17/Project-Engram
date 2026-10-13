---
id: Module-15-Text-Data-Modelling
type: note
course: CSMODEL
topic: Text Data Modelling
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[Text Data Modelling]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 15: Text Data Modelling

## 📚 Key Concepts

### 1. Introduction to Natural Language Processing (NLP) & Text Data Modelling **Natural Language Processing (NLP)**: A specialized branch of Computer Science and Artificial Intelligence that deals with the interaction between computers and human (natural) languages. **Goal of Text Data Modelling**: Human language is inherently unstructured. To perform tasks like sentiment analysis, document classification, or machine translation, we must convert raw text into structured numerical representations (vectors/matrices) that machine learning algorithms can process.

### 2. Challenges of Text Data
Modelling natural language is difficult due to several core linguistic properties: **Ambiguity**: Sentences can have multiple valid interpretations based on syntax or grammar.
*Example*: *"Stolen painting found by tree."* Does this mean the painting was found *next to* a tree, or that a tree *found* the painting? **Evolving Language & Colloquialisms**: Languages adapt dynamically; new words, slang, and local idioms are frequently introduced.
*Example*: Tagalog/Filipino colloquial expressions like *"Sana all"* or *"Gusto ko na matapos yung class!"*. Hardcoded grammatical rules fail as language evolves. **Contextual Connotation**: The same phrase can change its sentiment or meaning depending on the surrounding topic.
*Example*: The phrase *"drastically decreased"* is **positive** in *"The number of COVID-19 cases has drastically decreased"* but **negative** in *"The number of jobs in PH has drastically decreased"*. **Figures of Speech & Sarcasm**: Words used in non-literal contexts can invert their intended meaning.
*Example*: *"Wow daming sinasabi. Ang galing! Ikaw na lang kaya magpresidente."* Praise words (*"ang galing"*) are used sarcastically to convey criticism.

---

### 3. Text Data Pre-Processing Pipeline
Before feeding text into machine learning models, raw documents undergo several cleaning and transformation steps:

```text
Raw Text ──> Irrelevant Character Removal ──> Tokenization ──> Stop Word Removal ──> Normalization (Stemming/Lemmatization) ──> Feature Vectorization
```

1. **Removing Irrelevant Characters**:
Stripping unwanted noise produced during data collection (e.g., HTML tags, web scraping artifacts like `□ □ □`, non-ASCII characters, and special symbols).
2. **Tokenization**:
The process of splitting continuous text into discrete units called **tokens** (usually individual words or punctuation marks).
*Example*: `"Hi, how are you doing today?"` $\rightarrow$ `['Hi', ',', 'how', 'are', 'you', 'doing', 'today', '?']`.
3. **Removing Irrelevant Words / Stop Word Removal**:
Eliminating high-frequency words that carry little domain-specific semantic value (e.g., `"the"`, `"is"`, `"at"`, `"which"`, `"on"`).
Depending on the application, domain noise such as social media hashtags (`#SummaCumLaude`) or user mentions (`@JonSnow`) may also be stripped.
4. **Combining Related Words / Normalization**:
Lowercasing (case folding): Merging `"Hello"`, `"HELLO"`, and `"hello"` into a single representation `"hello"`.
Handling alternative spellings: Mapping `"flavour"` and `"flavor"` to `"flavor"`.
5. **Stemming vs. Lemmatization (Key Exam Distinction)**:
**Stemming**: A crude, rule-based heuristic algorithm that chops off word prefixes and suffixes to extract a stem root.
*Characteristics*: Extremely fast, computationally lightweight, but **rule-based** and does **not** use a dictionary.
*Drawback*: Often produces non-real words (stems). For example, `trouble`, `troubled`, `troubles`, and `troublesome` stem to `'troubl'` or `'troublesom'`.
**Lemmatization**: A dictionary-based morphological analysis tool (e.g., using WordNet) that reduces words to their canonical dictionary base form (**lemma**).
*Characteristics*: Slower and more computationally intensive, but **dictionary-based** and returns **valid words**.
*Advantage*: Accurately maps irregular inflections. For example, `geese` $\rightarrow$ `'goose'`, `teeth` $\rightarrow$ `'tooth'`, `troubled` $\rightarrow$ `'trouble'`.
6. **Parts-of-Speech (POS) Tagging**:
Annotating each token with its grammatical function (e.g., Noun, Verb, Adjective, Determiner) based on syntax and context.
7. **Dependency Parsing**:
Representing grammatical relationships between words as directed graphs to analyze sentence structure (e.g., identifying subjects, verbs, objects, and modifiers).

---

### 4. Text Representation & Data Modelling Approaches

Text data models generally fall into two broad categories: **Frequency-Based** and **Prediction-Based**.

```text
                           Text Modelling Approaches
                                      │
           ┌──────────────────────────┴──────────────────────────┐
           ▼                                                     ▼
   Frequency-Based                                        Prediction-Based
   (Counts & Weights)                                     (Dense Vectors / Word2Vec)
   ├─ Naïve One-Hot Encoding                              ├─ CBOW (Context -> Target)
   ├─ Bag of Words (CountVectorizer)                      └─ Skip-Gram (Target -> Context)
   ├─ Bag of N-Grams (ngram_range)
   └─ TF-IDF (TfidfVectorizer)
```

#### A. Naïve Word Embedding (One-Hot Encoding) Builds a dictionary/vocabulary $V$ of size $|V|$. Each word is represented as an orthogonal binary vector of length $|V|$ with a single `1` at its corresponding index and `0`s elsewhere. *Limitation*: High dimensionality, sparse representation, and complete loss of semantic similarity (the dot product of any two distinct words is 0).

#### B. Frequency-Based Encodings
1. **Bag of Words (BoW) / Count Vector (`CountVectorizer`)**:
Represents a document by counting the frequency of each vocabulary term present in it.
Ignores word order and grammar.
*Hyperparameters*: `max_features` (selects top $n$ most frequent terms across the corpus), `binary=True` (records binary presence 1/0 instead of counts).
2. **Bag of N-Grams**:
Extends BoW by taking contiguous sequences of $n$ words.
$n=1$: Unigram (`"quick"`, `"brown"`, `"fox"`)
$n=2$: Bigram (`"quick brown"`, `"brown fox"`)
$n=3$: Trigram (`"quick brown fox"`)
*Advantage*: Retains local word order and phrase-level context (distinguishes `"not good"` from `"good"`). Controlled via `ngram_range=(min_n, max_n)`.
3. **Term Frequency-Inverse Document Frequency (TF-IDF)**:
Measures the relative importance of a word in a specific document relative to the whole corpus.
**Term Frequency (TF)**: How frequently term $t$ appears in document $d$.
**Inverse Document Frequency (IDF)**: Penalizes words that appear frequently across all documents (e.g., common words like `"is"`, `"the"`).
**TF-IDF Weight**: $TF \times IDF$.
*Matrix Interpretation*: High weight = word is frequent in the current document but rare across other documents (highly informative keyword). Zero weight = word is absent or appears in every document.

#### C. Prediction-Based Encodings (Word Embeddings / Word2Vec) Learns dense continuous vectors (typically 100–300 dimensions) where semantic meanings are mapped into geometric spatial coordinates. Words with similar meanings or contexts are located close to each other in vector space (measured via **Cosine Similarity**). *Discovered Properties*: Vector arithmetic reflects real-world semantic relationships:
  $$\vec{v}_{\text{king}} - \vec{v}_{\text{man}} + \vec{v}_{\text{woman}} \approx \vec{v}_{\text{queen}}$$ **Word2Vec Architectures**:
**Continuous Bag of Words (CBOW)**:
Predicts the **target word** $w_t$ based on its surrounding **context words** ($w_{t-2}, w_{t-1}, w_{t+1}, w_{t+2}$).
*Intuition*: Given `"The quick [ ? ] jumped over"`, CBOW predicts `"brown"`.
**Skip-Gram**:
Predicts surrounding **context words** given a single **target word** $w_t$.
*Intuition*: Given `"brown"`, Skip-Gram predicts `"quick"`, `"fox"`, etc.
*Training process*: Pairs of `(input, target)` are evaluated through a neural network; the prediction error vector (difference between actual one-hot vector and predicted probability vector) updates the model's weights until representations converge.

---

### 5. Text Classification & Machine Learning Applications **Multinomial Naive Bayes (`MultinomialNB`)**:
A popular probabilistic classifier based on Bayes' Theorem with the strong assumption of feature independence.
Well-suited for discrete count data (Bag of Words) and TF-IDF matrices.
Predicts document categories ($y$) by calculating class probabilities $P(y \mid X)$ and picking the class with maximum posterior probability (`predict()`), or returning full probability distributions (`predict_proba()`). **Common Applications of Text Modelling**:
*Machine Translation*: Automated translation between human languages (e.g., Google Translate).
*Sentiment Analysis*: Determining whether text expresses positive, negative, or neutral sentiment.
*Document Classification*: Categorizing news articles or emails into topics (e.g., Technology, Sports, Spam).
*Text Summarization*: Distilling long documents into key executive summaries.
*Chatbots*: Automated conversational systems that understand and generate contextually appropriate text responses.

---

## 🐍 Python Snippets

### 1. NLTK Text Pre-Processing
Demonstrates tokenization, stop word removal, stemming, and lemmatization.

```python
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

# Download required NLTK data resources (run once)
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

raw_text = "The troubled geese were swimming and running away from troublesome foxes!"

# Step 1: Tokenization
tokens = word_tokenize(raw_text)
print("Tokens:", tokens)
# Output: ['The', 'troubled', 'geese', 'were', 'swimming', 'and', 'running', 'away', 'from', 'troublesome', 'foxes', '!']

# Step 2: Lowercasing & Stop Word Removal
stop_words = set(stopwords.words('english'))
filtered_tokens = [w.lower() for w in tokens if w.isalnum() and w.lower() not in stop_words]
print("Filtered Tokens:", filtered_tokens)
# Output: ['troubled', 'geese', 'swimming', 'running', 'away', 'troublesome', 'foxes']

# Step 3: Stemming (Rule-based, fast, may produce non-words)
stemmer = PorterStemmer()
stemmed_words = [stemmer.stem(w) for w in filtered_tokens]
print("Stemmed Words:", stemmed_words)
# Output: ['troubl', 'gees', 'swim', 'run', 'away', 'troublesom', 'fox']

# Step 4: Lemmatization (Dictionary-based, returns valid base words)
lemmatizer = WordNetLemmatizer()
lemmatized_words = [lemmatizer.lemmatize(w) for w in filtered_tokens]
print("Lemmatized Words (default POS=Noun):", lemmatized_words)
# Output: ['troubled', 'goose', 'swimming', 'running', 'away', 'troublesome', 'fox']

# Lemmatization with explicit Part-Of-Speech (POS = Verb 'v')
lemmatized_verbs = [lemmatizer.lemmatize(w, pos='v') for w in filtered_tokens]
print("Lemmatized Verbs (POS='v'):", lemmatized_verbs)
# Output: ['trouble', 'geese', 'swim', 'run', 'away', 'troublesome', 'foxes']
```

---

### 2. Scikit-Learn `CountVectorizer` (Bag of Words & N-Grams)
Demonstrates vocabulary building, feature extraction, `ngram_range`, and the distinction between `fit_transform()` and `transform()`.

```python
import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer

train_corpus = [
    "The dog is cute. The cat is also cute.",
    "The red cat is cute, but the blue cat is not."
]

test_corpus = [
    "The blue dog is very cute."
]

# Instantiate CountVectorizer with unigrams and bigrams
cv = CountVectorizer(stop_words='english', ngram_range=(1, 2))

# Fit vocabulary AND transform training set
X_train_counts = cv.fit_transform(train_corpus)

# Inspect vocabulary index mapping {term: index}
print("Vocabulary Mapping:\n", cv.vocabulary_)

# Retrieve feature names in column order
feature_names = cv.get_feature_names_out()
print("\nFeature Names:\n", feature_names)

# Convert count matrix to Pandas DataFrame for clear visualization
df_train = pd.DataFrame(X_train_counts.toarray(), columns=feature_names, index=["Doc 1", "Doc 2"])
print("\nTrain Document-Term Matrix:\n", df_train)

# Transform test set using the ALREADY FITTED vocabulary (DO NOT fit_transform test set!)
X_test_counts = cv.transform(test_corpus)
df_test = pd.DataFrame(X_test_counts.toarray(), columns=feature_names, index=["Test Doc"])
print("\nTest Document-Term Matrix:\n", df_test)
```

---

### 3. Scikit-Learn `TfidfVectorizer` & Matrix Interpretation
Demonstrates TF-IDF matrix generation and how to interpret cell values.

```python
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

corpus = [
    "The dog ate the hotdog",
    "The cat ate the fish",
    "The dog chased the cat"
]

# Initialize TfidfVectorizer
tfidf_vec = TfidfVectorizer(stop_words='english', max_features=10)
X_tfidf = tfidf_vec.fit_transform(corpus)

# Create DataFrame of TF-IDF matrix
feature_names = tfidf_vec.get_feature_names_out()
df_tfidf = pd.DataFrame(X_tfidf.toarray(), columns=feature_names, index=["Doc 1", "Doc 2", "Doc 3"])
print("TF-IDF Matrix:\n", df_tfidf.round(4))

"""
HOW TO INTERPRET THE TF-IDF MATRIX:
1. Rows represent individual Documents (Doc 1, Doc 2, Doc 3).
2. Columns represent Vocabulary Features/Terms ('ate', 'cat', 'chased', 'dog', 'fish', 'hotdog').
3. Cell Value Meaning:
0.0000: The word does NOT exist in this document.
High Score (e.g., 'hotdog' or 'fish'): The term appears frequently in this specific document
     AND is relatively rare across the rest of the corpus. It acts as a strong discriminating keyword.
Moderate Score: The word appears in the document but is also present in other documents (e.g., 'ate', 'cat').
"""
```

---

### 4. Text Classification with `MultinomialNB`
Full pipeline from text feature extraction to fitting, predicting, and outputting class probabilities.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Sample Training Data (Document Classification)
X_train_text = [
    "Python machine learning data science model",
    "Deep learning neural networks artificial intelligence",
    "Soccer basketball sports league tournament championship",
    "Football match goal striker sports team"
]
y_train = ["Tech", "Tech", "Sports", "Sports"]

# Sample Test Data
X_test_text = [
    "Neural network machine learning model",
    "Championship basketball sports goal"
]

# Step 1: Vectorize Text Data using TF-IDF
vectorizer = TfidfVectorizer(stop_words='english')
X_train_tfidf = vectorizer.fit_transform(X_train_text)

# Transform test data using fitted vectorizer
X_test_tfidf = vectorizer.transform(X_test_text)

# Step 2: Fit Multinomial Naive Bayes Model
nb_model = MultinomialNB()
nb_model.fit(X_train_tfidf, y_train)

# Step 3: Predict Class Labels
predictions = nb_model.predict(X_test_tfidf)

# Step 4: Predict Probability Distributions across classes
probabilities = nb_model.predict_proba(X_test_tfidf)
classes = nb_model.classes_

print("Predictions:", predictions)
# Output: ['Tech', 'Sports']

for i, doc in enumerate(X_test_text):
    print(f"\nDocument: '{doc}'")
    print(f"Predicted Class: {predictions[i]}")
    for cls, prob in zip(classes, probabilities[i]):
        print(f"  P(Class = {cls}): {prob:.4f}")
```

---

## 📊 Formulas & Key Equations

### 1. Cosine Similarity (Word Vector & Document Similarity)
Measures the cosine of the angle between two multi-dimensional vectors $\vec{u}$ and $\vec{v}$:

$$S_C(\vec{u}, \vec{v}) = \cos(\theta) = \frac{\vec{u} \cdot \vec{v}}{\|\vec{u}\| \|\vec{v}\|} = \frac{\sum_{i=1}^n u_i v_i}{\sqrt{\sum_{i=1}^n u_i^2} \cdot \sqrt{\sum_{i=1}^n v_i^2}}$$
 **Range**: $[-1, 1]$ for general vectors; $[0, 1]$ for non-negative term frequency / TF-IDF vectors. **Interpretation**: $1.0$ indicates identical direction (highest similarity), $0.0$ indicates orthogonal/unrelated vectors.

---

### 2. Term Frequency (TF)
Represents how frequently term $i$ appears in document $j$:

$$tf_{i,j} = \text{number of occurrences of term } i \text{ in document } j$$

*Normalized Term Frequency* (proportion of terms in document $d$):

$$TF(t, d) = \frac{f_{t,d}}{\sum_{t' \in d} f_{t',d}}$$

where $f_{t,d}$ is the raw count of term $t$ in document $d$.

---

### 3. Inverse Document Frequency (IDF)
Measures how much information term $t$ provides across the entire corpus of $N$ documents:

$$IDF(t) = \log \left( \frac{N}{df_i} \right)$$

where: $N$ = total number of documents in the dataset. $df_i$ (or $df(t)$) = number of documents containing term $i$.

---

### 4. TF-IDF Weight Calculation
Combines TF and IDF to produce a balanced term weight $w_{i,j}$:

$$w_{i,j} = tf_{i,j} \times \log \left( \frac{N}{df_i} \right)$$

$$\text{TF-IDF}(t, d, D) = \text{TF}(t, d) \times \text{IDF}(t, D)$$

---

### 5. Scikit-Learn Smooth TF-IDF Formula
Scikit-learn (`TfidfVectorizer`) uses a smoothed version of IDF to prevent division-by-zero for out-of-vocabulary terms and adds a constant 1 to avoid zero-weighted IDF terms:

$$\text{IDF}_{\text{sklearn}}(t) = \log \left( \frac{1 + N}{1 + df(t)} \right) + 1$$

Followed by L2-normalization of each document vector $\vec{v}$:

$$\vec{v}_{\text{norm}} = \frac{\vec{v}}{\|\vec{v}\|_2} = \frac{\vec{v}}{\sqrt{v_1^2 + v_2^2 + \dots + v_k^2}}$$

---

### 6. Multinomial Naive Bayes Classification Equation
Calculates the posterior probability of class $C_k$ given document $D = (x_1, x_2, \dots, x_n)$:

$$P(C_k \mid D) \propto P(C_k) \prod_{i=1}^n P(x_i \mid C_k)$$

where: $P(C_k)$ is the prior probability of class $C_k$. $P(x_i \mid C_k)$ is the conditional probability of feature term $x_i$ occurring in class $C_k$.

---

## ⚠️ Common Exam Traps

1. **Stemming vs. Lemmatization Output Trap**:
*Trap*: Assuming stemming always yields valid English words.
*Fact*: Stemming is purely rule-based suffix cutting (e.g., `PorterStemmer().stem("trouble")` $\rightarrow$ `'troubl'`). Lemmatization uses a dictionary and morphological lookup, returning valid words (e.g., `WordNetLemmatizer().lemmatize("trouble")` $\rightarrow$ `'trouble'`).
*Trap*: Expecting NLTK `WordNetLemmatizer().lemmatize("running")` to return `'run'`. By default, NLTK lemmatizes assuming the token is a **Noun** (`pos='n'`). To lemmatize verbs, you MUST explicitly specify `pos='v'`.

2. **Data Leakage with `fit_transform()` on Test Sets**:
*Trap*: Running `vectorizer.fit_transform(X_test)` when evaluating test data.
*Fact*: Calling `fit_transform()` on test data rebuilds a brand new vocabulary based on the test set, leading to feature column mismatch and data leakage.
*Rule*: ALWAYS call `fit_transform()` on `X_train` ONLY, and call `transform()` on `X_test`.

3. **High Term Frequency does NOT Guarantee High TF-IDF**:
*Trap*: Believing that a high word count in a document guarantees a high TF-IDF score.
*Fact*: If a word occurs in **every** document in the corpus ($df_i = N$), then $IDF = \log(N/N) = \log(1) = 0$. Consequently, its TF-IDF score is $TF \times 0 = 0$.

4. **CBOW vs. Skip-Gram Target & Context Direction**:
*Trap*: Confusing input and output roles between CBOW and Skip-Gram in Word2Vec.
*Fact*:
**CBOW (Continuous Bag of Words)**: Input = **Context Words** $\rightarrow$ Predicts = **Target Word**.
**Skip-Gram**: Input = **Target Word** $\rightarrow$ Predicts = **Context Words**.

5. **Understanding `ngram_range` Parameter in `sklearn`**:
*Trap*: Assuming `ngram_range=(1, 2)` produces only bigrams.
*Fact*: `ngram_range=(1, 2)` extracts **both unigrams AND bigrams**. If you want **only bigrams**, you must specify `ngram_range=(2, 2)`.

---

## 🧪 Practice Questions

**Q1.** What is the primary operational difference between Stemming and Lemmatization? A) Stemming uses a dictionary lookup; Lemmatization applies heuristic chopping rules. B) Stemming is rule-based and may output non-words; Lemmatization is dictionary-based and outputs valid base words. C) Stemming is computationally slower than Lemmatization because it parses grammatical context. D) Stemming requires Part-Of-Speech (POS) tags, while Lemmatization does not.

---

**Q2.** Consider the following Python code using Scikit-Learn:
```python
from sklearn.feature_extraction.text import CountVectorizer

corpus = [
    "cat dog cat",
    "dog dog fish"
]

vec = CountVectorizer()
X = vec.fit_transform(corpus)
print(vec.get_feature_names_out())
print(X.toarray())
```
Which of the following represents the exact output of `get_feature_names_out()` and `X.toarray()`? A) `['cat', 'dog', 'fish']` and `[[2, 1, 0], [0, 2, 1]]` B) `['cat', 'dog', 'fish']` and `[[1, 1, 0], [0, 1, 1]]` C) `['cat', 'dog', 'fish']` and `[[2, 1, 1], [1, 2, 0]]` D) `['dog', 'cat', 'fish']` and `[[1, 2, 0], [2, 0, 1]]`

---

**Q3.** A corpus contains $N = 100$ total documents. The term `"blockchain"` appears $5$ times in Document $D_1$, which has a total length of $100$ words. The term `"blockchain"` occurs in a total of $10$ documents across the entire corpus. Using the standard formulas $TF(t, d) = \frac{\text{count}(t,d)}{\text{total terms in } d}$ and $IDF(t) = \log_{10}\left(\frac{N}{df(t)}\right)$, what is the TF-IDF weight of `"blockchain"` in $D_1$? A) $0.05$ B) $0.50$ C) $0.10$ D) $0.005$

---

**Q4.** Analyze the following Python script evaluating a text classification workflow:
```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

train_data = ["win free prize money", "call urgent meeting now"]
train_labels = ["Spam", "Ham"]
test_data = ["urgent prize money"]

tfidf = TfidfVectorizer()
X_train = tfidf.fit_transform(train_data)

# Line X
X_test = tfidf.fit_transform(test_data)

model = MultinomialNB()
model.fit(X_train, train_labels)
pred = model.predict(X_test)
```
Why is `Line X` flawed for an exam or production machine learning evaluation? A) `MultinomialNB` does not accept TF-IDF transformed sparse matrices as input. B) `Line X` uses `fit_transform(test_data)`, which resets the vectorizer's vocabulary to match the test set only, causing feature misalignment and data leakage. C) `TfidfVectorizer` cannot process 3-word strings like `"urgent prize money"`. D) The `MultinomialNB` classifier must be instantiated before `TfidfVectorizer`.

---

**Q5.** In Word2Vec architectures, which statement correctly describes the Continuous Bag of Words (CBOW) and Skip-Gram models? A) CBOW predicts context words using a single target word; Skip-Gram predicts a target word using context words. B) CBOW predicts a target word using surrounding context words; Skip-Gram predicts surrounding context words using a single target word. C) CBOW uses frequency-based count vectors, whereas Skip-Gram uses TF-IDF weights. D) CBOW preserves strict full-sentence word ordering, while Skip-Gram ignores word order completely.

---

### 💡 Answer Key
 **Q1: B** — Stemming relies on rule-based heuristics that chop off affixes (often yielding non-words like `'troubl'`), whereas Lemmatization uses dictionary morphing (e.g., WordNet) to return valid canonical base words (lemmas). **Q2: A** — Scikit-Learn sorts feature names alphabetically: `['cat', 'dog', 'fish']`. In Doc 1 (`"cat dog cat"`), counts are `cat=2`, `dog=1`, `fish=0` $\rightarrow$ `[2, 1, 0]`. In Doc 2 (`"dog dog fish"`), counts are `cat=0`, `dog=2`, `fish=1` $\rightarrow$ `[0, 2, 1]`. **Q3: A** — Calculate TF: $TF = \frac{5}{100} = 0.05$. Calculate IDF: $IDF = \log_{10}\left(\frac{100}{10}\right) = \log_{10}(10) = 1.0$. Compute TF-IDF: $TF \times IDF = 0.05 \times 1.0 = 0.05$. **Q4: B** — Calling `fit_transform(test_data)` on test data re-fits the vocabulary based solely on `test_data` rather than projecting test samples onto the learned training vocabulary. The correct method for test data is `tfidf.transform(test_data)`. **Q5: B** — CBOW takes multiple surrounding context words as input to predict the missing central target word. Skip-Gram takes a single central target word as input to predict its surrounding context words.

## Multiple Choice Questions

1. What is the primary difference between Stemming and Lemmatization?
    - **A)** Stemming uses a dictionary, Lemmatization uses heuristic rules
    - **B)** Stemming often outputs non-words by chopping suffixes; Lemmatization outputs valid dictionary base words
    - **C)** Stemming is much slower than Lemmatization
    - **D)** Lemmatization does not require POS tags

2. In the TF-IDF calculation, what happens to the IDF weight if a word appears in every single document?
    - **A)** The IDF weight becomes negative
    - **B)** The IDF weight is maximized
    - **C)** The IDF weight becomes zero
    - **D)** It is unaffected

3. In a Bag of Words (`CountVectorizer`) model, what information is lost?
    - **A)** The frequency of words
    - **B)** The length of the document
    - **C)** Word order and grammatical structure
    - **D)** The exact vocabulary used

4. Which Word2Vec architecture predicts a target word based on its surrounding context words?
    - **A)** Skip-Gram
    - **B)** TF-IDF
    - **C)** Continuous Bag of Words (CBOW)
    - **D)** N-Grams

5. Why should `fit_transform()` only be used on training data, and not on test data?
    - **A)** It causes the test data to be deleted
    - **B)** It rebuilds a new vocabulary for the test set, leading to mismatched feature spaces and data leakage
    - **C)** It prevents the model from calculating TF-IDF scores
    - **D)** It makes the algorithm run infinitely

### Answer Key & Explanations
1. **B)** Stemming uses crude rules (e.g. chopping ing), while Lemmatization maps words to their canonical lemma.
2. **C)** IDF = log(N/df). If a word is in all N documents, df=N, log(1) = 0.
3. **C)** BoW treats documents as unordered collections of term frequencies, ignoring syntax.
4. **C)** CBOW uses context to predict the target, whereas Skip-Gram uses the target to predict context.
5. **B)** The test set must be transformed using the exact vocabulary features learned from the training set.

## References & Navigation

- **Previous Topic:** [[Recommender Systems]]
- **Next Topic:** [[Time Series Data Modelling]]
- **Related Notes:** [[Time Series Data Modelling]], [[Image Data Modelling]]
