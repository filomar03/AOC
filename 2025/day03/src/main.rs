use std::{collections::VecDeque, f64::INFINITY};

use common::read_input;

type joltage = u32;
type Bank = Vec<joltage>;

fn main() {
    let input = read_input();
    let banks: Vec<Bank> = input
        .split("\n")
        .map(|b| {
            b.split("")
                .map(|c| c.parse::<joltage>().unwrap())
                .collect::<Bank>()
        })
        .collect();

    for bank in banks {
        println!(
            "{} -> {}",
            bank.iter()
                .map(|j| j.to_string())
                .reduce(|acc, s| acc + s.as_str())
                .unwrap(),
            get_max_joltage(bank)
        );
    }
}

fn get_max_joltage(bank: Bank) -> joltage {
    let mut max_j = 0;
    for i in 0..bank.len() - 1 {
        let j = bank[i] * 10 + bank[i + 1];
        if j > max_j {
            max_j = j;
        }
    }
    max_j
}
