import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export let current_price: Writable<number> = writable(0)