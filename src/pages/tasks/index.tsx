import { useEffect, useRef, useState } from "react";
import { Header } from "./header"
import { Button, DefaultMessage, Check, Container, ContainerShowTasks, Input, FormContainer, HeaderShowTask, ShowTasks, TesteLetra, ContainerTaskCompleteValue, ErrorMessage } from "./styles";
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
    const [tasksComplete, setTasksComplete] = useState<number>(0)
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [valueIsInvalid, setValueIsInvalid] = useState(true);
    
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
    };

    async function FetchTasks() {
        const response = await api.get('tasks')

        setTasks(response.data)
    }

    async function CreateNewTask(event: any) {
        event.preventDefault()

        if(inputValue.trim() == "") {
            return setValueIsInvalid(false)
        }else {
            setIsLoading(true);
            console.log(inputValue)
            const response = await api.post('tasks', {
                content: event.target[0].value,
                id: uuidv4(),
                status: false
            })
    
      
            setTasks((state) => [...state, response.data] )
            setInputValue("");
            setIsLoading(false);
            setValueIsInvalid(true)
 
        }
    }

    function MarkAsComplete(id: string) {    
        
        const taskIndex = tasks.findIndex((task) => {return task.id == id;});
        const tempTasks = [...tasks];
        
        tempTasks[taskIndex].status = !tempTasks[taskIndex].status;

        setTasks(tempTasks);

        if(tempTasks[taskIndex].status) {
            setTasksComplete((count) => count + 1)
        }else {
            setTasksComplete((count) => count - 1)
        }
    }

    async function DeleteTask(id:string) {
        api.delete('tasks/'+id)

        setTasks(tasks.filter(task => task.id != id))
        const teste = tasks.filter(task => task.id == id)

        if(teste[0].status) {
            setTasksComplete((count) => count - 1)
        }
    }

    useEffect(() => {
        FetchTasks()
    }, [])

    return (
        <Container>
            <Header/>

            <FormContainer onSubmit={(e) => {CreateNewTask(e)}}>
                <Input
                    placeholder="Dê um nome para a sua nova tarefa"
                    autoFocus={true}
                    ref={inputRef}
                    onChange={(e) => setInputValue(e?.target.value)}
                    value={inputValue}
                    
                    />     
                <Button type="submit" onClick={handleClick} disabled={isLoading}>{isLoading ? 'Criando' : 'Criar'}</Button>
            </FormContainer>

            <DefaultMessage>{valueIsInvalid ? <p>Digite um nome para a tarefa</p>:<ErrorMessage>Por favor, digite algo para criar uma nova tarefa</ErrorMessage>}</DefaultMessage>
            
            <ContainerShowTasks>
                <HeaderShowTask>
                    <div><p>Tarefas criadas</p><span>{tasks.length}</span></div>
                    
                    <div><p>Concluidas</p><ContainerTaskCompleteValue>{tasksComplete} de {tasks.length}</ContainerTaskCompleteValue></div>

                </HeaderShowTask>
                { tasks.map((task: Task) =>             
                    <ShowTasks key={task.id}>
                        <Check>
                            <Checkbox
                                color="primary" 
                                shape="round" 
                                variant="fill" 
                                checked={task.status}
                                onChange={(e) => {MarkAsComplete(task.id)}}
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