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
            if let [start, end] = r.split("-").take(3).collect::<Vec<&str>>()[..] {
                Range::new(Id(start.parse().unwrap()), Id(end.parse().unwrap()))
            } else {
                panic!("Bad formatting");
            }
        })
        .collect();

    let mut acc: Vec<Id> = vec![];
    for r in ranges {
        let x = r.get_invalid();
        let tmp: Vec<String> = x.iter().map(|f| f.0.to_string()).collect();
        println!("start: {:?}\nend: {:?}\n{}", r.start, r.end, tmp.join(", "));

        acc.extend(x);
    }
}

#[derive(Clone, Copy, Debug)]
struct Id(u64);

impl Id {
    fn id_valid(&self) -> bool {
        let str = self.0.to_string();
        if str.len() % 2 != 0 {
            return true;
        }

        let a = &str[..str.len()];
        let b = &str[str.len()..];

        a == b
    }
}

struct Range {
    start: Id,
    end: Id,
}

impl Range {
    fn new(start: Id, end: Id) -> Self {
        Self { start, end }
    }

    fn get_invalid(&self) -> Vec<Id> {
        let mut ids = Vec::new();
        let mut current = self.start;
        while current.0 <= self.end.0 {
            if !current.id_valid() {
                ids.push(current);
            }

            current.0 += 1;
        }
        ids
    }
}
