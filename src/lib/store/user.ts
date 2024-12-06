
import { User } from "$lib/User";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";

export let user: Writable<User> = writable(new User(-1, "", "", 0))