import { GetServerSideProps } from "next"
import { prisma } from "../../lib/prisma"
import { Task } from "@prisma/client"
import { FormEvent, useState } from "react"

type TaskProps = {
    tasks : Task[]
}

export default function App({tasks}: TaskProps){
    const [newTask , setNewTask] = useState('')

    async function handleCreateTask(event: FormEvent){
        event.preventDefault()

        fetch('http://localhost:3000/api/tasks/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: newTask })
        })

    }

    return (
        <div>
            <ul >
                {tasks.map(task => <li className="text-6xl" key={task.id}>{task.title}</li>)}
            </ul>
            <form onSubmit={handleCreateTask}>
                <input type="text" value={newTask} onChange={e => setNewTask(e.target.value)}/>
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    const tasks = await prisma.task.findMany()

    const data = tasks.map(task => {
        return {
            id: task.id,
            title: task.title,
            description: task.isDone,
            createdAt: task.createdAt.toISOString(),
        }
    })

    return {
        props: { tasks:data }
    }
}