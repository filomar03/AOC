use std::{
    collections,
    env::current_exe,
    ops::{Add, AddAssign, Index},
    slice::SliceIndex,
    str::FromStr,
    sync::mpsc::SendError,
};

use common::read_input;
use itertools::Itertools;

fn main() {
    let input = read_input();
    let ranges: Vec<Range> = input
        .split(",")
        .map(|r| {
            // let v: Vec<T>
            // v[..]:
            // => deref on Vec<T> returning &[T]
            // => Index::index(self: &[T], idx: Index<SliceIndex<[T]>>)
            // => RangeFull -> impl -> SliceIndex<[T]>
            // => idx.index(self, &[T]) -> whole slice
            if let [start, _, end] = r.split("-").take(3).collect::<Vec<&str>>()[..] {
                Range::new(Id(start.parse().unwrap()), Id(end.parse().unwrap()))
            } else {
                panic!("Bad formatting");
            }
        })
        .collect();
}

struct Id(u32);

impl Id {
    fn id_valid(&self) -> bool {
        let str = self.0.to_string();
        str.len()
    }
}

struct Range {
    start: Id,
    end: Id,
    current: u32,
}

impl Range {
    fn new(start: Id, end: Id) -> Self {
        let current = start.0;
        Self {
            start,
            end,
            current,
        }
    }

    fn get_invalid(&mut self) -> Vec<Id> {
        let mut ids = Vec::new();
        while self.current <= self.end.0 {
            ids.push(Id(self.current));
        }
        ids
    }
}
