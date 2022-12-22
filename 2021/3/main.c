#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <string.h>

#define DATA_LENGTH 12
#define ROWS 1000

void print_string(char *str);
void flip_binary(char *bin);
int binary_to_decimal(char *bin);

//PART 1

//int main()
//{
//    FILE *fptr;
//    fptr = fopen("input.txt", "r");
//
//    if (fptr == NULL) {
//        printf("[ERROR] file opening failed");
//        getchar();
//        return(1);
//    }
//
//    int selected_bit = 0;
//    char data[DATA_LENGTH + 1];
//    char mcbits[DATA_LENGTH + 1] = {'\0'};
//
//    int rows = 0;
//
//    while (selected_bit < DATA_LENGTH) {
//        int ones = 0;
//
//        while (fgets(data, DATA_LENGTH + 1, fptr) != NULL) {
//            fgetc(fptr); //consumes the \n at the end of every line
//
//            if (data[selected_bit] == '1') {
//                ones++;
//            }
//
//            if (selected_bit == 0) {
//                rows++;
//            }
//
//            //printf("%s\n", data);
//        }
//
//        mcbits[selected_bit] = ones >= rows / 2 ? '1' : '0';
//        selected_bit++;
//        rewind(fptr);
//    }
//    fclose(fptr);
//
//    int gm_rate, eps_rate;
//    printf("GAMMA RATE\nbinary: %s\ndecimal: %d\n\n", mcbits, (gm_rate = binary_to_decimal(mcbits)));
//    flip_binary(mcbits);
//    printf("EPSILON RATE\nbinary: %s\ndecimal: %d\n\n", mcbits, eps_rate = binary_to_decimal(mcbits));
//    printf("POWER CONSUMPTION = %d\n", gm_rate * eps_rate);
//    getchar();
//
//    return 0;
//}

//PART 2

int main()
{
    FILE *fptr;
    fptr = fopen("input.txt", "r");

    if (fptr == NULL) {
        printf("[ERROR] file opening failed");
        getchar();
        return(1);
    }

    char data[DATA_LENGTH + 1];
    int list[ROWS] = {[0 ... ROWS - 1] = 1};
    int list_length = ROWS;
    char mcbits[DATA_LENGTH + 1] = {[0 ... DATA_LENGTH - 1] = '?', [DATA_LENGTH] = '\0'};
    char oxy_rating[DATA_LENGTH + 1], scrub_rating[DATA_LENGTH + 1];

    //oxy_rating
    for (int b = 0; list_length > 1 && b <= DATA_LENGTH; b++) {
        int ones = 0;
        for (int i = 0; i < ROWS; i++) {
            fgets(data, DATA_LENGTH + 1, fptr);
            fgetc(fptr);

            if (b > 0) {
                if (list[i] == 1) {
                    if (data[b - 1] != mcbits[b - 1]) {
                        list[i] = 0;
                        list_length--;
                    } else {
                        strcpy(oxy_rating, data);
                    }
                }

            }

            if (list[i] == 1) {
                if (data[b] == '1') {
                    ones++;
                }

                printf("%d\) %s \(valid: %d \) \(bit n. %d\)\n", i, data, (list[i]), b);
            }
        }
        mcbits[b] = ones >= list_length / 2 ? '1' : '0';
        printf("bit n.: %d\nones: %d\nn. of valid elements: %d\nmost common bit: %c\n", b, ones, list_length, mcbits[b]);
        printf("most common bits: %s\n\n", mcbits);

        rewind(fptr);
    }

    getchar();

    for (int i = 0; i < ROWS; i++) {
        list[i] = 1;
    }
    list_length = ROWS;

    //scrub
    for (int b = 0; list_length > 1 && b <= DATA_LENGTH; b++) {
        int ones = 0;
        for (int i = 0; i < ROWS; i++) {
            fgets(data, DATA_LENGTH + 1, fptr);
            fgetc(fptr);

            if (b > 0) {
                if (list[i] == 1) {
                    if (data[b - 1] != mcbits[b - 1]) {
                        list[i] = 0;
                        list_length--;
                    } else {
                        strcpy(scrub_rating, data);
                    }
                }

            }

            if (list[i] == 1) {
                if (data[b] == '1') {
                    ones++;
                }

                printf("%d\) %s \(valid: %d \) \(bit n. %d\)\n", i, data, (list[i]), b);
            }
        }
        mcbits[b] = ones >= list_length / 2 ? '0' : '1';
        printf("bit n.: %d\nones: %d\nn. of valid elements: %d\nleast common bit: %c\n", b, ones, list_length, mcbits[b]);
        printf("least common bits: %s\n\n", mcbits);

        rewind(fptr);
    }

    fclose(fptr);

    getchar();

    printf("OXYGEN GENERATOR RATING:\nbinary: %s\ndecimal: %d\n\n", oxy_rating , binary_to_decimal(oxy_rating));
    printf("CO2 SCRUBBER RATING:\nbinary: %s\ndecimal: %d\n\n", scrub_rating , binary_to_decimal(scrub_rating));
    printf("LIFE SUPPORT RATING: %d\n\n", binary_to_decimal(oxy_rating) * binary_to_decimal(scrub_rating));

    return 0;
}

void print_string(char *str) {
    while (*str != '\0') {
        printf("%d ", *str);
        str++;
    }
    printf("\\0\n");
}

void flip_binary(char *bin) {
    while (*bin != '\0') {
        *bin = *bin == '1' ? '0' : '1';
        bin++;
    }
}

int binary_to_decimal(char *bin) {
    int result = 0, length = 0;

    while (*bin != '\0') {
        length++;
        bin++;
    }

    bin -= length;

    for (int i = 0; i < length; i++) {
        if (bin[i] == '1') {
            result += pow(2, length - 1 - i);
        }
    }

    return result;
}
