use std::fmt::Display;

use common::read_input;

fn main() {
    let input = read_input();
    let banks = Vec::from_iter(input.split("\n").map(|b| BatteryBank::new(b)));

    // for bank in &banks {
    //     println!("{} -> {}", bank, bank.max_joltage(BATTERY_QTY).unwrap());
    // }

    let acc = banks
        .iter()
        .fold(0, |acc, b| acc + b.max_joltage(BATTERY_QTY_P1).unwrap());
    println!("Answer (part 1): {}", acc);

    let acc = banks
        .iter()
        .fold(0, |acc, b| acc + b.max_joltage(BATTERY_QTY_P2).unwrap());
    println!("Answer (part 2): {}", acc);
}

const BASE: u32 = 10;
const BATTERY_QTY_P1: usize = 2;
const BATTERY_QTY_P2: usize = 12;

type Joltage = u64;

struct BatteryBank {
    bank: Vec<Joltage>,
}

impl BatteryBank {
    fn new(bank: &str) -> Self {
        BatteryBank {
            bank: Vec::from_iter(bank.chars().map(|c| c.to_digit(BASE).unwrap() as Joltage)),
        }
    }

    fn max_joltage(&self, qty: usize) -> Option<Joltage> {
        if qty as usize > self.bank.len() {
            return None;
        }

        if qty == self.bank.len() {
            return self
                .bank
                .iter()
                .copied()
                .reduce(|acc, b| acc * BASE as Joltage + b);
        }

        let mut pack: Box<[Joltage]> = vec![0; qty].into_boxed_slice();

        let mut slice_start = 0;
        for pack_idx in 0..qty {
            let mut max: Joltage = self.bank[slice_start];
            let mut max_idx = slice_start;
            let max_len = self.bank.len() - (qty - (pack_idx + 1));
            for (idx, &joltage) in self.bank[slice_start + 1..max_len].iter().enumerate() {
                if joltage > max {
                    max = joltage;
                    max_idx = slice_start + idx + 1;
                }
            }
            slice_start = max_idx + 1;
            pack[pack_idx] = max;
        }

        pack.iter()
            .copied()
            .reduce(|acc, b| acc * BASE as Joltage + b)
    }
}

impl Display for BatteryBank {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "[{}]",
            String::from_iter(
                self.bank
                    .iter()
                    .map(|&b| char::from_digit(b as u32, BASE).unwrap())
            )
        )
    }
}
