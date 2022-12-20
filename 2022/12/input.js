import { readFileSync } from 'fs'

export const data = readFileSync('./input.txt', 'utf-8')
    .replaceAll('\r', '')
    .trim()
    .split('\n')
    .map(e => e.split(''))