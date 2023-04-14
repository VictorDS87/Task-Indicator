import styled from "styled-components";

export const Container = styled.div`

    
`

// Form new task

export const FormContainer = styled.form`
   max-width: 736px;
    display: flex;
    justify-content: center;
    align-items: center;
    justify-items: center;
    margin: -1.7rem auto;
    margin-bottom: 0;
    width: 100%;

    gap: 0.5rem; 
`
export const Button = styled.button`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    width: 100px;
    padding: 1rem;
    gap: 0.3rem;
    border: none;

    background: #1E6F9F;
    color: white;
    font-size: 16px;

    cursor: pointer;
    transition: 0.3s;   

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    &:hover {
        filter: brightness(0.8);
    }
`

export const DefaultMessage = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin: auto;

    p {
        color: white
    }
`

export const ErrorMessage = styled.p`
    color: #f16565 !important;
`
export const Input = styled.input`
    flex: 1;
    border-radius: 6px;
    border: 1px solid #0D0D0D;
    padding: 1.15rem;
    outline: 0;

    background: #262626;
    color: white;
;
`


// Show Tasks 

export const ContainerShowTasks = styled.div`
    max-width: 732px;
    
    margin: 3rem auto;
    

    
`

export const HeaderShowTask = styled.div`
    display: flex;
    justify-content: space-between;

    color: white;
    div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        p {
            margin-top: 0.9rem;
            color: #4EA8DE;
            font-weight: 700;
        }

        span {
            font-size: 0.9rem;
            padding: 1px 0.5rem 1px 0.5rem;
            background: #333333;
            border-radius: 999px;

        }
    }
`

export const ContainerTaskCompleteValue = styled.span`
    display: flex;
    justify-content: center;
    width: 49px;
`

export const ShowTasks = styled.div`
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    background: #333333;
    padding: 0.8rem;
    border-radius: 7px;

    display: flex;
    justify-content: space-between;
    align-items: baseline;
    word-break: break-word;

    margin-top: 1rem;

    color: #F2F2F2;

    input:checked { span {
        color: red;
    } }
    input {

    }
    svg {
        position: relative;
  
        top: 5px;
        cursor: pointer;

        &:hover {
            filter: blur(0.04rem);
            color: red;
        }
    }

`

export const Check = styled.div`
    display: flex;
    align-items: center;
`

export const TesteLetra = styled.p`
    text-decoration: line-through
`