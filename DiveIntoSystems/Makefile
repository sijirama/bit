.SILENT:

CC = cc
EXECUTABLE = program
FILES = main.c LinkedList.c

test: build
	./$(EXECUTABLE) && make clean

build: $(EXECUTABLE)

$(EXECUTABLE): main.c
	$(CC) -Wall ${FILES} -o $(EXECUTABLE)

clean:
	rm -f $(EXECUTABLE) && rm -f ./a.out

