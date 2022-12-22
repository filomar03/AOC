#include <stdio.h>
#include <stdlib.h>
#define INVALID -1

//PART 1
/*
int main()
{
    FILE *fptr;
    fptr = fopen("input.txt", "r");

    if (fptr == NULL) {
        puts("[ERROR]: file doesn't exist");
        return 1;
    }

    int counter = 0;
    int num = INVALID, prev_num = INVALID;

    while(feof(fptr) == 0) {
        //read from file
        fscanf(fptr, "%d", &num);

        //check if both values are ready
        if (prev_num != INVALID) {
            //check if value increase
            printf("prev: %d\tnum: %d", prev_num, num);
            if (num > prev_num) {
                counter++;
                printf("\tincs: %d\t\(incremented\)\n", counter);
            } else {
                printf("\tincs: %d\t\(decremented\)\n", counter);
            }
            //getchar();
        }

        //update values
        prev_num = num;
    }

    fclose(fptr);

    printf("\n\n\ntotal increments = %d", counter);

    return 0;
}
*/
//PART 2

int main()
{
    FILE *fptr;
    fptr = fopen("input.txt", "r");

    if (fptr == NULL) {
        puts("[ERROR]: file doesn't exist");
        return 1;
    }

    int increments = 0;
    int iter_counter = 0;
    int val1 = INVALID, val2 = INVALID, val3 = INVALID;
    int sum = INVALID, psum = INVALID;

    while(feof(fptr) == 0) {
        //read from file
        switch(iter_counter % 3) {
            case 0:
                fscanf(fptr, "%d", &val1);
                break;

            case 1:
                fscanf(fptr, "%d", &val2);
                break;

            case 2:
                fscanf(fptr, "%d", &val3);
                break;
        }

        //wait to populate every value stored
        if (val3 != INVALID) {
            sum = val1 + val2 + val3;

            if (psum != INVALID) {
                printf("v1: %d\tv2: %d\tv3: %d\n", val1, val2, val3);
                printf("s: %d\tps: %d\n", sum, psum);
                if (sum > psum) {
                    increments++;
                }
                printf("increments: %d\n\n", increments);
                //getchar();
            }
            psum = sum;
        }
        iter_counter++;
    }

    fclose(fptr);
    printf("\n\nincrements = %d", increments);

    return 0;
}
