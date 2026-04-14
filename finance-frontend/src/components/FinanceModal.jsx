import { Modal, TextInput, Select, NumberInput,
         Textarea, Button, Stack } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useState, useEffect } from 'react'
import { create, update } from '../api/financeApi'

export default function FinanceModal({ opened, onClose, record, onSaved }) {
  const empty = { userName:'', type:'EXPENSE', category:'',
                  amount:'', description:'', date: new Date() }
  const [form, setForm] = useState(empty)

  useEffect(() => {
    setForm(record ? { ...record, date: new Date(record.date) } : empty)
  }, [record, opened])

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    const payload = { ...form,
      date: form.date.toISOString().split('T')[0] }
    record ? await update(record.id, payload)
           : await create(payload)
    onSaved()
  }

  return (
    <Modal opened={opened} onClose={onClose}
           title={record ? 'Edit Record' : 'New Record'}>
      <Stack>
        <TextInput label="User Name" value={form.userName}
                   onChange={e => set('userName')(e.target.value)} />
        <Select label="Type" data={['INCOME','EXPENSE']}
                value={form.type} onChange={set('type')} />
        <TextInput label="Category" value={form.category}
                   onChange={e => set('category')(e.target.value)} />
        <NumberInput label="Amount" value={form.amount}
                     onChange={set('amount')} />
        <Textarea label="Description" value={form.description}
                  onChange={e => set('description')(e.target.value)} />
        <DateInput label="Date" value={form.date}
                   onChange={set('date')} />
        <Button onClick={handleSubmit}>Save</Button>
      </Stack>
    </Modal>
  )
}