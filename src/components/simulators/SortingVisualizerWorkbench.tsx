"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type SortAlgorithm = "quicksort" | "mergesort" | "heapsort" | "insertionsort" | "bubblesort";

interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  pivot?: number;
  description: string;
}

const ALGO_METADATA: Record<
  SortAlgorithm,
  { name: string; best: string; avg: string; worst: string; space: string; stable: boolean }
> = {
  quicksort: {
    name: "QuickSort (Lomuto Partition)",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n^2)",
    space: "O(log n)",
    stable: false,
  },
  mergesort: {
    name: "MergeSort (Divide & Conquer)",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(n)",
    stable: true,
  },
  heapsort: {
    name: "HeapSort (Binary Max-Heap)",
    best: "O(n log n)",
    avg: "O(n log n)",
    worst: "O(n log n)",
    space: "O(1)",
    stable: false,
  },
  insertionsort: {
    name: "InsertionSort (Incremental Insertion)",
    best: "O(n)",
    avg: "O(n^2)",
    worst: "O(n^2)",
    space: "O(1)",
    stable: true,
  },
  bubblesort: {
    name: "BubbleSort (Adjacent Exchange)",
    best: "O(n)",
    avg: "O(n^2)",
    worst: "O(n^2)",
    space: "O(1)",
    stable: true,
  },
};

export function SortingVisualizerWorkbench() {
  const [algo, setAlgo] = useState<SortAlgorithm>("quicksort");
  const [arraySize, setArraySize] = useState<number>(14);
  const [customArrayText, setCustomArrayText] = useState<string>("45, 12, 85, 32, 8, 64, 51, 23, 77, 19");
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(250);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate trace based on chosen algorithm
  const generateTrace = useCallback((initialArr: number[], algorithm: SortAlgorithm): SortStep[] => {
    const trace: SortStep[] = [];
    const arr = [...initialArr];
    const n = arr.length;

    trace.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      description: "Initial unsorted array state.",
    });

    if (algorithm === "bubblesort") {
      const sortedIndices: number[] = [];
      for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
          trace.push({
            array: [...arr],
            comparing: [j, j + 1],
            swapping: [],
            sorted: [...sortedIndices],
            description: `Comparing elements arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}.`,
          });
          if (arr[j] > arr[j + 1]) {
            const temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;
            trace.push({
              array: [...arr],
              comparing: [],
              swapping: [j, j + 1],
              sorted: [...sortedIndices],
              description: `Swapped arr[${j}] and arr[${j + 1}].`,
            });
          }
        }
        sortedIndices.push(n - i - 1);
        if (!swapped) break;
      }
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        description: "Array fully sorted.",
      });
    } else if (algorithm === "insertionsort") {
      const sortedIndices: number[] = [0];
      for (let i = 1; i < n; i++) {
        const key = arr[i];
        let j = i - 1;
        trace.push({
          array: [...arr],
          comparing: [j, i],
          swapping: [],
          sorted: [...sortedIndices],
          pivot: i,
          description: `Key element selected: ${key} at index ${i}.`,
        });
        while (j >= 0 && arr[j] > key) {
          arr[j + 1] = arr[j];
          trace.push({
            array: [...arr],
            comparing: [j],
            swapping: [j + 1],
            sorted: [...sortedIndices],
            description: `Shifted arr[${j}]=${arr[j]} right to index ${j + 1}.`,
          });
          j--;
        }
        arr[j + 1] = key;
        sortedIndices.push(i);
        trace.push({
          array: [...arr],
          comparing: [],
          swapping: [j + 1],
          sorted: [...sortedIndices],
          description: `Placed key ${key} at destination index ${j + 1}.`,
        });
      }
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        description: "Array fully sorted.",
      });
    } else if (algorithm === "quicksort") {
      const sortedIndices: number[] = [];
      const quick = (low: number, high: number) => {
        if (low < high) {
          const pivot = arr[high];
          let i = low - 1;
          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [...sortedIndices],
            pivot: high,
            description: `Partitioning range [${low}..${high}] with pivot=${pivot} at index ${high}.`,
          });

          for (let j = low; j < high; j++) {
            trace.push({
              array: [...arr],
              comparing: [j, high],
              swapping: [],
              sorted: [...sortedIndices],
              pivot: high,
              description: `Comparing arr[${j}]=${arr[j]} with pivot=${pivot}.`,
            });
            if (arr[j] <= pivot) {
              i++;
              const temp = arr[i];
              arr[i] = arr[j];
              arr[j] = temp;
              if (i !== j) {
                trace.push({
                  array: [...arr],
                  comparing: [],
                  swapping: [i, j],
                  sorted: [...sortedIndices],
                  pivot: high,
                  description: `Swapped smaller element arr[${j}] into lower partition at index ${i}.`,
                });
              }
            }
          }
          const temp = arr[i + 1];
          arr[i + 1] = arr[high];
          arr[high] = temp;
          const pIndex = i + 1;
          sortedIndices.push(pIndex);
          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [pIndex, high],
            sorted: [...sortedIndices],
            pivot: pIndex,
            description: `Placed pivot ${pivot} at its finalized index ${pIndex}.`,
          });

          quick(low, pIndex - 1);
          quick(pIndex + 1, high);
        } else if (low === high) {
          sortedIndices.push(low);
        }
      };
      quick(0, n - 1);
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        description: "Array fully sorted.",
      });
    } else if (algorithm === "heapsort") {
      const sortedIndices: number[] = [];
      const heapify = (size: number, root: number) => {
        let largest = root;
        const left = 2 * root + 1;
        const right = 2 * root + 2;

        if (left < size) {
          trace.push({
            array: [...arr],
            comparing: [left, largest],
            swapping: [],
            sorted: [...sortedIndices],
            description: `Comparing left child arr[${left}]=${arr[left]} with root arr[${largest}]=${arr[largest]}.`,
          });
          if (arr[left] > arr[largest]) largest = left;
        }

        if (right < size) {
          trace.push({
            array: [...arr],
            comparing: [right, largest],
            swapping: [],
            sorted: [...sortedIndices],
            description: `Comparing right child arr[${right}]=${arr[right]} with largest candidate arr[${largest}]=${arr[largest]}.`,
          });
          if (arr[right] > arr[largest]) largest = right;
        }

        if (largest !== root) {
          const temp = arr[root];
          arr[root] = arr[largest];
          arr[largest] = temp;
          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [root, largest],
            sorted: [...sortedIndices],
            description: `Heapify swap: exchanged root arr[${root}] with child arr[${largest}].`,
          });
          heapify(size, largest);
        }
      };

      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(n, i);
      }

      // Extract elements
      for (let i = n - 1; i > 0; i--) {
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        sortedIndices.push(i);
        trace.push({
          array: [...arr],
          comparing: [],
          swapping: [0, i],
          sorted: [...sortedIndices],
          description: `Extracted max element ${arr[i]} to index ${i}.`,
        });
        heapify(i, 0);
      }
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        description: "Array fully sorted.",
      });
    } else {
      // MergeSort
      const sortedIndices: number[] = [];
      const merge = (l: number, m: number, r: number) => {
        const leftArr = arr.slice(l, m + 1);
        const rightArr = arr.slice(m + 1, r + 1);
        let i = 0;
        let j = 0;
        let k = l;

        while (i < leftArr.length && j < rightArr.length) {
          trace.push({
            array: [...arr],
            comparing: [l + i, m + 1 + j],
            swapping: [],
            sorted: [...sortedIndices],
            description: `Merging: compare left ${leftArr[i]} and right ${rightArr[j]}.`,
          });
          if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
          } else {
            arr[k] = rightArr[j];
            j++;
          }
          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [k],
            sorted: [...sortedIndices],
            description: `Wrote element ${arr[k]} to position ${k}.`,
          });
          k++;
        }

        while (i < leftArr.length) {
          arr[k] = leftArr[i];
          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [k],
            sorted: [...sortedIndices],
            description: `Wrote remaining left element ${arr[k]} to position ${k}.`,
          });
          i++;
          k++;
        }
        while (j < rightArr.length) {
          arr[k] = rightArr[j];
          trace.push({
            array: [...arr],
            comparing: [],
            swapping: [k],
            sorted: [...sortedIndices],
            description: `Wrote remaining right element ${arr[k]} to position ${k}.`,
          });
          j++;
          k++;
        }
      };

      const sort = (l: number, r: number) => {
        if (l < r) {
          const m = Math.floor((l + r) / 2);
          sort(l, m);
          sort(m + 1, r);
          merge(l, m, r);
        }
      };
      sort(0, n - 1);
      trace.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        description: "Array fully sorted.",
      });
    }

    return trace;
  }, []);

  // Initialize array
  const createNewDataset = useCallback(
    (type: "random" | "reversed" | "nearly" = "random") => {
      setIsPlaying(false);
      let arr: number[] = [];
      if (type === "random") {
        arr = Array.from({ length: arraySize }, () => Math.floor(Math.random() * 85) + 15);
      } else if (type === "reversed") {
        arr = Array.from({ length: arraySize }, (_, i) => 100 - i * 6);
      } else {
        arr = Array.from({ length: arraySize }, (_, i) => i * 6 + 15);
        // Swap 2 random pairs
        for (let k = 0; k < 2; k++) {
          const i1 = Math.floor(Math.random() * arraySize);
          const i2 = Math.floor(Math.random() * arraySize);
          const t = arr[i1];
          arr[i1] = arr[i2];
          arr[i2] = t;
        }
      }

      const generated = generateTrace(arr, algo);
      setSteps(generated);
      setCurrentStepIdx(0);
    },
    [arraySize, algo, generateTrace]
  );

  const applyCustomValues = () => {
    setIsPlaying(false);
    const parsed = customArrayText
      .split(/[,\s]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0 && n <= 100);
    if (parsed.length >= 3) {
      setArraySize(parsed.length);
      const generated = generateTrace(parsed, algo);
      setSteps(generated);
      setCurrentStepIdx(0);
    }
  };

  useEffect(() => {
    createNewDataset("random");
  }, [createNewDataset]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speedMs);
    } else {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    }
    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  const currentStep = steps[currentStepIdx] || {
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    description: "",
  };

  const meta = ALGO_METADATA[algo];

  return (
    <div className="p-4 sm:p-6 rounded-xl border border-[var(--zen-border)] bg-[var(--zen-card)] universe-card text-[var(--zen-frost)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-[var(--zen-border)] pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--zen-cyan)] font-semibold">
            ALGORITHM WORKBENCH // DATA STRUCTURES & COMPLEXITY
          </span>
          <h4 className="text-base sm:text-lg font-bold text-[var(--zen-snow)] tracking-wider uppercase">
            Sorting Algorithms & Complexity Comparator
          </h4>
        </div>
        <div className="flex flex-wrap gap-1">
          {(["quicksort", "mergesort", "heapsort", "insertionsort", "bubblesort"] as SortAlgorithm[]).map((a) => (
            <button
              key={a}
              onClick={() => {
                setAlgo(a);
                setIsPlaying(false);
              }}
              className={`px-2.5 py-1 text-xs font-mono rounded border transition-all ${
                algo === a
                  ? "border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 text-[var(--zen-snow)] font-bold shadow-[0_0_10px_rgba(0,229,255,0.25)]"
                  : "border-transparent text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)] hover:bg-[var(--zen-card-hover)]"
              }`}
            >
              {a.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Dataset Controls & Playback */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-[var(--zen-void)]/60 p-3 rounded-lg border border-[var(--zen-border)]">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase transition-all ${
              isPlaying
                ? "bg-rose-500/20 border border-rose-400 text-rose-300"
                : "bg-[var(--zen-cyan)]/20 border border-[var(--zen-cyan)] text-[var(--zen-cyan)]"
            }`}
          >
            {isPlaying ? "PAUSE" : "AUTO PLAY"}
          </button>
          <button
            disabled={currentStepIdx === 0}
            onClick={() => setCurrentStepIdx((p) => Math.max(0, p - 1))}
            className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] disabled:opacity-30 disabled:hover:border-[var(--zen-border)]"
          >
            STEP BACK
          </button>
          <button
            disabled={currentStepIdx >= steps.length - 1}
            onClick={() => setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1))}
            className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] disabled:opacity-30 disabled:hover:border-[var(--zen-border)]"
          >
            STEP FORWARD
          </button>
          <button
            onClick={() => setCurrentStepIdx(0)}
            className="px-2.5 py-1 rounded text-xs font-mono border border-[var(--zen-border)] text-[var(--zen-ink-muted)] hover:text-[var(--zen-snow)]"
          >
            RESET
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-[var(--zen-ink-muted)]">GENERATE:</span>
          <button
            onClick={() => createNewDataset("random")}
            className="px-2 py-0.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)]"
          >
            Random
          </button>
          <button
            onClick={() => createNewDataset("reversed")}
            className="px-2 py-0.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)]"
          >
            Reversed
          </button>
          <button
            onClick={() => createNewDataset("nearly")}
            className="px-2 py-0.5 rounded border border-[var(--zen-border)] hover:border-[var(--zen-cyan)] text-[var(--zen-snow)]"
          >
            Nearly Sorted
          </button>
        </div>
      </div>

      {/* Custom Values Input Strip */}
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-5 p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60">
        <label className="text-[10px] font-mono tracking-wider text-[var(--zen-ink-muted)] uppercase shrink-0">
          Custom Values (3 to 24 numbers):
        </label>
        <input
          type="text"
          value={customArrayText}
          onChange={(e) => setCustomArrayText(e.target.value)}
          placeholder="e.g. 45, 12, 85, 32, 8, 64, 51"
          className="flex-1 w-full px-3 py-1 rounded border border-[var(--zen-border)] bg-[var(--zen-midnight)] text-xs font-mono text-[var(--zen-snow)] focus:outline-none focus:border-[var(--zen-cyan)]"
        />
        <button
          onClick={applyCustomValues}
          className="w-full sm:w-auto px-3 py-1 rounded border border-[var(--zen-cyan)] bg-[var(--zen-cyan)]/20 hover:bg-[var(--zen-cyan)]/30 text-[var(--zen-snow)] text-xs font-mono font-bold tracking-wider uppercase transition-colors shrink-0"
        >
          Load Array
        </button>
      </div>

      {/* Visual Array Bar Stage */}
      <div className="p-4 sm:p-6 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)] mb-5">
        <div className="flex items-end justify-center gap-1.5 sm:gap-2.5 h-48 sm:h-56 pb-2">
          {currentStep.array.map((val, idx) => {
            const isComparing = currentStep.comparing.includes(idx);
            const isSwapping = currentStep.swapping.includes(idx);
            const isSorted = currentStep.sorted.includes(idx);
            const isPivot = currentStep.pivot === idx;

            let barColor = "bg-[var(--zen-slate-edge)]/50 border-[var(--zen-border)]";
            let textColor = "text-[var(--zen-ink-muted)]";

            if (isPivot) {
              barColor = "bg-cyan-500/40 border-cyan-400";
              textColor = "text-cyan-300 font-bold";
            } else if (isSwapping) {
              barColor = "bg-rose-500/50 border-rose-400";
              textColor = "text-rose-300 font-bold";
            } else if (isComparing) {
              barColor = "bg-amber-500/40 border-amber-400";
              textColor = "text-amber-300 font-bold";
            } else if (isSorted) {
              barColor = "bg-emerald-500/35 border-emerald-400";
              textColor = "text-emerald-300";
            }

            return (
              <div key={idx} className="flex flex-col items-center flex-1 max-w-[42px] h-full justify-end group">
                <span className={`text-[10px] font-mono mb-1 transition-colors ${textColor}`}>
                  {val}
                </span>
                <div
                  style={{ height: `${Math.max(val, 8)}%` }}
                  className={`w-full rounded-t border transition-all duration-150 ${barColor}`}
                />
                <span className="text-[9px] font-mono text-[var(--zen-ink-muted)] mt-1.5">
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--zen-border)]/60 text-xs font-mono">
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-cyan-500/40 border border-cyan-400" />
              <span className="text-cyan-300">Pivot</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-amber-500/40 border border-amber-400" />
              <span className="text-amber-300">Comparing</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-rose-500/50 border border-rose-400" />
              <span className="text-rose-300">Swap / Write</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500/35 border border-emerald-400" />
              <span className="text-emerald-300">Sorted</span>
            </span>
          </div>

          <div className="text-[var(--zen-ink-muted)]">
            Step {currentStepIdx + 1} of {Math.max(steps.length, 1)}
          </div>
        </div>
      </div>

      {/* Step Description */}
      <div className="p-3 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/60 font-mono text-xs text-[var(--zen-snow)] mb-5">
        <span className="text-[10px] text-[var(--zen-cyan)] uppercase block mb-0.5">CURRENT STEP LOG</span>
        {currentStep.description || "Ready to step."}
      </div>

      {/* Complexity & Specs Card */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-3.5 rounded-lg border border-[var(--zen-border)] bg-[var(--zen-void)]/40 font-mono text-xs">
        <div>
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block">ALGORITHM</span>
          <span className="font-bold text-[var(--zen-snow)]">{meta.name}</span>
        </div>
        <div>
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block">BEST TIME</span>
          <span className="text-emerald-300">{meta.best}</span>
        </div>
        <div>
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block">AVERAGE TIME</span>
          <span className="text-cyan-300">{meta.avg}</span>
        </div>
        <div>
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block">WORST TIME</span>
          <span className="text-rose-300">{meta.worst}</span>
        </div>
        <div>
          <span className="text-[10px] text-[var(--zen-ink-muted)] uppercase block">AUX SPACE</span>
          <span className="text-[var(--zen-snow)]">{meta.space}</span>
        </div>
      </div>
    </div>
  );
}
