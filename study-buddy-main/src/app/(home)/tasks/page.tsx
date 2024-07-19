'use server'
import React from 'react'
import AddTask from '@/components/AddTask'
import TasksTable from '@/components/TasksTable'

export default async function Page() {

  return (
    <>
      <div className='flex justify-between p-5 gap-5'>
        <p className='text-5xl text-primary'>Schedule Organizer</p>
        <AddTask />
      </div >
      <TasksTable />
    </>
  )
}