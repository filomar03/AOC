pub fn read_input() -> String {
    let content = std::fs::read_to_string("input.txt").unwrap();
    content.trim().to_string()
}
