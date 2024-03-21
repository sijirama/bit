#include "main.h"
#include <stdio.h>
#include <string.h>

void testStaticWithRecurse() {
	static int counter = 0;
	if (counter > 10) {
		return;
	}
	printf("%d\n", counter);
	++counter;
	testStaticWithRecurse();
}

void reverse(char *str) {
	static int counter = 0;
	int len = strlen(str);
	--len;
	if (counter > len / 2) {
		return;
	}

	char temp = str[len - counter];
	str[len - counter] = str[counter];
	str[counter] = temp;

	++counter;
	reverse(str);
}

int main() {
	// testStaticWithRecurse();
	char str[] = "sijibomi";
	printf("%s\n", str);
	reverse(str);
	printf("%s\n", str);
}
