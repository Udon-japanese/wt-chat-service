import { ChangeEvent, FormEvent } from "react"

export type handleInputChange = (e: ChangeEvent<HTMLInputElement>) => void;

export type handleSubmit = (e: FormEvent<HTMLFormElement>) => void;