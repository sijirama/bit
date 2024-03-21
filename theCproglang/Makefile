CC = cc
EXECUTABLE = program
FILES = main.c input.c

test: build
	./$(EXECUTABLE)

build: $(EXECUTABLE)

$(EXECUTABLE): main.c
	$(CC) ${FILES} -o $(EXECUTABLE)

clean:
	rm -f $(EXECUTABLE)

