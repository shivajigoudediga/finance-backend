import { useState } from 'react'
import FinanceTable from './components/FinanceTable'
import FinanceModal from './components/FinanceModal'
import { Button, Title, Group } from '@mantine/core'

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editRecord, setEditRecord] = useState(null)
  const [refresh, setRefresh] = useState(0)

  const openAdd = () => { setEditRecord(null); setModalOpen(true) }
  const openEdit = (r) => { setEditRecord(r); setModalOpen(true) }
  const onSaved = () => { setModalOpen(false); setRefresh(r => r + 1) }

  return (
    <div style={{ padding: '2rem' }}>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Finance Manager</Title>
        <Button onClick={openAdd}>+ Add Record</Button>
      </Group>

      <FinanceTable
        key={refresh}
        onEdit={openEdit}
        onDelete={() => setRefresh(r => r + 1)}
      />

      <FinanceModal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        record={editRecord}
        onSaved={onSaved}
        />
            </div>
          )
        }