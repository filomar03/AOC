#include <stdio.h>
#include <stdlib.h>
#include <string.h>

//PART 1

/*
int main()
{
    FILE *fptr;
    fptr = fopen("input.txt", "r");

    if (fptr == NULL) {
        printf("file not found");
        return(1);
    }

    int depth = 0, hpos = 0;

    char cmd[16];
    int arg;
    while (fscanf(fptr, "%s %d", cmd, &arg) != -1) {
        printf("%s %d\n", cmd, arg);

        if (strcmp(cmd, "forward") == 0) {
            hpos += arg;
        } else if (strcmp(cmd, "up") == 0) {
            depth -= arg;
        } else if (strcmp(cmd, "down") == 0) {
            depth += arg;
        }

        printf("hpos = %d\tdepth = %d\n\n", hpos, depth);
        //getchar();
    }

    fclose(fptr);

    printf("\n\nhpos = %d\tdepth = %d\tres = %d", hpos, depth, hpos * depth);

    return 0;
}
*/


//PART 2

int main()
{
    FILE *fptr;
    fptr = fopen("input.txt", "r");

    if (fptr == NULL) {
        printf("file not found");
        return(1);
    }

    int aim = 0, hpos = 0, depth = 0;

    char cmd[16];
    int arg;
    while (fscanf(fptr, "%s %d", cmd, &arg) != -1) {
        printf("%s %d\n", cmd, arg);

        if (strcmp(cmd, "forward") == 0) {
            hpos += arg;
            depth += aim * arg;
        } else if (strcmp(cmd, "down") == 0) {
            aim += arg;
        } else if (strcmp(cmd, "up") == 0) {
            aim -= arg;
        }

        printf("hpos = %d\tdepth = %d\taim = %d\n\n", hpos, depth, aim);
        //getchar();
    }

    fclose(fptr);

    printf("\n\nhpos = %d\tdepth = %d\tres = %d", hpos, depth, hpos * depth);

    return 0;
}
