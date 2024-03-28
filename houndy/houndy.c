#include <signal.h>
#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/inotify.h>
#include <unistd.h>

#define EXIT_SUCCESS 0
#define EXIT_FAILURE 1
#define EXT_ERR_INIT_INOTIFY 2

int IEventQueue = -1;

int main(int argc, char **argv) {

	char *basePath = NULL;
	char *token = NULL;

	if (argc < 2) { // INFO: very soon we will be passing from a config file,
					// for now we use arguments
		fprintf(stderr, "Usage: houndy path\n");
		exit(EXIT_FAILURE);
	}

	basePath = (char *)malloc(sizeof(char) * (strlen(argv[1]) + 1));
	strcpy(basePath, argv[1]);

	token = strtok(basePath, "/");
	while (token != NULL) {
		basePath = token;
		token = strtok(NULL, "/");
	}

	IEventQueue = inotify_init();
	if (IEventQueue == -1) {
		fprintf(stderr, "Error initializing inotify\n");
		exit(EXT_ERR_INIT_INOTIFY);
	}
	while (true) {
	}
}
