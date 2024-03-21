#include <stdio.h>

// Function to add two integers
int add(int a, int b) {
	return a + b; // Return the sum
}

/* Function to subtract two integers
  This function takes two integers as input
  and returns their difference */
int subtract(int a, int b) { return a - b; /* Return the difference */ }

int main() {
	// Test cases
	int result1 = add(5, 3);	   // Should return 8
	int result2 = subtract(10, 7); /* Should return 3 */

	// Print the results
	printf("Result of addition: %d\n", result1);
	printf("Result of subtraction: %d\n", result2);

	return 0;
}
