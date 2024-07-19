'use client'
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useTaskStoreContext } from "@/app/(home)/task-store-provider";
import TaskOptions from './hocs/TaskOptions';

export default function TasksTable() {
    const tasks = useTaskStoreContext((state) => state.tasks);

    return (
        <Table className="" containerClassname="w-full overflow-y-auto relative h-fit max-h-128">
            <TableHeader className="sticky w-full top-0 h-10 border-b-2 border-border rounded-t-md  bg-stone-700">
                <TableRow className='bg-muted' >
                    <TableCell>Task</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Time</TableCell>
                    <TableCell>End Time</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Associated Class</TableCell>
                    <TableCell colSpan={2} >Notes</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tasks?.map((invoice, index) => (
                    <TableRow key={index}>
                        <TaskOptions data={invoice}>
                            <TableCell className="underline cursor-pointer hover:text-primary" title='CPlick to view more'>
                                {invoice.task_name}
                            </TableCell>
                        </TaskOptions>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.startTime}</TableCell>
                        <TableCell>{invoice.endTime}</TableCell>
                        <TableCell>{invoice.type}</TableCell>
                        <TableCell>{invoice.associatedClass}</TableCell>
                        <TableCell colSpan={3} >{invoice.details}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table >

    )
}
