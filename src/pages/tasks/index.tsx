import { useEffect, useState } from "react";
import { Header } from "./header"
import { Button, Check, Container, ContainerShowTasks, Input, FormContainer, HeaderShowTask, ShowTasks, TesteLetra } from "./styles";
import { PlusCircle, Trash  } from "phosphor-react";

import {v4 as uuidv4} from 'uuid';
import { Checkbox } from "pretty-checkbox-react";
import { api } from "../../lib/axios";
interface Task {
    content: string
    status: boolean
    id: string
}
export function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    
    async function fetchTasks() {
        const response = await api.get('tasks')

        setTasks(response.data)
    }

    function teste(id: string) {    
        
        const taskIndex = tasks.findIndex((task) => {return task.id == id;});
        const tempTasks = [...tasks];
        
        tempTasks[taskIndex].status = !tempTasks[taskIndex].status;

        setTasks(tempTasks);
    }

    async function testessevent(event: any) {
        event.preventDefault()

        const response = await api.post('tasks', {
            content: event.target[0].value,
            id: uuidv4(),
            status: false
        })

        setTasks((state) => [...state, response.data] )
    }

    async function DeleteTask(id:string) {
        api.delete('tasks/'+id)

        setTasks(tasks.filter(task => task.id != id))   
    }

    useEffect(() => {
        fetchTasks()
    }, [tasks])
    return (
        <Container>
            <Header/>

            <FormContainer onSubmit={(e) => {testessevent(e)}}>
                <Input
                    placeholder="Dê um nome para a sua nova tarefa"
                />     
                <Button type="submit">Criar <PlusCircle size={20} /></Button>
            </FormContainer>

            <ContainerShowTasks>
                <HeaderShowTask>
                    <div><p>Tarefas criadas</p><span>5</span></div>
                    
                    <div><p>Concluidas</p><span>2 de 5</span></div>

                </HeaderShowTask>
                { tasks.map((task: Task) =>             
                    <ShowTasks key={task.id}>
                        <Check>
                            <Checkbox
                                color="primary" 
                                shape="round" 
                                variant="fill" 
                                checked={task.status}
                                onChange={(e) => {teste(task.id)}}
                                />            
                            {task.status ? 
                            
                                <TesteLetra>{task.content}</TesteLetra> 
                                :
                                <p><span>{task.content}</span></p>
                            }             
                        </Check>
                        <Trash size={24} onClick={(e) => {DeleteTask(task.id)}}/> 
                    </ShowTasks>   
                )}
            </ContainerShowTasks>
        </Container>
    )
}