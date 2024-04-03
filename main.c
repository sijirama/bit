#include "stdbool.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#ifdef _WIN32

static char buffer[2048];

/* Fake readline function */
char *readline(char *prompt) {
	fputs(prompt, stdout);
	fgets(buffer, 2048, stdin);
	char *cpy = malloc(strlen(buffer) + 1);
	strcpy(cpy, buffer);
	cpy[strlen(cpy) - 1] = '\0';
	return cpy;
}

/* Fake add_history function */
void add_history(char *unused) {}

#else

#include <editline/history.h>
#include <editline/readline.h>

#endif

int main(int argc, char **argv) {

	puts("fakelisp - Version 0.1");
	puts("Press Ctrl+c to Exit\n");

	while (true) {
		char *input = readline("fakelisp > ");
		if (strcmp(input, "exit()") == 0 || strcmp(input, "exit") == 0) {
			puts("Bye!");
			return 0;
		}
		add_history(input); // NOTE: add input to history

		printf("you inserted %s\n", input); // NOTE: echo back to history

		free(input); // NOTE: free pointer
	}

	return 0;
}
