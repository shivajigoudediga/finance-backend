import { useEffect, useState } from 'react'
import { Table, Badge, ActionIcon, Group,
         Select, Text } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { getAll, remove } from '../api/financeApi'
import { modals } from '@mantine/modals'

const columns = [
  { key: 'userName',    label: 'User Name' },
  { key: 'type',        label: 'Type' },
  { key: 'category',    label: 'Category' },
  { key: 'amount',      label: 'Amount' },
  { key: 'description', label: 'Description' },
  { key: 'date',        label: 'Date' },
  { key: 'actions',     label: 'Actions' },
]

export default function FinanceTable({ onEdit, onDelete }) {
  const [rows, setRows] = useState([])
  const [sort, setSort] = useState(null)

  useEffect(() => {
    getAll(sort).then(setRows)
  }, [sort])

  const handleDelete = (id) =>
    modals.openConfirmModal({
      title: 'Delete record?',
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => remove(id).then(onDelete),
    })

  return (
    <>
      <Group mb="sm">
        <Select placeholder="Sort by…"
          data={[
            { value: 'userName',    label: 'User Name' },
            { value: 'amount,desc', label: 'Amount (high→low)' },
            { value: 'date,desc',   label: 'Date (newest)' },
          ]}
          value={sort}
          onChange={setSort}
          clearable
          style={{ width: 200 }}
        />
      </Group>

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            {columns.map(c =>
              <Table.Th key={c.key}>{c.label}</Table.Th>)}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rows.map(r => (
            <Table.Tr key={r.id}>
              <Table.Td>{r.userName}</Table.Td>
              <Table.Td>
                <Badge color={r.type==='INCOME' ? 'green' : 'red'}>
                  {r.type}
                </Badge>
              </Table.Td>
              <Table.Td>{r.category}</Table.Td>
              <Table.Td>
                <Text c={r.type==='INCOME' ? 'green' : 'red'}>
                  ₹{r.amount.toFixed(2)}
                </Text>
              </Table.Td>
              <Table.Td>{r.description}</Table.Td>
              <Table.Td>{r.date}</Table.Td>
              <Table.Td>
                <Group gap="xs">
                  <ActionIcon variant="subtle"
                    onClick={() => onEdit(r)}>
                    <IconEdit size={16} />
                  </ActionIcon>
                  <ActionIcon variant="subtle" color="red"
                    onClick={() => handleDelete(r.id)}>
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  )
}