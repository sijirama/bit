CC = cc
CFLAGS = -Wall -Wextra
LIBS = -lraylib -lGL -lm -lpthread -ldl -lrt -lX11

all: game

game: main.c
	$(CC) $(CFLAGS) -o $@ $< $(LIBS)

clean:
	rm -f game

