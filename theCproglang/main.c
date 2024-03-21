#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define LOWER 0
#define UPPER 300
#define COUNTER 7

void removeCommentsFromFIle() {

	char lines[UPPER];
	FILE *fp;
	int shouldWeBreak = 0;

	fp = fopen("input.c", "r");
	if (fp == NULL) {
		printf("Error opening file\n");
		exit(1);
	}

	while (fgets(lines, UPPER, fp) != NULL) {
		for (int i = 0; i < strlen(lines); i++) {
			if (shouldWeBreak) {
				if (lines[i] == '*' && lines[i + 1] == '/') {
					shouldWeBreak = 0;
					i++; // Skip the '/' character
				}
			} else {
				if (lines[i] == '/') {
					if (lines[i + 1] == '/') {
						break;
					}
					if (lines[i + 1] == '*') {
						shouldWeBreak = 1;
						i = i + 2;
					}
				}
				printf("%c", lines[i]);
			}
		}
		printf("\n");
	}

	fclose(fp);
}

int main() {
	// removeCommentsFromFIle();
	char str[] = "900";

	int c = atoi(str);
	++c;
	printf("%d\n", c);
}
