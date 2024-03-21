#define LOWER 0
#define UPPER 300
#define COUNTER 7

typedef struct {
	int height;
	int width;
} Anime;

extern void removeCommentsFromFile();
extern char *processString(char *str);

extern int i;
extern int x;
extern int global_var;

static int fileStuff = 20;
static void myStaticFunction();

int f(void);
int doSomeCrazyShitOkay(int x, int y);
