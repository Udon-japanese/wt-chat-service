import { ChangeEvent, FormEvent, MouseEvent } from "react"

export type handleInputChange = (e: ChangeEvent<HTMLInputElement>) => void;

export type handleSubmit = (e: FormEvent<HTMLFormElement>) => void;

export type handleButtonClick = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void;