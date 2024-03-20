
#include <stdio.h>

#define LOWER 0
#define UPPER 300
#define COUNTER 7

void charStuff() {
	int c;
	while ((c = getchar()), c != EOF)
		putchar(c);
}

void countString() {
	long nc;
	nc = 0;
	while (getchar() != EOF) {
		++nc;
	}
	printf("%ld\n", nc);
}

int main() {
	// int f[COUNTER] = {0, 20, 40, 60, 260, 280, 300};
	//
	// printf("FAHRENHEIT TO CELCIUS\n\n");
	// for (int i = LOWER; i < COUNTER; i++) {
	// 	float cent = (f[i] - 32) * (5.0 / 9.0);
	// 	printf("| %3.1d | %6.1f |\n", f[i], cent);
	// }

	// charStuff();
	countString();
}
