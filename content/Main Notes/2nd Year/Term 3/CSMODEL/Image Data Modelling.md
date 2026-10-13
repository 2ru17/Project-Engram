---
id: Module-18-Image-Data-Modelling
type: note
course: CSMODEL
topic: Image Data Modelling
status: completed
---

> [!info] Document Metadata
> - **Course:** `=this.course`
> - **Topic:** `=this.topic`
> - **Status:** `=this.status`

**🏷️ Tags:** #[[CSMODEL]] #[[Image Data Modelling]] #[[Computer Science]] #[[Data Science]] #[[Statistical Modeling]] #[[Python]] #[[Machine Learning]]

---

# Module 18: Image Data Modelling

## 📚 Key Concepts

### 1. Image Representation in Computer Vision & ML
In digital image processing and machine learning, an image is mathematically represented as a 2D spatial function $f(x, y)$, where $(x, y)$ denotes spatial coordinates in a discrete 2D grid, and $f(x, y)$ represents the intensity or color value at that location.
 **Grayscale Images (Single Channel)**:
Represented as a 2D matrix of height $H$ and width $W$ (array shape: `(H, W)` or `(H, W, 1)`).
Each pixel represents light **intensity**, ranging from $0$ (pure black) to $255$ (pure white) using unsigned 8-bit integers (`np.uint8`).
Total intensity levels per pixel: $2^8 = 256$ discrete levels.
 **Color Images (RGB — Multi-Channel)**:
Represented as a 3D tensor of shape `(H, W, 3)` with 3 distinct color channels: **Red**, **Green**, and **Blue**.
Each pixel at position $(x, y)$ is a 3-element vector: $\mathbf{p}(x, y) = [R, G, B]^T$, where $R, G, B \in [0, 255]$.
Total unique color combinations per pixel:
    $$\text{Total Colors} = 256 \times 256 \times 256 = 256^3 = 16,777,216 \text{ colors } (\sim 16.78 \text{ million})$$
 **Data Types & Array Layout**:
Raw image data loaded via libraries (such as PIL or OpenCV) use 8-bit unsigned integers (`uint8`).
When indexing a NumPy image array `img[row, col]`, `row` corresponds to the vertical $y$-axis (0 to $H-1$), and `col` corresponds to the horizontal $x$-axis (0 to $W-1$).

---

### 2. Spatial Transformations & Affine Transformation Matrices
Spatial transformations alter the spatial coordinates of pixels $(x, y) \to (x', y')$. An **Affine Transformation** is a linear mapping that preserves points, straight lines, and parallelism.

Using 2D homogeneous coordinates $\begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$, an affine transformation is expressed as:
$$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \mathbf{M} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix} = \begin{bmatrix} a_{11} & a_{12} & t_x \\ a_{21} & a_{22} & t_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$
 **Identity Transformation**: Returns the identical image without changes.
  $$\mathbf{M}_{\text{identity}} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} \implies x' = x, \quad y' = y$$
 **Translation**: Shifts the image location by offsets $t_x$ (horizontal) and $t_y$ (vertical).
  $$\mathbf{M}_{\text{translate}} = \begin{bmatrix} 1 & 0 & t_x \\ 0 & 1 & t_y \\ 0 & 0 & 1 \end{bmatrix} \implies \begin{cases} x' = x + t_x \quad (t_x > 0 \text{ shifts right}) \\ y' = y + t_y \quad (t_y > 0 \text{ shifts upward/downward}) \end{cases}$$
 **Rotation**: Rotates the pixel coordinates by angle $\theta$ around the origin.
  $$\mathbf{M}_{\text{rotate}} = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix} \implies \begin{cases} x' = x\cos\theta - y\sin\theta \\ y' = x\sin\theta + y\cos\theta \end{cases}$$
 **Scaling**: Resizes the image by scaling factors $s_x$ (width) and $s_y$ (height).
  $$\mathbf{M}_{\text{scale}} = \begin{bmatrix} s_x & 0 \\ 0 & s_y \end{bmatrix} \implies x' = s_x \cdot x, \quad y' = s_y \cdot y$$
 **Reflection (Flipping)**: Mirrors the image across specified axes.
Horizontal Flip (across vertical axis): $r_x = -1, r_y = 1 \implies \mathbf{M}_{\text{reflect\_x}} = \begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$
Vertical Flip (across horizontal axis): $r_x = 1, r_y = -1 \implies \mathbf{M}_{\text{reflect\_y}} = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$

---

### 3. Image Filtering & 2D Convolution Kernels
Image filtering is a spatial domain operation where a small matrix called a **kernel** (or filter) of size $k \times k$ (typically $3 \times 3$ or $5 \times 5$) slides across an image matrix. At each pixel location, element-wise multiplication is performed between the kernel weights and the overlapping pixel intensities, followed by summation.

#### Fundamental Convolution Filters:

1. **Identity Kernel**: Leaves the image unaltered.
   $$\mathbf{K}_{\text{identity}} = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 0 \end{bmatrix}$$

2. **Vertical Line Detection Kernels**: Detect vertical intensity changes (edges). The central column has positive values while left and right columns have negative weights.
   $$\mathbf{K}_{\text{vert1}} = \begin{bmatrix} -1 & 2 & -1 \\ -1 & 2 & -1 \\ -1 & 2 & -1 \end{bmatrix}, \quad \mathbf{K}_{\text{vert2}} = \begin{bmatrix} -2 & 4 & -2 \\ -2 & 4 & -2 \\ -2 & 4 & -2 \end{bmatrix}, \quad \mathbf{K}_{\text{vert3}} = \begin{bmatrix} -4 & 8 & -4 \\ -4 & 8 & -4 \\ -4 & 8 & -4 \end{bmatrix}$$

3. **Horizontal Line Detection Kernels**: Detect horizontal intensity transitions. The central row has positive values while top and bottom rows have negative weights.
   $$\mathbf{K}_{\text{horiz1}} = \begin{bmatrix} -1 & -1 & -1 \\ 2 & 2 & 2 \\ -1 & -1 & -1 \end{bmatrix}, \quad \mathbf{K}_{\text{horiz2}} = \begin{bmatrix} -2 & -2 & -2 \\ 4 & 4 & 4 \\ -2 & -2 & -2 \end{bmatrix}, \quad \mathbf{K}_{\text{horiz3}} = \begin{bmatrix} -4 & -4 & -4 \\ 8 & 8 & 8 \\ -4 & -4 & -4 \end{bmatrix}$$

4. **Diagonal Line Detection Kernels**: Detect features oriented along diagonal angles ($45^\circ$ or $135^\circ$).
   $$\mathbf{K}_{\text{diag1}} = \begin{bmatrix} -1 & -1 & 2 \\ -1 & 2 & -1 \\ 2 & -1 & -1 \end{bmatrix}, \quad \mathbf{K}_{\text{diag2}} = \begin{bmatrix} 2 & -1 & -1 \\ -1 & 2 & -1 \\ -1 & -1 & 2 \end{bmatrix}$$

5. **Edge Detection (Omnidirectional / Laplacian)**: Combines vertical, horizontal, and diagonal line detection. Highlights all sharp boundaries where intensity changes rapidly. Sum of weights is $0$.
   $$\mathbf{K}_{\text{edge}} = \begin{bmatrix} -1 & -1 & -1 \\ -1 & 8 & -1 \\ -1 & -1 & -1 \end{bmatrix}$$

6. **Sharpen Filter**: Increases contrast at edges to make features appear crisp. Central weight dominates; sum of weights is $1$.
   $$\mathbf{K}_{\text{sharpen}} = \begin{bmatrix} 0 & -1 & 0 \\ -1 & 5 & -1 \\ 0 & -1 & 0 \end{bmatrix}$$

7. **Edge Enhancement Filter**: Accentuates edges while preserving base brightness. Sum of weights is $1$.
   $$\mathbf{K}_{\text{edge\_enhance}} = \begin{bmatrix} -1 & -1 & -1 \\ -1 & 9 & -1 \\ -1 & -1 & -1 \end{bmatrix}$$

8. **Emboss Filter**: Creates a 3D shadow and highlight effect by computing directional differences along a diagonal axis.
   $$\mathbf{K}_{\text{emboss}} = \begin{bmatrix} -2 & -1 & 0 \\ -1 & 1 & 1 \\ 0 & 1 & 2 \end{bmatrix}$$

9. **Box Blur (Mean Filter)**: Smooths an image by replacing each pixel with the uniform unweighted average of its neighborhood. Normalized by dividing by $9$ so sum of weights is $1$.
   $$\mathbf{K}_{\text{box\_blur}} = \frac{1}{9} \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$$

10. **Gaussian Blur**: Smooths the image giving greater weight to central pixels according to a 2D Gaussian distribution. Normalized by dividing by $16$ so sum of weights is $1$.
    $$\mathbf{K}_{\text{gaussian\_blur}} = \frac{1}{16} \begin{bmatrix} 1 & 2 & 1 \\ 2 & 4 & 2 \\ 1 & 2 & 1 \end{bmatrix}$$

---

### 4. Image Preprocessing & Data Augmentation
Standard ML algorithms require clean, uniformly formatted numeric inputs:
 **Resizing**: Rescales input images of varying resolutions to a fixed target dimension $(W_{\text{target}}, H_{\text{target}})$. Fixed sizing is required because machine learning models demand feature vectors of consistent length $D = H \cdot W \cdot C$. **Normalization**: Converts raw pixel values from integer range $[0, 255]$ (`uint8`) to floating-point range $[0.0, 1.0]$ (`float32`) by performing element-wise division:
  $$I_{\text{norm}} = \frac{I}{255.0}$$
  *Why Normalize?* Scaling features prevents large numeric values from distorting distance metrics (in KNN) or gradient steps (in Neural Networks / SVM). **Data Augmentation**: Artificially expands training dataset size by generating modified versions of existing images using random spatial transformations (rotation, translation, horizontal flipping, cropping, scaling).
*Goal*: Prevents overfitting and teaches the model **invariance** to rotation, translation, and small perspective changes.

---

### 5. Feature Extraction & Image Embeddings
Raw pixel arrays are high-dimensional and spatially correlated. Feature extraction transforms raw images into compact numerical vectors.
 **Flattening (Vectorization)**:
Converting an image array of shape $(H, W, C)$ into a 1D feature vector of length $N_{\text{features}} = H \times W \times C$.
*Limitation*: Destroys spatial structure (adjacency of pixels across rows and columns) and creates ultra-high dimensional vectors ($100 \times 100 \times 3 = 30,000$ features), triggering the **curse of dimensionality**.
 **Image Embeddings**:
An image embedding is a mapping of a discrete image into a low-dimensional continuous vector space containing learned or extracted semantic features.
*Purposes*:
    1. Nearest-neighbor recommendation & similarity search.
    2. Input features for supervised machine learning classifiers (SVM, KNN, Logistic Regression).
    3. Low-dimensional visualization (t-SNE, PCA) of semantic categories.
 **Traditional Descriptors — HOG (Histogram of Oriented Gradients)**:
Captures local object shape and structure.
Unlike simple edge detection filters, HOG extracts both **gradient magnitude** AND **gradient orientation (direction)**.
Divides the image into small connected localized regions (cells), computes a histogram of gradient directions for pixels within each cell, and normalizes across larger blocks.
 **Deep Learning Architectures (CNNs & Autoencoders)**:
**Convolutional Neural Networks (CNNs)**: Learn hierarchical feature representations directly from data in an end-to-end manner.
*Convolutional Layers*: Apply learnable filters to extract feature maps (early layers extract edges/textures; deep layers extract complex object parts).
*Pooling Layers (Subsampling)*: Downsample feature maps (e.g. Max Pooling $2 \times 2$) to reduce spatial dimensions, lower computation, and provide translation invariance.
*Flattening Layer*: Unrolls 2D feature maps into a 1D vector before fully connected classification layers.
*Classifier (Dense + Softmax)*: Computes class probability predictions.
**Autoencoders**: Unsupervised neural networks designed to compress and reconstruct image data.
*Encoder*: Compresses input image into a low-dimensional **Latent Space Representation** (bottleneck embedding).
*Decoder*: Reconstructs the original image from the latent vector.
*Objective*: Learns an approximation of the identity function $f(x) \approx x$ under a bottleneck constraint.

---

### 6. Principal Component Analysis (PCA) for Image Dimensionality Reduction
Flattening even small images yields thousands of features per sample. **PCA** reduces dimensionality by projecting flattened vectors onto orthogonal axes (principal components) that maximize variance:
 **Eigenfaces Concept**: Applying PCA to flattened face/object images yields principal components that represent dominant spatial patterns (eigenfaces). **Key Parameters & Properties**:
`n_components`: Integer (number of top components to retain, e.g., 50) or float (fraction of total variance to preserve, e.g., `0.95`).
`explained_variance_ratio_`: Array of length `n_components` indicating the fraction of total dataset variance explained by each principal component.
Cumulative explained variance sum: $\sum_{i=1}^{k} \text{ratio}_i \ge 0.95$.

---

### 7. Image Classification with Scikit-Learn
Once images are flattened/normalized and optionally reduced via PCA or HOG, traditional classifiers can be trained:
 **Support Vector Machine (`SVC`)**:
Maps feature vectors into high-dimensional space and finds optimal separating hyperplanes.
Non-linear **RBF (Radial Basis Function) Kernel** (`kernel='rbf'`) is highly effective for image embedding classification. **K-Nearest Neighbors (`KNeighborsClassifier`)**:
Classifies test images based on Euclidean distance to the $K$ closest training embeddings.

---

### 8. Overview of Real-World Image Modelling Applications
As covered in the module, modern computer vision models address diverse tasks: **Image Classification**: Categorizing whole images (e.g., LeNet-5, ConvNetJS). **Object Detection**: Locating bounding boxes and labeling objects (e.g., YOLO9000). **Object Segmentation**: Classifying every pixel belonging to an object (e.g., Space-Time Memory Networks). **Crowd Counting**: Estimating density maps in crowded scenes (e.g., ConNet). **Image Captioning**: Generating text descriptions from images (e.g., Unified VLP). **Text-to-Image Generation**: Generating images from text prompts (e.g., DTGAN). **Style Transfer**: Merging content of one image with style of another (e.g., Neural Style Transfer). **Image Synthesis & Generation**: Creating realistic synthetic faces or objects (e.g., RDGAN, StyleGAN). **Image-to-Image Translation**: Mapping domain $A$ images to domain $B$ (e.g., CycleGAN horse-to-zebra, StarGAN facial attribute transfer). **Semantic Image Synthesis**: Converting label maps into photorealistic images (e.g., GauGAN). **Deepfakes & Motion Transfer**: Transferring body movement or facial expressions between videos (e.g., Impersonator++, Everybody Dance Now).

---

## 🐍 Python Snippets

### 1. Image Loading, Grayscale Conversion, Resizing & NumPy Array Conversion
Loading an image using Pillow (PIL), resizing, converting color modes, and transforming into NumPy arrays.

```python
from PIL import Image
import numpy as np

# 1. Load image from disk
img_rgb = Image.open("sample_image.jpg")
print("Original PIL Image Format:", img_rgb.format)
print("Original PIL Image Size (Width, Height):", img_rgb.size)  # Returns (W, H)
print("Original Mode:", img_rgb.mode)                            # e.g., 'RGB'

# 2. Convert color image to Grayscale ('L' mode: 8-bit pixels, black and white)
img_gray = img_rgb.convert('L')
print("Converted Mode:", img_gray.mode)                         # 'L'

# 3. Resize image to uniform dimensions (Target W=64, H=64)
# IMPORTANT: PIL img.resize() takes a tuple of (width, height)
target_width, target_height = 64, 64
img_resized = img_gray.resize((target_width, target_height))

# 4. Convert PIL Image object to NumPy array
img_array = np.array(img_resized)
print("NumPy Array Shape (Height, Width):", img_array.shape)    # Output: (64, 64)
print("NumPy Array Data Type:", img_array.dtype)                # Output: uint8
print("Pixel Intensity Range:", img_array.min(), "to", img_array.max())
```

---

### 2. Image Normalization & Array Flattening for ML
Preparing image arrays for scikit-learn models by converting types, normalizing intensity, and reshaping.

```python
import numpy as np

# Assume img_array is a (64, 64) uint8 NumPy matrix with values in [0, 255]

# 1. Normalize pixel intensities from [0, 255] uint8 to [0.0, 1.0] float32
img_normalized = img_array.astype(np.float32) / 255.0
print("Normalized Data Type:", img_normalized.dtype)            # float32
print("Normalized Range:", img_normalized.min(), "to", img_normalized.max())

# 2. Flatten a single 2D image (64, 64) into a 1D feature vector of length 4096
feature_vector = img_normalized.flatten()
print("Flattened Vector Shape:", feature_vector.shape)          # (4096,)

# 3. Reshape single vector for Scikit-Learn input (must be 2D array of shape (1, n_features))
X_single_sample = feature_vector.reshape(1, -1)
print("Scikit-Learn Single Sample Shape:", X_single_sample.shape) # (1, 4096)

# 4. For a batch/dataset of N images stored in a 3D tensor (N, H, W):
# N_samples = 100
# X_dataset = raw_batch_array.reshape(N_samples, -1) / 255.0   # Shape: (100, 4096)
```

---

### 3. Custom Image Filtering & 2D Convolution with SciPy
Applying spatial convolution kernels to extract features or alter images manually.

```python
import numpy as np
from scipy.ndimage import convolve

# Define standard 3x3 convolution kernels
kernel_identity = np.array([[0, 0, 0],
                            [0, 1, 0],
                            [0, 0, 0]], dtype=np.float32)

kernel_vert_lines = np.array([[-1, 2, -1],
                              [-1, 2, -1],
                              [-1, 2, -1]], dtype=np.float32)

kernel_horiz_lines = np.array([[-1, -1, -1],
                               [ 2,  2,  2],
                               [-1, -1, -1]], dtype=np.float32)

kernel_edge_detection = np.array([[-1, -1, -1],
                                 [-1,  8, -1],
                                 [-1, -1, -1]], dtype=np.float32)

kernel_sharpen = np.array([[ 0, -1,  0],
                           [-1,  5, -1],
                           [ 0, -1,  0]], dtype=np.float32)

kernel_box_blur = np.ones((3, 3), dtype=np.float32) / 9.0

kernel_gaussian_blur = np.array([[1, 2, 1],
                                 [2, 4, 2],
                                 [1, 2, 1]], dtype=np.float32) / 16.0

# Apply convolution using scipy.ndimage.convolve
# img_normalized is a 2D float32 image matrix
img_edges = convolve(img_normalized, kernel_edge_detection, mode='nearest')
img_blurred = convolve(img_normalized, kernel_gaussian_blur, mode='nearest')
img_sharpened = convolve(img_normalized, kernel_sharpen, mode='nearest')

print("Filtered Output Shape:", img_edges.shape) # Same as input shape (64, 64)
```

---

### 4. Dimensionality Reduction on Image Data using PCA
Using Scikit-Learn's `PCA` to compress flattened image vectors before training classifiers.

```python
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split
import numpy as np

# Simulated dataset: 500 flattened grayscale images of size 64x64 (4096 features)
np.random.seed(42)
N_samples, H, W = 500, 64, 64
X_raw = np.random.randint(0, 256, size=(N_samples, H * W), dtype=np.uint8)
y_labels = np.random.choice([0, 1], size=N_samples)

# Normalize dataset
X_norm = X_raw.astype(np.float32) / 255.0

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X_norm, y_labels, test_size=0.2, random_state=42
)

# Initialize PCA preserving 95% of total variance
pca = PCA(n_components=0.95, random_state=42)

# Fit PCA on training set and transform both train and test sets
X_train_pca = pca.fit_transform(X_train)
X_test_pca = pca.transform(X_test)

print("Original Features Count:", X_train.shape[1])        # 4096
print("PCA Reduced Features Count:", X_train_pca.shape[1]) # Reduced dimension
print("Cumulative Explained Variance:", np.sum(pca.explained_variance_ratio_))
```

---

### 5. Supervised Image Classification Pipeline (SVM & KNN)
Training SVM with RBF kernel and K-Nearest Neighbors on PCA-transformed image embeddings.

```python
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score, classification_report

# 1. Train Support Vector Classifier with RBF Kernel
svm_model = SVC(kernel='rbf', C=10.0, gamma='scale', random_state=42)
svm_model.fit(X_train_pca, y_train)

# Predict on test set
y_pred_svm = svm_model.predict(X_test_pca)
svm_acc = accuracy_score(y_test, y_pred_svm)
print(f"SVM (RBF Kernel) Test Accuracy: {svm_acc * 100:.2f}%")

# 2. Train K-Nearest Neighbors Classifier
knn_model = KNeighborsClassifier(n_neighbors=5, metric='minkowski', p=2)
knn_model.fit(X_train_pca, y_train)

# Predict on test set
y_pred_knn = knn_model.predict(X_test_pca)
knn_acc = accuracy_score(y_test, y_pred_knn)
print(f"KNN (k=5) Test Accuracy: {knn_acc * 100:.2f}%")
```

---

### 6. Image Visualization with Matplotlib
Displaying original and filtered images correctly using Matplotlib.

```python
import matplotlib.pyplot as plt

# Create a figure with 3 subplots side-by-side
fig, axes = plt.subplots(1, 3, figsize=(12, 4))

# Subplot 1: Grayscale Image (CRITICAL: set cmap='gray')
axes[0].imshow(img_array, cmap='gray')
axes[0].set_title("Original Grayscale")
axes[0].axis('off')

# Subplot 2: Edge Detection Result
axes[1].imshow(img_edges, cmap='gray')
axes[1].set_title("Edge Detection")
axes[1].axis('off')

# Subplot 3: Gaussian Blur Result
axes[2].imshow(img_blurred, cmap='gray')
axes[2].set_title("Gaussian Blur")
axes[2].axis('off')

plt.tight_layout()
plt.show()
```

---

## 📊 Formulas & Key Equations

1. **RGB Color Space Combinations**:
   $$N_{\text{RGB}} = 256 \times 256 \times 256 = 256^3 = 16,777,216$$

2. **Luminance Weighted Grayscale Conversion Formula**:
   $$Y = 0.299 \cdot R + 0.587 \cdot G + 0.114 \cdot B$$

3. **Image Intensity Normalization**:
   $$I_{\text{norm}}(x, y) = \frac{I(x, y)}{255.0} \in [0.0, 1.0]$$

4. **2D Homogeneous Affine Transformation**:
   $$\begin{bmatrix} x' \\ y' \\ 1 \end{bmatrix} = \begin{bmatrix} a_{11} & a_{12} & t_x \\ a_{21} & a_{22} & t_y \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} x \\ y \\ 1 \end{bmatrix}$$

5. **Rotation Matrix (Angle $\theta$)**:
   $$\mathbf{R}(\theta) = \begin{bmatrix} \cos\theta & -\sin\theta \\ \sin\theta & \cos\theta \end{bmatrix}$$

6. **Discrete 2D Spatial Convolution**:
   $$S(i, j) = (I * K)(i, j) = \sum_{m} \sum_{n} I(i - m, j - n) \cdot K(m, n)$$

7. **CNN Output Feature Map Size (1D Spatial Dimension)**:
   $$O = \left\lfloor \frac{W - K + 2P}{S} \right\rfloor + 1$$
   *Where*: $W = \text{input dimension}$, $K = \text{kernel size}$, $P = \text{padding}$, $S = \text{stride}$.

8. **PCA Cumulative Explained Variance Ratio**:
   $$\text{Cumulative Variance}(k) = \sum_{i=1}^{k} \frac{\lambda_i}{\sum_{j=1}^{D} \lambda_j}$$

---

## ⚠️ Common Exam Traps
 ⚠️ **PIL `Image.size` vs NumPy `array.shape` Axis Flip**:
PIL's `img.size` returns `(width, height)` i.e., `(W, H)`.
NumPy's `array.shape` returns `(height, width, channels)` i.e., `(H, W, C)`.
When calling `img.resize((w, h))`, pass `(width, height)`. Passing `img_array.shape` directly into `PIL.Image.resize()` swaps width and height, causing unexpected distortion!
 ⚠️ **Integer Division with `uint8` Arrays**:
Performing integer division `img_uint8 // 255` in Python/NumPy results in all zeros (except for pure white pixels `255 // 255 = 1`).
Always convert to floating-point first: `img.astype(np.float32) / 255.0`.
 ⚠️ **Kernel Weight Sum & Brightness Conservation**:
**Blur/Smoothing Kernels**: Weights sum to **$1$** (e.g., Box Blur sums to $9/9 = 1$, Gaussian sums to $16/16 = 1$). This preserves original image overall energy/brightness.
**Edge Detection Kernels**: Weights sum to **$0$** (e.g., Laplacian $\begin{bmatrix}-1&-1&-1\\-1&8&-1\\-1&-1&-1\end{bmatrix}$ sums to $0$). Constant uniform regions yield an output of $0$ (black).
**Sharpen / Edge Enhancement Kernels**: Weights sum to **$1$** (e.g., center is $5$ or $9$, surrounding elements sum to $-4$ or $-8$).
 ⚠️ **Distinguishing Line Detection Kernels**:
**Vertical Line Detector**: Columns have uniform constant values (e.g., left column $-1$, center $+2$, right column $-1$).
**Horizontal Line Detector**: Rows have uniform constant values (e.g., top row $-1$, center row $+2$, bottom row $-1$).
 ⚠️ **Flattening Destroys Spatial Topology**:
Flattening an image $H \times W \times C \to (H \cdot W \cdot C)$ treats pixels as independent isolated features. It completely ignores spatial relationships (e.g., pixel $(x, y)$ is adjacent to $(x+1, y)$). CNNs solve this by using localized 2D convolution filters.
 ⚠️ **PCA Input Requirements**:
PCA in `scikit-learn` expects a 2D matrix of shape `(n_samples, n_features)`. Passing a single 2D image matrix `(H, W)` will cause PCA to treat $H$ as individual samples and $W$ as features, which is conceptually incorrect!
 ⚠️ **Matplotlib Default Colormap (`cmap`)**:
Displaying a 2D grayscale NumPy array with `plt.imshow(img_gray)` without specifying `cmap='gray'` will render the image with the default `viridis` color palette (appearing green/purple).

---

## 🧪 Practice Questions

**Q1.** A color digital image has resolution $200 \times 150$ pixels (Width = 200, Height = 150) in standard RGB format (`uint8`). Which of the following statements correctly describes its NumPy array representation and total possible pixel color choices? A) Shape is `(200, 150, 3)`, dtype is `float32`, total color choices per pixel is $256$. B) Shape is `(150, 200, 3)`, dtype is `uint8`, total color choices per pixel is $16,777,216$. C) Shape is `(150, 200)`, dtype is `uint8`, total color choices per pixel is $65,536$. D) Shape is `(200, 150)`, dtype is `int64`, total color choices per pixel is $16,777,216$.

---

**Q2.** (Code Reading) Examine the following Python code snippet:
```python
from PIL import Image
import numpy as np

# Load and process image
img = Image.new('RGB', (80, 60), color='red')  # Width=80, Height=60
img_gray = img.convert('L')
img_resized = img_gray.resize((30, 40))         # Resize target tuple
arr = np.array(img_resized)
arr_norm = arr / 255.0
vec = arr_norm.flatten()
X_in = vec.reshape(1, -1)

print(arr.shape)
print(X_in.shape)
```
What will be the printed output for `arr.shape` and `X_in.shape`? A) `(60, 80)` and `(1, 4800)` B) `(30, 40)` and `(1, 1200)` C) `(40, 30)` and `(1, 1200)` D) `(40, 30, 1)` and `(1200, 1)`

---

**Q3.** A student applies the following $3 \times 3$ convolution kernel $\mathbf{K}$ to a 2D grayscale image patch $\mathbf{I}$:
$$\mathbf{I} = \begin{bmatrix} 10 & 10 & 10 \\ 10 & 90 & 10 \\ 10 & 10 & 10 \end{bmatrix}, \quad \mathbf{K} = \begin{bmatrix} 0 & -1 & 0 \\ -1 & 5 & -1 \\ 0 & -1 & 0 \end{bmatrix}$$
What is the resulting output value for the central pixel, and what operation does kernel $\mathbf{K}$ perform? A) Output = $410$; Operation = Sharpen Filter. B) Output = $90$; Operation = Identity Filter. C) Output = $10$; Operation = Box Blur Filter. D) Output = $370$; Operation = Sharpen Filter.

---

**Q4.** (Code Reading) Consider the machine learning pipeline code below:
```python
import numpy as np
from sklearn.decomposition import PCA
from sklearn.svm import SVC

# X_train shape: (500 samples, 4096 flattened features), normalized to [0, 1]
np.random.seed(0)
X_train = np.random.rand(500, 4096).astype(np.float32)
y_train = np.random.randint(0, 2, size=500)

pca = PCA(n_components=0.90, random_state=42)
X_train_pca = pca.fit_transform(X_train)

clf = SVC(kernel='rbf', C=1.0)
clf.fit(X_train_pca, y_train)

print(f"Components kept: {pca.n_components_}")
print(f"Variance explained: {np.sum(pca.explained_variance_ratio_):.2f}")
```
Which statement regarding this pipeline is CORRECT? A) `pca.n_components_` will be exactly equal to `0.90`. B) `np.sum(pca.explained_variance_ratio_)` will be greater than or equal to `0.90`. C) `X_train_pca` will have shape `(500, 4096)`. D) If `X_train` was NOT normalized to `[0, 1]`, `SVC` with an RBF kernel would execute much faster and achieve higher accuracy.

---

**Q5.** Which of the following convolution kernels performs **Horizontal Line Detection**? A) $\begin{bmatrix} -1 & 2 & -1 \\ -1 & 2 & -1 \\ -1 & 2 & -1 \end{bmatrix}$ B) $\begin{bmatrix} -1 & -1 & -1 \\ 2 & 2 & 2 \\ -1 & -1 & -1 \end{bmatrix}$ C) $\begin{bmatrix} -1 & -1 & -1 \\ -1 & 8 & -1 \\ -1 & -1 & -1 \end{bmatrix}$ D) $\frac{1}{9} \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$

---

**Q6.** In a Convolutional Neural Network (CNN), an input image of size $32 \times 32 \times 3$ is passed through a convolutional layer with $6$ filters, each of kernel size $5 \times 5$, stride $S = 1$, and padding $P = 0$. What is the spatial shape $(H_{\text{out}}, W_{\text{out}}, C_{\text{out}})$ of the resulting feature maps before pooling? A) `(28, 28, 6)` B) `(32, 32, 6)` C) `(28, 28, 3)` D) `(14, 14, 6)`

---

### Answer Key
 **Q1: B** — NumPy array shape convention is `(Height, Width, Channels)`. For resolution $200 \times 150$ (Width = 200, Height = 150), the shape is `(150, 200, 3)`. Each RGB channel uses 8 bits ($0-255$), yielding $256^3 = 16,777,216$ color choices per pixel. **Q2: C** — `img.resize((30, 40))` sets Width = 30 and Height = 40. Converted to a NumPy array `arr`, its shape is `(Height, Width)` = `(40, 30)`. Flattening creates a vector of length $40 \times 30 = 1200$. Reshaping via `.reshape(1, -1)` produces 2D matrix shape `(1, 1200)`. **Q3: A** — Central calculation: $S = (10 \times 0) + (10 \times -1) + (10 \times 0) + (10 \times -1) + (90 \times 5) + (10 \times -1) + (10 \times 0) + (10 \times -1) + (10 \times 0) = -10 - 10 + 450 - 10 - 10 = 410$. The kernel $\begin{bmatrix}0&-1&0\\-1&5&-1\\0&-1&0\end{bmatrix}$ is the standard Sharpen Filter (sum of weights = 1). **Q4: B** — Passing `n_components=0.90` to PCA directs it to select the minimum number of principal components such that the cumulative explained variance is at least $90\%$ ($\ge 0.90$). Thus `np.sum(pca.explained_variance_ratio_)` $\ge 0.90$. `n_components_` is an integer count of components kept. **Q5: B** — Horizontal line detection kernels have constant row values (top row negative, middle row positive $+2$, bottom row negative $-1$). **Q6: A** — Using the formula $O = \left\lfloor \frac{W - K + 2P}{S} \right\rfloor + 1$: $O = \frac{32 - 5 + 0}{1} + 1 = 28$. Since there are $6$ filters, the output shape is `(28, 28, 6)`.

## Multiple Choice Questions

1. How is a standard RGB color image mathematically represented in machine learning?
    - **A)** A 2D matrix of shape `(H, W)` with float32 precision
    - **B)** A 1D vector of length $H \times W \times 3$
    - **C)** A 3D tensor of shape `(H, W, 3)` with three distinct color channels
    - **D)** A 3D tensor of shape `(3, H, W)` representing intensity, saturation, and hue

2. What is the total number of unique color combinations per pixel in an 8-bit RGB image?
    - **A)** 256
    - **B)** 65,536
    - **C)** 16,777,216
    - **D)** 4,294,967,296

3. Which of the following affine transformation matrices represents a horizontal reflection (flipping across the vertical axis)?
    - **A)** $\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$
    - **B)** $\begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$
    - **C)** $\begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$
    - **D)** $\begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}$

4. What is the sum of the weights in an edge detection (Laplacian) kernel, and why?
    - **A)** 1, to preserve the original base brightness of the image.
    - **B)** 0, so that constant uniform regions yield a black (0) output.
    - **C)** 9, because it operates on a 3x3 neighborhood.
    - **D)** -1, to invert the colors of the edges.

5. Why is image normalization (scaling from `[0, 255]` to `[0.0, 1.0]`) crucial before training machine learning models like SVM or Neural Networks?
    - **A)** It reduces the number of pixels in the image array.
    - **B)** It converts a grayscale image into an RGB image.
    - **C)** It prevents large numeric values from distorting distance metrics and gradient steps.
    - **D)** It applies a Gaussian blur to remove noise.

6. What is a major limitation of flattening a 2D image matrix into a 1D vector for traditional machine learning classifiers?
    - **A)** It requires converting the image to 8-bit integers.
    - **B)** It creates the curse of dimensionality and destroys the spatial structure of the pixels.
    - **C)** It forces the classifier to perform data augmentation automatically.
    - **D)** It limits the number of channels to only one (grayscale).

7. Which traditional feature extraction method divides an image into cells and computes the direction and magnitude of gradients?
    - **A)** Principal Component Analysis (PCA)
    - **B)** Convolutional Neural Networks (CNN)
    - **C)** Histogram of Oriented Gradients (HOG)
    - **D)** Autoencoders

8. In a Convolutional Neural Network (CNN), what is the primary purpose of a Pooling Layer?
    - **A)** To map the image to a higher-dimensional space for classification
    - **B)** To downsample feature maps, reduce spatial dimensions, and provide translation invariance
    - **C)** To convert raw RGB values into normalized floating-point numbers
    - **D)** To reconstruct the original image from a latent bottleneck representation

9. When applying PCA to flattened image vectors (e.g., Eigenfaces), what does the `explained_variance_ratio_` indicate?
    - **A)** The fraction of total dataset variance captured by each principal component
    - **B)** The required number of hidden layers for the neural network
    - **C)** The percentage of images that were successfully classified
    - **D)** The spatial dimensions of the compressed images

10. A developer incorrectly uses integer division `img_uint8 // 255` instead of `img.astype(np.float32) / 255.0` in Python. What is the most likely consequence?
    - **A)** The image colors will be inverted.
    - **B)** The image will be converted to grayscale automatically.
    - **C)** All pixel values will become zero, except for pure white pixels.
    - **D)** The script will throw a memory overflow error.

### Answer Key & Explanations
1. **C)** A 3D tensor of shape `(H, W, 3)` with three distinct color channels. According to the note, color images are represented as 3D tensors of shape `(H, W, 3)` with Red, Green, and Blue channels.
2. **C)** 16,777,216. The note specifies that each channel has 256 levels, resulting in 256 * 256 * 256 = 16,777,216 colors.
3. **A)** $\begin{bmatrix} -1 & 0 \\ 0 & 1 \end{bmatrix}$. A horizontal flip mirrors the image across the vertical axis, multiplying the x-coordinate by -1 while keeping y unchanged.
4. **B)** 0, so that constant uniform regions yield a black (0) output. The note states that edge detection kernels sum to 0, which highlights boundaries and zeroes out uniform regions.
5. **C)** It prevents large numeric values from distorting distance metrics and gradient steps. Normalizing to float32 between 0.0 and 1.0 is required so scale doesn't negatively impact algorithms like SVM or KNN.
6. **B)** It creates the curse of dimensionality and destroys the spatial structure of the pixels. Flattening unrolls the 2D array, which destroys the structural adjacency of pixels.
7. **C)** Histogram of Oriented Gradients (HOG). HOG computes localized histograms of gradient directions to capture object shape and structure.
8. **B)** To downsample feature maps, reduce spatial dimensions, and provide translation invariance. Pooling layers aggregate information (e.g. Max Pooling) to shrink spatial size.
9. **A)** The fraction of total dataset variance captured by each principal component. The explained variance ratio shows how much of the original data's spread is retained by each PCA axis.
10. **C)** All pixel values will become zero, except for pure white pixels. Since `uint8` values range from 0-255, integer division by 255 yields 0 for everything < 255, destroying the image data.

## References & Navigation

- **Previous Topic:** [[Time Series Data Modelling]]
- **Next Topic:** [[Graph Data Modelling]]
- **Related Notes:** [[Text Data Modelling]], [[Time Series Data Modelling]]
