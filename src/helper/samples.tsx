export const SAMPLE_PROGRAMS = [
  {
    id: "factorial",
    name: "Factorial Program",
    code: `def calculate_factorial(num):
    if num < 0:
        return "Factorial is not defined for negative numbers."
    elif num == 0:
        return 1
    else:
        factorial = 1
        for i in range(1, num + 1):
            factorial *= i
        return factorial

number = 5
result = calculate_factorial(number)
print(f"The factorial of {number} is {result}")`
  },

  {
    id: "bubble",
    name: "Bubble Sort",
    code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

numbers = [64, 25, 12, 22, 11]
print("Sorted:", bubble_sort(numbers))`
  },

  {
    id: "fibonacci",
    name: "Fibonacci Series",
    code: `def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)

print("Fibonacci(10):", fib(10))`
  },

  {
    id: "max_element",
    name: "Find Maximum Element",
    code: `arr = [10, 50, 20, 99, 5]
max_val = arr[0]
for val in arr:
    if val > max_val:
        max_val = val
print("Max =", max_val)`
  }
];
