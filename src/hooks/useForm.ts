import { ChangeEvent, useState } from 'react';

function useForm<T extends { [key: string]: string }>(baseForm: T) {
	const [form, setForm] = useState<T>(baseForm);

	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		const element = e.target;
		setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
	}

	return [form, handleChange];
}

export default useForm;
